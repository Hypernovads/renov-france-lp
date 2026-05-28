import { ArrowRight, Check } from 'lucide-react';
import type { EligibilityTranche } from '@/content/types';

type Props = {
  eyebrow: string;
  h2: string;
  h2Highlight?: string;
  intro?: string;
  tranches: EligibilityTranche[];
  conditions: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Section "Êtes-vous éligible ?" (LP2 MaPrimeAdapt').
 * 3 tranches d'âge claires (façon EcoShower) + conditions communes.
 * Le visiteur se situe immédiatement, puis est invité à vérifier précisément.
 */
export function EligibilitySection({
  eyebrow,
  h2,
  h2Highlight,
  intro,
  tranches,
  conditions,
  ctaLabel,
  ctaHref = '#hero-form',
}: Props) {
  return (
    <section className="section-pad bg-cream">
      <div className="container-tight">
        <header className="max-w-[720px] mb-10 sm:mb-14">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-balance">
            <HighlightedH2 text={h2} highlight={h2Highlight} />
          </h2>
          {intro && <p className="mt-4 text-slate text-pretty leading-relaxed">{intro}</p>}
        </header>

        {/* 3 tranches d'âge */}
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {tranches.map((t, i) => (
            <li
              key={t.age}
              className="relative rounded-[20px] bg-white border border-navy/[0.06] p-6 sm:p-7 overflow-hidden transition-all duration-400 ease-magazine hover:-translate-y-1 hover:shadow-card-soft"
            >
              <span
                className="absolute top-0 left-0 h-1 w-full bg-terracotta/80"
                aria-hidden
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-terracotta">
                Profil {i + 1}
              </span>
              <p className="mt-3 font-serif text-[1.9rem] sm:text-[2.1rem] leading-none text-navy">
                {t.age}
              </p>
              <p className="mt-3 text-sm text-slate leading-relaxed text-pretty">
                {t.condition}
              </p>
            </li>
          ))}
        </ul>

        {/* Conditions communes */}
        {conditions.length > 0 && (
          <div className="mt-6 rounded-[20px] bg-navy text-cream p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-terracotta-light mb-4">
              Et dans tous les cas
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {conditions.map((c) => (
                <li key={c} className="flex items-start gap-3 text-cream/90">
                  <Check className="size-5 shrink-0 text-terracotta-light mt-0.5" aria-hidden />
                  <span className="text-sm leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {ctaLabel && (
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <a href={ctaHref} className="btn-primary text-sm sm:text-base">
              <span>{ctaLabel}</span>
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </a>
            <p className="text-sm text-slate">
              30 secondes, sans engagement — et c&apos;est nous qui montons le dossier.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function HighlightedH2({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className="italic-accent">{highlight}</span>
      {after}
    </>
  );
}
