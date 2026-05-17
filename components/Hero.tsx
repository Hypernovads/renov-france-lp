import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { ZipGate } from './ZipGate';
import type { LeadSource } from '@/lib/validation';

type Props = {
  h1: string;
  h1Highlight?: string;
  sub: string;
  bgImage: { src: string; alt: string };
  trustChips: string[];
  source: LeadSource;
  merciHref: string;
};

export function Hero({ h1, h1Highlight, sub, bgImage, trustChips, source, merciHref }: Props) {
  return (
    <section className="relative isolate min-h-[100svh] flex items-end sm:items-center overflow-hidden bg-navy-deep">
      {/* Background image */}
      <Image
        src={bgImage.src}
        alt={bgImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay dégradé navy → transparent gauche + assombrissement bas */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/70 to-navy-deep/30"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-deep/90 to-transparent sm:hidden"
        aria-hidden
      />
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-overlay pointer-events-none" aria-hidden />

      {/* Contenu */}
      <div className="container-wide relative z-10 grid sm:grid-cols-2 gap-10 sm:gap-12 pt-28 pb-10 sm:pt-32 sm:pb-24 items-end sm:items-center">
        {/* Colonne gauche : copy */}
        <div className="text-cream">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-cream text-balance">
            {h1}{' '}
            {h1Highlight && (
              <span className="text-terracotta-light italic">{h1Highlight}</span>
            )}
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-cream/85 max-w-xl text-pretty">
            {sub}
          </p>

          {/* Trust chips */}
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-cream/90">
            {trustChips.map((chip) => (
              <li key={chip} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-terracotta-light" aria-hidden />
                <span>{chip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne droite : ZipGate */}
        <div className="flex sm:justify-end">
          <ZipGate source={source} merciHref={merciHref} tone="dark" />
        </div>
      </div>
    </section>
  );
}
