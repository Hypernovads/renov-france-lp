'use client';

import { useEffect, useState } from 'react';
import { Phone, MessageCircle, FileText, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { client } from '@/content/client';

type Props = {
  /** Ancre vers la cible du 3ᵉ bouton (default : '#form-long' pour LP1) */
  devisHref?: string;
  /** Label du 3ᵉ bouton (default : "Mon devis"). LP2 utilise "Tester en 30s". */
  devisLabel?: string;
  /** Icône du 3ᵉ bouton (default : FileText). LP2 utilise Sparkles (quiz). */
  devisIcon?: 'file' | 'sparkles';
};

const ICONS: Record<NonNullable<Props['devisIcon']>, LucideIcon> = {
  file: FileText,
  sparkles: Sparkles,
};

export function StickyBottomMobile({
  devisHref = '#form-long',
  devisLabel = 'Mon devis',
  devisIcon = 'file',
}: Props) {
  const DevisIcon = ICONS[devisIcon];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // On affiche après ~80vh de scroll pour ne pas masquer le hero
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={[
        'sm:hidden fixed inset-x-0 bottom-0 z-40 safe-bottom px-3 pt-3',
        'bg-gradient-to-t from-navy-deep via-navy-deep/95 to-navy-deep/0',
        'transition-all duration-500 ease-smooth',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <div className="grid grid-cols-3 gap-2">
        <a
          href={client.whatsapp.href}
          target="_blank"
          rel="noopener"
          className="flex flex-col items-center justify-center gap-0.5 min-h-[56px] rounded-md bg-[#25D366] text-white font-semibold text-xs shadow-lg active:scale-95 transition-transform"
        >
          <MessageCircle className="size-5" aria-hidden />
          WhatsApp
        </a>
        <a
          href={client.phone.href}
          className="flex flex-col items-center justify-center gap-0.5 min-h-[56px] rounded-md bg-cream text-navy-deep font-semibold text-xs shadow-lg active:scale-95 transition-transform"
        >
          <Phone className="size-5" aria-hidden />
          Appeler
        </a>
        <a
          href={devisHref}
          className="flex flex-col items-center justify-center gap-0.5 min-h-[56px] rounded-md bg-terracotta text-cream font-semibold text-xs shadow-lg active:scale-95 transition-transform"
        >
          <DevisIcon className="size-5" aria-hidden />
          {devisLabel}
        </a>
      </div>
    </div>
  );
}
