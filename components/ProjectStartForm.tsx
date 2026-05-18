'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowRight,
  Loader2,
  Sparkles,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Quote,
} from 'lucide-react';
import type { LeadSource } from '@/lib/validation';
import { client } from '@/content/client';

type Props = {
  source: LeadSource;
  merciHref: string;
};

type StyleValue = 'modern' | 'nature' | 'industrial' | 'classic';
type SurfaceValue = '<5' | '5-8' | '8-12' | '>12';
type SlotValue = 'morning' | 'afternoon' | 'evening' | 'any';
type Status = 'idle' | 'submitting' | 'error';

const u = (id: string, w = 200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const STYLES: {
  value: StyleValue;
  label: string;
  desc: string;
  img: string;
}[] = [
  {
    value: 'modern',
    label: 'Moderne',
    desc: 'Lignes épurées, marbre, laiton',
    img: u('photo-1620626011761-996317b8d101'),
  },
  {
    value: 'nature',
    label: 'Nature',
    desc: 'Bois clair, pierre, douceur',
    img: u('photo-1564540583246-934409427776'),
  },
  {
    value: 'industrial',
    label: 'Industriel',
    desc: 'Béton ciré, métal noir',
    img: u('photo-1584622650111-993a426fbf0a'),
  },
  {
    value: 'classic',
    label: 'Classique',
    desc: 'Marbre, raffinement',
    img: u('photo-1604014237800-1c9102c219da'),
  },
];

const SURFACES: { value: SurfaceValue; label: string }[] = [
  { value: '<5', label: '< 5 m²' },
  { value: '5-8', label: '5 — 8 m²' },
  { value: '8-12', label: '8 — 12 m²' },
  { value: '>12', label: '+ de 12 m²' },
];

const SLOTS: { value: SlotValue; label: string; sub: string }[] = [
  { value: 'morning', label: 'Matin', sub: '9h-12h' },
  { value: 'afternoon', label: 'Après-midi', sub: '12h-17h' },
  { value: 'evening', label: 'Soir', sub: '17h-19h' },
  { value: 'any', label: 'Peu importe', sub: '' },
];

/**
 * ProjectStartForm — composant central du hero LP3 (rénovation totale).
 *
 * Form premium 1-step adapté à la cible 35-55 propriétaires aisés.
 * Capture l'intention design en amont (style + surface) pour que le
 * designer arrive en visite avec un brief déjà cadré.
 *
 * Champs :
 * - 4 cards visuelles de style (Moderne / Nature / Industriel / Classique)
 * - 4 boutons surface SDB (< 5 / 5-8 / 8-12 / +12 m²)
 * - Nom + Tel
 * - Créneau de rappel (Matin / Aprem / Soir / Peu importe)
 *
 * UX :
 * - Plan B téléphone visible (capture les "préfère appeler")
 * - Réassurance "pas de harcèlement" en footer
 * - Mini témoignage discret pour crédibilité
 * - Bouton désactivé tant que tous les champs ne sont pas remplis
 *
 * Payload /api/lead enrichi :
 * - project_type : "Conception 3D — [style] / [surface]"
 * - raw.design_style, raw.surface, raw.rappel_slot
 */
export function ProjectStartForm({ source, merciHref }: Props) {
  const router = useRouter();
  const [style, setStyle] = useState<StyleValue | null>(null);
  const [surface, setSurface] = useState<SurfaceValue | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [slot, setSlot] = useState<SlotValue | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const nameId = useId();
  const phoneId = useId();
  const honeyId = useId();

  const complete = !!style && !!surface && !!name && !!phone && !!slot;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const fd = new FormData(e.currentTarget);
    const honey = String(fd.get('website') ?? '');
    const styleLabel = STYLES.find((s) => s.value === style)?.label ?? '';
    const surfaceLabel = SURFACES.find((s) => s.value === surface)?.label ?? '';

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          name,
          phone,
          postal_code: '', // pas demandé dans ce form, à recueillir au tel
          is_owner: true, // cible propriétaire aisée par défaut
          project_type: `Rénovation totale — ${styleLabel} / ${surfaceLabel}`,
          website: honey,
          raw: {
            design_style: style,
            surface,
            rappel_slot: slot,
          },
        }),
      });
      if (!res.ok) throw new Error('http');
      router.push(merciHref);
    } catch (err) {
      setStatus('error');
      setError("Oups, l'envoi a échoué. Réessayez ou appelez-nous directement.");
      console.error(err);
    }
  };

  return (
    <div className="relative w-full max-w-[460px]">
      {/* Trait déco terracotta en haut */}
      <div
        className="absolute -top-1 left-8 w-14 h-1 bg-terracotta rounded-full"
        aria-hidden
      />
      <div className="relative bg-cream rounded-3xl shadow-form-floating border border-white/50 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-7" noValidate>
          {/* Header */}
          <div className="text-center mb-5">
            <div
              className="inline-flex size-12 items-center justify-center rounded-2xl bg-terracotta text-cream mb-3 shadow-terracotta-sm"
              aria-hidden
            >
              <Sparkles className="size-6" />
            </div>
            <h2
              className="font-serif text-navy leading-tight"
              style={{ fontSize: '22px', fontWeight: 500, letterSpacing: '-0.01em' }}
            >
              Démarrer votre projet
            </h2>
            <p className="text-sm text-slate mt-1">
              Visite designer offerte chez vous · sans engagement
            </p>
          </div>

          {/* Honeypot anti-bot */}
          <div className="hidden" aria-hidden>
            <label htmlFor={honeyId}>Ne pas remplir</label>
            <input id={honeyId} type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Plan B téléphone */}
          <div className="text-center py-3 border-y border-navy/[0.08] mb-5">
            <p className="text-[11px] text-slate/80 mb-1">— ou si vous préférez —</p>
            <a
              href={client.phone.href}
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-navy hover:text-terracotta transition-colors tabular-nums"
            >
              <Phone className="size-4" aria-hidden />
              {client.phone.display}
            </a>
            <p className="text-[11px] text-slate/70 mt-0.5">parlez directement avec un designer</p>
          </div>

          {/* Style préféré */}
          <fieldset className="mb-4">
            <legend
              className="text-[11px] uppercase font-semibold text-slate mb-2 block w-full"
              style={{ letterSpacing: '0.08em' }}
            >
              Votre style préféré
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {STYLES.map((s) => {
                const active = style === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setStyle(s.value)}
                    className={[
                      'relative rounded-xl border-[1.5px] overflow-hidden transition-all duration-200 group text-left',
                      active
                        ? 'border-terracotta ring-2 ring-terracotta/30'
                        : 'border-navy/[0.10] hover:border-terracotta/40',
                    ].join(' ')}
                  >
                    <div className="relative aspect-[5/3] bg-cream-warm overflow-hidden">
                      <Image
                        src={s.img}
                        alt={s.label}
                        fill
                        sizes="200px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {active && (
                        <div className="absolute inset-0 bg-terracotta/30 flex items-center justify-center">
                          <CheckCircle2 className="size-7 text-cream drop-shadow-lg" aria-hidden />
                        </div>
                      )}
                    </div>
                    <div className="px-2.5 py-1.5 bg-white">
                      <p className={['text-[13px] font-semibold leading-tight', active ? 'text-terracotta-deep' : 'text-navy'].join(' ')}>
                        {s.label}
                      </p>
                      <p className="text-[10px] text-slate leading-tight mt-0.5 truncate">
                        {s.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Surface */}
          <fieldset className="mb-4">
            <legend
              className="text-[11px] uppercase font-semibold text-slate mb-2 block w-full"
              style={{ letterSpacing: '0.08em' }}
            >
              Surface de la salle de bain
            </legend>
            <div className="grid grid-cols-4 gap-1.5">
              {SURFACES.map((s) => {
                const active = surface === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSurface(s.value)}
                    className={[
                      'min-h-[44px] px-2 rounded-xl border-[1.5px] font-semibold text-[13px] transition-all duration-200',
                      active
                        ? 'border-terracotta bg-terracotta/[0.08] text-terracotta-deep'
                        : 'border-navy/[0.10] bg-white text-navy hover:border-terracotta/40',
                    ].join(' ')}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Nom + Tel */}
          <div className="space-y-2.5 mb-4">
            <div>
              <label htmlFor={nameId} className="sr-only">
                Nom et prénom
              </label>
              <input
                id={nameId}
                type="text"
                required
                placeholder="Nom et prénom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="w-full min-h-[48px] px-4 rounded-xl bg-white text-base text-ink placeholder:text-slate/60 outline-none border-[1.5px] border-navy/[0.12] transition-all duration-200 focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(194,105,63,0.1)]"
              />
            </div>
            <div>
              <label htmlFor={phoneId} className="sr-only">
                Téléphone
              </label>
              <input
                id={phoneId}
                type="tel"
                required
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                autoComplete="tel"
                className="w-full min-h-[48px] px-4 rounded-xl bg-white text-base text-ink placeholder:text-slate/60 outline-none border-[1.5px] border-navy/[0.12] transition-all duration-200 focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(194,105,63,0.1)]"
              />
            </div>
          </div>

          {/* Créneau de rappel */}
          <fieldset className="mb-5">
            <legend
              className="text-[11px] uppercase font-semibold text-slate mb-2 block w-full"
              style={{ letterSpacing: '0.08em' }}
            >
              Quand vous rappeler ?
            </legend>
            <div className="grid grid-cols-2 gap-1.5">
              {SLOTS.map((s) => {
                const active = slot === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSlot(s.value)}
                    className={[
                      'rounded-xl border-[1.5px] py-2.5 px-3 transition-all duration-200 text-left',
                      active
                        ? 'border-terracotta bg-terracotta/[0.08] text-terracotta-deep'
                        : 'border-navy/[0.10] bg-white text-navy hover:border-terracotta/40',
                    ].join(' ')}
                  >
                    <span className="block font-semibold text-[13px] leading-tight">
                      {s.label}
                    </span>
                    {s.sub && (
                      <span className="block text-[11px] text-slate mt-0.5">{s.sub}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* CTA */}
          <button
            type="submit"
            disabled={!complete || status === 'submitting'}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[56px] px-6 rounded-2xl bg-terracotta hover:bg-terracotta-deep text-cream font-semibold text-base shadow-terracotta-sm hover:shadow-terracotta-xl transition-all duration-300 ease-smooth disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            style={{ letterSpacing: '0.01em' }}
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden />
                Envoi…
              </>
            ) : (
              <>
                Démarrer mon projet
                <ArrowRight className="size-5" aria-hidden />
              </>
            )}
          </button>

          {error && (
            <p className="mt-3 text-sm text-terracotta-deep" role="alert">
              {error}
            </p>
          )}

          {/* Mini bullets de réassurance */}
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate font-medium">
            <li className="inline-flex items-center gap-1">
              <CheckCircle2 className="size-3 text-emerald-600" aria-hidden />
              Sans engagement
            </li>
            <li className="inline-flex items-center gap-1">
              <CheckCircle2 className="size-3 text-emerald-600" aria-hidden />
              Visite designer offerte
            </li>
            <li className="inline-flex items-center gap-1">
              <CheckCircle2 className="size-3 text-emerald-600" aria-hidden />
              Devis détaillé
            </li>
          </ul>

          {/* Mini témoignage discret */}
          <div className="mt-4 p-3 rounded-xl bg-cream-warm/40 border border-cream-warm/60 flex items-start gap-2.5">
            <Quote className="size-3.5 text-terracotta shrink-0 mt-1" aria-hidden />
            <p className="text-[12px] text-slate leading-snug italic">
              « L'étude design nous a convaincus. Le rendu final est{' '}
              <strong className="text-navy not-italic font-semibold">
                exactement conforme à ce qu'on avait imaginé
              </strong>
              . »
              <span className="block text-[10px] text-slate/70 not-italic mt-0.5">
                — Pauline & Marc T., Aix-en-Provence
              </span>
            </p>
          </div>
        </form>

        {/* Footer réassurance */}
        <div className="px-6 sm:px-7 pb-4 pt-1 text-center border-t border-navy/[0.06]">
          <p className="inline-flex items-center gap-1.5 text-[11px] text-slate/80 leading-snug">
            <ShieldCheck className="size-3 shrink-0" aria-hidden />
            <span>
              1 rappel humain à l’horaire de votre choix. Aucun harcèlement commercial.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
