import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/content/types';

type Props = {
  eyebrow: string;
  h2: string;
  items: Testimonial[];
};

export function Testimonials({ eyebrow, h2, items }: Props) {
  return (
    <section className="section-pad bg-cream">
      <div className="container-wide">
        <header className="max-w-2xl mb-10 sm:mb-14">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-balance">
            {h2}
          </h2>
        </header>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((t, i) => (
            <li
              key={t.name + i}
              className="relative bg-white rounded-lg border border-cream-warm p-6 sm:p-7 flex flex-col gap-4 transition-all duration-300 ease-smooth hover:border-terracotta/40 hover:-translate-y-1"
            >
              <Quote
                className="absolute top-4 right-4 size-8 text-terracotta/20"
                aria-hidden
              />
              <div className="flex gap-0.5" aria-label={`Note ${t.rating} sur 5`}>
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star
                    key={k}
                    className={`size-4 ${k < t.rating ? 'text-gold fill-gold' : 'text-cream-warm fill-cream-warm'}`}
                    aria-hidden
                  />
                ))}
              </div>
              <p className="text-ink leading-relaxed text-pretty">&laquo;&nbsp;{t.body}&nbsp;&raquo;</p>
              <footer className="mt-auto pt-3 border-t border-cream-warm/70">
                <p className="font-serif text-navy text-lg leading-tight">{t.name}</p>
                <p className="text-xs text-slate mt-0.5">
                  {t.city}
                  {t.realisation && <> · {t.realisation}</>}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
