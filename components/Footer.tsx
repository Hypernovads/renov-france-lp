import Link from 'next/link';
import { client } from '@/content/client';

export function Footer() {
  return (
    <footer className="bg-navy text-cream/85 border-t border-white/5">
      <div className="container-wide py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {/* Identité */}
          <div>
            <p className="font-serif text-2xl text-cream mb-3">{client.brandName}</p>
            <p className="text-sm leading-relaxed text-cream/70">
              Spécialiste rénovation salle de bain dans les {client.zone.departmentLabel}.
            </p>
            <p className="text-sm mt-3 text-cream/70">{client.zone.cities}</p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-terracotta-light font-semibold mb-3">
              Contact
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={client.phone.href} className="hover:text-cream transition-colors">
                  {client.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${client.email}`} className="hover:text-cream transition-colors">
                  {client.email}
                </a>
              </li>
              <li>{client.hours}</li>
              <li>{client.callbackPromise}</li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-terracotta-light font-semibold mb-3">
              Certifications
            </p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>Qualibat — {client.certifications.qualibatNumber}</li>
              <li>RGE — {client.certifications.rgeNumber}</li>
              <li>Décennale — {client.certifications.decennaleAssureur}</li>
            </ul>
          </div>

          {/* Mentions */}
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-terracotta-light font-semibold mb-3">
              Mentions
            </p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <Link href={client.legal.legalNoticeUrl} className="hover:text-cream transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href={client.legal.privacyUrl} className="hover:text-cream transition-colors">
                  Confidentialité (RGPD)
                </Link>
              </li>
              <li className="pt-1 text-xs">SIRET : {client.siret}</li>
              <li className="text-xs">{client.legal.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-cream/50">
          <p>
            &copy; {new Date().getFullYear()} {client.legalName}. Tous droits réservés.
          </p>
          <p>
            Réalisation —{' '}
            <a
              href="https://hypernovads.com"
              target="_blank"
              rel="noopener"
              className="hover:text-cream transition-colors"
            >
              HYPERNOVADS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
