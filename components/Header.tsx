'use client';

import { useEffect, useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { client } from '@/content/client';
import { BrandMark } from './BrandMark';

/**
 * Header sticky glassmorphism.
 *
 * Comportements conversion :
 * 1. Téléphone TOUJOURS visible avec numéro plein (desktop + mobile) — sur ce vertical,
 *    50 % des leads convertissent par tel. Sur mobile le numéro prend la place libérée
 *    par le bouton CTA (qui est redondant avec le sticky bottom mobile).
 * 2. CTA "Mon devis gratuit" caché tant qu'on est dans le hero. Apparaît au scroll
 *    UNIQUEMENT sur desktop (sm+). Sur mobile, le sticky bottom 3-boutons (WhatsApp /
 *    Appeler / Devis) prend le relais — pas de duplication d'action.
 */
type Props = {
  /** Libellé du CTA header au scroll (default "Mon devis gratuit"). LP2 : "Vérifier mon éligibilité". */
  ctaLabel?: string;
  /** Cible du CTA (default "#form-long"). LP2 : "#hero-form" (le quiz = conversion n°1). */
  ctaHref?: string;
};

export function Header({
  ctaLabel = 'Mon devis gratuit',
  ctaHref = '#form-long',
}: Props = {}) {
  const [showDevisCta, setShowDevisCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 80vh : début/fin du hero (le hero fait 92vh)
      setShowDevisCta(window.scrollY > window.innerHeight * 0.8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-30 border-b border-navy/[0.06] bg-white/[0.92]"
      style={{
        backdropFilter: 'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
      }}
    >
      <div className="container-wide flex items-center justify-between gap-3 py-3 sm:py-4">
        <BrandMark />

        <nav className="flex items-center gap-2 sm:gap-3">
          {/* Tel toujours visible avec numéro plein (nowrap pour ne pas casser sur mobile) */}
          <a
            href={client.phone.href}
            className="inline-flex items-center gap-2 font-semibold text-navy bg-transparent border border-navy/15 rounded-full min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 text-[13px] sm:text-[15px] tabular-nums whitespace-nowrap transition-all duration-300 ease-smooth hover:bg-navy hover:text-cream hover:border-navy active:scale-95"
            aria-label={`Appeler ${client.phone.display}`}
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            <span>{client.phone.display}</span>
          </a>

          {/* CTA "Mon devis" — DESKTOP UNIQUEMENT (sm+). Sur mobile, sticky bottom prend
              le relais → pas de duplication. Apparaît au scroll après le hero. */}
          <a
            href={ctaHref}
            className={[
              'hidden sm:inline-flex',
              'btn-primary text-[13px] sm:text-sm overflow-hidden',
              'transition-all duration-300 ease-smooth',
              showDevisCta
                ? 'opacity-100 max-w-[260px] px-4 sm:px-5'
                : 'opacity-0 max-w-0 px-0 pointer-events-none',
            ].join(' ')}
            aria-hidden={!showDevisCta}
            tabIndex={showDevisCta ? 0 : -1}
          >
            <span className="whitespace-nowrap">{ctaLabel}</span>
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  );
}
