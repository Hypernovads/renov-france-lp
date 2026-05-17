import { ArrowRight, Phone } from 'lucide-react';
import { client } from '@/content/client';

type Props = {
  h2: string;
  sub: string;
  ctaLabel: string;
};

export function CtaFinal({ h2, sub, ctaLabel }: Props) {
  return (
    <section className="relative bg-navy-deep text-cream overflow-hidden grain-overlay">
      <div className="absolute -top-32 -left-32 size-96 rounded-full bg-terracotta/20 blur-3xl" aria-hidden />

      <div className="container-tight relative z-10 py-20 sm:py-28 text-center">
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream leading-[1.05] text-balance max-w-3xl mx-auto">
          {h2}
        </h2>
        <p className="mt-5 text-cream/80 max-w-xl mx-auto text-pretty">{sub}</p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a href="#form-long" className="btn-primary">
            {ctaLabel}
            <ArrowRight className="size-5" aria-hidden />
          </a>
          <a href={client.phone.href} className="btn-ghost-light">
            <Phone className="size-4" aria-hidden />
            {client.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
