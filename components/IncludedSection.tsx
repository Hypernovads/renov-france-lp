import { Check } from 'lucide-react';
import type { IncludedItem } from '@/content/types';
import { getIcon } from './icons';

type Props = {
  eyebrow: string;
  h2: string;
  intro?: string;
  items: IncludedItem[];
};

export function IncludedSection({ eyebrow, h2, intro, items }: Props) {
  return (
    <section className="section-pad bg-cream-warm/60">
      <div className="container-tight">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
          {/* Colonne gauche : intro sticky */}
          <header className="lg:sticky lg:top-24">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl leading-[1.1] text-balance">{h2}</h2>
            {intro && <p className="mt-4 text-slate text-pretty">{intro}</p>}
          </header>

          {/* Colonne droite : liste */}
          <ul className="space-y-3">
            {items.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <li
                  key={item.title}
                  className="group flex gap-4 sm:gap-5 rounded-md bg-white border border-cream-warm p-4 sm:p-5 transition-all duration-300 ease-smooth hover:border-terracotta/40 hover:shadow-md"
                >
                  <div className="shrink-0 inline-flex size-10 sm:size-11 items-center justify-center rounded-md bg-navy text-cream transition-colors duration-300 group-hover:bg-terracotta">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg text-navy mb-1 flex items-baseline gap-2 flex-wrap">
                      <Check className="size-4 text-terracotta shrink-0" aria-hidden />
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-sm text-slate leading-relaxed text-pretty">{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
