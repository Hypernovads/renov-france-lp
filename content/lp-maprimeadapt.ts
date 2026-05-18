import type { LPContent } from './types';
import { client } from './client';

/**
 * LP 2 — MaPrimeAdapt' (douche sécurisée senior).
 *
 * Cible : 65+ revenus modestes OU enfants équipant leurs parents.
 * Hook : "Votre douche sécurisée à partir de 1€" après aides cumulées.
 * Différenciateur central : MaPrimeAdapt' (jusqu'à 70% du HT) + caisses retraite
 * + crédit d'impôt + TVA 5,5%, dossier monté entièrement par nous.
 *
 * Visuels : seniors souriants 60-75 ans dignes, actifs, lumineux. PAS d'imagerie
 * EHPAD, médicale ou dramatisante. La sécurité = sérénité, pas peur.
 *
 * Équipements à mettre en avant : barre de maintien, siège rabattable, mitigeur
 * anti-brûlure 38°C, receveur antidérapant PN24, robinetterie ergonomique.
 *
 * Le hero affichera le QuizMaPrimeAdapt à droite (au lieu du ZipGate de la LP1).
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const lpMaPrimeAdapt: LPContent = {
  meta: {
    source: 'lp_maprimeadapt',
    title: 'Votre douche sécurisée à partir de 1€ — Bouches-du-Rhône',
    description:
      "MaPrimeAdapt', TVA 5,5 %, aides caisses de retraite. Notre expert calcule votre éligibilité gratuitement et monte tout le dossier. Pose en 1 jour dans les Bouches-du-Rhône.",
    merciHref: '/merci-maprimeadapt',
  },

  announcement: {
    prefix: 'Aides cumulables',
    highlight: 'jusqu’à 70 %',
    text: '— testez votre éligibilité {semaine} en 30 secondes',
    withDot: true,
    withWeek: true,
  },

  hero: {
    locationChip: 'Marseille · Bouches-du-Rhône',
    h1Lead: 'Votre douche\nsécurisée',
    h1Highlight: 'à partir de 1€',
    h1Tail: 'après aides.',
    sub:
      "Testez votre éligibilité en 30 secondes. Notre expert monte gratuitement votre dossier MaPrimeAdapt', caisse de retraite et toutes les aides cumulables. Pose en 1 jour, sans démolition.",
    bgImage: {
      src: u('photo-1556909114-f6e7ad7d3136', 2000),
      alt: 'Senior sereine après installation de sa nouvelle douche sécurisée',
    },
  },

  trustStrip: [
    { icon: 'shield-check', label: 'Qualibat Handibat', rating: 'Certifié PMR' },
    { icon: 'award', label: 'RGE', rating: 'Reconnu Garant Environnement' },
    { icon: 'lock', label: 'Décennale 10 ans', rating: 'Assurée MAAF' },
    {
      icon: 'star',
      label: '4,5/5 Google',
      rating: '187 avis vérifiés',
      href: client.reviews.googleUrl,
    },
    { icon: 'clock', label: 'Pose en 24h', rating: 'Sans démolition' },
  ],

  promiseGrid: {
    eyebrow: 'Notre engagement',
    h2: 'Une douche sécurisée, sans paperasse, sans souci.',
    h2Highlight: 'sans paperasse',
    intro:
      "On s'occupe de tout : montage du dossier d'aides, pose en 1 jour, suivi pendant 10 ans. Vous, vous profitez de votre nouvelle douche.",
    items: [
      {
        icon: 'euro',
        title: "À partir de 1€",
        body: "Après cumul des aides (MaPrimeAdapt' jusqu'à 70 %, caisses de retraite, crédit d'impôt 25 %, TVA 5,5 %).",
      },
      {
        icon: 'shield-check',
        title: 'Sécurité totale',
        body: 'Barre de maintien, siège rabattable, sol antidérapant PN24, mitigeur anti-brûlure 38°C — équipements certifiés PMR.',
      },
      {
        icon: 'clipboard-check',
        title: 'Dossier monté par nous',
        body: "Vous ne touchez à aucune paperasse. Notre conseillère dédiée s'occupe de toutes les démarches MaPrimeAdapt', de A à Z.",
      },
      {
        icon: 'clock',
        title: 'Pose en 1 jour',
        body: 'Sans démolition lourde, sans poussière. Vous utilisez votre douche le soir même.',
      },
    ],
  },

  // Pas de slider avant/après sur LP2 — le quiz d'éligibilité du hero fait office de "morceau central".
  // On garde quand même 1 paire pour la preuve visuelle de la transformation.
  beforeAfter: {
    eyebrow: 'Avant — Après',
    h2Lead: 'Plus de baignoire à enjamber.',
    h2Highlight: 'Une douche de plain-pied, sécurisée.',
    intro:
      "Notre méthode élimine la marche d'enjambement. Receveur extra-plat 3 cm, antidérapant certifié PN24, accès facilité.",
    introStrong: ['receveur extra-plat 3 cm'],
    stats: [
      { value: '3', unit: 'cm', label: 'Hauteur du receveur' },
      { value: 'PN24', label: 'Norme antidérapante' },
    ],
    caption: '→ Faites glisser pour voir la transformation type.',
    itemCaptionPrefix: '',
    items: [
      {
        label: "D'une baignoire à enjamber à une douche de plain-pied sécurisée",
        before: {
          src: '/images/realisations/realisation-01-avant.png',
          alt: 'Baignoire à enjamber, équipement non sécurisé pour personne âgée',
        },
        after: {
          src: '/images/realisations/realisation-01-apres.png',
          alt: 'Douche de plain-pied moderne avec accès facilité',
        },
      },
    ],
  },

  included: {
    eyebrow: 'Équipements inclus',
    h2: 'Tout ce qu’il faut pour vivre votre douche en sécurité.',
    intro:
      "Notre pack senior inclut tous les équipements certifiés PMR — pas d'options à ajouter, pas de mauvaise surprise.",
    items: [
      {
        icon: 'droplets',
        title: 'Receveur extra-plat antidérapant PN24',
        body: 'Hauteur 3 cm, accès de plain-pied, sol classe C anti-glisse même mouillé.',
      },
      {
        icon: 'shield-check',
        title: 'Barre de maintien certifiée',
        body: "Inox brossé, design discret, supporte jusqu'à 200 kg. Positionnée selon votre morphologie.",
      },
      {
        icon: 'home',
        title: 'Siège rabattable',
        body: 'Siège confort qui se replie contre le mur. Charge max 150 kg, certifié PMR.',
      },
      {
        icon: 'sun',
        title: 'Mitigeur thermostatique anti-brûlure',
        body: 'Sécurité 38 °C max, butée enfant désactivable, marque française garantie 5 ans.',
      },
      {
        icon: 'sparkles',
        title: 'Robinetterie ergonomique',
        body: 'Levier large à manipuler sans force, douchette légère à hauteur variable.',
      },
      {
        icon: 'clipboard-check',
        title: 'Dossier complet MaPrimeAdapt’',
        body: "Notre conseillère monte votre dossier de A à Z. Vous ne touchez à aucune paperasse.",
      },
    ],
  },

  process: {
    eyebrow: 'Comment ça se passe',
    h2Lead: 'Un parcours',
    h2Highlight: 'serein,',
    h2Tail: "balisé étape par étape.",
    steps: [
      {
        number: '01',
        title: 'Quiz d’éligibilité',
        body: '30 secondes pour estimer vos aides cumulables. Sans engagement, sans données stockées avant votre accord.',
        duration: '30 sec',
        metaIcon: 'clock',
      },
      {
        number: '02',
        title: 'Visite expert chez vous',
        body: 'Notre conseillère se déplace gratuitement, mesure, étudie votre installation et chiffre précisément.',
        duration: 'Sous 7 jours',
        metaIcon: 'clock',
      },
      {
        number: '03',
        title: 'On monte votre dossier d’aides',
        body: "Constitution MaPrimeAdapt', caisse de retraite, crédit d'impôt. Tout est validé avant la pose.",
        duration: 'Sous 14 jours',
        metaIcon: 'clock',
      },
      {
        number: '04',
        title: 'Pose en 1 journée',
        body: "Équipe de 2 artisans certifiés Handibat, 8 h à 18 h. Vous utilisez votre douche le soir.",
        duration: '24h',
        metaIcon: 'shield',
      },
    ],
  },

  gallery: {
    eyebrow: 'Galerie',
    h2: 'Des douches conçues pour durer.',
    images: [
      { src: u('photo-1552321554-5fefe8c9ef14'), alt: 'Douche italienne épurée' },
      { src: u('photo-1620626011761-996317b8d101'), alt: 'Douche carrelage grand format' },
      { src: u('photo-1564540583246-934409427776'), alt: 'Douche paroi vitrée' },
      { src: u('photo-1600585154340-be6161a56a0c'), alt: 'Salle de bain contemporaine' },
      { src: u('photo-1604014237800-1c9102c219da'), alt: 'Salle de bain chaleureuse' },
      { src: u('photo-1584622650111-993a426fbf0a'), alt: 'Douche élégante' },
    ],
  },

  specs: {
    eyebrow: 'Caractéristiques',
    h2: 'Les détails techniques de votre pack senior.',
    items: [
      { label: 'Durée du chantier', value: '1 journée (8 h à 18 h)' },
      { label: 'Receveur', value: 'Résine extra-plat 3 cm, antidérapant PN24' },
      { label: 'Barre de maintien', value: 'Inox brossé, charge 200 kg, certifiée PMR' },
      { label: 'Siège', value: 'Rabattable mural, charge 150 kg' },
      { label: 'Mitigeur', value: 'Thermostatique anti-brûlure 38 °C max' },
      { label: 'Paroi', value: 'Verre trempé 6 mm anti-calcaire' },
      { label: 'Garantie', value: 'Décennale + 5 ans pièces' },
      { label: 'Certifications', value: 'Qualibat Handibat, RGE' },
      { label: "Zone d'intervention", value: 'Tout le département 13 (Bouches-du-Rhône)' },
    ],
  },

  testimonials: {
    eyebrow: 'Témoignages',
    h2: 'Ils nous ont fait confiance pour leurs parents (ou pour eux).',
    items: [
      {
        name: 'Sylvie L.',
        city: 'Marseille 12e · pour sa mère',
        rating: 5,
        body: "On a équipé maman en 1 jour. Elle n'aurait jamais fait les démarches d'aides toute seule — leur conseillère s'est occupée de tout. Résultat : un reste à charge minime et une douche enfin sécurisée.",
      },
      {
        name: 'Georges P.',
        city: 'Aix-en-Provence',
        rating: 5,
        body: "Le dossier MaPrimeAdapt' a couvert 68 % du chantier. Net à payer : 950 €. Service impeccable du premier appel jusqu'à la pose. Je recommande sans hésiter.",
      },
      {
        name: 'Marguerite D.',
        city: 'Aubagne',
        rating: 5,
        body: "À 78 ans, je n'osais plus prendre ma douche seule. Aujourd'hui je l'utilise tous les jours en sécurité. Merci à toute l'équipe pour leur patience et leur professionnalisme.",
      },
    ],
  },

  aides: {
    eyebrow: 'Vos aides cumulables',
    h2: "Cumulez les aides. Réduisez votre reste à charge jusqu'à 99 %.",
    intro:
      "Selon votre âge, vos revenus et votre situation, plusieurs dispositifs se cumulent. Notre conseillère calcule votre éligibilité gratuitement et monte le dossier complet.",
    items: [
      {
        name: "MaPrimeAdapt'",
        amount: "Jusqu'à 70 % du HT",
        body: "Aide phare pour les 60 ans et +. Versée par l'ANAH selon votre niveau de revenu fiscal. Notre conseillère monte le dossier complet.",
      },
      {
        name: 'TVA 5,5 % automatique',
        amount: '−14,5 % sur le devis',
        body: 'TVA réduite pour les logements de plus de 2 ans. Appliquée directement par nos soins sur votre facture.',
      },
      {
        name: "Crédit d'impôt 25 %",
        amount: "Jusqu'à 2 500 €",
        body: "Équipements PMR (barre, siège, mitigeur anti-brûlure) éligibles au crédit d'impôt. Cumulable avec MaPrimeAdapt'.",
      },
      {
        name: 'Aides caisses de retraite',
        amount: '500 — 3 500 €',
        body: 'CARSAT, AGIRC-ARRCO, MSA selon votre régime. Notre conseillère identifie les aides auxquelles vous avez droit.',
      },
    ],
  },

  faq: {
    eyebrow: 'Vos questions',
    h2Lead: 'Tout ce que vous devez',
    h2Highlight: 'savoir.',
    items: [
      {
        q: "Suis-je éligible à MaPrimeAdapt' ?",
        a: "MaPrimeAdapt' est ouverte aux personnes de 60 ans et plus, sous conditions de revenus (modestes ou très modestes). Elle est aussi accessible aux personnes en situation de handicap (taux d'incapacité ≥ 50 %) sans condition d'âge. Le quiz en haut de page vous donne une première estimation en 30 secondes.",
      },
      {
        q: 'Combien je vais réellement payer après aides ?',
        a: "Pour un pack senior complet (~6 000 € HT), le reste à charge moyen après cumul des aides varie de 950 € à 3 200 € selon votre profil. Dans les cas les plus favorables (très modeste + RQTH + caisses), le reste à charge peut descendre à moins de 100 €. Notre conseillère calcule votre cas précis en visite gratuite.",
      },
      {
        q: 'Le dossier MaPrimeAdapt’ est compliqué ?',
        a: "Pour vous, non : notre conseillère dédiée s'occupe de TOUT (constitution, dépôt, suivi). Vous nous transmettez vos justificatifs lors de la visite, on s'occupe du reste. Délai moyen d'instruction par l'ANAH : 2 à 3 mois, mais on commence les travaux dès l'accord de financement.",
      },
      {
        q: "Et si j'équipe mes parents (je suis l'enfant) ?",
        a: "Vous pouvez tout à fait initier les démarches pour vos parents (avec leur accord). Beaucoup de nos clients sont des enfants qui équipent leurs parents — c'est même très fréquent. Les aides restent au nom de la personne âgée (le bénéficiaire), mais vous pouvez gérer la coordination.",
      },
      {
        q: 'Vraiment en 1 jour ? Comment c’est possible ?',
        a: "Oui — pour la pose du pack senior standard : dépose de la baignoire + installation de la douche sécurisée complète (receveur, paroi, barre, siège, mitigeur), c'est 1 journée (8 h à 18 h). Pas de démolition lourde grâce à notre technique de pose sur support existant.",
      },
      {
        q: "Que se passe-t-il si je n'ai pas 60 ans ?",
        a: "Si vous êtes en situation de handicap (taux ≥ 50 %), MaPrimeAdapt' reste accessible sans condition d'âge. Si vous n'avez ni 60 ans ni RQTH, vous restez éligible à la TVA 5,5 % + crédit d'impôt 25 % sur les équipements PMR. La LP 'baignoire → douche' classique est sans doute mieux adaptée à votre situation.",
      },
      {
        q: 'Quelles garanties ?',
        a: "Garantie décennale 10 ans sur l'installation, assurée par MAAF (attestation remise le jour de la pose). Garantie 5 ans pièces sur la robinetterie et le mitigeur. Visite SAV gratuite à 6 mois. Certifications Qualibat Handibat (PMR) et RGE.",
      },
      {
        q: 'Vous intervenez où exactement dans le 13 ?',
        a: "Marseille (1er au 16e), Aix-en-Provence, Aubagne, Vitrolles, Marignane, La Ciotat, Martigues, Salon-de-Provence, Istres, Arles, Cassis et l'ensemble des Bouches-du-Rhône — plus de 100 communes couvertes.",
      },
    ],
  },

  formLong: {
    eyebrow: 'Demander mon devis',
    h2: 'Recevez votre estimation personnalisée sous 48 h.',
    sub:
      "Notre conseillère vous rappelle pour planifier une visite gratuite, étudier votre éligibilité et chiffrer votre projet. Aucun engagement.",
    projectTypes: [
      'Pour moi (60 ans et +)',
      "Pour un parent / proche",
      'Pour moi (en situation de handicap)',
      'Je veux juste me renseigner',
    ],
  },

  ctaFinal: {
    eyebrow: 'Prêt à commencer ?',
    h2Lead: 'Votre douche sécurisée',
    h2Highlight: 'vous attend.',
    sub: "On monte votre dossier d'aides dès cette semaine. Visite expert gratuite, devis sous 48 h, pose en 1 jour.",
    ctaLabel: 'Tester mon éligibilité',
    trustSignals: ['Sans engagement', 'Dossier monté par nous', 'Pose en 1 jour'],
  },

  merci: {
    h1: 'Merci, on vous rappelle sous 24 h.',
    sub:
      "Notre conseillère va vous joindre pour planifier une visite expert chez vous et estimer précisément votre éligibilité MaPrimeAdapt'.",
    delaiRappel: 'Sous 24 h ouvrées',
  },

  footer: {
    services: [
      { label: 'Baignoire → Douche', href: '/baignoire-douche' },
      { label: 'Douche senior sécurisée', href: '/maprimeadapt' },
      { label: 'Rénovation totale', href: '/renovation-totale' },
      { label: "Aides & financement", href: '#aides' },
    ],
    entreprise: [
      { label: 'À propos', href: '#' },
      { label: 'Réalisations', href: '#gallery' },
      { label: 'Avis clients', href: '#testimonials' },
      { label: 'Contact', href: '#hero-form' },
    ],
    villes: [
      'Marseille',
      'Aix-en-Provence',
      'Aubagne',
      'Marignane',
      'Vitrolles',
      'La Ciotat',
      'Martigues',
      'Salon-de-Provence',
      'Istres',
      'Arles',
      'Cassis',
    ],
    tagline:
      "Spécialistes de la douche sécurisée senior à Marseille et dans tout le 13. Certifiés Qualibat Handibat (PMR), agréés MaPrimeAdapt'.",
  },
};
