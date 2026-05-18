import type { LPContent } from './types';
import { client } from './client';

/**
 * LP 3 — Rénovation totale de salle de bain (haut de gamme).
 *
 * Cible : 35-55 ans propriétaires aisés (CSP+ / artisans / chefs d'entreprise
 * / cadres sup' / professions libérales).
 *
 * Hook : "Votre salle de bain réinventée. Conception 3D offerte."
 *
 * Différenciateur central : conception 3D personnalisée OFFERTE livrée sous
 * 7 jours, sur-mesure intégral (pas de pack figé), 1 interlocuteur unique
 * (designer + équipe artisans), clé en main.
 *
 * Visuels : SDB design haut de gamme magazine. Carrelage grand format,
 * marbre, bois clair, robinetterie italienne. PAS d'imagerie sécurité/senior,
 * PAS de mention "1 jour" ou prix bas, PAS d'urgence agressive.
 *
 * Aides : section présente mais SECONDAIRE (la cible aisée n'arbitre pas
 * sur le prix mais sur le design + l'expérience). Focus éco-PTZ, MaPrimeRénov'
 * performance énergétique, TVA 5,5 %.
 *
 * Le hero affiche le <ConceptionForm> à droite (au lieu du ZipGate de la LP1
 * ou du Quiz MaPrimeAdapt' de la LP2).
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const lpRenovation: LPContent = {
  meta: {
    source: 'lp_renovation',
    title: 'Rénovation totale de salle de bain — Conception 3D offerte | Bouches-du-Rhône',
    description:
      "Designer + artisans Qualibat à votre service. Conception 3D personnalisée offerte, sur-mesure intégral, clé en main. Marseille, Aix-en-Provence et tout le 13.",
    merciHref: '/merci-renovation-totale',
  },

  announcement: {
    prefix: 'Conception 3D',
    highlight: 'OFFERTE',
    text: '+ accompagnement clé en main — Marseille & Bouches-du-Rhône',
    withDot: true,
  },

  hero: {
    locationChip: 'Marseille · Bouches-du-Rhône',
    h1Lead: 'Votre salle de bain',
    h1Highlight: 'réinventée.',
    h1Tail: 'Conception 3D offerte.',
    sub:
      "Une équipe de designers et d'artisans Qualibat à votre service. De la conception 3D personnalisée à la livraison clé en main : un seul interlocuteur, zéro coordination, qualité premium.",
    bgImage: {
      // Vraie réalisation RénoBain #3 : douche italienne carrelage beige effet
      // textile + paroi vitrée + niche éclairée. Ambiance "spa" premium qui parle
      // à la cible 35-55 aisée.
      src: '/images/realisations/realisation-03-apres.png',
      alt: 'Salle de bain rénovée haut de gamme avec douche italienne, carrelage grand format et meuble vasque chêne clair',
    },
  },

  trustStrip: [
    { icon: 'shield-check', label: 'Qualibat RGE', rating: 'Artisans certifiés' },
    { icon: 'award', label: 'Designer 3D', rating: 'Conception personnalisée' },
    { icon: 'lock', label: 'Décennale 10 ans', rating: 'Assurée MAAF' },
    {
      icon: 'star',
      label: '4,5/5 Google',
      rating: '187 avis vérifiés',
      href: client.reviews.googleUrl,
    },
    { icon: 'clock', label: 'Sous 7 jours', rating: 'Conception 3D livrée' },
  ],

  promiseGrid: {
    eyebrow: 'Notre méthode',
    h2: "Une rénovation pensée comme un projet d'architecte, livrée comme un chantier.",
    h2Highlight: "comme un projet d'architecte",
    intro:
      "Pas de pack figé, pas de catalogue imposé. On dessine votre salle de bain en 3D, on chiffre précisément, on construit avec nos artisans. Un seul interlocuteur du début à la fin.",
    items: [
      {
        icon: 'sparkles',
        title: 'Conception 3D personnalisée',
        body: 'Notre designer dessine votre projet avec rendus HD photo-réalistes, livrés sous 7 jours.',
      },
      {
        icon: 'brush',
        title: 'Sur-mesure intégral',
        body: 'Chaque carreau, chaque robinet, chaque meuble est choisi avec vous. Pas de pack figé.',
      },
      {
        icon: 'heart-handshake',
        title: '1 équipe, 1 interlocuteur',
        body: 'Designer + artisans Qualibat = même contact, même standards de qualité. Zéro coordination à gérer.',
      },
      {
        icon: 'clipboard-check',
        title: 'Clé en main',
        body: "De la dépose des anciens équipements à la touche finale décorative, on s'occupe de tout. Vous récupérez les clés.",
      },
    ],
  },

  beforeAfter: {
    eyebrow: 'Réalisations récentes',
    h2Lead: 'D’une salle de bain datée à un espace',
    h2Highlight: 'qui vous ressemble.',
    intro:
      "Nos artisans travaillent sur des projets de rénovation totale dans les Bouches-du-Rhône : maisons familiales, appartements haussmanniens, villas modernes. Chaque chantier est unique.",
    introStrong: ['Chaque chantier est unique'],
    stats: [
      { value: '250', unit: '+', label: 'Rénovations totales' },
      { value: '4,9', unit: '/5', label: 'Note design' },
    ],
    caption: '→ Faites glisser pour découvrir une transformation type.',
    itemCaptionPrefix: '',
    items: [
      {
        label: 'Maison familiale — rénovation complète, carrelage grand format chêne clair',
        before: {
          src: '/images/realisations/realisation-01-avant.png',
          alt: 'Salle de bain familiale datée avant rénovation totale',
        },
        after: {
          src: '/images/realisations/realisation-01-apres.png',
          alt: 'Salle de bain familiale rénovée style nature avec meuble vasque chêne',
        },
      },
      {
        label: 'Appartement contemporain — douche carrelage grand format + robinetterie noire',
        before: {
          src: '/images/realisations/realisation-02-avant.png',
          alt: 'Salle de bain appartement à rénover entièrement',
        },
        after: {
          src: '/images/realisations/realisation-02-apres.png',
          alt: 'Salle de bain contemporaine rénovation totale carrelage beige robinetterie noire',
        },
      },
      {
        label: 'Maison de caractère — alliance moderne / ancien (radiateur fonte conservé)',
        before: {
          src: '/images/realisations/realisation-03-avant.png',
          alt: 'Salle de bain de caractère à rénover',
        },
        after: {
          src: '/images/realisations/realisation-03-apres.png',
          alt: 'Salle de bain alliant moderne et ancien, douche italienne et radiateur fonte conservé',
        },
      },
    ],
  },

  included: {
    eyebrow: 'Tout est inclus',
    h2: 'Un projet clé en main, sans surprise.',
    intro:
      "Notre forfait rénovation totale couvre tous les corps de métier nécessaires. Vous validez le devis, on s'occupe du reste — dépose, gros œuvre, second œuvre, finitions, nettoyage.",
    items: [
      {
        icon: 'sparkles',
        title: 'Conception 3D photo-réaliste',
        body: 'Plans HD, rendus 360°, visite virtuelle. Validation avant tout démarrage.',
      },
      {
        icon: 'truck',
        title: 'Dépose et évacuation complète',
        body: "Anciens équipements (baignoire, faïence, sol, sanitaires), gravats, recyclage — tout est pris en charge.",
      },
      {
        icon: 'wrench',
        title: 'Plomberie et électricité aux normes',
        body: "Reprise complète des arrivées d'eau, évacuations, prises NFC 15-100. Garantie décennale.",
      },
      {
        icon: 'brush',
        title: 'Carrelage grand format + faïence',
        body: 'Sol et murs sur-mesure avec votre choix de matériaux (effet pierre, marbre, bois, béton ciré, terrazzo…).',
      },
      {
        icon: 'droplets',
        title: 'Sanitaires marque premium',
        body: 'Sélection parmi Roca, Jacob Delafon, Geberit, Duravit. Robinetterie italienne thermostatique.',
      },
      {
        icon: 'home',
        title: 'Meuble vasque sur-mesure',
        body: 'Designer + artisan menuisier. Bois massif, mélaminé haut de gamme, métal — au choix.',
      },
      {
        icon: 'sun',
        title: 'Éclairage et accessoires',
        body: 'LED intégrées, sèche-serviettes, miroirs éclairés, accessoires en cohérence avec votre design.',
      },
      {
        icon: 'clipboard-check',
        title: 'Garantie décennale + SAV',
        body: 'Décennale MAAF (10 ans) + visite SAV à 6 mois + 2 ans pièces sur équipements.',
      },
    ],
  },

  process: {
    eyebrow: 'Comment ça se passe',
    h2Lead: 'Un parcours',
    h2Highlight: 'design,',
    h2Tail: "rythmé par votre validation à chaque étape.",
    steps: [
      {
        number: '01',
        title: 'Réservation conception 3D',
        body: 'Formulaire 2 min : style, surface, créneau de RDV. Notre designer vous rappelle.',
        duration: '5 min',
        metaIcon: 'clock',
      },
      {
        number: '02',
        title: 'Conception 3D livrée',
        body: 'Visite chez vous, prise de mesures précises, design 3D photo-réaliste avec plusieurs propositions.',
        duration: 'Sous 7 jours',
        metaIcon: 'clock',
      },
      {
        number: '03',
        title: 'Validation + devis détaillé',
        body: 'Échanges sur les rendus 3D, ajustements illimités, devis ferme et chiffré par poste.',
        duration: 'Sous 14 jours',
        metaIcon: 'clock',
      },
      {
        number: '04',
        title: 'Travaux + livraison',
        body: 'Notre équipe enchaîne dépose, gros œuvre, second œuvre, finitions. Chef de chantier dédié.',
        duration: '2 à 4 sem.',
        metaIcon: 'shield',
      },
    ],
  },

  gallery: {
    eyebrow: 'Inspirations',
    h2: 'Des univers, pas des packs.',
    images: [
      { src: u('photo-1552321554-5fefe8c9ef14'), alt: 'Style nature — bois clair et verre' },
      { src: u('photo-1620626011761-996317b8d101'), alt: 'Style contemporain — carrelage grand format' },
      { src: u('photo-1564540583246-934409427776'), alt: 'Style minimaliste — paroi vitrée et béton' },
      { src: u('photo-1600585154340-be6161a56a0c'), alt: 'Style chaleureux — pierre et bois' },
      { src: u('photo-1604014237800-1c9102c219da'), alt: 'Style classique — marbre et laiton' },
      { src: u('photo-1584622650111-993a426fbf0a'), alt: 'Style industriel — béton ciré et métal noir' },
    ],
  },

  specs: {
    eyebrow: 'Standards de qualité',
    h2: 'Les détails techniques de votre rénovation.',
    items: [
      { label: 'Conception 3D', value: 'Rendus HD photo-réalistes + plans 2D techniques' },
      { label: 'Carrelage', value: 'Grand format 60×60 cm minimum, effet pierre/bois/marbre/béton' },
      { label: 'Robinetterie', value: 'Italienne thermostatique, chrome / noir mat / cuivre' },
      { label: 'Sanitaires', value: 'Marques premium (Roca, Jacob Delafon, Geberit, Duravit)' },
      { label: 'Étanchéité', value: 'Système SPEC (Système de Protection à l\'Eau sous Carrelage)' },
      { label: 'Ventilation', value: 'VMC hygroréglable B ou ventilation mécanique double flux' },
      { label: 'Éclairage', value: 'LED intégrées + spot orientable + bandeau miroir' },
      { label: 'Chauffage', value: 'Sèche-serviettes ou radiateur design intégré' },
      { label: 'Délai chantier', value: '2 à 4 semaines selon ampleur (gros œuvre inclus)' },
      { label: 'Garantie', value: 'Décennale MAAF + SAV 6 mois + 2 ans pièces' },
      { label: "Zone d'intervention", value: 'Tout le département 13 (Bouches-du-Rhône)' },
    ],
  },

  testimonials: {
    eyebrow: 'Témoignages',
    h2: 'Ils nous ont confié leur rénovation totale.',
    items: [
      {
        name: 'Pauline & Marc T.',
        city: 'Aix-en-Provence · maison familiale',
        rating: 5,
        body: "La conception 3D nous a totalement convaincus : on a pu visualiser AVANT, ajuster, redessiner. Au final, le rendu réel est exactement conforme aux plans. Chantier propre, équipe à l'écoute, on recommande sans hésiter.",
      },
      {
        name: 'Bertrand L.',
        city: 'Marseille 7e · appartement haussmannien',
        rating: 5,
        body: "On voulait du sur-mesure dans un appartement ancien avec des contraintes (parquet à protéger, plafond mouluré). Le designer a vraiment compris l'esprit du lieu. Résultat : une salle de bain contemporaine qui respecte le caractère du bâtiment.",
      },
      {
        name: 'Sandra M.',
        city: 'Cassis · villa moderne',
        rating: 5,
        body: "J'avais peur de la coordination multi-corps de métiers — au final j'ai eu un seul interlocuteur, mon designer, qui a piloté toute l'équipe. Devis ferme, délais tenus, finitions impeccables.",
      },
    ],
  },

  aides: {
    eyebrow: 'Aides cumulables',
    h2: 'Des aides financières même sur une rénovation totale.',
    intro:
      "Selon votre projet et votre situation, plusieurs dispositifs allègent votre investissement — notamment si vous intégrez un volet performance énergétique (ventilation, chauffage, isolation).",
    items: [
      {
        name: 'TVA 5,5 % automatique',
        amount: '−14,5 % sur le devis',
        body: 'TVA réduite pour les logements de plus de 2 ans. Appliquée directement par nos soins sur votre facture.',
      },
      {
        name: 'Éco-PTZ',
        amount: "Jusqu'à 50 000 €",
        body: "Prêt à taux zéro pour financer votre rénovation (sans intérêts à rembourser). Cumulable avec les aides ANAH.",
      },
      {
        name: "MaPrimeRénov' performance",
        amount: "Jusqu'à 4 500 €",
        body: "Si votre projet inclut un volet performance énergétique (ventilation hygroréglable, chauffage performant, isolation thermique).",
      },
      {
        name: 'Aides locales 13',
        amount: 'Variable',
        body: 'Métropole Aix-Marseille-Provence, Conseil Régional PACA : selon votre commune et le type de travaux, des aides complémentaires existent.',
      },
    ],
  },

  faq: {
    eyebrow: 'Vos questions',
    h2Lead: "Tout ce qu'il faut",
    h2Highlight: 'savoir.',
    items: [
      {
        q: 'Combien coûte une rénovation totale de salle de bain ?',
        a: 'Le prix dépend de la surface (5 m² ou 12 m² ne se rénovent pas pareil), des matériaux choisis (carrelage grand format premium vs faïence standard), de la complexité (déplacements de plomberie, gros œuvre) et du niveau de finitions. C\'est pour ça qu\'on ne fait pas de prix au doigt mouillé : notre designer se déplace gratuitement, dessine votre projet en 3D, puis chiffre précisément par poste. Devis ferme et détaillé.',
      },
      {
        q: 'La conception 3D est-elle vraiment offerte ?',
        a: 'Oui, totalement offerte et sans engagement. Notre designer vient chez vous, prend les mesures, écoute votre brief, puis conçoit votre salle de bain en 3D avec plusieurs propositions (style, agencement, matériaux). Vous recevez les rendus HD sous 7 jours. Si vous décidez de ne pas continuer avec nous, vous gardez les plans — on assume.',
      },
      {
        q: 'Combien de temps prend la rénovation totale ?',
        a: '2 à 4 semaines de chantier selon l\'ampleur (surface, complexité, déplacements de réseaux). Notre méthode enchaîne tous les corps de métier sans temps morts (dépose → gros œuvre → plomberie/électricité → carrelage/faïence → sanitaires → meubles → finitions). Vous récupérez votre salle de bain dans le délai contractuel ferme.',
      },
      {
        q: "Vous gérez vraiment tous les corps de métier ?",
        a: 'Oui : maçonnerie, plomberie, électricité, carrelage, peinture, menuiserie, sanitaires, robinetterie. Tous nos artisans sont salariés ou partenaires longue durée (jamais de sous-traitance au rabais). Le designer pilote l\'ensemble, vous n\'avez qu\'un seul interlocuteur du début à la fin.',
      },
      {
        q: 'Quels matériaux et marques utilisez-vous ?',
        a: 'Sanitaires : Roca, Jacob Delafon, Geberit, Duravit. Robinetterie : italienne thermostatique (Hansgrohe, Grohe, Gessi). Carrelage : grand format minimum 60×60 cm (Porcelanosa, Marazzi, Caesar). Étanchéité : système SPEC. Tous les matériaux sont libres de choix dans notre bibliothèque (200+ références).',
      },
      {
        q: "J'habite en copropriété, c'est compatible ?",
        a: "Oui. Les rénovations totales n'impactent généralement pas les parties communes (sauf si vous touchez aux colonnes d'évacuation, ce qu'on évite). On vous accompagne pour la déclaration au syndic si nécessaire. Nos artisans respectent les horaires de copropriété et tiennent les voisins informés.",
      },
      {
        q: 'Quelles garanties sur la rénovation ?',
        a: "Garantie décennale 10 ans sur l'ensemble du chantier (gros œuvre + étanchéité + plomberie + électricité), assurée par MAAF. Garantie 2 ans pièces sur les équipements. Visite SAV gratuite à 6 mois. Notre SAV intervient sous 48 h ouvrées si problème.",
      },
      {
        q: "Quelles aides puis-je obtenir ?",
        a: "TVA 5,5 % automatique pour les logements de plus de 2 ans. Éco-PTZ jusqu'à 50 000 € sans intérêts. MaPrimeRénov' performance si volet énergétique. Aides locales Métropole Aix-Marseille-Provence selon votre commune. Notre conseillère monte le dossier avec vous.",
      },
      {
        q: 'Vous intervenez où exactement dans le 13 ?',
        a: 'Marseille (1er au 16e), Aix-en-Provence, Aubagne, Vitrolles, Marignane, La Ciotat, Martigues, Salon-de-Provence, Istres, Arles, Cassis et l\'ensemble des Bouches-du-Rhône — plus de 100 communes couvertes.',
      },
    ],
  },

  formLong: {
    eyebrow: 'Réserver ma conception 3D',
    h2: 'Recevez vos plans 3D personnalisés sous 7 jours.',
    sub:
      "Notre designer vous rappelle pour planifier une visite gratuite chez vous, prendre les mesures et concevoir votre projet sur-mesure. Aucun engagement.",
    projectTypes: [
      'Rénovation totale de ma salle de bain principale',
      "Création d'une 2e salle de bain (suite parentale, sous-combles…)",
      'Rénovation salle d\'eau / WC séparés',
      'Je ne sais pas encore, je veux en discuter',
    ],
  },

  ctaFinal: {
    eyebrow: 'Prêt à commencer ?',
    h2Lead: 'Votre salle de bain de rêve',
    h2Highlight: 'commence ici.',
    sub: "Réservez votre conception 3D offerte. Notre designer vous rappelle sous 24 h pour planifier la visite.",
    ctaLabel: 'Réserver ma conception 3D',
    trustSignals: ['Sans engagement', 'Plans HD sous 7 jours', 'Designer dédié'],
  },

  merci: {
    h1: 'Merci, votre designer vous rappelle sous 24 h.',
    sub:
      "Pour planifier votre visite à domicile, prendre les mesures précises et lancer la conception 3D de votre projet.",
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
      "Designers + artisans Qualibat à Marseille et dans tout le 13. Conception 3D offerte, rénovation totale sur-mesure, clé en main.",
  },
};
