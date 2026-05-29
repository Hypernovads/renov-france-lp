import type { Metadata } from 'next';
import { LegalPage, has } from '@/components/LegalPage';
import { client } from '@/content/client';

export const metadata: Metadata = {
  title: `Politique de confidentialité — ${client.brandName === 'À COMPLÉTER' ? client.legalName : client.brandName}`,
  description: 'Comment nous collectons, utilisons et protégeons vos données personnelles (RGPD).',
  robots: { index: false, follow: true },
};

const updatedAt = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité" updatedAt={updatedAt}>
      <p>
        La protection de vos données personnelles est une priorité. Cette politique explique
        quelles données nous collectons, pourquoi, et quels sont vos droits, conformément au
        Règlement Général sur la Protection des Données (RGPD) et à la loi « Informatique et
        Libertés ».
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement est {client.legalName}, dont le siège est situé{' '}
        {client.legal.address}. Pour toute question relative à vos données, vous pouvez nous
        contacter{' '}
        {has(client.legal.dpoEmail) ? (
          <>
            à <a href={`mailto:${client.legal.dpoEmail}`}>{client.legal.dpoEmail}</a>.
          </>
        ) : (
          <>par courrier à l’adresse du siège social indiquée ci-dessus.</>
        )}
      </p>

      <h2>2. Données collectées</h2>
      <p>Nous collectons uniquement les données que vous nous transmettez via nos formulaires :</p>
      <ul>
        <li>Identité : nom et prénom ;</li>
        <li>Coordonnées : téléphone, et le cas échéant adresse e-mail ;</li>
        <li>Localisation : code postal / commune ;</li>
        <li>
          Informations sur votre projet : type de travaux, statut d’occupation, tranche de
          revenus, situation (renseignées via le test d’éligibilité) ;
        </li>
        <li>Créneau de rappel souhaité.</li>
      </ul>
      <p>
        Les informations du test d’éligibilité servent uniquement à estimer vos aides ; elles ne
        sont enregistrées qu’à partir du moment où vous nous laissez vos coordonnées.
      </p>

      <h2>3. Finalités et base légale</h2>
      <ul>
        <li>
          <strong>Traiter votre demande</strong> (rappel, visite technique, devis) — base légale :
          mesures précontractuelles prises à votre demande ;
        </li>
        <li>
          <strong>Estimer vos aides</strong> et vous accompagner dans le montage du dossier —
          base légale : votre consentement ;
        </li>
        <li>
          <strong>Améliorer notre service</strong> et, le cas échéant, mesurer l’efficacité de nos
          campagnes — base légale : intérêt légitime / consentement.
        </li>
      </ul>

      <h2>4. Destinataires</h2>
      <p>
        Vos données sont destinées aux équipes commerciales et techniques de {client.legalName}.
        Elles peuvent être transmises à nos sous-traitants techniques (hébergement, outils de
        gestion de la relation client) agissant pour notre compte, ainsi qu’aux organismes
        d’aides concernés si vous nous mandatez pour monter votre dossier. Elles ne sont jamais
        vendues à des tiers.
      </p>

      <h2>5. Durée de conservation</h2>
      <p>
        Vos données sont conservées le temps nécessaire au traitement de votre demande, puis
        archivées pendant la durée légale (généralement 3 ans à compter du dernier contact pour
        les prospects, et jusqu’à 10 ans pour les obligations liées aux travaux réalisés).
      </p>

      <h2>6. Vos droits</h2>
      <p>Vous disposez à tout moment des droits suivants sur vos données :</p>
      <ul>
        <li>droit d’accès et de rectification ;</li>
        <li>droit à l’effacement et à la limitation du traitement ;</li>
        <li>droit d’opposition et droit à la portabilité ;</li>
        <li>droit de retirer votre consentement à tout moment.</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous{' '}
        {has(client.legal.dpoEmail) ? (
          <>
            à <a href={`mailto:${client.legal.dpoEmail}`}>{client.legal.dpoEmail}</a>
          </>
        ) : (
          <>par courrier à l’adresse de notre siège social</>
        )}
        . Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous
        pouvez introduire une réclamation auprès de la CNIL :{' '}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.
      </p>

      <h2>7. Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
        protéger vos données contre tout accès, perte ou divulgation non autorisés.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Le site peut déposer des cookies de mesure d’audience et de publicité. Les cookies non
        essentiels ne sont déposés qu’avec votre consentement, que vous pouvez retirer à tout
        moment via les réglages de votre navigateur.
      </p>
    </LegalPage>
  );
}
