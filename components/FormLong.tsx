'use client';

import { useState, useId } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { LeadSource } from '@/lib/validation';

type Props = {
  eyebrow: string;
  h2: string;
  sub: string;
  projectTypes: string[];
  budgets: string[];
  timings: string[];
  source: LeadSource;
  merciHref: string;
};

export function FormLong({
  eyebrow,
  h2,
  sub,
  projectTypes,
  budgets,
  timings,
  source,
  merciHref,
}: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ids = {
    name: useId(),
    email: useId(),
    phone: useId(),
    postal: useId(),
    project: useId(),
    budget: useId(),
    timing: useId(),
    honey: useId(),
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      source,
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      postal_code: String(fd.get('postal_code') ?? ''),
      is_owner: String(fd.get('is_owner') ?? '') === 'yes',
      project_type: String(fd.get('project_type') ?? ''),
      budget: String(fd.get('budget') ?? ''),
      timing: String(fd.get('timing') ?? ''),
      website: String(fd.get('website') ?? ''),
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('http');
      router.push(merciHref);
    } catch (err) {
      setError("Oups, l'envoi a échoué. Réessaie ou appelle-nous.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="form-long" className="section-pad bg-cream-warm/60">
      <div className="container-tight">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          {/* Colonne gauche : pitch */}
          <header className="lg:sticky lg:top-24">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl leading-[1.05] text-balance">
              {h2}
            </h2>
            <p className="mt-4 text-slate text-pretty">{sub}</p>
            <ul className="mt-6 space-y-2 text-sm text-slate">
              <li>✓ Devis détaillé sous 48 h</li>
              <li>✓ Visite technique gratuite</li>
              <li>✓ Aucune obligation d&apos;achat</li>
            </ul>
          </header>

          {/* Colonne droite : form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg border border-cream-warm p-6 sm:p-8 shadow-sm"
            noValidate
          >
            {/* Honeypot */}
            <div className="hidden" aria-hidden>
              <label htmlFor={ids.honey}>Ne pas remplir</label>
              <input
                id={ids.honey}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <Field id={ids.name} label="Nom et prénom" name="name" required autoComplete="name" />
              <Field
                id={ids.email}
                label="Email (optionnel)"
                name="email"
                type="email"
                autoComplete="email"
              />
              <Field
                id={ids.phone}
                label="Téléphone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="06 12 34 56 78"
              />
              <Field
                id={ids.postal}
                label="Code postal"
                name="postal_code"
                required
                inputMode="numeric"
                placeholder="13008"
              />

              <Select
                id={ids.project}
                label="Type de projet"
                name="project_type"
                options={projectTypes}
                required
              />
              <Select id={ids.budget} label="Budget estimé" name="budget" options={budgets} />
              <Select
                id={ids.timing}
                label="Quand souhaitez-vous démarrer ?"
                name="timing"
                options={timings}
                required
              />

              <div className="sm:col-span-1">
                <span className="block text-sm font-medium text-slate mb-1.5">
                  Êtes-vous propriétaire&nbsp;?
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(['yes', 'no'] as const).map((v) => (
                    <label
                      key={v}
                      className="relative flex items-center justify-center min-h-[48px] rounded-md border-2 border-cream-warm bg-cream/50 cursor-pointer transition-all hover:bg-cream-warm/60 has-[:checked]:border-terracotta has-[:checked]:bg-terracotta/10"
                    >
                      <input
                        type="radio"
                        name="is_owner"
                        value={v}
                        required
                        className="sr-only"
                      />
                      <span className="font-medium text-navy">
                        {v === 'yes' ? 'Oui' : 'Non'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full mt-6 disabled:opacity-70 disabled:cursor-wait"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden /> Envoi…
                </>
              ) : (
                <>
                  Recevoir mon devis gratuit
                  <ArrowRight className="size-5" aria-hidden />
                </>
              )}
            </button>

            {error && (
              <p className="mt-3 text-sm text-terracotta-deep" role="alert">
                {error}
              </p>
            )}

            <p className="mt-4 text-[11px] text-slate leading-snug">
              Vos données restent confidentielles. RGPD respecté.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  className = '',
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-slate mb-1.5">
        {label}
      </label>
      <input
        id={id}
        {...rest}
        className="w-full min-h-[48px] px-3.5 rounded-md border-2 border-cream-warm bg-cream/30 text-ink outline-none transition-all duration-300 ease-smooth focus:border-terracotta focus:bg-white"
      />
    </div>
  );
}

function Select({
  id,
  label,
  options,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate mb-1.5">
        {label}
      </label>
      <select
        id={id}
        {...rest}
        defaultValue=""
        className="w-full min-h-[48px] px-3.5 rounded-md border-2 border-cream-warm bg-cream/30 text-ink outline-none transition-all duration-300 ease-smooth focus:border-terracotta focus:bg-white"
      >
        <option value="" disabled>
          — Choisir —
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
