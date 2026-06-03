import type { LeadPayload } from './validation';

/**
 * Notifications de leads : Telegram (notif instantanée groupe) + Notion (CRM).
 *
 * Flow 2 étapes :
 * 1. Early form (nom+tel) → createNotionLead({ is_partial: true }) → statut "🟡 Quiz en cours".
 *    Telegram : notif "lead capturé, quiz en cours".
 *    /api/lead retourne notion_page_id côté client.
 * 2. Fin du quiz → updateNotionLead(pageId, lead) → statut "🆕 Nouveau" + enrichi.
 *    Telegram : notif "lead qualifié, à rappeler" (avec créneau + tranche revenu).
 *
 * Secrets : .env.local en dev, Vercel Environment Variables en prod.
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;

/** Libellé humain par source de LP — utilisé pour le titre du message Telegram. */
const SOURCE_LABELS: Record<string, string> = {
  lp_maprimeadapt: "MaPrimeAdapt'",
  lp_baignoire_douche: 'Baignoire → Douche',
  lp_renovation: 'Rénovation totale',
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Construit un href tel: au format international (FR par défaut). */
const phoneTelHref = (phone: string): string => {
  const clean = phone.replace(/[\s.\-]/g, '');
  if (clean.startsWith('+')) return clean;
  if (clean.startsWith('0')) return '+33' + clean.slice(1);
  return clean;
};

// ─────────────────────────────────────────────────────────────────────────────
// Telegram
// ─────────────────────────────────────────────────────────────────────────────

type TelegramMode = 'partial' | 'qualified' | 'full';

/**
 * 3 modes :
 * - `partial`  : early form (nom+tel) — lead capturé, quiz pas encore fini.
 * - `qualified`: fin de quiz d'éligibilité — lead enrichi, à rappeler.
 * - `full`     : soumission classique (form long) — pas d'early form en amont.
 */
export async function sendTelegram(
  lead: LeadPayload,
  leadId: string,
  mode: TelegramMode = 'full',
): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('telegram_env_missing');
  }

  const sourceLabel = SOURCE_LABELS[lead.source] ?? lead.source;
  const title =
    mode === 'partial'
      ? `🟡 <b>Lead capturé — ${escapeHtml(sourceLabel)}</b> <i>(quiz en cours)</i>`
      : mode === 'qualified'
        ? `✅ <b>Lead qualifié — ${escapeHtml(sourceLabel)}</b> <i>(quiz complété)</i>`
        : `🔔 <b>Nouveau lead — ${escapeHtml(sourceLabel)}</b>`;

  const lines: string[] = [
    title,
    `━━━━━━━━━━━━━`,
    `👤 <b>${escapeHtml(lead.name || 'Sans nom')}</b>`,
    `📞 <a href="tel:${phoneTelHref(lead.phone)}">${escapeHtml(lead.phone)}</a>`,
  ];

  // Données contextuelles selon ce qu'on a
  if (lead.postal_code) {
    lines.push(
      `📍 ${escapeHtml(lead.postal_code)}${lead.city ? ' · ' + escapeHtml(lead.city) : ''}`,
    );
  }
  if (lead.project_type) lines.push(`🛠️ ${escapeHtml(lead.project_type)}`);
  if (lead.timing) lines.push(`🕒 Rappel : ${escapeHtml(lead.timing)}`);
  if (lead.email) lines.push(`✉️ ${escapeHtml(lead.email)}`);

  // Pour les leads qualifiés (fin de quiz), on a des infos éligibilité dans raw
  if (mode === 'qualified' && lead.raw) {
    const r = lead.raw as Record<string, unknown>;
    const rappelSlot = (r.rappel_slot ?? null) as string | null;
    if (rappelSlot) lines.push(`🕒 Créneau rappel : <b>${escapeHtml(rappelSlot)}</b>`);
    const estimation = (r.estimation ?? null) as { total_aides?: number; reste_a_charge?: number } | null;
    if (estimation?.total_aides != null) {
      lines.push(`💰 Aides estimées : <b>${estimation.total_aides.toLocaleString('fr-FR')} €</b>`);
    }
    if (estimation?.reste_a_charge != null) {
      lines.push(`💵 Reste à charge : ~${estimation.reste_a_charge.toLocaleString('fr-FR')} €`);
    }
  }

  // Mention spéciale pour les partiels : action attendue côté commercial
  if (mode === 'partial') {
    lines.push('');
    lines.push(`<i>👉 Lead à rappeler / relancer WhatsApp si pas de complétion sous peu.</i>`);
  }

  lines.push(`━━━━━━━━━━━━━`);
  const meta = [
    `Source : <code>${escapeHtml(lead.source)}</code>`,
    lead.campaign ? `Campagne : ${escapeHtml(lead.campaign)}` : null,
    `ID : <code>${escapeHtml(leadId.slice(0, 8))}</code>`,
  ]
    .filter(Boolean)
    .join(' · ');
  lines.push(meta);

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`telegram_http_${res.status}: ${body.slice(0, 200)}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Notion (base "Prospects" dans page "Rénovation")
// ─────────────────────────────────────────────────────────────────────────────

const rtxt = (content: string) => ({
  rich_text: [{ text: { content: content.slice(0, 2000) } }],
});

const NOTION_HEADERS = () => ({
  Authorization: `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
});

