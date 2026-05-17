import type { LPContent } from './types';

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
    text: 'disponibles cette semaine — Marseille & Aix-en-Provence',
    withDot: true,
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
    { icon: 'star', label: '4,5/5 Google', rating: '187 avis vérifiés' },
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
    eyebrow: 'Nos réalisations',
    h2Lead: 'Le matin, votre baignoire.',
    h2Highlight: 'Le soir, votre douche.',
    intro:
      "Notre méthode élimine la démolition lourde. Nous installons un nouveau receveur extra-plat et des panneaux muraux étanches qui s'adaptent à votre espace existant.",
    introStrong: ['nouveau receveur extra-plat'],
    stats: [
      { value: '24', unit: 'h', label: 'Pose complète' },
      { value: '0', unit: 'kg', label: 'De gravats' },
    ],
    caption: '→ Faites glisser le curseur pour découvrir une transformation à Aubagne.',
    itemCaptionPrefix: 'Réalisation à',
    items: [
      {
        label: 'Aubagne · 1 journée · Septembre 2025',
        before: {
          src: u('photo-1620626011761-996317b8d101', 1200),
          alt: 'Baignoire ancienne avant rénovation à Aubagne',
        },
        after: {
          src: u('photo-1552321554-5fefe8c9ef14', 1200),
          alt: 'Douche italienne moderne après rénovation',
        },
      },
      {
        label: 'Marseille 8e · 1 journée · Août 2025',
        before: {
          src: u('photo-1604014237800-1c9102c219da', 1200),
          alt: 'Salle de bain ancienne à Marseille',
        },
        after: {
          src: u('photo-1600585154340-be6161a56a0c', 1200),
          alt: 'Douche moderne paroi vitrée',
        },
      },
      {
        label: 'Aix-en-Provence · 1 journée · Juin 2025',
        before: {
          src: u('photo-1584622650111-993a426fbf0a', 1200),
          alt: 'Baignoire vieillissante',
        },
        after: {
          src: u('photo-1564540583246-934409427776', 1200),
          alt: 'Douche italienne après transformation',
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
    items: [
      {
        q: 'Combien ça coûte vraiment ?',
        a: "Le coût dépend de votre configuration actuelle, des matériaux choisis et de l'étendue des travaux. Notre expert se déplace gratuitement chez vous pour établir un devis précis et personnalisé, en intégrant toutes les aides auxquelles vous avez droit. Aucun engagement, aucune obligation.",
      },
      {
        q: "Vraiment 1 jour ? Comment c'est possible ?",
        a: "Oui, vraiment. Notre méthode consiste à poser un nouveau receveur extra-plat directement sur l'ancienne installation, avec des panneaux muraux étanches qui s'adaptent à votre espace. Pas de démolition lourde, pas de gravats, pas de poussière. Tout est prêt à l'usage le soir même.",
      },
      {
        q: 'Vous cassez ma baignoire ?',
        a: "Non. La baignoire est déposée par sections (et non cassée), ce qui évite la poussière et les nuisances. Nous emportons l'ancien matériel pour vous. Vos voisins ne sauront même pas qu'il y a un chantier.",
      },
      {
        q: "Et si j'habite en copropriété ?",
        a: 'Aucun problème. Nos chantiers s\'effectuent sans bruit excessif et nous respectons les horaires de copropriété. Si nécessaire, nous vous aidons à informer le syndic.',
      },
      {
        q: 'Quels matériaux utilisez-vous ?',
        a: 'Uniquement des matériaux haut de gamme : receveur antidérapant norme PN24, parois en verre sécurit 6mm, robinetterie italienne thermostatique, panneaux muraux 100% étanches avec large choix de finitions.',
      },
      {
        q: 'Vous intervenez où exactement dans le 13 ?',
        a: "Marseille et toute sa métropole, Aix-en-Provence, Aubagne, Vitrolles, Marignane, La Ciotat, Martigues, Salon-de-Provence, Istres, Arles, Cassis et l'ensemble des Bouches-du-Rhône.",
      },
      {
        q: 'Quelles aides puis-je obtenir ?',
        a: "Selon votre situation : MaPrimeAdapt' (60 ans et +), TVA réduite à 5,5%, crédit d'impôt 25% pour équipements PMR, aides des caisses de retraite, Action Logement. Notre expert calcule votre éligibilité gratuitement et monte le dossier pour vous.",
      },
      {
        q: 'Quelles garanties ?',
        a: 'Garantie décennale 10 ans sur tous nos chantiers, assurée par MAAF. Garantie 2 ans sur les équipements. Une visite SAV est offerte à 6 mois pour vérifier la bonne tenue de l\'installation.',
      },
      {
        q: 'Sous quel délai pouvez-vous intervenir ?',
        a: 'Comptez environ 2 à 4 semaines entre la signature du devis et la pose. Nous nous adaptons à votre planning.',
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
    budgets: [
      'Moins de 4 000 €',
      '4 000 — 6 000 €',
      '6 000 — 10 000 €',
      'Plus de 10 000 €',
      'Je préfère qu\'on en parle',
    ],
    timings: [
      'Dès que possible',
      'Sous 1 à 3 mois',
      'Sous 3 à 6 mois',
      'Plus tard, je me renseigne',
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
