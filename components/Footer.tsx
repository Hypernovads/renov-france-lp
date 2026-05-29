import Link from 'next/link';
import { client } from '@/content/client';
import { BrandMark } from './BrandMark';

type LinkItem = { label: string; href: string };

type Props = {
  services?: LinkItem[];
  entreprise?: LinkItem[];
  /** Liste de villes pour la zone d'intervention (séparées par "·" inline) */
  villes?: string[];
  /** Tagline sous le logo (override le default depuis client.zone) */
  tagline?: string;
};

export function Footer({ services, entreprise, villes, tagline }: Props) {
  const t =
    tagline ??
    `Spécialistes de la rénovation de salle de bain à Marseille et dans tout le 13.`;

  // Ligne légale du footer : on n'affiche QUE les infos réellement renseignées
  // (pas de fausse décennale / Qualibat tant qu'on ne les a pas).
  const ok = (v: string) => !v.startsWith('À COMPLÉTER');
  const legalBits = [
    ok(client.certifications.decennaleAssureur) ? `Décennale ${client.certifications.decennaleAssureur}` : null,
    ok(client.certifications.qualibatNumber) ? `Qualibat n°${client.certifications.qualibatNumber}` : null,
    ok(client.siret) ? `SIRET ${client.siret}` : null,
    ok(client.rcs) ? client.rcs : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <footer className="bg-navy-deep text-cream/60 pt-14 sm:pt-18 pb-10 px-5 sm:px-12">
      <div className="max-w-[1400px] mx-auto mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-14">
        {/* ─── Brand col ───────────────────────────────────────── */}
        <div>
          <div className="mb-5">
            <BrandMark inverted />
          </div>
          <p className="text-[14px] leading-[1.7] max-w-[340px] mb-4 text-cream/65">{t}</p>
          {legalBits && (
            <p className="text-[12px] leading-[1.6] text-cream/40">{legalBits}</p>
          )}
        </div>

        {/* ─── Services col ────────────────────────────────────── */}
        {services && services.length > 0 && (
          <FooterCol title="Services" items={services} />
        )}

        {/* ─── Entreprise col ──────────────────────────────────── */}
        {entreprise && entreprise.length > 0 && (
          <FooterCol title="Entreprise" items={entreprise} />
        )}

        {/* ─── Zones couvertes col ─────────────────────────────── */}
        {villes && villes.length > 0 && (
          <div>
            <h4 className="text-cream font-bold uppercase text-[12px] mb-4.5 mb-[18px]" style={{ letterSpacing: '0.12em' }}>
              Zones couvertes
            </h4>
            <p className="text-[13px] leading-[1.8] text-cream/60">
              {villes.map((v, i) => (
                <span key={v}>
                  {v}
                  {i < villes.length - 1 && <span className="text-cream/30 mx-1">·</span>}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>

      {/* ─── Footer bottom : copyright + legal ─────────────────── */}
      <div className="max-w-[1400px] mx-auto pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-cream/50">
        <span>
          &copy; {new Date().getFullYear()} {client.brandName === 'À COMPLÉTER' ? client.legalName : client.brandName} · Tous droits réservés
        </span>
        <span>
          <Link href={client.legal.legalNoticeUrl} className="hover:text-terracotta-light transition-colors">
            Mentions légales
          </Link>
          {' · '}
          <Link href={client.legal.privacyUrl} className="hover:text-terracotta-light transition-colors">
            Confidentialité
          </Link>
          {' · '}
          <Link href="/cgu" className="hover:text-terracotta-light transition-colors">
            CGU
          </Link>
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <div>
      <h4
        className="text-cream font-bold uppercase text-[12px] mb-[18px]"
        style={{ letterSpacing: '0.12em' }}
      >
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label} className="text-[14px]">
            <Link
              href={item.href}
              className="text-cream/60 hover:text-terracotta-light transition-colors duration-200"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
