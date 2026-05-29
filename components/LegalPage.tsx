import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Mise en page partagée des pages légales (mentions légales, confidentialité, CGU).
 * Header + contenu typographié (via variantes Tailwind sur descendants) + Footer.
 * Les pages enfants écrivent du HTML sémantique pur (h2 / p / ul) — le style est ici.
 */
const PROSE = [
  'space-y-4 text-[15px]',
  '[&_h2]:font-serif [&_h2]:text-navy [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:leading-snug',
  '[&_p]:text-slate [&_p]:leading-relaxed [&_p]:text-pretty',
  '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-slate [&_ul]:leading-relaxed',
  '[&_a]:text-terracotta [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-terracotta-deep',
  '[&_strong]:text-navy [&_strong]:font-semibold',
].join(' ');

type Props = {
  title: string;
  updatedAt?: string;
  children: ReactNode;
};

export function LegalPage({ title, updatedAt, children }: Props) {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="section-pad">
          <div className="container-tight max-w-[820px]">
            <span className="eyebrow">Informations légales</span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[3rem] text-navy leading-[1.1] text-balance">
              {title}
            </h1>
            {updatedAt && (
              <p className="mt-3 text-sm text-slate">Dernière mise à jour : {updatedAt}</p>
            )}
            <div className={`mt-8 ${PROSE}`}>{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
