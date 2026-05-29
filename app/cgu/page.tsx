import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { client } from '@/content/client';

export const metadata: Metadata = {
  title: `Conditions générales d’utilisation — ${client.brandName === 'À COMPLÉTER' ? client.legalName : client.brandName}`,
  description: 'Conditions générales d’utilisation du site.',
  robots: { index: false, follow: true },
};

const updatedAt = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

export default function CguPage() {
  return (
    <LegalPage title="Conditions générales d’utilisation" updatedAt={updatedAt}>
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent l’utilisation du site édité par {client.legalName}.
        En accédant au site, l’utilisateur accepte sans réserve les présentes conditions. Le site
        a une vocation informative et permet de prendre contact en vue d’une demande de devis ;
        il ne constitue pas un service de vente en ligne.
      </p>

      <h2>2. Accès au site</h2>
      <p>
        Le site est accessible gratuitement à tout utilisateur disposant d’un accès à Internet.
        L’éditeur s’efforce d’assurer la disponibilité du site mais ne peut être tenu responsable
        d’une interruption, pour maintenance, mise à jour ou cas de force majeure.
      </p>

      <h2>3. Demandes de contact et d’estimation</h2>
      <p>
        Les formulaires et le test d’éligibilité permettent d’être recontacté par nos équipes.
        Les estimations affichées sont fournies à titre indicatif et ne valent pas devis. Seule
        une visite technique et un devis signé engagent les parties.
      </p>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L’ensemble des éléments du site est protégé par le droit de la propriété intellectuelle.
        Toute reproduction non autorisée est interdite (voir les{' '}
        <a href={client.legal.legalNoticeUrl}>mentions légales</a>).
      </p>

      <h2>5. Données personnelles</h2>
      <p>
        Le traitement des données est détaillé dans notre{' '}
        <a href={client.legal.privacyUrl}>Politique de confidentialité</a>.
      </p>

      <h2>6. Droit applicable</h2>
      <p>
        Les présentes conditions sont soumises au droit français. Tout litige relève de la
        compétence des tribunaux français, après recherche d’une solution amiable.
      </p>
    </LegalPage>
  );
}
