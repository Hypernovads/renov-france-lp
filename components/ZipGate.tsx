'use client';

import { useState, useTransition, useId } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  MapPin,
  ShieldCheck,
  FileText,
  Lock,
} from 'lucide-react';
import { checkPostalCode, type ZoneCheckResult } from '@/lib/zone';
import type { LeadSource } from '@/lib/validation';

type Props = {
  source: LeadSource;
  merciHref: string;
};

type Step = 'check' | 'reveal';
type Status = 'idle' | 'submitting' | 'error';

export function ZipGate({ source, merciHref }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [step, setStep] = useState<Step>('check');
  const [zoneResult, setZoneResult] = useState<ZoneCheckResult | null>(null);
  const [cp, setCp] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const zipId = useId();
  const phoneId = useId();
  const honeyId = useId();

  const handleCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setCp(value);
  };

  const handleCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = checkPostalCode(cp);
    if (!res) {
      setErrorMsg('Renseigne un code postal valide (5 chiffres).');
      return;
    }
    setErrorMsg(null);
    setZoneResult(res);
    setStep('reveal');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const phone = String(fd.get('phone') ?? '').trim();
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
          postal_code: cp,
          is_owner,
          city,
          website: honey,
        }),
      });
      if (!res.ok) throw new Error('http');
      startTransition(() => router.push(merciHref));
    } catch (err) {
      setStatus('error');
      setErrorMsg("Oups, l'envoi a échoué. Réessayez ou appelez-nous.");
      console.error(err);
    }
  };

  const covered = zoneResult?.kind === 'covered' || zoneResult?.kind === 'covered-fallback';

  return (
    <div className="relative w-full max-w-md">
      {/* Petit trait déco terracotta en haut */}
      <div className="absolute -top-px left-8 w-16 h-1 bg-terracotta rounded-full" aria-hidden />

      <div className="rounded-2xl bg-cream-warm/95 border border-cream-warm shadow-2xl shadow-navy-deep/40 p-5 sm:p-7">
        {step === 'check' ? (
          <CheckForm
            zipId={zipId}
            honeyId={honeyId}
            cp={cp}
            errorMsg={errorMsg}
            onChange={handleCpChange}
            onSubmit={handleCheck}
          />
        ) : (
          <RevealForm
            phoneId={phoneId}
            honeyId={honeyId}
            covered={!!covered}
            cityName={zoneResult?.kind === 'covered' || zoneResult?.kind === 'covered-fallback' ? zoneResult.city : ''}
            cp={cp}
            status={status}
            errorMsg={errorMsg}
            onSubmit={handleSubmit}
            onBack={() => {
              setStep('check');
              setZoneResult(null);
              setStatus('idle');
              setErrorMsg(null);
            }}
          />
        )}

        {/* Trust badges row, toujours visibles */}
        <ul className="mt-5 sm:mt-6 pt-5 border-t border-cream/80 grid grid-cols-3 gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
          <Badge icon={ShieldCheck} label="Sans engagement" />
          <Badge icon={FileText} label="Devis gratuit" />
          <Badge icon={Lock} label="Données privées" />
        </ul>
      </div>
    </div>
  );
}

function Badge({ icon: Icon, label }: { icon: typeof ShieldCheck; label: string }) {
  return (
    <li className="flex items-center gap-1 leading-tight">
      <Icon className="size-3.5 shrink-0" aria-hidden />
      <span className="truncate">{label}</span>
    </li>
  );
}

