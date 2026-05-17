import Image from 'next/image';
import type { Image as ImageData } from '@/content/types';

type Props = {
  eyebrow: string;
  h2: string;
  images: ImageData[];
};

/**
 * Composition magazine asymétrique : grille 6 colonnes, tailles variables.
 * Mobile : 2 colonnes simples.
 */
export function Gallery({ eyebrow, h2, images }: Props) {
  return (
    <section className="section-pad bg-cream">
      <div className="container-wide">
        <header className="max-w-2xl mb-10 sm:mb-14">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-balance">
            {h2}
          </h2>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-6 auto-rows-[180px] sm:auto-rows-[200px] lg:auto-rows-[220px] gap-3 sm:gap-4">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={[
                'relative overflow-hidden rounded-md bg-cream-warm group',
                // Pattern asymétrique sur desktop, simple sur mobile
                LAYOUT[i % LAYOUT.length],
              ].join(' ')}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6 cellules pour cycler sur une grille de 6 colonnes
const LAYOUT = [
  'lg:col-span-3 lg:row-span-2', // grande à gauche
  'lg:col-span-2',
  'lg:col-span-1 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
];
