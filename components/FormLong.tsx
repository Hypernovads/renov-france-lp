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
  source: LeadSource;
  merciHref: string;
};

/**
 * Form long du bas de page — version slim (4 champs).
 *
 * Rationale CRO : le ZipGate hero capture déjà CP + tel + propriétaire (+ city).
 * Demander encore 8 champs ici tue la complétion (60% drop). On garde 4 champs
 * essentiels au rappel commercial : Nom, Tel, CP, Type de projet.
 *
 * Budget et timing se demandent au téléphone (qualif commercial naturelle).
 */
export function FormLong({
  eyebrow,
  h2,
  sub,
  projectTypes,
  source,
  merciHref,
}: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ids = {
    name: useId(),
    phone: useId(),
    postal: useId(),
    project: useId(),
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
      phone: String(fd.get('phone') ?? ''),
      postal_code: String(fd.get('postal_code') ?? ''),
      project_type: String(fd.get('project_type') ?? ''),
      is_owner: true, // assumé par défaut sur le form long (la qualif owner est ailleurs)
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
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl leading-[1.05] text-balance">
              {h2}
            </h2>
            <p className="mt-4 text-slate text-pretty">{sub}</p>
            <ul className="mt-6 space-y-2 text-sm text-slate">
              <li>✓ Rappel sous 24 h ouvrées</li>
              <li>✓ Visite technique gratuite</li>
              <li>✓ Aucune obligation d&apos;achat</li>
            </ul>
          </header>

          {/* Colonne droite : form 4 champs */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-cream-warm p-6 sm:p-8 shadow-card-soft"
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
              <Field
                id={ids.name}
                label="Nom et prénom"
                name="name"
                required
                autoComplete="name"
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
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2.5 min-h-[56px] px-6 rounded-2xl bg-terracotta hover:bg-terracotta-deep text-cream font-semibold text-base shadow-terracotta-sm hover:shadow-terracotta-xl transition-all duration-300 ease-smooth disabled:opacity-60 disabled:cursor-wait hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] mt-6"
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
              Vos données restent confidentielles. RGPD respecté. Le budget et le délai sont
              discutés au téléphone, sans engagement.
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
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold text-slate uppercase tracking-[0.06em] mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        {...rest}
        className="w-full min-h-[48px] px-3.5 rounded-xl border-[1.5px] border-navy/[0.12] bg-white text-ink outline-none transition-all duration-250 focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(194,105,63,0.1)]"
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
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold text-slate uppercase tracking-[0.06em] mb-1.5"
      >
        {label}
      </label>
      <select
        id={id}
        {...rest}
        defaultValue=""
        className="w-full min-h-[48px] px-3.5 rounded-xl border-[1.5px] border-navy/[0.12] bg-white text-ink outline-none transition-all duration-250 focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(194,105,63,0.1)]"
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