function CheckForm({
  zipId,
  honeyId,
  cp,
  errorMsg,
  onChange,
  onSubmit,
}: {
  zipId: string;
  honeyId: string;
  cp: string;
  errorMsg: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <h2 className="font-serif text-2xl sm:text-3xl text-navy leading-tight">
        Vérifiez votre éligibilité
      </h2>
      <p className="mt-1.5 text-sm text-slate">
        Réponse immédiate · 30 secondes · sans engagement
      </p>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor={honeyId}>Ne pas remplir</label>
        <input id={honeyId} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <MapPin
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate"
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
            autoComplete="postal-code"
            required
            placeholder="Votre code postal"
            value={cp}
            onChange={onChange}
            className="w-full min-h-[52px] pl-9 pr-3 rounded-md border-2 border-transparent bg-white text-base text-ink placeholder:text-slate/60 tabular-nums outline-none transition-all duration-300 ease-smooth focus:border-terracotta"
          />
        </div>
        <button
          type="submit"
          disabled={cp.length !== 5}
          className="inline-flex items-center justify-center gap-2 min-h-[52px] px-5 rounded-md bg-navy hover:bg-navy-deep text-cream font-semibold transition-all duration-300 ease-smooth disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
        >
          Vérifier
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>

      {errorMsg && (
        <p className="mt-3 text-sm text-terracotta-deep" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}

function RevealForm({
  phoneId,
  honeyId,
  covered,
  cityName,
  cp,
  status,
  errorMsg,
  onSubmit,
  onBack,
}: {
  phoneId: string;
  honeyId: string;
  covered: boolean;
  cityName: string;
  cp: string;
  status: Status;
  errorMsg: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}) {
  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor={honeyId}>Ne pas remplir</label>
        <input id={honeyId} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Message zone */}
      {covered ? (
        <div
          className="flex items-start gap-2 rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2.5 text-sm text-emerald-800 animate-fade-up"
          role="status"
        >
          <CheckCircle2 className="size-4 shrink-0 mt-0.5" aria-hidden />
          <p>
            Excellente nouvelle, nous intervenons à{' '}
            <span className="font-semibold">{cityName}</span>.
          </p>
        </div>
      ) : (
        <div
          className="flex items-start gap-2 rounded-md bg-amber-50 border border-amber-200 px-3 py-2.5 text-sm text-amber-900 animate-fade-up"
          role="status"
        >
          <AlertCircle className="size-4 shrink-0 mt-0.5" aria-hidden />
          <p>On ne couvre pas encore le {cp}. Laissez-nous votre tel, on vous prévient.</p>
        </div>
      )}

      <div className="mt-4 space-y-4 animate-fade-up">
        <div>
          <label htmlFor={phoneId} className="block text-sm font-medium text-slate mb-1.5">
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
            className="w-full min-h-[52px] px-4 rounded-md border-2 border-transparent bg-white text-base text-ink placeholder:text-slate/60 outline-none transition-all duration-300 ease-smooth focus:border-terracotta"
          />
        </div>

        {covered && (
          <div>
            <span className="block text-sm font-medium text-slate mb-1.5">
              Êtes-vous propriétaire&nbsp;?
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(['yes', 'no'] as const).map((val) => (
                <label
                  key={val}
                  className="relative flex items-center justify-center min-h-[48px] rounded-md border-2 border-cream bg-white/70 cursor-pointer transition-all duration-300 ease-smooth hover:bg-white has-[:checked]:border-terracotta has-[:checked]:bg-terracotta/10"
                >
                  <input
                    type="radio"
                    name="is_owner"
                    value={val}
                    required
                    className="sr-only"
                  />
                  <span className="font-medium text-navy">{val === 'yes' ? 'Oui' : 'Non'}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Si hors zone : on n'a pas la qualification propriétaire mais on garde l'event */}
        {!covered && <input type="hidden" name="is_owner" value="no" />}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-md bg-terracotta hover:bg-terracotta-deep text-cream font-semibold shadow-lg shadow-terracotta/20 transition-all duration-300 ease-smooth disabled:opacity-70 disabled:cursor-wait active:scale-[0.98]"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden /> Envoi…
            </>
          ) : covered ? (
            <>
              Obtenir mon devis gratuit
              <ArrowRight className="size-5" aria-hidden />
            </>
          ) : (
            <>
              Me prévenir quand vous arrivez
              <ArrowRight className="size-5" aria-hidden />
            </>
          )}
        </button>

        {errorMsg && (
          <p className="text-sm text-terracotta-deep" role="alert">
            {errorMsg}
          </p>
        )}

        <button
          type="button"
          onClick={onBack}
          className="block w-full text-xs text-slate hover:text-navy transition-colors underline underline-offset-4"
        >
          ← Modifier mon code postal
        </button>
      </div>
    </form>
  );
}
