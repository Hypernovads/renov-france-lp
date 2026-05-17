'use client';

import { useState, useTransition, useId } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { checkPostalCode, type ZoneCheckResult } from '@/lib/zone';
import type { LeadSource } from '@/lib/validation';

type Props = {
  source: LeadSource;
  merciHref: string;
  /** Fond clair ou foncé pour adapter les couleurs du form */
  tone?: 'light' | 'dark';
};

type Status = 'idle' | 'submitting' | 'error';

export function ZipGate({ source, merciHref, tone = 'dark' }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [zoneResult, setZoneResult] = useState<ZoneCheckResult | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const zipId = useId();
  const phoneId = useId();
  const ownerId = useId();
  const honeyId = useId();

  const handleCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    e.target.value = value;
    if (value.length === 5) {
      setZoneResult(checkPostalCode(value));
    } else {
      setZoneResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const phone = String(fd.get('phone') ?? '').trim();
    const postal_code = String(fd.get('postal_code') ?? '').trim();
    const is_owner = String(fd.get('is_owner') ?? '') === 'yes';
    const honey = String(fd.get('website') ?? '');

    const city =
      zoneResult && (zoneResult.kind === 'covered' || zoneResult.kind === 'covered-fallback')
        ? zoneResult.city
        : '';

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          phone,
          postal_code,
          is_owner,
          city,
          website: honey,
        }),
      });
      if (!res.ok) throw new Error('Erreur réseau');
      startTransition(() => {
        router.push(merciHref);
      });
    } catch (err) {
      setStatus('error');
      setErrorMsg("Oups, le formulaire n'a pas pu partir. Réessaie ou appelle-nous directement.");
      console.error(err);
    }
  };

  // ─── Styles dérivés du tone ────────────────────────────────────
  const labelCls = tone === 'dark' ? 'text-cream/80' : 'text-slate';
  const inputCls =
    tone === 'dark'
      ? 'bg-white/95 text-ink placeholder:text-slate/60 border-transparent focus:border-terracotta focus:bg-white'
      : 'bg-white text-ink placeholder:text-slate/60 border-cream-warm focus:border-terracotta';

  const showCovered = zoneResult?.kind === 'covered' || zoneResult?.kind === 'covered-fallback';
  const showNotCovered = zoneResult?.kind === 'not-covered';

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md rounded-lg bg-navy-deep/80 backdrop-blur-xl border border-white/10 p-5 sm:p-6 shadow-2xl shadow-black/40"
      noValidate
    >
      {/* Honeypot anti-bot */}
      <div className="hidden" aria-hidden>
        <label htmlFor={honeyId}>Ne pas remplir</label>
        <input id={honeyId} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* ── Code postal (toujours visible) ── */}
      <div>
        <label htmlFor={zipId} className={`block text-sm font-medium mb-1.5 ${labelCls}`}>
          Code postal
        </label>
        <input
          id={zipId}
          type="text"
          name="postal_code"
          inputMode="numeric"
          autoComplete="postal-code"
          required
          placeholder="13008"
          onChange={handleCpChange}
          className={`w-full min-h-[52px] px-4 rounded-md border-2 text-base font-medium tabular-nums outline-none transition-all duration-300 ease-smooth ${inputCls}`}
        />
      </div>

      {/* ── Message zone couverte ── */}
      {showCovered && zoneResult && (
        <div
          className="mt-3 flex items-start gap-2 rounded-md bg-emerald-500/10 border border-emerald-400/30 px-3 py-2.5 text-sm text-emerald-100 animate-fade-up"
          role="status"
        >
          <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-emerald-300" aria-hidden />
          <p>
            Excellente nouvelle, nous intervenons à{' '}
            <span className="font-semibold">{zoneResult.city}</span>.
          </p>
        </div>
      )}

      {/* ── Message hors zone ── */}
      {showNotCovered && (
        <div
          className="mt-3 flex items-start gap-2 rounded-md bg-amber-500/10 border border-amber-400/30 px-3 py-2.5 text-sm text-amber-100 animate-fade-up"
          role="status"
        >
          <AlertCircle className="size-4 shrink-0 mt-0.5 text-amber-300" aria-hidden />
          <p>On ne couvre pas encore votre zone. Laissez-nous votre tel, on vous prévient.</p>
        </div>
      )}

      {/* ── Champs progressifs (couvert) ── */}
      {showCovered && (
        <div className="mt-4 space-y-4 animate-fade-up">
          <div>
            <label htmlFor={phoneId} className={`block text-sm font-medium mb-1.5 ${labelCls}`}>
              Votre téléphone
            </label>
            <input
              id={phoneId}
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="06 12 34 56 78"
              className={`w-full min-h-[52px] px-4 rounded-md border-2 text-base outline-none transition-all duration-300 ease-smooth ${inputCls}`}
            />
          </div>

          <div>
            <span className={`block text-sm font-medium mb-1.5 ${labelCls}`}>
              Êtes-vous propriétaire&nbsp;?
            </span>
            <div className="grid grid-cols-2 gap-2" role="radiogroup">
              {(['yes', 'no'] as const).map((val) => (
                <label
                  key={val}
                  className="relative flex items-center justify-center min-h-[48px] rounded-md border-2 border-white/15 bg-white/5 text-cream cursor-pointer transition-all duration-300 ease-smooth hover:bg-white/10 has-[:checked]:border-terracotta has-[:checked]:bg-terracotta/15"
                >
                  <input
                    id={val === 'yes' ? ownerId : undefined}
                    type="radio"
                    name="is_owner"
                    value={val}
                    required
                    className="sr-only"
                  />
                  <span className="font-medium">{val === 'yes' ? 'Oui' : 'Non'}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary w-full disabled:opacity-70 disabled:cursor-wait"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden /> Envoi…
              </>
            ) : (
              <>
                Obtenir mon devis gratuit
                <ArrowRight className="size-5" aria-hidden />
              </>
            )}
          </button>
        </div>
      )}

      {/* ── Champ tel seul (hors zone) ── */}
      {showNotCovered && (
        <div className="mt-4 space-y-4 animate-fade-up">
          <div>
            <label htmlFor={phoneId} className={`block text-sm font-medium mb-1.5 ${labelCls}`}>
              Votre téléphone
            </label>
            <input
              id={phoneId}
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="06 12 34 56 78"
              className={`w-full min-h-[52px] px-4 rounded-md border-2 text-base outline-none transition-all duration-300 ease-smooth ${inputCls}`}
            />
          </div>
          {/* Pas de propriétaire : on capture juste le tel pour data expansion */}
          <input type="hidden" name="is_owner" value="no" />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary w-full disabled:opacity-70 disabled:cursor-wait"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden /> Envoi…
              </>
            ) : (
              <>
                Me prévenir quand vous ouvrez ma zone
                <ArrowRight className="size-5" aria-hidden />
              </>
            )}
          </button>
        </div>
      )}

      {status === 'error' && errorMsg && (
        <p className="mt-3 text-sm text-amber-200" role="alert">
          {errorMsg}
        </p>
      )}

      <p className="mt-4 text-[11px] text-cream/50 leading-snug">
        En envoyant ce formulaire, vous acceptez d&apos;être rappelé sous 24 h ouvrées. Pas de
        revente, pas de spam. RGPD.
      </p>
    </form>
  );
}
