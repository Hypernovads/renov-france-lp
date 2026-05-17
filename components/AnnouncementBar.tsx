import Link from 'next/link';

type Props = {
  prefix?: string;
  highlight?: string;
  text: string;
  withDot?: boolean;
  href?: string;
};

export function AnnouncementBar({ prefix, highlight, text, withDot, href }: Props) {
  const inner = (
    <div className="container-wide flex items-center justify-center gap-2 py-2.5 text-center text-xs sm:text-sm text-navy">
      {withDot && (
        <span className="relative inline-flex items-center justify-center shrink-0" aria-hidden>
          <span className="absolute inline-flex size-2 rounded-full bg-emerald-500 opacity-70 animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
      )}
      <p className="text-pretty">
        {prefix && <span className="mr-1">{prefix}</span>}
        {highlight && (
          <span className="font-semibold text-terracotta-deep">{highlight}</span>
        )}
        {highlight && <span> </span>}
        <span className="text-slate">{text}</span>
      </p>
    </div>
  );

  return (
    <div className="bg-cream-warm/70 border-b border-cream-warm">
      {href ? (
        <Link
          href={href}
          className="block hover:bg-cream-warm transition-colors duration-300 ease-smooth"
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}
