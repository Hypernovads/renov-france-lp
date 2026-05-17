import { ZipGate } from './ZipGate';
import { client } from '@/content/client';
import type { LeadSource } from '@/lib/validation';

type Props = {
  /** Chip géo en haut (ex. "Marseille · Bouches-du-Rhône") */
  locationChip?: string;
  /** Partie normale du H1 avant l'accent (peut contenir des `\n` pour line breaks) */
  h1Lead: string;
  /** Partie italique terracotta-light avec variations Fraunces */
  h1Highlight: string;
  /** Partie normale du H1 après l'accent (avec underline déco terracotta) */
  h1Tail?: string;
  sub: string;
  /** Image de fond Unsplash (visible à droite via le dégradé latéral) */
  bgImage?: { src: string; alt: string } | null;
  source: LeadSource;
  merciHref: string;
};

export function Hero({
  locationChip,
  h1Lead,
  h1Highlight,
  h1Tail,
  sub,
  bgImage,
  source,
  merciHref,
}: Props) {
  return (
    <section
      className="relative isolate overflow-hidden text-cream"
      style={{
        minHeight: '92vh',
        backgroundColor: '#061A33',
        backgroundImage: bgImage
          ? `linear-gradient(95deg, rgba(14,43,78,0.92) 0%, rgba(14,43,78,0.65) 45%, rgba(14,43,78,0.15) 70%, rgba(14,43,78,0) 100%), url('${bgImage.src}')`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
      }}
    >
      {/* Mobile : dégradé un peu plus opaque pour lisibilité */}
      {bgImage && (
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            backgroundImage:
              'linear-gradient(105deg, rgba(14,43,78,0.92) 0%, rgba(14,43,78,0.7) 55%, rgba(14,43,78,0.45) 100%)',
          }}
          aria-hidden
        />
      )}

      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-[0.06] pointer-events-none mix-blend-overlay" aria-hidden />

      <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 py-12 sm:py-16 lg:py-24 items-center min-h-[92vh]">
        {/* ─── Colonne gauche : copy + KPIs ───────────────────── */}
        <div className="relative">
          {locationChip && (
            <div
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cream/20 bg-cream/10 mb-7 text-[13px] font-medium text-cream uppercase tracking-[0.05em]"
              style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
            >
              <span
                className="inline-block size-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse-green"
                aria-hidden
              />
              {locationChip}
            </div>
          )}

          <h1
            className="text-cream mb-6 font-normal sm:font-light leading-[0.98] sm:leading-[1.05]"
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {h1Lead.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
            {h1Highlight && (
              <>
                <br />
                <span className="italic-accent-light">{h1Highlight}</span>
              </>
            )}
            {h1Tail && (
              <>
                {' '}
                <span className="underline-deco">{h1Tail}</span>
              </>
            )}
          </h1>

          <p
            className="text-cream/85 max-w-[540px] mb-9 leading-relaxed"
            style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)' }}
          >
            {sub}
          </p>

          {/* 3 KPI stats serif */}
          <ul className="flex flex-wrap gap-x-8 gap-y-5">
            {client.heroKpis.map((kpi) => (
              <li key={kpi.label} className="flex flex-col gap-1">
                <span
                  className="font-serif text-cream leading-none"
                  style={{ fontSize: '32px', fontWeight: 500 }}
                >
                  <Stat value={kpi.value} />
                </span>
                <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.08em] text-cream/60 font-medium">
                  {kpi.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── Colonne droite : ZipGate ──────────────────────── */}
        <div className="lg:justify-self-end w-full" id="hero-form">
          <ZipGate source={source} merciHref={merciHref} />
        </div>
      </div>
    </section>
  );
}

/**
 * Découpe la value en (chiffres) + (suffix lettre/symbole) et affiche
 * le suffix plus petit en terracotta-light. Ex. "4500+" → "4500" + "+" / "10 ans" → "10" + "ans".
 */
function Stat({ value }: { value: string }) {
  const match = value.match(/^([\d,/.\s]+?)(\s?[a-zA-Z+%/]+)$/);
  if (!match) return <>{value}</>;
  return (
    <>
      {match[1]}
      <span
        className="text-terracotta-light align-baseline ml-0.5"
        style={{ fontSize: '16px' }}
      >
        {match[2].trim()}
      </span>
    </>
  );
}
