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
 * Trust strip cream avec 5 items en flex (mobile : wrap responsive, desktop : space-between).
 * Chaque item = icône carrée blanche + texte Fraunces (strong + small uppercase).
 */
export function TrustStrip({ items }: Props) {
  return (
    <section className="bg-cream border-b border-navy/[0.06]">
      <div className="container-wide py-8 sm:py-10">
        <ul className="flex flex-wrap items-center justify-center lg:justify-between gap-6 gap-y-5">
          {items.map((item) => (
            <li key={item.label}>
              <TrustBadge item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TrustBadge({ item }: { item: TrustItem }) {
  const Icon = ICONS[item.icon] ?? ShieldCheck;
  const isStar = item.icon === 'star';
  return (
    <div className="flex items-center gap-3 text-navy">
      <span className="inline-flex size-10 items-center justify-center rounded-[10px] bg-white border border-navy/10 shrink-0">
        <Icon
          className={isStar ? 'size-[22px] text-[#F4B400]' : 'size-[22px] text-navy'}
          {...(isStar ? { fill: '#F4B400' } : {})}
          aria-hidden
        />
      </span>
      <div className="font-serif leading-[1.2]">
        <strong className="block text-[16px] font-semibold text-navy">
          {item.label}
        </strong>
        {item.rating && (
          <small className="block text-[11px] font-medium text-slate uppercase font-sans" style={{ letterSpacing: '0.06em' }}>
            {item.rating}
          </small>
        )}
      </div>
    </div>
  );
}
