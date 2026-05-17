'use client';

import { useState, useTransition, useId } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  MapPin,
  Check,
} from 'lucide-react';
import { checkPostalCode, type ZoneCheckResult } from '@/lib/zone';
import type { LeadSource } from '@/lib/validation';
import { client } from '@/content/client';

type Props = {
  source: LeadSource;
  merciHref: string;
};

type Status = 'idle' | 'submitting' | 'error';

export function ZipGate({ source, merciHref }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [cp, setCp] = useState('');
  const [zoneResult, setZoneResult] = useState<ZoneCheckResult | null>(null);
  const [owner, setOwner] = useState<'yes' | 'no' | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const zipId = useId();
  const phoneId = useId();
  const honeyId = useId();

  const handleCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setCp(value);
    if (value.length === 5) {
      const res = checkPostalCode(value);
      setZoneResult(res);
    } else {
      setZoneResult(null);
    }
  };

  const handleCheckClick = () => {
    if (cp.length !== 5) {
      setErrorMsg('Renseignez un code postal valide (5 chiffres).');
      return;
    }
    setErrorMsg(null);
    setZoneResult(checkPostalCode(cp));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const phone = String(fd.get('phone') ?? '').trim();
    const honey = String(fd.get('website') ?? '');
    const covered =
      zoneResult?.kind === 'covered' || zoneResult?.kind === 'covered-fallback';
    const city = covered ? zoneResult!.city : '';
    const is_owner = covered ? owner === 'yes' : false;

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          phone,
          postal_code: cp,
          is_owner,
          city,
          website: honey,
        }),
      });
      if (!res.ok) throw new Error('http');
      startTransition(() => router.push(merciHref));
    } catch (err) {
      setStatus('idle');
      setErrorMsg("Oups, l'envoi a échoué. Réessayez ou appelez-nous.");
      console.error(err);
    }
  };

  const covered =
    zoneResult?.kind === 'covered' || zoneResult?.kind === 'covered-fallback';
  const notCovered = zoneResult?.kind === 'not-covered';
  const showResult = covered || notCovered;
  const showExpanded = showResult;
  const cityName =
    zoneResult && (zoneResult.kind === 'covered' || zoneResult.kind === 'covered-fallback')
      ? zoneResult.city
      : '';

  return (
    <div className="relative w-full max-w-[440px]">
      {/* Trait déco terracotta en haut de la card */}
      <div
        className="absolute -top-1 left-8 w-14 h-1 bg-terracotta rounded-full"
        aria-hidden
      />

      <form
        onSubmit={handleSubmit}
        className="relative bg-cream rounded-3xl p-7 sm:p-9 shadow-form-floating border border-white/50"
        noValidate
      >
        <h2
          className="font-serif text-navy mb-1 leading-tight"
          style={{ fontSize: '22px', fontWeight: 500, letterSpacing: '-0.01em' }}
        >
          Vérifiez votre éligibilité
        </h2>
        <p className="text-sm text-slate mb-2">
          Réponse immédiate · 30 secondes · sans engagement
        </p>
        {/* Social proof temps réel — effet bandwagon */}
        <p className="flex items-center gap-1.5 text-[12px] text-emerald-700 font-medium mb-6">
          <span className="relative inline-flex items-center justify-center" aria-hidden>
            <span className="absolute inline-flex size-1.5 rounded-full bg-emerald-500 opacity-60 animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          {client.demandesCeMois}
        </p>

        {/* Honeypot */}
        <div className="hidden" aria-hidden>
          <label htmlFor={honeyId}>Ne pas remplir</label>
          <input
            id={honeyId}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* CP row : input + Vérifier */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 size-[18px] text-slate pointer-events-none"
              aria-hidden
            />
            <label htmlFor={zipId} className="sr-only">
              Code postal
            </label>
            <input
              id={zipId}
              type="text"
              name="postal_code"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              required
              placeholder="Votre code postal"
              value={cp}
              onChange={handleCpChange}
              autoComplete="postal-code"
              className="w-full min-h-[52px] py-4 pl-11 pr-4 rounded-2xl bg-white text-base font-medium tabular-nums text-ink placeholder:text-slate/70 outline-none border-[1.5px] border-navy/[0.12] transition-all duration-250 focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(194,105,63,0.1)]"
            />
          </div>
          <button
            type="button"
            onClick={handleCheckClick}
            className="btn-navy whitespace-nowrap"
          >
            Vérifier
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>

        {/* Résultat zone */}
        {showResult && zoneResult && (
          <div
            role="status"
            className={[
              'mt-4 flex items-start gap-2 px-4 py-3.5 rounded-xl text-sm leading-snug animate-slide-down border',
              covered
                ? 'bg-emerald-500/[0.08] text-emerald-700 border-emerald-500/20'
                : 'bg-terracotta/[0.08] text-terracotta-deep border-terracotta/20',
            ].join(' ')}
          >
            {covered ? (
              <CheckCircle2 className="size-4 shrink-0 mt-0.5" aria-hidden />
            ) : (
              <AlertCircle className="size-4 shrink-0 mt-0.5" aria-hidden />
            )}
            <p>
              {covered ? (
                <>
                  Excellente nouvelle, nous intervenons à{' '}
                  <strong className="font-semibold">{cityName}</strong>. Encore 2 créneaux
                  d&apos;expert disponibles cette semaine.
                </>
              ) : (
                <>Nous ne couvrons pas encore votre zone, mais on s&apos;agrandit. Laissez-nous votre numéro, on vous prévient.</>
              )}
            </p>
          </div>
        )}

        {errorMsg && !showResult && (
          <p
            className="mt-3 text-sm text-terracotta-deep flex items-center gap-2"
            role="alert"
          >
            <AlertCircle className="size-4" aria-hidden />
            {errorMsg}
          </p>
        )}

        {/* Form étendu après Vérifier */}
        {showExpanded && (
          <div className="mt-5 space-y-4 animate-slide-down">
            <div>
              <label
                htmlFor={phoneId}
                className="block text-[11px] font-semibold text-slate uppercase tracking-[0.06em] mb-1.5"
              >
                Téléphone
              </label>
              <input
                id={phoneId}
                type="tel"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder="06 12 34 56 78"
                className="w-full min-h-[52px] py-3.5 px-4 rounded-xl bg-white text-base text-ink placeholder:text-slate/70 outline-none border-[1.5px] border-navy/[0.12] transition-all duration-250 focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(194,105,63,0.1)]"
              />
            </div>

            {covered && (
              <div>
                <span className="block text-[11px] font-semibold text-slate uppercase tracking-[0.06em] mb-1.5">
                  Êtes-vous propriétaire&nbsp;?
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(['yes', 'no'] as const).map((val) => {
                    const active = owner === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setOwner(val)}
                        aria-pressed={active}
                        className={[
                          'min-h-[52px] py-3.5 rounded-xl border-[1.5px] font-semibold text-[15px] transition-all duration-250',
                          active
                            ? 'border-terracotta bg-terracotta/[0.08] text-terracotta-deep'
                            : 'border-navy/[0.12] bg-white text-navy hover:border-navy/30',
                        ].join(' ')}
                      >
                        {val === 'yes' ? 'Oui' : 'Non'}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting' || (covered && !owner)}
              className="w-full inline-flex items-center justify-center gap-2.5 min-h-[56px] px-6 rounded-2xl bg-terracotta hover:bg-terracotta-deep text-cream font-semibold text-base shadow-terracotta-sm hover:shadow-terracotta-xl transition-all duration-300 ease-smooth disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] mt-2"
              style={{ letterSpacing: '0.01em' }}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden /> Envoi…
                </>
              ) : covered ? (
                <>
                  Obtenir mon devis gratuit
                  <ArrowRight className="size-[18px]" aria-hidden />
                </>
              ) : (
                <>
                  Me prévenir quand vous arrivez
                  <ArrowRight className="size-[18px]" aria-hidden />
                </>
              )}
            </button>

            {errorMsg && (
              <p className="text-sm text-terracotta-deep" role="alert">
                {errorMsg}
              </p>
            )}
          </div>
        )}

        {/* Trust badges row : toujours visibles, slate uppercase */}
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium uppercase text-slate" style={{ letterSpacing: '0.06em' }}>
          <Badge>Sans engagement</Badge>
          <Badge>Devis gratuit</Badge>
          <Badge>Données privées</Badge>
        </ul>
      </form>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5">
      <Check className="size-3 text-emerald-600" strokeWidth={3} aria-hidden />
      {children}
    </li>
  );
}
