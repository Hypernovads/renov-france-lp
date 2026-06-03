import Image from 'next/image';
import type { Image as ImageData } from '@/content/types';

type Props = {
  eyebrow: string;
  h2: string;
  images: ImageData[];
};

/**
 * Galerie « magazine » : 1 photo hero pleine largeur + grille uniforme dessous.
 *
 * Layout :
 * - Hero (1ʳᵉ image) : pleine largeur, aspect 16/7 desktop · 4/3 mobile.
 * - Grille du reste (auto-rows même hauteur) :
 *   - Desktop : 3 colonnes (2 rangées de 3 → 6 thumbnails → idéal pour 7 images au total).
 *   - Mobile : 2 colonnes (rangées multiples).
 *
 * → Forme un rectangle propre, cohérent desktop + mobile, sans cellule orpheline.
 */
export function Gallery({ eyebrow, h2, images }: Props) {
  if (!images || images.length === 0) return null;

  const [hero, ...thumbs] = images;

  return (
    <section id="gallery" className="section-pad bg-cream">
      <div className="container-wide">
        <header className="max-w-2xl mb-10 sm:mb-14">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-balance">
            {h2}
          </h2>
        </header>

        {/* Hero image — pleine largeur */}
        <div className="relative overflow-hidden rounded-md bg-cream-warm group aspect-[4/3] sm:aspect-[16/7] mb-3 sm:mb-4">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.02]"
          />
        </div>

        {/* Grille uniforme — 2 col mobile, 3 col desktop */}
        {thumbs.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {thumbs.map((img) => (
              <div
                key={img.src}
                className="relative overflow-hidden rounded-md bg-cream-warm group aspect-[4/3]"
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
        )}
      </div>
    </section>
  );
}
