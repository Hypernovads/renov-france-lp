type PressItem = {
  name: string;
  /** Optionnel : URL du logo SVG/PNG dans /public/press/. Si absent, on affiche juste le nom. */
  logoSrc?: string;
};

type Props = {
  /** Label discret au-dessus (default "Ils parlent de nous") */
  label?: string;
  items: PressItem[];
};

/**
 * Bande presse / partenaires sous le TrustStrip.
 *
 * Auto-validation forte : si le client est cité dans un média local (La Provence,
 * MaisonAPart, etc.) ou partenaire de marques connues (Schmidt, Cuisinella…),
 * les logos rassurent fortement la cible 55+.
 *
 * Placeholders volontairement voyants ("À COMPLÉTER") jusqu'à ce que Steve récupère
 * les vrais logos clients à poser dans `/public/press/`.
 */
export function PressBar({ label = 'Ils parlent de nous', items }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="bg-white border-b border-navy/[0.06]">
      <div className="container-wide py-6 sm:py-7">
        <p
          className="text-center text-[11px] uppercase text-slate font-medium mb-4 sm:mb-5"
          style={{ letterSpacing: '0.14em' }}
        >
          {label}
        </p>
        <ul className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 lg:gap-14">
          {items.map((item) => (
            <li
              key={item.name}
              className="text-slate/70 hover:text-navy transition-colors duration-300"
            >
              {item.logoSrc ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.logoSrc}
                  alt={item.name}
                  className="h-7 sm:h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              ) : (
                <span
                  className="font-serif text-sm sm:text-base italic"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
