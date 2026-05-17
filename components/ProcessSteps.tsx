import type { ProcessStep } from '@/content/types';

type Props = {
  eyebrow: string;
  h2: string;
  steps: ProcessStep[];
};

export function ProcessSteps({ eyebrow, h2, steps }: Props) {
  return (
    <section className="section-pad bg-cream">
      <div className="container-wide">
        <header className="max-w-2xl mb-12 sm:mb-16">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-balance">
            {h2}
          </h2>
        </header>

        <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
          {/* Ligne décorative horizontale desktop */}
          <span
            className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-px bg-cream-warm"
            aria-hidden
          />
          {steps.map((step, i) => (
            <li key={step.number} className="relative">
              <div className="relative flex items-center justify-center size-14 mb-5 rounded-full bg-navy text-cream font-serif text-2xl shadow-md mx-auto lg:mx-0 z-10 ring-8 ring-cream">
                {step.number}
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-lg sm:text-xl text-navy mb-1.5">{step.title}</h3>
                <p className="text-sm text-slate leading-relaxed text-pretty">{step.body}</p>
                {step.duration && (
                  <p className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2 py-1 rounded">
                    {step.duration}
                  </p>
                )}
              </div>
              <span className="sr-only">Étape {i + 1} sur {steps.length}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
