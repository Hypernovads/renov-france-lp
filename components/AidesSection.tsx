import { Euro, PiggyBank, Receipt, HandCoins } from 'lucide-react';
import type { AideItem } from '@/content/types';

type Props = {
  eyebrow: string;
  h2: string;
  intro: string;
  items: AideItem[];
};

const ROTATION_ICONS = [Euro, PiggyBank, Receipt, HandCoins];

export function AidesSection({ eyebrow, h2, intro, items }: Props) {
  return (
    <section className="section-pad bg-navy text-cream relative overflow-hidden grain-overlay">
      {/* Tâche colorée décorative */}
      <div
        className="absolute -top-32 -right-32 size-96 rounded-full bg-terracotta/20 blur-3xl"
        aria-hidden
      />

      <div className="container-tight relative z-10">
        <header className="max-w-2xl mb-10 sm:mb-12">
          <span className="eyebrow text-terracotta-light">{eyebrow}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-cream text-balance">
            {h2}
          </h2>
          <p className="mt-4 text-cream/80 text-pretty">{intro}</p>
        </header>

        <ul className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {items.map((aide, i) => {
            const Icon = ROTATION_ICONS[i % ROTATION_ICONS.length];
            return (
              <li
                key={aide.name}
                className="relative rounded-lg bg-navy-deep/70 backdrop-blur-sm border border-white/10 p-5 sm:p-6 transition-all duration-300 ease-smooth hover:border-terracotta-light/40"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 inline-flex size-11 items-center justify-center rounded-md bg-terracotta text-cream">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg text-cream mb-1">{aide.name}</h3>
                    <p className="font-serif text-2xl text-terracotta-light leading-none mb-2">
                      {aide.amount}
                    </p>
                    <p className="text-sm text-cream/75 leading-relaxed text-pretty">
                      {aide.body}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-xs text-cream/55 max-w-xl leading-relaxed">
          Aides indicatives, soumises à conditions d&apos;éligibilité. Nos conseillers
          montent le dossier complet avec vous (gratuit, sans engagement).
        </p>
      </div>
    </section>
  );
}
