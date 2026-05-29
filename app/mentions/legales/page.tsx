import type { Metadata } from 'next';
import { LegalPage, has } from '@/components/LegalPage';
import { client } from '@/content/client';

export const metadata: Metadata = {
  title: `Mentions légales — ${client.brandName === 'À COMPLÉTER' ? client.legalName : client.brandName}`,
  description: 'Mentions légales et informations sur l’éditeur du site.',
  robots: { index: false, follow: true },
};

const updatedAt = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

const certs = [
  { label: 'Assurance décennale', value: client.certifications.decennaleAssureur },
  { label: 'Qualification Qualibat', value: client.certifications.qualibatNumber },
  { label: 'Qualification RGE', value: client.certifications.rgeNumber },
].filter((c) => has(c.value));

export default function MentionsLegalesPage() {
  const contact = [
    has(client.email) ? client.email : null,
    has(client.phone.display) ? client.phone.display : null,
  ]
    .filter(Boolean)
    .join(' — ');

  return (
    <LegalPage title="Mentions légales" updatedAt={updatedAt}>
      <h2>1. Éditeur du site</h2>
      <p>Le présent site est édité par :</p>
      <ul>
        <li><strong>Dénomination sociale :</strong> {client.legalName}</li>
        <li><strong>Forme juridique :</strong> {client.legal.legalForm}</li>
        <li><strong>Capital social :</strong> {client.legal.capital}</li>
        <li><strong>Code APE :</strong> {client.legal.ape}</li>
        <li><strong>Siège social :</strong> {client.legal.address}</li>
        <li><strong>SIRET :</strong> {client.siret}</li>
        <li><strong>RCS :</strong> {client.rcs}</li>
        {has(client.legal.tvaIntra) && (
          <li><strong>N° TVA intracommunautaire :</strong> {client.legal.tvaIntra}</li>
        )}
        {contact && <li><strong>Contact :</strong> {contact}</li>}
        <li><strong>Directeur de la publication :</strong> {client.legal.publicationDirector}</li>
      </ul>

      <h2>2. Hébergeur</h2>
      <p>Le site est hébergé par :</p>
      <ul>
        <li><strong>{client.legal.host.name}</strong></li>
        <li>{client.legal.host.address}</li>
        <li>
          <a href={client.legal.host.url} target="_blank" rel="noopener noreferrer">
            {client.legal.host.url}
          </a>
        </li>
      </ul>

      <h2>3. Activité</h2>
      <p>
        L’éditeur exerce une activité de rénovation et d’adaptation de salle de bain
        (travaux du bâtiment), notamment dans le cadre des dispositifs d’aide au maintien à
        domicile.
      </p>
      {certs.length > 0 && (
        <>
          <p>Qualifications et assurances :</p>
          <ul>
            {certs.map((c) => (
              <li key={c.label}><strong>{c.label} :</strong> {c.value}</li>
            ))}
          </ul>
        </>
      )}

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus présents sur ce site (textes, images, logos, photographies,
        éléments graphiques, structure) est protégé par le droit de la propriété intellectuelle
        et reste la propriété exclusive de l’éditeur ou de ses partenaires. Toute reproduction,
        représentation, modification ou exploitation, totale ou partielle, sans autorisation
        écrite préalable, est interdite et constitue une contrefaçon.
      </p>

      <h2>5. Responsabilité</h2>
      <p>
        Les informations diffusées sur ce site (notamment les estimations d’aides et de reste à
        charge) sont fournies à titre <strong>indicatif</strong> et ne constituent pas un
        engagement contractuel. Les montants d’aides définitifs dépendent de votre situation
        personnelle et de la décision des organismes concernés (ANAH, caisses de retraite,
        Action Logement, etc.). L’éditeur ne saurait être tenu responsable des erreurs,
        d’une indisponibilité temporaire du site, ou de l’usage qui en est fait.
      </p>

      <h2>6. Données personnelles</h2>
      <p>
        Le traitement de vos données personnelles est décrit dans notre{' '}
        <a href={client.legal.privacyUrl}>Politique de confidentialité</a>. Conformément au
        RGPD et à la loi « Informatique et Libertés », vous disposez d’un droit d’accès, de
        rectification, d’effacement et d’opposition sur vos données, à exercer{' '}
        {has(client.legal.dpoEmail) ? (
          <>
            auprès de{' '}
            <a href={`mailto:${client.legal.dpoEmail}`}>{client.legal.dpoEmail}</a>.
          </>
        ) : (
          <>par courrier à l’adresse du siège social indiquée ci-dessus.</>
        )}
      </p>

      <h2>7. Cookies</h2>
      <p>
        Ce site peut utiliser des cookies à des fins de mesure d’audience et, le cas échéant, de
        publicité. Vous pouvez configurer votre navigateur pour les refuser. Pour en savoir plus,
        consultez notre <a href={client.legal.privacyUrl}>Politique de confidentialité</a>.
      </p>

      <h2>8. Médiation de la consommation</h2>
      <p>
        Conformément aux articles L.611-1 et suivants du Code de la consommation, tout
        consommateur a le droit de recourir gratuitement à un médiateur de la consommation en
        vue de la résolution amiable d’un litige.
      </p>
      {has(client.legal.mediator.name) && (
        <ul>
          <li><strong>{client.legal.mediator.name}</strong></li>
          {has(client.legal.mediator.url) && (
            <li>
              <a href={client.legal.mediator.url} target="_blank" rel="noopener noreferrer">
                {client.legal.mediator.url}
              </a>
            </li>
          )}
        </ul>
      )}
      <p>
        La plateforme européenne de Règlement en Ligne des Litiges est également accessible :{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>.
      </p>

      <h2>9. Droit applicable</h2>
      <p>
        Le présent site et ses mentions légales sont soumis au droit français. En cas de litige,
        et à défaut de résolution amiable, les tribunaux français sont seuls compétents.
      </p>
    </LegalPage>
  );
}
