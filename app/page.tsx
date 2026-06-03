import Link from 'next/link';

const LPS = [
  {
    href: '/maprimeadapt',
    title: "LP 2 — MaPrimeAdapt'",
    sub: '/maprimeadapt — aides senior, douche sécurisée, quiz éligibilité',
    primary: true,
  },
  {
    href: '/baignoire-douche',
    title: 'LP 1 — Baignoire → Douche',
    sub: '/baignoire-douche — confort, modernité',
  },
  {
    href: '/renovation-totale',
    title: 'LP 3 — Rénovation totale',
    sub: '/renovation-totale — projet sur mesure haut de gamme',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="eyebrow mb-4">RENOV FRANCE — Index dev</p>
        <h1 className="text-4xl sm:text-5xl mb-6">
          3 landing pages — rénovation salle de bain
        </h1>
        <p className="text-slate mb-10">
          Page d&apos;index de dev. Les vraies LP sont accessibles ci-dessous.
        </p>
        <ul className="flex flex-col gap-3 text-left">
          {LPS.map((lp) => (
            <li key={lp.href}>
              <Link
                href={lp.href}
                className={[
                  'block p-5 rounded-md border transition-all',
                  lp.primary
                    ? 'bg-white border-terracotta/40 hover:border-terracotta hover:shadow-card-soft ring-1 ring-terracotta/20'
                    : 'bg-white border-cream-warm hover:bg-cream-warm',
                ].join(' ')}
              >
                <span className="block font-serif text-xl text-navy">{lp.title}</span>
                <span className="block text-sm text-slate mt-1">{lp.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
