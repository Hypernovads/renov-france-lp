import { Check } from 'lucide-react';
import type { Pack } from '@/content/types';

type Props = {
  eyebrow: string;
  h2Lead: string;
  /** Mot italic-accent terracotta (ex. "vous choisissez.") */
  h2Highlight?: string;
  sub: string;
  packs: Pack[];
  /** Note italic discrète sous les cards */
  note?: string;
};

/**
 * Section "Vos options" — 3 packs avec durées chiffrées.
 *
 * Design délibérément DISCRET (demande Steve) :
 * - Section bg-white (cohérence alternance bleu/cream/blanc)
 * - Cards homogènes en cream/40 + border subtile, aucune card mise en avant
 * - Pas de "POPULAIRE" badge, pas de prix, pas de CTA bouton sur chaque card
 * - Note italic discrète en bas pour rassurer
 *
 * Objectif : clarifier que "1 jour" = pack Essentiel, sans tuer le hook hero.
 */
export function PacksSection({ eyebrow, h2Lead, h2Highlight, sub, packs, note }: Props) {
  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        {/* Header centré sobre */}
        <header className="max-w-[760px] mx-auto mb-12 sm:mb-14 text-center">
          <div className="flex justify-center">
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl text-balance">
            {h2Lead}
            {h2Highlight && (
              <>
                {' '}
                <span className="italic-accent">{h2Highlight}</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-[15px] sm:text-base text-slate leading-[1.7] max-w-[620px] mx-auto">
            {sub}
          </p>
        </header>

        {/* 3 cards homogènes */}
        <ul className="grid gap-4 sm:gap-5 sm:grid-cols-3 max-w-[1100px] mx-auto">
          {packs.map((pack, i) => {
            const isExtension = i > 0;
            return (
              <li
                key={pack.name}
                className="bg-cream/40 border border-navy/10 rounded-2xl p-6 sm:p-7 flex flex-col"
              >
                {/* Header card : nom + durée */}
                <div className="flex items-baseline justify-between gap-3 pb-4 mb-4 border-b border-navy/[0.08]">
                  <span
                    className="font-semibold text-navy uppercase text-[12px]"
                    style={{ letterSpacing: '0.15em' }}
                  >
                    {pack.name}
                  </span>
                  <span className="font-serif text-navy text-xl sm:text-[22px] leading-none">
                    {pack.duration}
                  </span>
                </div>

                {/* Pour Confort/Premium : précise "Tout d'Essentiel +" (élision FR si voyelle) */}
                {isExtension && (() => {
                  const prev = packs[i - 1].name;
                  const startsWithVowel = /^[AEIOUYHaeiouyh]/.test(prev);
                  const prefix = startsWithVowel ? "d'" : 'de ';
                  return (
                    <p
                      className="text-[11px] uppercase text-terracotta font-semibold mb-3"
                      style={{ letterSpacing: '0.08em' }}
                    >
                      Tout {prefix}
                      {prev} +
                    </p>
                  );
                })()}

                {/* Bullets prestations */}
                <ul className="space-y-2.5 flex-1">
                  {pack.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[14px] text-slate leading-[1.5]"
                    >
                      <Check
                        className="size-4 text-emerald-600 shrink-0 mt-0.5"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        {note && (
          <p className="mt-10 max-w-[680px] mx-auto text-center text-[13px] text-slate/80 italic leading-[1.6]">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
