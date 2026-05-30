import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { leadSchema, type LeadPayload } from '@/lib/validation';
import { sendTelegram, createNotionLead } from '@/lib/notify';

/**
 * POST /api/lead
 *
 * Validation Zod → notif Telegram (groupe) + création dans la base Notion "Leads".
 * Les deux notifs partent en parallèle (Promise.allSettled) : l'échec de l'une
 * ne bloque jamais l'autre, le lead est au pire seulement loggé en console.
 *
 * Phase suivante : ajouter Meta Conversions API (CAPI) + GA4 mesure server-side.
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

  const leadId = randomUUID();

  // Payload normalisé prêt pour n8n (Phase 2)
  const normalized = {
    leadId,
    receivedAt: new Date().toISOString(),
    source: lead.source,
    campaign: lead.campaign,
    adset: lead.adset,
    ad: lead.ad,
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
      budget: lead.budget,
      timing: lead.timing,
    },
    raw: lead.raw ?? null,
  };

  console.log('[lead]', JSON.stringify(normalized, null, 2));

  // Notifs en parallèle — on n'attend PAS l'une avant l'autre, et un échec
  // d'une notif ne fait pas échouer la requête utilisateur.
  const [tg, nt] = await Promise.allSettled([
    sendTelegram(lead, leadId),
    createNotionLead(lead, leadId),
  ]);
  if (tg.status === 'rejected') console.error('[notify:telegram]', tg.reason);
  if (nt.status === 'rejected') console.error('[notify:notion]', nt.reason);

  return NextResponse.json({ ok: true, leadId });
}
