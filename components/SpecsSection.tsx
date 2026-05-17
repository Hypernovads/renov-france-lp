import type { SpecItem } from '@/content/types';

type Props = {
  eyebrow: string;
  h2: string;
  items: SpecItem[];
};

export function SpecsSection({ eyebrow, h2, items }: Props) {
  return (
    <section className="section-pad bg-cream-warm/60">
      <div className="container-tight">
        <header className="max-w-2xl mb-8 sm:mb-10">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl leading-[1.1] text-balance">{h2}</h2>
        </header>

        <dl className="divide-y divide-cream-warm border-y border-cream-warm">
          {items.map((spec) => (
            <div
              key={spec.label}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_2fr] gap-4 py-4 sm:py-5 items-baseline"
            >
              <dt className="text-sm sm:text-base text-slate font-medium">{spec.label}</dt>
              <dd className="text-right sm:text-left font-serif text-base sm:text-lg text-navy">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
