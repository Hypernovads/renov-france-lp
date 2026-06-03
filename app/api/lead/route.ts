import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { leadSchema, type LeadPayload } from '@/lib/validation';
import { sendTelegram, createNotionLead, updateNotionLead } from '@/lib/notify';

/**
 * POST /api/lead
 *
 * Flow 2 étapes (depuis le quiz hero LP2) :
 * 1. Early form (nom+tel) → is_partial=true → CREATE Notion (statut "🟡 Quiz en cours")
 *    + notif Telegram "lead capturé". Retourne notion_page_id côté client.
 * 2. Fin de quiz → notion_page_id passé → UPDATE même page Notion (statut "🆕 Nouveau",
 *    enrichi qualifications + créneau). Notif Telegram "lead qualifié".
 *
 * Si pas de notion_page_id → CREATE classique (form long, ou tout autre flow direct).
 * Échec d'une notif (Telegram OU Notion) → loggé, mais ne bloque pas l'autre.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'validation_failed',
        details: parsed.error.flatten(),
      },
      { status: 422 },
    );
  }

  const lead: LeadPayload = parsed.data;

  // Honeypot rempli = bot silencieux : on répond ok sans rien faire
  if (lead.website && lead.website.length > 0) {
    return NextResponse.json({ ok: true, leadId: 'silent' });
  }

  const leadId = lead.notion_page_id || randomUUID();
  const isUpdate = !!lead.notion_page_id;

  // Payload normalisé pour le log
  const normalized = {
    leadId,
    isUpdate,
    isPartial: lead.is_partial,
    receivedAt: new Date().toISOString(),
    source: lead.source,
    campaign: lead.campaign,
    contact: {
      name: lead.name,
      email: lead.email || null,
      phone: lead.phone,
      postal_code: lead.postal_code,
      city: lead.city,
    },
    qualification: {
      is_owner: lead.is_owner,
      project_type: lead.project_type,
      timing: lead.timing,
    },
    raw: lead.raw ?? null,
  };
  console.log('[lead]', JSON.stringify(normalized, null, 2));

  // ─── Notion : create OR update ────────────────────────────────────
  // ─── Telegram : mode selon contexte (partial / qualified / full) ──
  const telegramMode = isUpdate
    ? 'qualified'
    : lead.is_partial
      ? 'partial'
      : 'full';

  const notionPromise: Promise<string> = isUpdate
    ? updateNotionLead(lead.notion_page_id!, lead).then(() => lead.notion_page_id!)
    : createNotionLead(lead, leadId);

  const [tg, nt] = await Promise.allSettled([
    sendTelegram(lead, leadId, telegramMode),
    notionPromise,
  ]);

  if (tg.status === 'rejected') console.error('[notify:telegram]', tg.reason);
  if (nt.status === 'rejected') console.error('[notify:notion]', nt.reason);

  const notionPageId = nt.status === 'fulfilled' ? nt.value : lead.notion_page_id;

  return NextResponse.json({
    ok: true,
    leadId,
    notion_page_id: notionPageId,
  });
}
