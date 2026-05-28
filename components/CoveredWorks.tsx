import Image from 'next/image';
import type { PromiseItem, Image as ImageData } from '@/content/types';
import { getIcon } from './icons';

type Props = {
  eyebrow: string;
  h2: string;
  /** Substring du h2 à mettre en italic-accent terracotta */
  h2Highlight?: string;
  intro?: string;
  items: PromiseItem[];
  /** Photo de réalisation (split visuel) */
  image: ImageData;
  /** Légende flottante sur l'image (ex. "Réalisation — Bouches-du-Rhône") */
  imageCaption?: string;
  /** Côté de l'image sur desktop : 'left' (défaut) ou 'right' (pour alterner / quinconce) */
  imageSide?: 'left' | 'right';
};

/**
 * "Travaux couverts" — split image + liste aérée (LP2).
 * Une grande photo réelle + la liste des travaux financés à côté.
 * La diversité (SDB, douche, WC, monte-escalier) est portée par la LISTE,
 * pas par une grille d'images. Sobre, aéré, façon EcoShower.
 * `imageSide` permet d'alterner le sens (rythme quinconce sur la page).
 */
export function CoveredWorks({
  eyebrow,
  h2,
  h2Highlight,
  intro,
  items,
  image,
  imageCaption,
  imageSide = 'left',
}: Props) {
  return (
    <section className="section-pad bg-cream">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ─── Image ─────────────────────────────────────── */}
          <div className={`relative ${imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-[24px] overflow-hidden shadow-card-deep">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/70 to-transparent"
                aria-hidden
              />
              {imageCaption && (
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-cream/95 text-navy text-[13px] font-semibold shadow-sm">
                  <span className="size-1.5 rounded-full bg-terracotta" aria-hidden />
                  {imageCaption}
                </span>
              )}
            </div>
          </div>

          {/* ─── Liste des travaux ─────────────────────────── */}
          <div className={imageSide === 'right' ? 'lg:order-1' : 'lg:order-2'}>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] text-balance">
              <HighlightedH2 text={h2} highlight={h2Highlight} />
            </h2>
            {intro && (
              <p className="mt-4 text-slate leading-relaxed text-pretty max-w-xl">{intro}</p>
            )}

            <ul className="mt-8 space-y-5">
              {items.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <li key={item.title} className="flex gap-4">
                    <div className="shrink-0 inline-flex size-11 items-center justify-center rounded-[12px] bg-navy text-cream">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3 className="text-lg text-navy leading-tight">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate leading-relaxed text-pretty">
                        {item.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
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
