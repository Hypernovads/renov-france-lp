import Link from 'next/link';
import { Phone } from 'lucide-react';
import { client } from '@/content/client';

type Variant = 'transparent' | 'solid';

type Props = {
  variant?: Variant;
};

export function Header({ variant = 'transparent' }: Props) {
  const isTransparent = variant === 'transparent';

  return (
    <header
      className={[
        'absolute inset-x-0 top-0 z-30',
        isTransparent ? 'text-cream' : 'text-navy bg-cream/95 backdrop-blur-md border-b border-cream-warm',
      ].join(' ')}
    >
      <div className="container-wide flex items-center justify-between gap-4 py-4 sm:py-5">
        <Link
          href="/"
          aria-label={client.brandName}
          className="font-serif text-xl sm:text-2xl tracking-tight"
        >
          {client.brandName}
        </Link>

        <a
          href={client.phone.href}
          className={[
            'inline-flex items-center gap-2 font-semibold tabular-nums',
            'min-h-[48px] px-3 sm:px-4 rounded-md transition-all duration-300 ease-smooth',
            isTransparent
              ? 'text-cream hover:bg-white/10'
              : 'text-navy hover:bg-cream-warm',
          ].join(' ')}
        >
          <Phone className="size-4 sm:size-[18px]" aria-hidden />
          <span className="hidden sm:inline">{client.phone.display}</span>
          <span className="sm:hidden">Appeler</span>
        </a>
      </div>
    </header>
  );
}
