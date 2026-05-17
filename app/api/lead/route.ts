import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { leadSchema, type LeadPayload } from '@/lib/validation';

/**
 * POST /api/lead
 *
 * Phase 1 : validation Zod + log + return ok.
 * Phase 2 : remplacer le console.log par un fetch POST vers le webhook n8n
 *           avec header `x-hpn-secret` (cf. 00-brief-initial.md).
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

  // TODO Phase 2 — décommenter et configurer :
  // await fetch(process.env.N8N_WEBHOOK_URL!, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-hpn-secret': process.env.N8N_SECRET!,
  //   },
  //   body: JSON.stringify(normalized),
  // });

  return NextResponse.json({ ok: true, leadId });
}
