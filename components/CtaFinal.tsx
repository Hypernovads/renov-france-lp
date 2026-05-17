import { ArrowRight, Check } from 'lucide-react';

type TrustItem = string;

type Props = {
  eyebrow: string;
  h2Lead: string;
  /** Mot italic-accent terracotta-light (ex. "vous attend.") */
  h2Highlight?: string;
  sub: string;
  ctaLabel: string;
  /** 3 trust signals affichés en bas (ex. ["Sans engagement", "Réponse sous 24h", "Devis détaillé"]) */
  trustSignals?: TrustItem[];
  /** Cible du CTA (ancre vers le hero-form par défaut) */
  ctaHref?: string;
};

/**
 * CTA final — design mockup V3.
 * BG navy + 2 radial gradients décoratifs (terracotta 20% top-left, gold 15% bottom-right),
 * eyebrow centré + h2 grand light + sub + bouton primary + 3 trust signals row.
 */
export function CtaFinal({
  eyebrow,
  h2Lead,
  h2Highlight,
  sub,
  ctaLabel,
  trustSignals = [],
  ctaHref = '#form-long',
}: Props) {
  return (
    <section className="relative bg-navy text-cream overflow-hidden section-pad">
      {/* 2 radial gradients décoratifs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(194,105,63,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(201,168,117,0.15) 0%, transparent 50%)',
        }}
        aria-hidden
      />

      <div className="container-wide relative z-10 max-w-[900px] mx-auto text-center">
        <div className="flex justify-center">
          <span className="eyebrow eyebrow-light">{eyebrow}</span>
        </div>

        <h2
          className="mt-5 text-cream text-balance"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
          }}
        >
          {h2Lead}
          {h2Highlight && (
            <>
              <br />
              <span className="italic-accent-light">{h2Highlight}</span>
            </>
          )}
        </h2>

        <p className="mt-6 text-cream/80 max-w-[600px] mx-auto text-pretty leading-relaxed text-base sm:text-[18px]">
          {sub}
        </p>

        <div className="mt-10">
          <a href={ctaHref} className="btn-primary text-base px-9 py-4 min-h-[60px]">
            {ctaLabel}
            <ArrowRight className="size-[18px]" aria-hidden />
          </a>
        </div>

        {trustSignals.length > 0 && (
          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[13px] font-medium uppercase text-cream/60" style={{ letterSpacing: '0.06em' }}>
            {trustSignals.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-terracotta-light" strokeWidth={3} aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
