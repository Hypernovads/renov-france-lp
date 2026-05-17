import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="max-w-xl text-center">
        <p className="eyebrow mb-4">Workspace LP SDB — Dev</p>
        <h1 className="text-4xl sm:text-5xl mb-6">
          3 landing pages — rénovation salle de bain
        </h1>
        <p className="text-slate mb-10">
          Page d&apos;index de dev. Les vraies LP sont accessibles ci-dessous.
        </p>
        <ul className="flex flex-col gap-3 text-left">
          <li>
            <Link
              href="/baignoire-douche"
              className="block p-5 rounded-md bg-white hover:bg-cream-warm transition-colors border border-cream-warm"
            >
              <span className="block font-serif text-xl text-navy">LP 1 — Baignoire → Douche</span>
              <span className="block text-sm text-slate mt-1">
                /baignoire-douche — confort, modernité, 1 jour
              </span>
            </Link>
          </li>
          <li>
            <span className="block p-5 rounded-md bg-cream-warm/40 border border-cream-warm opacity-60">
              <span className="block font-serif text-xl text-slate">LP 2 — MaPrimeAdapt&apos;</span>
              <span className="block text-sm text-slate mt-1">/maprimeadapt — à venir</span>
            </span>
          </li>
          <li>
            <span className="block p-5 rounded-md bg-cream-warm/40 border border-cream-warm opacity-60">
              <span className="block font-serif text-xl text-slate">LP 3 — Rénovation totale</span>
              <span className="block text-sm text-slate mt-1">/renovation-totale — à venir</span>
            </span>
          </li>
        </ul>
      </div>
    </main>
  );
}
