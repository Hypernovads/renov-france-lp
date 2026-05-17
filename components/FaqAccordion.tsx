'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { FaqItem } from '@/content/types';

type Props = {
  eyebrow: string;
  h2Lead: string;
  /** Mot italic-accent terracotta (ex. "savoir.") */
  h2Highlight?: string;
  items: FaqItem[];
};

/**
 * FAQ accordion — design mockup V3.
 * Items rounded-2xl bg-white, hover border terracotta soft, open : border terracotta + shadow.
 * Toggle "+" terracotta dans rond cream qui passe en navy/cream et rotate-45° (=> "×") quand open.
 * Question Fraunces 18px navy, answer max-height transition smooth.
 *
 * Comportement : un seul item ouvert à la fois (collapse les autres).
 */
export function FaqAccordion({ eyebrow, h2Lead, h2Highlight, items }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="section-pad bg-cream">
      <div className="max-w-[820px] mx-auto px-5 sm:px-12">
        <header className="mb-14 sm:mb-16 text-center">
          <div className="flex justify-center">
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl text-balance">
            {h2Lead}
            {h2Highlight && (
              <>
                {' '}
                <span className="italic-accent">{h2Highlight}</span>
              </>
            )}
          </h2>
        </header>

        <ul className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <li
                key={item.q}
                className={[
                  'rounded-2xl bg-white overflow-hidden border transition-all duration-300',
                  isOpen
                    ? 'border-terracotta shadow-[0_12px_32px_rgba(14,43,78,0.08)]'
                    : 'border-transparent hover:border-terracotta/20',
                ].join(' ')}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-5 text-left py-6 px-7 min-h-[64px]"
                >
                  <span className="font-serif text-navy text-lg sm:text-[19px] leading-[1.3] text-pretty">
                    {item.q}
                  </span>
                  <span
                    className={[
                      'shrink-0 inline-flex items-center justify-center size-9 rounded-full transition-all duration-300 ease-magazine',
                      isOpen
                        ? 'bg-terracotta text-cream'
                        : 'bg-cream text-terracotta',
                    ].join(' ')}
                    aria-hidden
                  >
                    <Plus
                      className="size-4 transition-transform duration-300 ease-magazine"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                      strokeWidth={2.5}
                    />
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-magazine"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="text-[15px] text-slate leading-[1.7] px-7 pb-7 text-pretty">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
