import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MessageCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { client } from '@/content/client';
import { lpBaignoireDouche as lp } from '@/content/lp-baignoire-douche';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Merci — Demande reçue',
  description: 'Votre demande de devis a bien été envoyée.',
  robots: { index: false, follow: false },
};

export default function MerciBaignoireDouche() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-cream pt-16 pb-20">
        <div className="container-tight">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex size-16 sm:size-20 items-center justify-center rounded-full bg-emerald-500/15 mb-6">
              <CheckCircle2 className="size-8 sm:size-10 text-emerald-600" aria-hidden />
            </div>

            <h1 className="text-4xl sm:text-5xl mb-4 text-balance">{lp.merci.h1}</h1>
            <p className="text-slate text-lg leading-relaxed text-pretty">{lp.merci.sub}</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={client.phone.href} className="btn-primary">
                <Phone className="size-5" aria-hidden />
                Appeler {client.phone.display}
              </a>
              <a
                href={client.whatsapp.href}
                target="_blank"
                rel="noopener"
                className="btn-secondary"
              >
                <MessageCircle className="size-5" aria-hidden />
                WhatsApp
              </a>
            </div>

            <div className="mt-12 grid sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <Card title="Délai de rappel" body={lp.merci.delaiRappel} />
              <Card title="Horaires" body={client.hours} />
              <Card title="Zone" body={client.zone.departmentLabel} />
            </div>

            <p className="mt-12 text-sm text-slate">
              <Link
                href="/baignoire-douche"
                className="inline-flex items-center gap-1.5 hover:text-navy transition-colors"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Retour à la page
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-white rounded-md border border-cream-warm p-4">
      <p className="text-[11px] uppercase tracking-wider text-terracotta font-semibold mb-1">
        {title}
      </p>
      <p className="font-serif text-navy text-lg">{body}</p>
    </div>
  );
}
