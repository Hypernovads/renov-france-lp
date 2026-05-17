import Image from 'next/image';
import { ZipGate } from './ZipGate';
import { client } from '@/content/client';
import type { LeadSource } from '@/lib/validation';

type Props = {
  locationChip?: string;
  h1Lead: string;
  h1Highlight: string;
  h1Tail?: string;
  sub: string;
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
    <section className="relative isolate overflow-hidden bg-navy-deep text-cream grain-overlay">
      {/* Background image optionnelle (par défaut : navy plein, look V2) */}
      {bgImage && (
        <>
          <Image
            src={bgImage.src}
            alt={bgImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/95 to-navy-deep/60"
            aria-hidden
          />
        </>
      )}

      {/* Tâche colorée décorative subtile */}
      <div
        className="absolute -top-32 -left-32 size-[28rem] rounded-full bg-terracotta/10 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="container-wide relative z-10 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 pt-12 pb-16 sm:pt-16 sm:pb-24 lg:py-28 items-center">
        {/* Colonne gauche : copy + KPIs */}
        <div>
          {locationChip && (
            <div className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 mb-6 sm:mb-8 text-xs sm:text-sm font-medium tracking-wide text-cream/90">
              <span className="relative inline-flex items-center justify-center" aria-hidden>
                <span className="absolute inline-flex size-2 rounded-full bg-emerald-400 opacity-70 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="uppercase tracking-[0.14em]">{locationChip}</span>
            </div>
          )}

          <h1 className="font-serif text-cream leading-[1.02] text-balance text-[2.5rem] sm:text-6xl lg:text-[5rem]">
            <span className="block">{h1Lead}</span>
            <span className="inline italic text-terracotta-light decoration-terracotta/60 decoration-[6px] sm:decoration-[8px] underline underline-offset-[6px] [text-decoration-skip-ink:none]">
              {h1Highlight}
            </span>
            {h1Tail && <span> {h1Tail}</span>}
          </h1>

          <p className="mt-6 sm:mt-7 text-base sm:text-lg text-cream/85 max-w-xl text-pretty">
            {sub}
          </p>

          {/* 3 KPI stats */}
          <ul className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl">
            {client.heroKpis.map((kpi) => (
              <li key={kpi.label} className="flex flex-col">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream leading-none">
                  {/* Suffix en plus petit (ex. "ans", "+", "/5") détecté visuellement */}
                  <Stat value={kpi.value} />
                </span>
                <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.14em] text-cream/55 leading-tight">
                  {kpi.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne droite : ZipGate */}
        <div className="flex lg:justify-end">
          <ZipGate source={source} merciHref={merciHref} />
        </div>
      </div>
    </section>
  );
}

/**
 * Découpe le `value` en (chiffres) + (suffix lettre/symbole) et affiche
 * le suffix en plus petit. Ex. "4500+" → "4500" + "+" / "10 ans" → "10" + "ans".
 */
function Stat({ value }: { value: string }) {
  const match = value.match(/^([\d,/.\s]+?)(\s?[a-zA-Z+%/]+)$/);
  if (!match) return <>{value}</>;
  return (
    <>
      {match[1]}
      <span className="text-base sm:text-lg align-baseline text-cream/60 ml-0.5 font-sans tracking-normal">
        {match[2].trim()}
      </span>
    </>
  );
}
