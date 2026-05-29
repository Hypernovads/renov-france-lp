import type { LPContent } from './types';
import { client } from './client';

/**
 * LP 2 — MaPrimeAdapt' (adaptation du logement / maintien à domicile).
 *
 * ANGLE (refonte 2026-05, inspirée EcoShower) : on vend L'AIDE, pas un produit.
 * MaPrimeAdapt' est le héros de la page. La salle de bain reste le cœur de métier
 * (mise en avant en premier), mais l'aide finance bien plus (WC, portes, monte-escalier).
 *
 * Le "à partir de 1€" est VOLONTAIREMENT sorti de la LP → réservé à la pub Meta.
 * Sur la page : crédibilité (montants réels, barème, exemple chiffré), pas de cap symbolique.
 *
 * Parcours visé : le visiteur comprend en 2 s qu'il y a des aides → il s'identifie
 * (section "Vous vous reconnaissez ?") → il se situe (éligibilité 3 tranches) →
 * il est rassuré (barème + exemple) → il vérifie son éligibilité (quiz hero).
 *
 * RÈGLES : aucune mention "pose en 1 jour / 24h" (durée communiquée à la visite).
 * Crédit d'impôt PMR SUPPRIMÉ depuis 01/01/2026 → remplacé par Action Logement.
 *
 * Cible : 60+ revenus modestes, personnes handicapées, OU enfants équipant leurs parents.
 * Visuels : seniors dignes, actifs, lumineux. Jamais EHPAD / médical / dramatisant.
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const lpMaPrimeAdapt: LPContent = {
  meta: {
    source: 'lp_maprimeadapt',
    title: "MaPrimeAdapt' : jusqu'à 15 000 € d'aides pour votre salle de bain — Bouches-du-Rhône",
    description:
      "Vérifiez votre éligibilité à MaPrimeAdapt' en 30 secondes. Jusqu'à 70 % de vos travaux d'adaptation financés : douche sécurisée, salle de bain adaptée, accessibilité. Notre expert monte tout le dossier. Bouches-du-Rhône.",
    merciHref: '/merci-maprimeadapt',
  },

  announcement: {
    prefix: "MaPrimeAdapt'",
    highlight: "jusqu'à 70 % financés",
    text: '— vérifiez votre éligibilité {semaine} en 30 secondes',
    withDot: true,
    withWeek: true,
  },

  hero: {
    locationChip: 'Marseille · Bouches-du-Rhône',
    h1Lead: "MaPrimeAdapt' :",
    h1Highlight: "jusqu'à 15 000 €",
    h1Tail: "d'aides pour votre salle de bain.",
    sub:
      "Plus de 4 millions de personnes sont éligibles. Vérifiez la vôtre en 30 secondes — notre expert monte gratuitement tout votre dossier d'aides.",
    bgImage: {
      // Vraie réalisation RénoBain : douche italienne carrelage beige, niche éclairée,
      // paroi vitrée. Moderne, chaleureux, rassurant pour la cible 60+.
      src: '/images/realisations/realisation-03-apres.png',
      alt: 'Douche italienne moderne et sécurisée avec paroi vitrée, carrelage beige et niche éclairée',
    },
  },

  trustStrip: [
    { icon: 'shield-check', label: 'Qualibat Handibat', rating: 'Certifié PMR' },
    { icon: 'award', label: "Agréé MaPrimeAdapt'", rating: 'Dossier monté par nous' },
    { icon: 'lock', label: 'Décennale 10 ans', rating: 'Installation garantie' },
    {
      icon: 'star',
      label: '4,5/5 Google',
      rating: '127 avis vérifiés',
      href: client.reviews.googleUrl,
    },
    { icon: 'clock', label: 'Réponse en 30 s', rating: "Test d'éligibilité gratuit" },
  ],

  // PromiseGrid réutilisé pour "Travaux couverts" — l'angle large voulu par Steve.
  // Salle de bain en premier (cœur de métier), puis le reste de l'adaptation.
  promiseGrid: {
    eyebrow: 'Travaux couverts',
    h2: 'Une aide, beaucoup de travaux possibles.',
    h2Highlight: 'beaucoup de travaux',
    intro:
      "MaPrimeAdapt' ne se limite pas à la douche : elle finance l'adaptation de tout votre logement. Et la salle de bain reste notre cœur de métier.",
    items: [
      {
        icon: 'droplets',
        title: 'Salle de bain adaptée',
        body: "Réfection complète et sécurisée : douche de plain-pied, sol antidérapant, éclairage et rangements pensés pour l'autonomie. Notre spécialité.",
      },
      {
        icon: 'shield-check',
        title: 'Baignoire → douche sécurisée',
        body: "Fini l'enjambement. Receveur extra-plat, paroi vitrée, barre de maintien et siège — posés sans gros travaux.",
      },
      {
        icon: 'home',
        title: 'WC & accessibilité',
        body: 'WC surélevé, barres d’appui, robinetterie ergonomique : les bons équipements pour gagner en confort et en sécurité.',
      },
      {
        icon: 'wrench',
        title: 'Mobilité dans le logement',
        body: "Élargissement des portes, suppression des seuils, monte-escalier : MaPrimeAdapt' couvre aussi le reste de la maison.",
      },
    ],
  },

  // Section "Travaux couverts" — split image + liste aérée (sobre, façon EcoShower).
  // La diversité (SDB, douche, WC, monte-escalier) est portée par la LISTE, pas par
  // une grille d'images. Une seule image sobre (cœur de métier = SDB).
  coveredWorks: {
    eyebrow: 'Travaux couverts',
    h2: "MaPrimeAdapt', ce n'est pas que la salle de bain.",
    h2Highlight: 'pas que la salle de bain',
    intro:
      "Une seule aide pour adapter tout votre logement au vieillissement ou au handicap. La salle de bain reste notre spécialité — on s'occupe aussi du reste.",
    image: {
      src: '/images/realisations/realisation-02-apres.png',
      alt: 'Salle de bain adaptée et sécurisée réalisée par nos équipes',
    },
    imageCaption: 'Réalisation — Bouches-du-Rhône',
    items: [
      {
        icon: 'droplets',
        title: 'Baignoire → douche sécurisée',
        body: 'De plain-pied, antidérapante, avec barre de maintien et siège.',
      },
      {
        icon: 'sparkles',
        title: 'Salle de bain adaptée',
        body: 'Réfection complète et sécurisée, pensée pour l’autonomie.',
      },
      {
        icon: 'settings',
        title: 'Monte-escalier',
        body: 'Motorisé, installé sur votre escalier existant.',
      },
      {
        icon: 'shield-check',
        title: 'WC surélevé & barres d’appui',
        body: 'Réhausse, barres d’appui et robinetterie ergonomique.',
      },
      {
        icon: 'ruler',
        title: 'Élargissement des portes',
        body: 'Suppression des seuils, accès fauteuil facilité.',
      },
      {
        icon: 'sun',
        title: 'Volets roulants & domotique',
        body: 'Motorisation des volets, éclairage et détecteurs.',
      },
    ],
  },

  // Section "Vous vous reconnaissez ?" — identification émotionnelle.
  identification: {
    eyebrow: 'Vous vous reconnaissez ?',
    h2: 'Si l’une de ces situations vous parle, vous êtes au bon endroit.',
    h2Highlight: 'au bon endroit',
    intro:
      "MaPrimeAdapt' aide les Français à rester chez eux, en sécurité. Peut-être que ça vous concerne, vous ou un proche.",
    items: [
      {
        icon: 'droplets',
        situation: 'Enjamber la baignoire devient difficile, voire risqué ?',
        reassurance:
          "On la remplace par une douche de plain-pied sécurisée, financée par MaPrimeAdapt'.",
      },
      {
        icon: 'heart-handshake',
        situation: 'Vous voulez que vos parents restent chez eux, en sécurité ?',
        reassurance: 'Vous lancez la démarche pour eux, on s’occupe de tout le reste.',
      },
      {
        icon: 'home',
        situation: 'Votre salle de bain n’est plus adaptée à votre mobilité ?',
        reassurance:
          'Douche, WC, barres d’appui, portes élargies : tout peut être adapté.',
      },
    ],
    ctaLabel: 'Vérifier mon éligibilité',
    ctaHref: '#hero-form',
  },

  // Section "Êtes-vous éligible ?" — 3 tranches d'âge claires (façon EcoShower).
  eligibility: {
    eyebrow: 'Conditions',
    h2: 'Êtes-vous éligible à MaPrimeAdapt’ ?',
    h2Highlight: 'éligible',
    intro:
      "L'éligibilité repose sur deux piliers : votre situation (âge ou handicap) et vos revenus. Voici les grands cas — le test en haut de page confirme le vôtre en 30 secondes.",
    tranches: [
      {
        age: '70 ans et +',
        condition: 'Aucune condition de perte d’autonomie : l’âge suffit (sous conditions de revenus).',
      },
      {
        age: '60 à 69 ans',
        condition: 'Avec une perte d’autonomie reconnue (évaluation GIR 1 à 6).',
      },
      {
        age: 'Tout âge — handicap',
        condition: 'Taux d’incapacité ≥ 50 % ou bénéficiaire de la PCH, sans condition d’âge.',
      },
    ],
    conditions: [
      'Être propriétaire occupant, ou locataire avec l’accord du propriétaire.',
      'Le logement concerné est votre résidence principale.',
      'Avoir des revenus modestes ou très modestes (barème ANAH).',
      'Résider dans les Bouches-du-Rhône (notre zone d’intervention).',
    ],
    ctaLabel: 'Tester mon éligibilité en 30 s',
    ctaHref: '#hero-form',
  },

  // Section "Barème + exemple chiffré" — crédibilise les montants.
  bareme: {
    eyebrow: 'Combien vous touchez',
    h2: 'Jusqu’à 70 % de vos travaux financés.',
    h2Highlight: '70 %',
    intro:
      "Le montant de l'aide dépend de vos revenus. Voici le barème ANAH 2026 (hors Île-de-France) — et un exemple concret pour s'y retrouver.",
    plafondTravaux: '22 000 € HT de travaux',
    rows: [
      {
        profil: 'Revenus très modestes',
        taux: '70 %',
        plafondAide: "Aide jusqu'à 15 400 €",
        tone: 'high',
      },
      {
        profil: 'Revenus modestes',
        taux: '50 %',
        plafondAide: "Aide jusqu'à 11 000 €",
        tone: 'mid',
      },
    ],
    example: {
      persona: 'M. et Mme Bernard, 76 et 73 ans — Aubagne',
      badge: 'Revenus très modestes',
      lines: [
        { label: 'Réfection de leur salle de bain adaptée', value: '17 000 €', kind: 'base' },
        { label: "MaPrimeAdapt' (70 %)", value: '− 11 900 €', kind: 'aide' },
        { label: 'Reste à charge estimé', value: '5 100 €', kind: 'total' },
      ],
      footnote:
        "Avant cumul avec les aides des caisses de retraite et d'Action Logement, qui réduisent encore le reste à charge.",
    },
    note:
      "Montants indicatifs 2026 (hors Île-de-France), soumis à conditions de ressources et d'éligibilité. Notre conseillère calcule votre cas précis gratuitement, sans engagement.",
  },

  // Pas de slider central sur LP2 (le quiz hero fait office de morceau central),
  // mais on garde 1 paire avant/après pour la preuve visuelle de la transformation.
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
    eyebrow: 'Notre prise en charge',
    h2: 'On s’occupe de tout, de A à Z.',
    intro:
      'Notre conseillère dédiée monte votre dossier d’aides, du premier appel à la fin des travaux. Vous ne touchez à aucune paperasse.',
    items: [
      {
        icon: 'clipboard-check',
        title: 'Dossier MaPrimeAdapt’ monté par nous',
        body: "Constitution, dépôt et suivi auprès de l'ANAH.",
      },
      {
        icon: 'home',
        title: 'Visite et conseil à domicile',
        body: 'Un expert se déplace gratuitement et vous conseille.',
      },
      {
        icon: 'shield-check',
        title: 'Équipements certifiés PMR',
        body: 'Barre, siège, sol antidérapant, mitigeur anti-brûlure.',
      },
      {
        icon: 'award',
        title: 'Artisans certifiés Handibat',
        body: 'Des poseurs spécialisés dans l’adaptation du logement.',
      },
      {
        icon: 'heart-handshake',
        title: 'Garantie décennale & SAV',
        body: 'Installation garantie 10 ans, et un SAV qui répond.',
      },
    ],
  },

  process: {
    eyebrow: 'Comment ça se passe',
    h2Lead: 'Un parcours',
    h2Highlight: 'serein,',
    h2Tail: 'balisé étape par étape.',
    steps: [
      {
        number: '01',
        title: 'Vérifiez votre éligibilité',
        body: '30 secondes pour estimer vos aides. Sans engagement, sans données stockées avant votre accord.',
        duration: '30 sec',
        metaIcon: 'clock',
      },
      {
        number: '02',
        title: 'Visite d’un expert chez vous',
        body: 'Notre conseillère se déplace gratuitement, mesure, étudie votre installation et chiffre précisément votre projet.',
        duration: 'Sous 7 jours',
        metaIcon: 'clock',
      },
      {
        number: '03',
        title: 'On monte votre dossier d’aides',
        body: "Constitution MaPrimeAdapt', caisses de retraite, Action Logement. Tout est validé avant le démarrage des travaux.",
        duration: 'Zéro paperasse',
        metaIcon: 'shield',
      },
      {
        number: '04',
        title: 'Réalisation des travaux',
        body: "Une équipe d'artisans certifiés Handibat réalise votre salle de bain adaptée, proprement et dans les règles de l'art.",
        duration: 'Certifié Handibat',
        metaIcon: 'shield',
      },
    ],
  },

  gallery: {
    eyebrow: 'Galerie',
    h2: 'Des salles de bain conçues pour durer.',
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
    h2: 'Les détails techniques de votre installation.',
    items: [
      { label: 'Durée du chantier', value: 'Selon l’ampleur du projet (communiquée à la visite)' },
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
        body: "On a équipé maman sans qu'elle ait à gérer quoi que ce soit. Elle n'aurait jamais fait les démarches d'aides toute seule — leur conseillère s'est occupée de tout. Résultat : un reste à charge minime et une douche enfin sécurisée.",
      },
      {
        name: 'Georges P.',
        city: 'Aix-en-Provence',
        rating: 5,
        body: "Le dossier MaPrimeAdapt' a couvert 68 % du chantier. Net à payer : 950 €. Service impeccable du premier appel jusqu'à la fin des travaux. Je recommande sans hésiter.",
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
    h2: 'Cumulez les aides. Réduisez fortement votre reste à charge.',
    intro:
      "Selon votre âge, vos revenus et votre situation, plusieurs dispositifs se cumulent. Notre conseillère calcule votre éligibilité gratuitement et monte le dossier complet.",
    items: [
      {
        name: "MaPrimeAdapt'",
        amount: "Jusqu'à 70 % du HT",
        body: "Aide phare versée par l'ANAH selon votre âge et votre niveau de revenu. Notre conseillère monte le dossier complet.",
      },
      {
        name: 'TVA 5,5 % automatique',
        amount: '−14,5 % sur le devis',
        body: 'TVA réduite pour les logements de plus de 2 ans. Appliquée directement par nos soins sur votre facture.',
      },
      {
        name: 'Action Logement',
        amount: "Jusqu'à 5 000 €",
        body: "Subvention pour l'adaptation du logement des retraités et salariés du secteur privé, sous conditions. Cumulable avec MaPrimeAdapt'.",
      },
      {
        name: 'Aides caisses de retraite',
        amount: '500 — 3 500 €',
        body: 'CARSAT, AGIRC-ARRCO, MSA selon votre régime. Notre conseillère identifie celles auxquelles vous avez droit.',
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
        a: "Elle est ouverte aux personnes de 70 ans et plus sans condition d'autonomie, aux 60-69 ans avec une perte d'autonomie reconnue, et aux personnes en situation de handicap (taux ≥ 50 % ou PCH) sans condition d'âge — le tout sous conditions de revenus. Le test en haut de page vous donne une première réponse en 30 secondes.",
      },
      {
        q: 'Combien je vais réellement payer après aides ?',
        a: "MaPrimeAdapt' couvre 50 à 70 % du montant des travaux selon vos revenus. Pour le reste, d'autres aides (caisses de retraite, Action Logement, TVA réduite à 5,5 %) viennent encore alléger la facture. Notre conseillère calcule votre reste à charge précis lors d'une visite gratuite.",
      },
      {
        q: 'Le dossier MaPrimeAdapt’ est compliqué ?',
        a: "Pour vous, non : notre conseillère dédiée s'occupe de TOUT (constitution, dépôt, suivi auprès de l'ANAH). Vous lui transmettez vos justificatifs, elle gère le reste. Le délai d'instruction de l'ANAH est de quelques mois, mais on cale tout avec vous en amont.",
      },
      {
        q: "Et si j'équipe mes parents (je suis l'enfant) ?",
        a: "Vous pouvez tout à fait initier les démarches pour vos parents (avec leur accord) — c'est même très fréquent. Les aides restent au nom de la personne bénéficiaire, et vous pouvez gérer toute la coordination avec nous.",
      },
      {
        q: 'Quels types de travaux sont couverts ?',
        a: "Remplacement de la baignoire par une douche sécurisée, réfection complète de salle de bain adaptée, WC surélevé, barres d'appui, mais aussi élargissement des portes, suppression des seuils ou monte-escalier. MaPrimeAdapt' finance l'adaptation de tout le logement.",
      },
      {
        q: 'Combien de temps durent les travaux ?',
        a: "Cela dépend de l'ampleur de votre projet. Nous vous communiquons une durée précise lors de la visite, avant tout engagement — et nous nous y tenons. Nos chantiers sont menés proprement, sans démolition lourde inutile.",
      },
      {
        q: "Que se passe-t-il si je n'ai pas 60 ans ?",
        a: "Si vous êtes en situation de handicap (taux ≥ 50 % ou PCH), MaPrimeAdapt' reste accessible sans condition d'âge. Sinon, vous bénéficiez quand même de la TVA réduite à 5,5 % sur vos travaux d'adaptation. Parlez-en à notre conseillère, on étudie votre situation.",
      },
      {
        q: 'Quelles garanties ?',
        a: "Garantie décennale sur l'installation (attestation remise le jour de la pose), garantie pièces sur la robinetterie et le mitigeur, et une visite SAV de contrôle. Certifications Qualibat Handibat (PMR) et RGE.",
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
      'Pour un parent / proche',
      'Pour moi (en situation de handicap)',
      'Je veux juste me renseigner',
    ],
  },

  ctaFinal: {
    eyebrow: 'Prêt à vérifier ?',
    h2Lead: 'Découvrez le montant de vos aides',
    h2Highlight: 'en 30 secondes.',
    sub: "Notre conseillère monte votre dossier MaPrimeAdapt' et toutes les aides cumulables. Visite expert gratuite, sans engagement.",
    ctaLabel: 'Vérifier mon éligibilité',
    trustSignals: ['Sans engagement', 'Dossier monté par nous', 'Réponse en 30 secondes'],
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
      "Spécialistes de l'adaptation de salle de bain et du maintien à domicile à Marseille et dans tout le 13. Certifiés Qualibat Handibat (PMR), agréés MaPrimeAdapt'.",
  },
};
