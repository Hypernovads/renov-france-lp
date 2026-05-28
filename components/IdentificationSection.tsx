import { ArrowRight } from 'lucide-react';
import type { IdentificationItem } from '@/content/types';
import { getIcon } from './icons';

type Props = {
  eyebrow: string;
  h2: string;
  /** Substring du h2 à mettre en italic-accent terracotta */
  h2Highlight?: string;
  intro?: string;
  items: IdentificationItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Section "Vous vous reconnaissez ?" (LP2 MaPrimeAdapt').
 * Identification émotionnelle : le visiteur se projette dans une situation,
 * puis est rassuré et invité à vérifier son éligibilité.
 * Cards blanches sur fond cream-warm, chaque card = une situation + une réassurance.
 */
export function IdentificationSection({
  eyebrow,
  h2,
  h2Highlight,
  intro,
  items,
  ctaLabel,
  ctaHref = '#hero-form',
}: Props) {
  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        <header className="max-w-[760px] mx-auto mb-10 sm:mb-14 text-center">
          <div className="flex justify-center">
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] text-balance">
            <HighlightedH2 text={h2} highlight={h2Highlight} />
          </h2>
          {intro && (
            <p className="mt-5 text-base sm:text-lg text-slate leading-relaxed max-w-[620px] mx-auto">
              {intro}
            </p>
          )}
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li
                key={item.situation}
                className="group flex flex-col rounded-[20px] bg-cream-warm/40 border border-navy/[0.06] p-6 sm:p-7 transition-all duration-400 ease-magazine hover:bg-cream-warm/70 hover:-translate-y-1 hover:shadow-card-soft"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-[14px] bg-navy text-cream mb-5 transition-colors duration-300 group-hover:bg-terracotta">
                  <Icon className="size-6" aria-hidden />
                </div>
                <p className="font-serif text-xl sm:text-[1.35rem] text-navy leading-snug mb-3">
                  {item.situation}
                </p>
                <p className="text-sm text-slate leading-relaxed text-pretty mt-auto">
                  {item.reassurance}
                </p>
              </li>
            );
          })}
        </ul>

        {ctaLabel && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <a href={ctaHref} className="btn-primary text-sm sm:text-base">
              <span>{ctaLabel}</span>
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </a>
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
