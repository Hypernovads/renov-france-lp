import Link from 'next/link';
import { Phone, Bath, ArrowRight } from 'lucide-react';
import { client } from '@/content/client';

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-cream/95 backdrop-blur-md border-b border-cream-warm">
      <div className="container-wide flex items-center justify-between gap-4 py-3 sm:py-4">
        <Link
          href="/"
          aria-label={client.brandName}
          className="inline-flex items-center gap-2.5 group"
        >
          <span className="inline-flex size-10 sm:size-11 items-center justify-center rounded-md bg-navy text-cream shadow-sm transition-transform duration-300 ease-smooth group-hover:scale-105">
            <Bath className="size-5" aria-hidden />
          </span>
          <span className="font-serif text-xl sm:text-2xl tracking-tight text-navy leading-none">
            {client.brandName}
            <span className="text-terracotta">.</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href={client.phone.href}
            className="inline-flex items-center gap-2 font-semibold text-navy bg-transparent border-2 border-navy/15 rounded-full min-h-[44px] sm:min-h-[48px] px-3 sm:px-5 text-sm sm:text-base transition-all duration-300 ease-smooth hover:border-navy hover:bg-cream-warm/60 active:scale-95"
          >
            <Phone className="size-4" aria-hidden />
            <span className="hidden sm:inline">Appeler</span>
          </a>
          <a
            href="#form-long"
            className="inline-flex items-center gap-2 font-semibold text-cream bg-terracotta hover:bg-terracotta-deep rounded-full min-h-[44px] sm:min-h-[48px] px-4 sm:px-5 text-sm sm:text-base transition-all duration-300 ease-smooth shadow-md shadow-terracotta/20 active:scale-95"
          >
            <span className="hidden sm:inline">Mon devis gratuit</span>
            <span className="sm:hidden">Devis</span>
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  );
}
