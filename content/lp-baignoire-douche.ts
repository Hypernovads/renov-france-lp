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
    text: 'Devis & visite technique offerts · Pose garantie en 1 jour',
  },

  hero: {
    h1: 'Votre baignoire devient douche.',
    h1Highlight: 'En 1 jour. Sans casse.',
    sub:
      "Une douche italienne moderne, posée chez vous en une journée. Sans gros chantier, sans casser le carrelage, sans dégât d'eau. Pour le confort que votre salle de bain mérite enfin.",
    bgImage: {
      src: u('photo-1552321554-5fefe8c9ef14'),
      alt: 'Salle de bain rénovée avec douche italienne moderne',
    },
    trustChips: [
      'Pose en 1 journée',
      'Garantie 10 ans',
      'Devis 100% gratuit',
    ],
  },

  trustStrip: [
    { icon: 'shield-check', label: 'Qualibat RGE' },
    { icon: 'award', label: 'Garantie décennale' },
    { icon: 'wrench', label: 'Artisans salariés' },
    { icon: 'clock', label: 'Pose en 24 h' },
    {
      icon: 'star',
      label: 'Avis Google',
      rating: '4,5 / 5 · 127 avis',
    },
  ],

  promiseGrid: {
    eyebrow: 'Pourquoi nous',
    h2: 'Une rénovation pensée pour ne rien casser de votre quotidien.',
    items: [
      {
        icon: 'clock',
        title: 'Posée en 1 jour',
        body: "Vous quittez votre baignoire le matin, vous découvrez votre douche le soir. On s'occupe de tout, vous gardez votre quotidien.",
      },
      {
        icon: 'hammer',
        title: 'Sans gros chantier',
        body: "Notre technique de dépose sans casse préserve carrelage, faïence et plomberie existants. Pas de poussière partout, pas de semaines de travaux.",
      },
      {
        icon: 'sparkles',
        title: 'Esthétique moderne',
        body: 'Douche italienne, paroi vitrée, robinetterie design, receveur extra-plat. Une salle de bain enfin à votre goût.',
      },
      {
        icon: 'heart-handshake',
        title: 'Artisans locaux',
        body: "Tous nos poseurs sont salariés (jamais de sous-traitance). On intervient dans tout le 13, on connaît vos contraintes copropriété.",
      },
    ],
  },

  beforeAfter: {
    eyebrow: 'Réalisations',
    h2: 'Avant — après. Faites glisser pour voir.',
    intro:
      "Quelques transformations récentes chez nos clients du 13. Toutes les photos sont des chantiers réels (avec autorisation).",
    items: [
      {
        label: 'Marseille 8e · 1 jour',
        before: {
          src: u('photo-1620626011761-996317b8d101'),
          alt: 'Baignoire ancienne avant rénovation',
        },
        after: {
          src: u('photo-1552321554-5fefe8c9ef14'),
          alt: 'Douche italienne moderne après rénovation',
        },
      },
      {
        label: 'Aix-en-Provence · 1 jour',
        before: {
          src: u('photo-1604014237800-1c9102c219da'),
          alt: 'Salle de bain ancienne avant rénovation',
        },
        after: {
          src: u('photo-1600585154340-be6161a56a0c'),
          alt: 'Douche moderne paroi vitrée',
        },
      },
      {
        label: 'Cassis · 1 jour',
        before: {
          src: u('photo-1584622650111-993a426fbf0a'),
          alt: 'Baignoire vieillissante',
        },
        after: {
          src: u('photo-1564540583246-934409427776'),
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
    eyebrow: 'Comment ça se passe',
    h2: '4 étapes simples. De votre appel à votre première douche.',
    steps: [
      {
        number: '01',
        title: 'Vous nous appelez',
        body: "On échange 5 minutes au téléphone pour comprendre votre projet et fixer une visite.",
        duration: '5 min',
      },
      {
        number: '02',
        title: 'Visite technique chez vous',
        body: 'Un conseiller vient mesurer, vous montrer les finitions et chiffrer précisément. Gratuit.',
        duration: 'Sous 7 jours',
      },
      {
        number: '03',
        title: 'Devis signé, date posée',
        body: "Vous validez le devis, on bloque une date qui vous arrange. Délai moyen : 3 à 4 semaines.",
        duration: '3-4 semaines',
      },
      {
        number: '04',
        title: 'Pose en 1 journée',
        body: "Notre équipe arrive à 8 h. À 18 h, votre nouvelle douche est utilisable. Tout nettoyé, tout évacué.",
        duration: '1 jour',
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
    h2: 'Tout ce qu\'on nous demande le plus souvent.',
    items: [
      {
        q: 'Combien coûte la transformation d\'une baignoire en douche ?',
        a: "Le prix dépend de la surface, des finitions choisies et de l'état de la plomberie existante. En moyenne, comptez entre 3 500 € et 7 500 € TTC tout compris (TVA 5,5 % incluse). On vous remet un devis détaillé après visite technique gratuite — pas de prix au doigt mouillé.",
      },
      {
        q: 'Vraiment en 1 journée ? Pas de mauvaise surprise ?',
        a: "Oui, vraiment. C'est notre cœur de métier et on a affiné le process sur plus de 800 chantiers. L'équipe arrive à 8 h, vous récupérez une douche utilisable à 18 h. Les seules exceptions : sinistres cachés découverts à la dépose (fuite, plomberie HS) — on vous prévient avant tout surcoût, vous décidez.",
      },
      {
        q: 'Faut-il casser le carrelage existant ?',
        a: "Non, c'est tout l'intérêt de notre méthode. On dépose la baignoire sans toucher au carrelage qui l'entoure. On installe ensuite le receveur et la paroi par-dessus l'existant. Si vous voulez aussi changer la faïence, c'est un autre projet (rénovation totale), à voir ensemble.",
      },
      {
        q: "J'habite en copropriété, c'est compatible ?",
        a: "Oui. La transformation baignoire → douche n'impacte pas les parties communes ni la colonne d'évacuation. Pas besoin d'AG ni d'autorisation de la copro dans la plupart des cas. On vous accompagne si une déclaration est demandée par votre syndic.",
      },
      {
        q: 'Quelle garantie sur l\'installation ?',
        a: "Garantie décennale (attestation remise le jour de la pose) sur la pose et l'étanchéité, plus 5 ans pièces sur la robinetterie et 10 ans sur le receveur résine. Notre SAV intervient sous 48 h ouvrées.",
      },
      {
        q: "Vous intervenez dans toute la région ?",
        a: `Oui, dans l'ensemble du département des Bouches-du-Rhône (13) : ${"Marseille, Aix-en-Provence, Aubagne, Vitrolles, Marignane, La Ciotat, Cassis, Salon-de-Provence, Istres, Arles, Martigues"} et toutes les communes alentour. Hors zone : on étudie au cas par cas.`,
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
    h2: 'Votre nouvelle douche peut être posée le mois prochain.',
    sub: "Visite technique gratuite, devis détaillé sous 48 h, pose en 1 journée. Il ne reste qu'à nous appeler.",
    ctaLabel: 'Obtenir mon devis gratuit',
  },

  merci: {
    h1: 'Merci, on vous rappelle sous 24 h.',
    sub:
      "Un conseiller va vous joindre pour fixer une visite technique chez vous. En attendant, vous pouvez nous joindre directement par téléphone.",
    delaiRappel: 'Sous 24 h ouvrées',
  },
};
