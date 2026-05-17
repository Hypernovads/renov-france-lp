import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
  text: string;
  href?: string;
};

export function AnnouncementBar({ text, href }: Props) {
  const inner = (
    <div className="container-wide flex items-center justify-center gap-2 py-2.5 text-center text-xs sm:text-sm font-medium tracking-wide text-cream">
      <span className="text-pretty">{text}</span>
      {href && <ArrowRight className="size-3.5 shrink-0" aria-hidden />}
    </div>
  );

  return (
    <div className="relative bg-navy-deep text-cream overflow-hidden grain-overlay">
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
