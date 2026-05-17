import { Phone, ArrowRight } from 'lucide-react';
import { client } from '@/content/client';
import { BrandMark } from './BrandMark';

export function Header() {
  return (
    <header
      className="sticky top-0 z-30 border-b border-navy/[0.06] bg-white/[0.92]"
      style={{
        backdropFilter: 'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
      }}
    >
      <div className="container-wide flex items-center justify-between gap-4 py-3 sm:py-4">
        <BrandMark />

        <nav className="flex items-center gap-2 sm:gap-3">
          <a href={client.phone.href} className="btn-ghost" aria-label={`Appeler ${client.phone.display}`}>
            <Phone className="size-4" aria-hidden />
            <span className="hidden sm:inline">Appeler</span>
          </a>
          <a href="#hero-form" className="btn-primary text-sm">
            <span className="hidden sm:inline">Mon devis gratuit</span>
            <span className="sm:hidden">Devis</span>
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  );
}
