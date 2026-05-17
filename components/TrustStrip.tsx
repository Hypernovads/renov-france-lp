import { ShieldCheck, Award, Wrench, Clock, Star } from 'lucide-react';
import type { TrustItem } from '@/content/types';

const ICONS = {
  'shield-check': ShieldCheck,
  'award': Award,
  'wrench': Wrench,
  'clock': Clock,
  'star': Star,
} as const;

type Props = {
  items: TrustItem[];
};

/**
 * Mobile : 4 badges en grille 2×2, Google sur ligne pleine en dessous.
 * Desktop : ligne unique 5 colonnes.
 *
 * On suppose : 4 items "techniques" + 1 item icon='star' (Google) en dernier.
 */
export function TrustStrip({ items }: Props) {
  const technical = items.filter((i) => i.icon !== 'star');
  const google = items.find((i) => i.icon === 'star');

  return (
    <section className="bg-cream-warm/60 border-y border-cream-warm">
      <div className="container-wide py-5 sm:py-6">
        {/* Mobile : 2×2 + ligne pleine ; Desktop : flex justify-around */}
        <div className="sm:hidden space-y-2">
          <ul className="grid grid-cols-2 gap-2">
            {technical.map((item) => (
              <BadgeCard key={item.label} item={item} />
            ))}
          </ul>
          {google && <BadgeCard item={google} fullWidth />}
        </div>

        <ul className="hidden sm:flex items-stretch justify-between gap-3">
          {items.map((item) => (
            <li key={item.label} className="flex-1">
              <BadgeCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BadgeCard({ item, fullWidth = false }: { item: TrustItem; fullWidth?: boolean }) {
  const Icon = ICONS[item.icon];
  const isGoogle = item.icon === 'star';

  return (
    <div
      className={[
        'flex items-center gap-2.5 rounded-md bg-white/80 border border-cream-warm px-3 py-2.5 min-h-[56px]',
        fullWidth ? 'w-full justify-center' : '',
        isGoogle ? 'border-gold/40 bg-white' : '',
      ].join(' ')}
    >
      <Icon
        className={`size-5 shrink-0 ${isGoogle ? 'text-gold fill-gold' : 'text-navy'}`}
        aria-hidden
      />
      <div className="flex flex-col leading-tight">
        <span className="text-xs sm:text-sm font-semibold text-navy">{item.label}</span>
        {item.rating && (
          <span className="text-[11px] text-slate tabular-nums">{item.rating}</span>
        )}
      </div>
    </div>
  );
}
