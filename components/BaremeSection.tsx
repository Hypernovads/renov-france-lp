import type { BaremeRow } from '@/content/types';

type ExampleLine = { label: string; value: string; kind: 'base' | 'aide' | 'total' };

type Props = {
  eyebrow: string;
  h2: string;
  h2Highlight?: string;
  intro?: string;
  plafondTravaux: string;
  rows: BaremeRow[];
  example: {
    persona: string;
    badge?: string;
    lines: ExampleLine[];
    footnote?: string;
  };
  note?: string;
};

/**
 * Section "Barème + exemple chiffré" (LP2 MaPrimeAdapt').
 * Gauche : barème ANAH 2026 (taux selon revenus + plafond).
 * Droite : cas concret nommé présenté en mini-"facture" — crédibilise les montants.
 */
export function BaremeSection({
  eyebrow,
  h2,
  h2Highlight,
  intro,
  plafondTravaux,
  rows,
  example,
  note,
}: Props) {
  return (
    <section className="section-pad bg-white">
      <div className="container-tight">
        <header className="max-w-[720px] mb-10 sm:mb-14">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-balance">
            <HighlightedH2 text={h2} highlight={h2Highlight} />
          </h2>
          {intro && <p className="mt-4 text-slate text-pretty leading-relaxed">{intro}</p>}
        </header>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* ─── Barème ───────────────────────────────────── */}
          <div className="rounded-[20px] border border-navy/[0.08] bg-cream/60 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-terracotta mb-1">
              Barème ANAH 2026
            </p>
            <p className="text-sm text-slate mb-6">
              Sur la base de {plafondTravaux} pris en compte.
            </p>

            <ul className="space-y-4">
              {rows.map((row) => (
                <li
                  key={row.profil}
                  className={[
                    'flex items-center justify-between gap-4 rounded-[14px] p-4 sm:p-5 border',
                    row.tone === 'high'
                      ? 'bg-navy text-cream border-navy'
                      : 'bg-white text-navy border-navy/10',
                  ].join(' ')}
                >
                  <div className="min-w-0">
                    <p
                      className={[
                        'text-sm font-semibold',
                        row.tone === 'high' ? 'text-cream' : 'text-navy',
                      ].join(' ')}
                    >
                      {row.profil}
                    </p>
                    <p
                      className={[
                        'text-xs mt-0.5',
                        row.tone === 'high' ? 'text-cream/70' : 'text-slate',
                      ].join(' ')}
                    >
                      {row.plafondAide}
                    </p>
                  </div>
                  <span
                    className={[
                      'font-serif leading-none shrink-0 text-[2rem] sm:text-[2.4rem]',
                      row.tone === 'high' ? 'text-terracotta-light' : 'text-terracotta',
                    ].join(' ')}
                  >
                    {row.taux}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Exemple chiffré ──────────────────────────── */}
          <div className="rounded-[20px] bg-navy text-cream p-6 sm:p-8 grain-overlay relative overflow-hidden">
            <div
              className="absolute -top-24 -right-24 size-72 rounded-full bg-terracotta/20 blur-3xl"
              aria-hidden
            />
            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-terracotta-light mb-4">
                Un exemple concret
              </p>

              <p className="font-serif text-xl text-cream leading-snug">{example.persona}</p>
              {example.badge && (
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-cream/10 border border-cream/20 text-[12px] font-medium text-cream/90">
                  {example.badge}
                </span>
              )}

              <ul className="mt-6 divide-y divide-cream/10">
                {example.lines.map((line) => (
                  <li
                    key={line.label}
                    className={[
                      'flex items-baseline justify-between gap-4 py-3',
                      line.kind === 'total' ? 'pt-4' : '',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        line.kind === 'total'
                          ? 'text-cream font-semibold'
                          : 'text-cream/75',
                        'text-sm leading-snug',
                      ].join(' ')}
                    >
                      {line.label}
                    </span>
                    <span
                      className={[
                        'shrink-0 tabular-nums',
                        line.kind === 'aide'
                          ? 'text-terracotta-light font-semibold'
                          : line.kind === 'total'
                            ? 'font-serif text-2xl text-cream'
                            : 'text-cream font-semibold',
                      ].join(' ')}
                    >
                      {line.value}
                    </span>
                  </li>
                ))}
              </ul>

              {example.footnote && (
                <p className="mt-5 text-xs text-cream/60 leading-relaxed">{example.footnote}</p>
              )}
            </div>
          </div>
        </div>

        {note && (
          <p className="mt-8 text-xs text-slate max-w-2xl leading-relaxed">{note}</p>
        )}
      </div>
    </section>
  );
}

function HighlightedH2({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className="italic-accent">{highlight}</span>
      {after}
    </>
  );
}
