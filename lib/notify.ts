import type { LeadPayload } from './validation';

/**
 * Notifications de leads : Telegram (notif instantanée groupe) + Notion (CRM).
 * Les deux sont appelés en parallèle depuis /api/lead via Promise.allSettled —
 * l'échec de l'un ne bloque pas l'autre, le lead est au pire seulement loggé.
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

export async function sendTelegram(lead: LeadPayload, leadId: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('telegram_env_missing');
  }

  const sourceLabel = SOURCE_LABELS[lead.source] ?? lead.source;
  const lines: string[] = [
    `🔔 <b>Nouveau lead — ${escapeHtml(sourceLabel)}</b>`,
    `━━━━━━━━━━━━━`,
    `👤 <b>${escapeHtml(lead.name || 'Sans nom')}</b>`,
    `📞 <a href="tel:${phoneTelHref(lead.phone)}">${escapeHtml(lead.phone)}</a>`,
    `📍 ${escapeHtml(lead.postal_code)}${lead.city ? ' · ' + escapeHtml(lead.city) : ''}`,
  ];
  if (lead.project_type) lines.push(`🛠️ ${escapeHtml(lead.project_type)}`);
  if (lead.timing) lines.push(`🕒 Rappel : ${escapeHtml(lead.timing)}`);
  if (lead.email) lines.push(`✉️ ${escapeHtml(lead.email)}`);
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
// Notion (base "Leads" dans page "Rénovation")
// ─────────────────────────────────────────────────────────────────────────────

const rtxt = (content: string) => ({
  rich_text: [{ text: { content: content.slice(0, 2000) } }],
});

export async function createNotionLead(lead: LeadPayload, leadId: string): Promise<void> {
  if (!NOTION_TOKEN || !NOTION_LEADS_DB_ID) {
    throw new Error('notion_env_missing');
  }

  const displayName =
    (lead.name && lead.name.trim()) || `Lead anonyme · ${leadId.slice(0, 8)}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const properties: Record<string, any> = {
    'Nom': { title: [{ text: { content: displayName.slice(0, 200) } }] },
    'Statut': { select: { name: '🆕 Nouveau' } },
    'Téléphone': { phone_number: lead.phone },
    'Code postal': rtxt(lead.postal_code),
    'Source': { select: { name: lead.source } },
  };

  if (lead.email) properties['Email'] = { email: lead.email };
  if (lead.city) properties['Ville'] = rtxt(lead.city);
  if (lead.project_type) properties['Type de projet'] = rtxt(lead.project_type);
  if (lead.campaign) properties['Campagne'] = rtxt(lead.campaign);
  if (lead.adset) properties['Adset'] = rtxt(lead.adset);
  if (lead.ad) properties['Ad'] = rtxt(lead.ad);

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_LEADS_DB_ID },
      properties,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`notion_http_${res.status}: ${body.slice(0, 300)}`);
  }
}
