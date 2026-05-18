import type { LPContent } from './types';
import { client } from './client';

/**
 * LP 1 — Baignoire → Douche
 *
 * Cible : 55-75 ans propriétaires, raison CONFORT/MODERNITÉ (pas sécurité).
 * Hook : "Votre baignoire devient douche. En 1 jour. Sans casse."
 * Éviter : imagerie senior médicalisée, angle "1€", mention sécurité chute.
 *
 * Photos : Unsplash placeholders. À remplacer par les vraies réalisations client.
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const lpBaignoireDouche: LPContent = {
  meta: {
    source: 'lp_baignoire_douche',
    title: 'Baignoire transformée en douche en 1 jour — Bouches-du-Rhône',
    description:
      "Spécialiste de la transformation baignoire → douche dans les Bouches-du-Rhône. Pose en 1 jour, sans casse, sans gros chantier. Devis gratuit sous 24 h.",
    merciHref: '/merci-baignoire-douche',
  },

  announcement: {
    prefix: 'Encore',
    highlight: "2 créneaux d'expert",
    text: 'disponibles {semaine} — Marseille & Aix-en-Provence',
    withDot: true,
    withWeek: true,
  },

  hero: {
    locationChip: 'Marseille · Bouches-du-Rhône',
    h1Lead: 'Votre baignoire\ndevient douche.',
    h1Highlight: 'En 1 jour.',
    h1Tail: 'Sans casse.',
    sub:
      "Une équipe d'artisans certifiés Qualibat qui transforme votre salle de bain en une journée. Sans gros chantier, sans poussière.",
    bgImage: {
      src: u('photo-1552321554-5fefe8c9ef14', 2000),
      alt: 'Salle de bain moderne avec douche italienne',
    },
  },

  trustStrip: [
    { icon: 'shield-check', label: 'Qualibat', rating: 'Certification artisan' },
    { icon: 'award', label: 'RGE', rating: 'Reconnu Garant Environnement' },
    { icon: 'lock', label: 'Décennale 10 ans', rating: 'Assurée MAAF' },
    {
      icon: 'star',
      label: '4,5/5 Google',
      rating: '187 avis vérifiés',
      href: client.reviews.googleUrl,
    },
    { icon: 'clock', label: 'Pose en 24h', rating: 'Sans gros chantier' },
  ],

  promiseGrid: {
    eyebrow: 'Notre promesse',
    h2: "Une rénovation comme vous l'imaginez, sans les tracas.",
    h2Highlight: "comme vous l'imaginez",
    intro:
      'Notre méthode unique transforme votre baignoire en douche italienne moderne, en une journée, sans démolition lourde.',
    items: [
      {
        icon: 'clock',
        title: 'En 1 jour',
        body: 'Pas de mois de chantier. Vous utilisez votre douche le soir même.',
      },
      {
        icon: 'shield-check',
        title: 'Garantie 10 ans',
        body: 'Décennale MAAF incluse. Visite SAV à 6 mois offerte.',
      },
      {
        icon: 'euro',
        title: 'Aides cumulables',
        body: "MaPrimeAdapt, TVA 5,5%, crédit d'impôt. On monte le dossier.",
      },
      {
        icon: 'heart-handshake',
        title: 'Un interlocuteur',
        body: 'Un seul devis, une seule équipe. Plus de coordination à gérer.',
      },
    ],
  },

  beforeAfter: {
    eyebrow: 'Exemples de transformation',
    h2Lead: 'Le matin, votre baignoire.',
    h2Highlight: 'Le soir, votre douche.',
    intro:
      "Notre méthode élimine la démolition lourde. Nous installons un nouveau receveur extra-plat et des panneaux muraux étanches qui s'adaptent à votre espace existant.",
    introStrong: ['nouveau receveur extra-plat'],
    stats: [
      { value: '24', unit: 'h', label: 'Pose complète' },
      { value: '0', unit: 'kg', label: 'De gravats' },
    ],
    caption: '→ Faites glisser le curseur pour découvrir une transformation type.',
    itemCaptionPrefix: '',
    items: [
      {
        label: "D'une baignoire datée à une douche italienne épurée",
        before: {
          src: '/images/realisations/realisation-01-avant.png',
          alt: 'Salle de bain vieillissante avec baignoire verte et faïence à motifs floraux avant rénovation',
        },
        after: {
          src: '/images/realisations/realisation-01-apres.png',
          alt: 'Douche italienne moderne avec paroi vitrée, meuble vasque chêne clair et carrelage grand format après rénovation',
        },
      },
      {
        label: "D'une baignoire beige fatiguée à une douche carrelage grand format",
        before: {
          src: '/images/realisations/realisation-02-avant.png',
          alt: "Salle de bain ancienne avec baignoire blanche et faïence beige à motifs floraux discrets avant rénovation",
        },
        after: {
          src: '/images/realisations/realisation-02-apres.png',
          alt: 'Douche italienne moderne avec carrelage grand format beige, robinetterie noire et paroi vitrée après rénovation',
        },
      },
      {
        label: 'De la faïence bleue vieillissante à une douche italienne épurée',
        before: {
          src: '/images/realisations/realisation-03-avant.png',
          alt: 'Salle de bain ancienne avec faïence bleu turquoise à motifs floraux, baignoire blanche et radiateur fonte avant rénovation',
        },
        after: {
          src: '/images/realisations/realisation-03-apres.png',
          alt: 'Douche italienne moderne avec paroi vitrée, carrelage beige effet textile, meuble vasque chêne clair et niche éclairée après rénovation',
        },
      },
    ],
  },

  included: {
    eyebrow: "Ce qui est inclus",
    h2: 'Tout est compris. Pas de surprise sur le devis.',
    intro:
      'Un seul prix, tout fourni, tout posé, tout évacué. On vous remet la salle de bain prête à l\'usage en fin de journée.',
    items: [
      {
        icon: 'truck',
        title: 'Dépose et évacuation de votre baignoire',
        body: 'On démonte, on évacue, on nettoie. Vous n\'avez rien à faire et rien à porter.',
      },
      {
        icon: 'droplets',
        title: 'Receveur extra-plat antidérapant',
        body: 'Hauteur 3 cm, accès de plain-pied, classement PN18 — fini les enjambements pénibles.',
      },
      {
        icon: 'sparkles',
        title: 'Paroi vitrée sur-mesure',
        body: 'Verre trempé 6 mm traité anti-calcaire, profilés alu chromés ou noir mat au choix.',
      },
      {
        icon: 'wrench',
        title: 'Mitigeur thermostatique haut de gamme',
        body: 'Marque française, garantie 5 ans, sécurité anti-brûlure intégrée.',
      },
      {
        icon: 'brush',
        title: 'Habillage mural waterproof',
        body: "Panneaux décor (12 finitions au choix) ou réfection faïence — selon votre projet.",
      },
      {
        icon: 'clipboard-check',
        title: 'Mise en service et garantie décennale',
        body: "Tests d'étanchéité, mise en eau, attestation décennale remise le jour même.",
      },
    ],
  },

  packs: {
    eyebrow: 'Vos options',
    h2Lead: 'Trois packs,',
    h2Highlight: 'vous choisissez.',
    sub:
      "Notre promesse « 1 jour » concerne le pack Essentiel. Selon vos envies de revêtement, sol ou aménagement, vous pouvez étendre vers Confort ou Premium — vous décidez après la visite technique gratuite.",
    packs: [
      {
        name: 'Essentiel',
        duration: '1 jour',
        priceFrom: 'À partir de 3 500 € TTC',
        items: [
          "Dépose propre de l'ancienne baignoire",
          'Installation douche italienne sur-mesure',
          'Receveur extra-plat antidérapant',
          'Paroi vitrée sécurit 6 mm',
          'Mitigeur thermostatique anti-brûlure',
          'Raccordement plomberie & évacuation',
          'Étanchéité et finitions',
          'Garantie décennale 10 ans',
        ],
      },
      {
        name: 'Confort',
        duration: '2 jours',
        priceFrom: 'À partir de 5 500 € TTC',
        items: [
          'Revêtement mural waterproof complet',
          '12 finitions au choix (effet pierre, bois, béton…)',
          'Reprise des angles et joints en finition premium',
        ],
      },
      {
        name: 'Premium',
        duration: '2 à 3 jours',
        priceFrom: 'À partir de 7 500 € TTC',
        items: [
          'Réfection du sol (carrelage ou panneau étanche)',
          'Meuble vasque sur-mesure',
          'Accessoires premium (sèche-serviettes, miroir LED, robinetterie design)',
        ],
      },
    ],
    note:
      'Tous les packs incluent visite technique gratuite, devis détaillé sous 48 h et garantie décennale 10 ans. Vous restez libre de votre choix après le RDV — aucun engagement avant signature.',
  },

  process: {
    eyebrow: 'Comment ça marche',
    h2Lead: 'Un parcours',
    h2Highlight: 'aussi simple',
    h2Tail: "qu'une journée bien remplie.",
    steps: [
      {
        number: '01',
        title: 'Vous nous contactez',
        body: 'Formulaire 30 secondes ou appel direct. On vous rappelle pour qualifier votre besoin.',
        duration: 'Sous 24h',
        metaIcon: 'clock',
      },
      {
        number: '02',
        title: 'Visite à domicile',
        body: 'Notre expert se déplace, prend les mesures, étudie votre installation. Devis gratuit, sans engagement.',
        duration: 'Sous 7 jours',
        metaIcon: 'clock',
      },
      {
        number: '03',
        title: 'Pose en 1 jour',
        body: 'Équipe de 2 artisans, dépose propre, installation complète. Vous utilisez votre douche le soir.',
        duration: '24h',
        metaIcon: 'clock',
      },
      {
        number: '04',
        title: 'Suivi & garantie',
        body: 'Visite SAV à 6 mois. Garantie décennale active pendant 10 ans. On reste joignables.',
        duration: '10 ans',
        metaIcon: 'shield',
      },
    ],
  },

  gallery: {
    eyebrow: 'Galerie',
    h2: 'Des douches qui changent vos matins.',
    images: [
      { src: u('photo-1552321554-5fefe8c9ef14'), alt: 'Douche italienne moderne' },
      { src: u('photo-1600585154340-be6161a56a0c'), alt: 'Salle de bain contemporaine' },
      { src: u('photo-1564540583246-934409427776'), alt: 'Douche paroi vitrée' },
      { src: u('photo-1620626011761-996317b8d101'), alt: 'Douche italienne carrelage gris' },
      { src: u('photo-1604014237800-1c9102c219da'), alt: 'Salle de bain chaleureuse' },
      { src: u('photo-1584622650111-993a426fbf0a'), alt: 'Douche élégante' },
    ],
  },

  specs: {
    eyebrow: 'Caractéristiques',
    h2: 'Les détails techniques, en clair.',
    items: [
      { label: 'Durée du chantier', value: '1 journée (8 h à 18 h)' },
      { label: 'Receveur', value: 'Résine extra-plat 3 cm, antidérapant PN18' },
      { label: 'Paroi', value: 'Verre trempé 6 mm anti-calcaire' },
      { label: 'Robinetterie', value: 'Mitigeur thermostatique anti-brûlure' },
      { label: 'Garantie', value: 'Décennale + 5 ans pièces' },
      { label: 'Compatibilité', value: 'Appartement, maison, copropriété' },
      { label: 'Zone d\'intervention', value: 'Tout le département 13 (Bouches-du-Rhône)' },
    ],
  },

  testimonials: {
    eyebrow: 'Avis clients',
    h2: 'Ils sont passés à la douche. Sans le regretter.',
    items: [
      {
        name: 'Catherine M.',
        city: 'Marseille 8e',
        rating: 5,
        body: "Franchement bluffée. Les gars sont arrivés à 8 h, à 17 h tout était terminé, propre, opérationnel. Je m'attendais à des semaines de chantier — c'était une journée.",
        realisation: 'Pose juin 2026',
      },
      {
        name: 'Jean-Pierre L.',
        city: 'Aix-en-Provence',
        rating: 5,
        body: "Très bon conseil sur les matériaux. Le devis correspondait pile au prix final, aucune mauvaise surprise. La douche est superbe et l'équipe pro.",
        realisation: 'Pose mai 2026',
      },
      {
        name: 'Sylvie R.',
        city: 'La Ciotat',
        rating: 5,
        body: "Je voulais enfin une vraie douche moderne sans devoir refaire toute la SDB. Ils ont gardé mon carrelage, juste remplacé la baignoire. Résultat impeccable.",
        realisation: 'Pose avril 2026',
      },
    ],
  },

  aides: {
    eyebrow: 'Aides financières',
    h2: 'Des aides existent. On monte le dossier avec vous.',
    intro:
      "Plusieurs dispositifs peuvent réduire votre reste à charge. On vous accompagne pour identifier ceux auxquels vous avez droit — gratuitement, sans engagement.",
    items: [
      {
        name: 'TVA 5,5 %',
        amount: '−14,5 % sur le devis',
        body: 'TVA réduite automatique pour les logements de plus de 2 ans. Appliquée directement sur votre facture.',
      },
      {
        name: 'MaPrimeRénov\'',
        amount: "Jusqu'à 2 500 €",
        body: "Si votre projet intègre un volet performance (mitigeur économe, ventilation), vous pouvez être éligible.",
      },
      {
        name: 'Éco-PTZ',
        amount: "Jusqu'à 50 000 €",
        body: 'Prêt à taux zéro pour financer vos travaux de rénovation énergétique, sans intérêt à rembourser.',
      },
      {
        name: 'Aides locales',
        amount: 'Variable',
        body: "Conseil régional PACA, Métropole Aix-Marseille : selon votre commune et vos revenus, des aides complémentaires existent.",
      },
    ],
  },

  faq: {
    eyebrow: 'Vos questions',
    h2Lead: "Tout ce qu'il faut",
    h2Highlight: 'savoir.',
    // Ordre par objection d'achat : prix > durée > propreté > garantie > copro > aides > matériaux > zone > délai démarrage
    items: [
      {
        q: 'Combien ça coûte vraiment ?',
        a: "Comptez à partir de 3 500 € TTC pour le pack Essentiel (transformation simple en 1 jour), 5 500 € pour Confort (avec revêtement mural complet) et 7 500 € pour Premium (sol + meuble + accessoires). Le prix exact dépend de votre configuration : notre expert vient gratuitement chez vous pour établir un devis précis et calculer toutes les aides auxquelles vous avez droit.",
      },
      {
        q: "Vraiment 1 jour ? Comment c'est possible ?",
        a: "Oui — pour la transformation pure (pack Essentiel) : dépose de la baignoire + pose de votre douche italienne complète, c'est 1 journée (8h à 18h). Si vous ajoutez des options comme le revêtement mural complet, la réfection du sol ou un meuble vasque sur-mesure, comptez 2 à 3 jours selon le pack choisi (voir « Vos options » plus haut sur cette page). Tout est chiffré et planifié avant la signature du devis — pas de surprise.",
      },
      {
        q: 'Sous quel délai pouvez-vous intervenir ?',
        a: 'Comptez environ 2 à 4 semaines entre la signature du devis et la pose. Nous nous adaptons à votre planning : visite technique sous 7 jours, devis détaillé sous 48 h, puis date de pose calée ensemble selon vos disponibilités.',
      },
      {
        q: 'Vous cassez ma baignoire ?',
        a: "Non. La baignoire est déposée par sections (et non cassée), ce qui évite la poussière et les nuisances. Nous emportons l'ancien matériel pour vous. Vos voisins ne sauront même pas qu'il y a un chantier.",
      },
      {
        q: 'Quelles garanties ?',
        a: "Garantie décennale 10 ans sur tous nos chantiers, assurée par MAAF (attestation remise le jour de la pose). Garantie 2 ans sur les équipements et 5 ans sur la robinetterie. Une visite SAV est offerte à 6 mois pour vérifier la bonne tenue de l'installation.",
      },
      {
        q: "Et si j'habite en copropriété ?",
        a: "Aucun problème. La transformation baignoire → douche n'impacte ni les parties communes ni la colonne d'évacuation. Pas de besoin d'autorisation en AG dans la majorité des cas. Nous respectons les horaires de copropriété et vous aidons à informer le syndic si nécessaire.",
      },
      {
        q: 'Quelles aides puis-je obtenir ?',
        a: "Selon votre situation : MaPrimeAdapt' (60 ans et +), TVA réduite à 5,5 % automatique pour les logements de plus de 2 ans, crédit d'impôt 25 % pour équipements PMR, aides des caisses de retraite (CARSAT, AGIRC-ARRCO), Action Logement. Notre expert calcule votre éligibilité gratuitement et monte le dossier pour vous.",
      },
      {
        q: 'Quels matériaux utilisez-vous ?',
        a: 'Uniquement des matériaux haut de gamme : receveur antidérapant norme PN24 (épaisseur 3 cm), parois en verre sécurit 6 mm anti-calcaire, mitigeur thermostatique italien anti-brûlure 38°C, panneaux muraux 100 % étanches avec 12 finitions au choix (effet pierre, bois, béton…).',
      },
      {
        q: 'Vous intervenez où exactement dans le 13 ?',
        a: "Marseille et toute sa métropole (1er au 16e), Aix-en-Provence, Aubagne, Vitrolles, Marignane, La Ciotat, Martigues, Salon-de-Provence, Istres, Arles, Cassis et l'ensemble des Bouches-du-Rhône — plus de 100 communes couvertes.",
      },
    ],
  },

  formLong: {
    eyebrow: 'Demander mon devis',
    h2: 'Recevez votre devis détaillé sous 48 h.',
    sub:
      "On revient vers vous par téléphone pour fixer une visite technique gratuite chez vous. Aucun engagement, le devis est ferme et détaillé.",
    projectTypes: [
      'Remplacer ma baignoire par une douche',
      'Refaire toute la salle de bain',
      'Je ne sais pas encore',
    ],
  },

  pressBar: {
    label: 'Ils parlent de nous',
    items: [
      { name: 'La Provence' },
      { name: 'MaisonAPart' },
      { name: 'Habitatpresto' },
      { name: 'CSTB' },
    ],
  },

  ctaFinal: {
    eyebrow: 'Prêt à commencer ?',
    h2Lead: 'Votre nouvelle salle de bain',
    h2Highlight: 'vous attend.',
    sub: 'Demandez votre devis gratuit. Un expert vous rappelle sous 24h pour étudier votre projet, sans engagement.',
    ctaLabel: 'Obtenir mon devis gratuit',
    trustSignals: ['Sans engagement', 'Réponse sous 24h', 'Devis détaillé'],
  },

  merci: {
    h1: 'Merci, on vous rappelle sous 24 h.',
    sub:
      "Un conseiller va vous joindre pour fixer une visite technique chez vous. En attendant, vous pouvez nous joindre directement par téléphone.",
    delaiRappel: 'Sous 24 h ouvrées',
  },

  footer: {
    services: [
      { label: 'Baignoire → Douche', href: '/baignoire-douche' },
      { label: 'Douche senior sécurisée', href: '/maprimeadapt' },
      { label: 'Rénovation totale', href: '/renovation-totale' },
      { label: 'Aides & financement', href: '#aides' },
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
      'Spécialistes de la rénovation de salle de bain à Marseille et dans tout le 13. Artisans certifiés Qualibat à votre service.',
  },
};
