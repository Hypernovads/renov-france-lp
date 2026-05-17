import Link from 'next/link';

type Props = {
  prefix?: string;
  highlight?: string;
  text: string;
  /** Affiche le dot vert pulsant en tête */
  withDot?: boolean;
  href?: string;
};

export function AnnouncementBar({ prefix, highlight, text, withDot, href }: Props) {
  const inner = (
    <div className="container-wide flex items-center justify-center gap-2 py-2.5 text-center text-[13px] text-cream/95">
      {withDot && (
        <span
          className="inline-block size-1.5 rounded-full bg-emerald-400 shrink-0 mr-0.5 animate-pulse-green"
          aria-hidden
        />
      )}
      <p className="text-pretty leading-snug">
        {prefix && <span>{prefix} </span>}
        {highlight && (
          <strong className="text-terracotta-light font-semibold">{highlight}</strong>
        )}
        {highlight && <span> </span>}
        <span>{text}</span>
      </p>
    </div>
  );

  return (
    <div className="bg-navy-deep text-cream">
      {href ? (
        <Link
          href={href}
          className="block hover:bg-navy transition-colors duration-300 ease-smooth"
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}
