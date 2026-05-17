'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/content/types';

type Props = {
  eyebrow: string;
  h2: string;
  items: FaqItem[];
};

export function FaqAccordion({ eyebrow, h2, items }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="section-pad bg-cream">
      <div className="container-tight">
        <header className="max-w-2xl mb-10 sm:mb-12">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-balance">
            {h2}
          </h2>
        </header>

        <ul className="divide-y divide-cream-warm border-y border-cream-warm">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 py-5 sm:py-6 text-left group min-h-[56px]"
                >
                  <span className="font-serif text-lg sm:text-xl text-navy flex-1 text-pretty">
                    {item.q}
                  </span>
                  <span
                    className={[
                      'shrink-0 size-9 inline-flex items-center justify-center rounded-full border border-cream-warm bg-cream-warm/40',
                      'transition-all duration-300 ease-smooth',
                      isOpen ? 'rotate-180 bg-terracotta border-terracotta text-cream' : 'text-navy',
                    ].join(' ')}
                    aria-hidden
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </button>
                <div
                  className={[
                    'grid transition-all duration-400 ease-smooth',
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0',
                  ].join(' ')}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate leading-relaxed text-pretty max-w-3xl pr-12">
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
