import type { PromiseItem } from '@/content/types';
import { getIcon } from './icons';

type Props = {
  eyebrow: string;
  h2: string;
  items: PromiseItem[];
};

export function PromiseGrid({ eyebrow, h2, items }: Props) {
  return (
    <section className="section-pad bg-cream">
      <div className="container-tight">
        <header className="max-w-2xl mb-10 sm:mb-14">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-balance">
            {h2}
          </h2>
        </header>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream-warm rounded-lg overflow-hidden">
          {items.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <li
                key={item.title}
                className="bg-cream p-6 sm:p-7 flex flex-col gap-3 transition-colors duration-300 ease-smooth hover:bg-cream-warm/40"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-md bg-navy text-cream">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="text-xl text-navy">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate text-pretty">{item.body}</p>
                <span className="mt-auto pt-3 text-xs font-semibold text-terracotta tabular-nums">
                  {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
