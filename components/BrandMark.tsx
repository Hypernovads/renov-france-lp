import Link from 'next/link';
import { client } from '@/content/client';

type Props = {
  /** Variante : sur fond clair (default) ou inversée (logo cream, texte cream — pour footer) */
  inverted?: boolean;
};

/**
 * Logo + wordmark partagé header/footer.
 * Icône bathtub custom SVG dans carré navy, "BrandName." + dot terracotta en Fraunces 600.
 *
 * Quand le vrai logo client sera dispo, on swap pour `<Image src={client.logoSrc} />`.
 */
export function BrandMark({ inverted = false }: Props) {
  const markBg = inverted ? 'bg-cream text-navy' : 'bg-navy text-cream';
  const textColor = inverted ? 'text-cream' : 'text-navy';

  return (
    <Link
      href="/"
      aria-label={client.brandName}
      className="inline-flex items-center gap-2.5 group"
    >
      <span
        className={[
          'inline-flex size-9 sm:size-10 items-center justify-center rounded-lg shadow-sm',
          'transition-transform duration-300 ease-smooth group-hover:scale-105',
          markBg,
        ].join(' ')}
      >
        <BathtubIcon className="size-5 sm:size-[22px]" />
      </span>
      <span
        className={[
          'font-serif tracking-tight leading-none text-lg sm:text-xl',
          textColor,
        ].join(' ')}
        style={{ fontWeight: 600 }}
      >
        {client.brandName}
        <span className="text-terracotta">.</span>
      </span>
    </Link>
  );
}

function BathtubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 22h16" />
      <path d="M4 22V10c0-1 1-2 2-2h12c1 0 2 1 2 2v12" />
      <path d="M8 22V14" />
      <path d="M16 22V14" />
      <circle cx="12" cy="5" r="2" />
    </svg>
  );
}