/**
 * Crée une nouvelle page dans la base "Prospects". Retourne le pageId Notion
 * (utilisé ensuite pour update via updateNotionLead).
 * Si `lead.is_partial` → statut "🟡 Quiz en cours". Sinon "🆕 Nouveau".
 */
export async function createNotionLead(
  lead: LeadPayload,
  leadId: string,
): Promise<string> {
  if (!NOTION_TOKEN || !NOTION_LEADS_DB_ID) {
    throw new Error('notion_env_missing');
  }

  const displayName =
    (lead.name && lead.name.trim()) || `Lead anonyme · ${leadId.slice(0, 8)}`;

  const status = lead.is_partial ? '🟡 Quiz en cours' : '🆕 Nouveau';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const properties: Record<string, any> = {
    'Nom': { title: [{ text: { content: displayName.slice(0, 200) } }] },
    'Statut': { select: { name: status } },
    'Téléphone': { phone_number: lead.phone },
    'Source': { select: { name: lead.source } },
  };

  if (lead.postal_code) properties['Code postal'] = rtxt(lead.postal_code);
  if (lead.email) properties['Email'] = { email: lead.email };
  if (lead.city) properties['Ville'] = rtxt(lead.city);
  if (lead.project_type) properties['Type de projet'] = rtxt(lead.project_type);
  if (lead.campaign) properties['Campagne'] = rtxt(lead.campaign);
  if (lead.adset) properties['Adset'] = rtxt(lead.adset);
  if (lead.ad) properties['Ad'] = rtxt(lead.ad);

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: NOTION_HEADERS(),
    body: JSON.stringify({
      parent: { database_id: NOTION_LEADS_DB_ID },
      properties,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`notion_create_http_${res.status}: ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as { id: string };
  return data.id;
}

/**
 * Met à jour une page existante (lead capturé en partiel → enrichi à la fin du quiz).
 * Upgrade le statut à "🆕 Nouveau" et ajoute les infos qualifiées.
 */
export async function updateNotionLead(
  pageId: string,
  lead: LeadPayload,
): Promise<void> {
  if (!NOTION_TOKEN) throw new Error('notion_env_missing');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const properties: Record<string, any> = {
    'Statut': { select: { name: '🆕 Nouveau' } },
  };

  // Mise à jour des champs qu'on n'avait pas au moment du early form
  if (lead.postal_code) properties['Code postal'] = rtxt(lead.postal_code);
  if (lead.city) properties['Ville'] = rtxt(lead.city);
  if (lead.project_type) properties['Type de projet'] = rtxt(lead.project_type);
  if (lead.email) properties['Email'] = { email: lead.email };
  if (lead.campaign) properties['Campagne'] = rtxt(lead.campaign);
  if (lead.adset) properties['Adset'] = rtxt(lead.adset);
  if (lead.ad) properties['Ad'] = rtxt(lead.ad);

  // Synthèse qualif quiz → champ Notes (lisible côté commercial)
  if (lead.raw) {
    const r = lead.raw as Record<string, unknown>;
    const slot = r.rappel_slot ?? null;
    const answers = (r.quiz_answers ?? {}) as Record<string, string>;
    const estimation = (r.estimation ?? null) as { total_aides?: number; reste_a_charge?: number } | null;
    const notesLines = [
      slot ? `Créneau rappel souhaité : ${slot}` : null,
      answers.age ? `Âge : ${answers.age}` : null,
      answers.statut ? `Statut : ${answers.statut}` : null,
      answers.revenu ? `Revenus : ${answers.revenu}` : null,
      answers.situation ? `Situation : ${answers.situation}` : null,
      answers.regime ? `Régime : ${answers.regime}` : null,
      estimation?.total_aides != null
        ? `Aides estimées : ${estimation.total_aides.toLocaleString('fr-FR')} €`
        : null,
      estimation?.reste_a_charge != null
        ? `Reste à charge : ~${estimation.reste_a_charge.toLocaleString('fr-FR')} €`
        : null,
    ].filter(Boolean);
    if (notesLines.length > 0) {
      properties['Notes'] = rtxt(notesLines.join('\n'));
    }
  }

  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: NOTION_HEADERS(),
    body: JSON.stringify({ properties }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`notion_update_http_${res.status}: ${body.slice(0, 300)}`);
  }
}
