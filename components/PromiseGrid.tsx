import type { PromiseItem } from '@/content/types';
import { getIcon } from './icons';

type Props = {
  eyebrow: string;
  h2: string;
  /** Mot/expression à mettre en italic-accent terracotta dans le h2 (substring match) */
  h2Highlight?: string;
  intro?: string;
  items: PromiseItem[];
};

/**
 * Section "Notre promesse" — design mockup V3.
 * Header centré (eyebrow + h2 avec italic-accent + intro), 4 cards blanches
 * rounded-2xl avec hover : translateY + bar verticale terracotta gauche grow + icône rotate.
 */
export function PromiseGrid({ eyebrow, h2, h2Highlight, intro, items }: Props) {
  return (
    <section className="section-pad bg-cream relative overflow-hidden">
      <div className="container-wide">
        {/* Header centré */}
        <header className="max-w-[900px] mx-auto mb-12 sm:mb-16 text-center">
          <div className="flex justify-center">
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl text-balance">
            <HighlightedH2 text={h2} highlight={h2Highlight} />
          </h2>
          {intro && (
            <p className="mt-5 text-base sm:text-lg text-slate leading-relaxed max-w-[600px] mx-auto">
              {intro}
            </p>
          )}
        </header>

        {/* Grid 4 cards */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li
                key={item.title}
                className="group relative bg-white rounded-[20px] p-7 sm:p-8 border border-navy/[0.06] overflow-hidden transition-all duration-400 ease-magazine hover:-translate-y-1.5 hover:shadow-card-deep"
              >
                {/* Barre verticale terracotta qui grandit au hover */}
                <span
                  className="absolute top-0 left-0 w-1 h-0 bg-terracotta transition-all duration-400 ease-magazine group-hover:h-full"
                  aria-hidden
                />

                <div className="inline-flex size-14 items-center justify-center rounded-[14px] bg-navy text-cream mb-6 transition-all duration-400 ease-magazine group-hover:bg-terracotta group-hover:-rotate-6 group-hover:scale-105">
                  <Icon className="size-7" aria-hidden />
                </div>

                <h3 className="text-xl sm:text-[22px] text-navy mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed text-pretty">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * Si h2 contient highlight, rend la portion correspondante en .italic-accent.
 * Sinon, rend le h2 tel quel.
 */
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
