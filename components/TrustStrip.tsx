import { ShieldCheck, Award, Lock, Star, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TrustItem } from '@/content/types';

const ICONS: Record<TrustItem['icon'], LucideIcon> = {
  'shield-check': ShieldCheck,
  award: Award,
  lock: Lock,
  star: Star,
  clock: Clock,
};

type Props = {
  items: TrustItem[];
};

/**
 * Trust strip cream.
 * - Mobile : 4 premiers items en grille 2×2 + dernier (icon='star' = Google) full-width
 *   en ligne pleine en dessous (info la + importante pour la conversion)
 * - Desktop : tous en flex, space-between
 *
 * Convention : l'item avec `icon: 'star'` est traité comme "Google" et passe en full-width
 * sur mobile.
 */
export function TrustStrip({ items }: Props) {
  const google = items.find((i) => i.icon === 'star');
  const others = items.filter((i) => i.icon !== 'star');

  return (
    <section className="bg-cream border-b border-navy/[0.06]">
      <div className="container-wide py-8 sm:py-10">
        {/* Mobile : 2×2 + Google ligne pleine */}
        <div className="lg:hidden space-y-3">
          <ul className="grid grid-cols-2 gap-3">
            {others.map((item) => (
              <li key={item.label}>
                <TrustBadge item={item} />
              </li>
            ))}
          </ul>
          {google && <TrustBadge item={google} fullWidth />}
        </div>

        {/* Desktop : ligne unique flex space-between, Google en dernier */}
        <ul className="hidden lg:flex items-center justify-between gap-6">
          {[...others, ...(google ? [google] : [])].map((item) => (
            <li key={item.label}>
              <TrustBadge item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TrustBadge({ item, fullWidth = false }: { item: TrustItem; fullWidth?: boolean }) {
  const Icon = ICONS[item.icon] ?? ShieldCheck;
  const isStar = item.icon === 'star';
  return (
    <div
      className={[
        'flex items-center gap-3 text-navy',
        fullWidth
          ? 'w-full justify-center bg-white border border-navy/10 rounded-xl py-3 px-4'
          : '',
      ].join(' ')}
    >
      <span
        className={[
          'inline-flex size-10 items-center justify-center rounded-[10px] shrink-0',
          fullWidth ? '' : 'bg-white border border-navy/10',
        ].join(' ')}
      >
        <Icon
          className={isStar ? 'size-[22px] text-[#F4B400]' : 'size-[22px] text-navy'}
          {...(isStar ? { fill: '#F4B400' } : {})}
          aria-hidden
        />
      </span>
      <div className="font-serif leading-[1.2]">
        <strong className="block text-[16px] font-normal text-navy">{item.label}</strong>
        {item.rating && (
          <small
            className="block text-[11px] font-medium text-slate uppercase font-sans"
            style={{ letterSpacing: '0.06em' }}
          >
            {item.rating}
          </small>
        )}
      </div>
    </div>
  );
}
