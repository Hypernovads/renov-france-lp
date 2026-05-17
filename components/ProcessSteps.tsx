import { Clock, ShieldCheck } from 'lucide-react';
import type { ProcessStep } from '@/content/types';

type Props = {
  eyebrow: string;
  h2Lead: string;
  /** Mot italic-accent terracotta-light */
  h2Highlight?: string;
  /** Partie après le highlight (sur 2e ligne via `<br>` implicite) */
  h2Tail?: string;
  steps: ProcessStep[];
};

/**
 * Section "Comment ça marche" — design mockup V3.
 * BG navy + 2 radial gradients décoratifs (terracotta top-left, gold bottom-right),
 * 4 cards glassmorphism cream/04 backdrop-blur avec numéros italic 64px terracotta-light.
 */
export function ProcessSteps({ eyebrow, h2Lead, h2Highlight, h2Tail, steps }: Props) {
  return (
    <section className="section-pad bg-navy text-cream relative overflow-hidden">
      {/* Radial gradient terracotta top-left */}
      <div
        className="absolute -top-[200px] -left-[200px] size-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(194,105,63,0.15) 0%, transparent 60%)',
        }}
        aria-hidden
      />
      {/* Radial gradient gold bottom-right */}
      <div
        className="absolute -bottom-[200px] -right-[200px] size-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201,168,117,0.1) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="container-wide relative z-10">
        {/* Header centré */}
        <header className="max-w-[800px] mx-auto mb-14 sm:mb-16 text-center">
          <div className="flex justify-center">
            <span className="eyebrow eyebrow-light">{eyebrow}</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl text-cream text-balance leading-[1.1]">
            {h2Lead}
            {h2Highlight && (
              <>
                {' '}
                <span className="italic-accent-light">{h2Highlight}</span>
              </>
            )}
            {h2Tail && (
              <>
                <br />
                {h2Tail}
              </>
            )}
          </h2>
        </header>

        {/* Grid 4 steps glassmorphism */}
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {steps.map((step) => {
            const MetaIcon = step.metaIcon === 'shield' ? ShieldCheck : Clock;
            return (
              <li
                key={step.number}
                className="relative rounded-[20px] p-8 sm:p-9 bg-cream/[0.04] border border-cream/10 transition-all duration-400 ease-magazine hover:bg-cream/[0.08] hover:-translate-y-1 hover:border-terracotta/40"
                style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
              >
                <div
                  className="font-serif italic text-terracotta-light leading-none mb-4 inline-block"
                  style={{ fontSize: '64px', fontWeight: 300 }}
                >
                  {step.number}
                </div>
                <h3 className="text-cream text-xl sm:text-[22px] mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-cream/70 leading-[1.6] mb-4">{step.body}</p>
                {step.duration && (
                  <div
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase text-terracotta-light"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    <MetaIcon className="size-3.5" strokeWidth={2.5} aria-hidden />
                    {step.duration}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
