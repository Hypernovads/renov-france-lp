/**
 * Source unique de vérité pour les infos client.
 * Toutes les LP lisent depuis ce fichier.
 *
 * ⚠️ TOUS LES PLACEHOLDERS "À COMPLÉTER" ET "XX" SONT VOLONTAIREMENT VOYANTS.
 *    Ils DOIVENT être remplacés avant mise en ligne. Si tu vois encore "XX"
 *    ou "À COMPLÉTER" en prod, c'est qu'on a oublié de mettre à jour ce fichier.
 */

export const client = {
  // ─── Identité ──────────────────────────────────────────────────
  // brandName = marque commerciale affichée (header/footer). Encore À DÉFINIR
  // (le nom + logo de l'activité rénovation sont en cours de décision côté Steve).
  // legalName = entité juridique éditrice (mentions légales) = Chiva immobilier.
  brandName: 'À COMPLÉTER',
  legalName: 'Chiva immobilier',
  siret: '852 738 343 00023',
  // RCS déduit : SIREN 852 738 343 + greffe de Créteil (Saint-Mandé, Val-de-Marne 94).
  // À confirmer sur l'extrait Kbis / Infogreffe.
  rcs: '852 738 343 R.C.S. Créteil',
  yearFounded: 'À COMPLÉTER',

  // ─── Contact ───────────────────────────────────────────────────
  phone: {
    display: '04 XX XX XX XX',
    href: 'tel:+33400000000',
  },
  whatsapp: {
    display: 'WhatsApp',
    href: 'https://wa.me/33000000000',
  },
  email: 'contact@a-completer.fr',
  hours: 'Lun–Sam 8h–19h',
  callbackPromise: 'Rappel sous 24 h ouvrées',

  // ─── Zone géographique ─────────────────────────────────────────
  zone: {
    department: '13',
    departmentLabel: 'Bouches-du-Rhône',
    cities: 'Marseille · Aix-en-Provence · Aubagne · Vitrolles · Marignane',
  },

  // ─── Certifications & preuves ──────────────────────────────────
  certifications: {
    qualibatNumber: 'À COMPLÉTER — n° Qualibat',
    rgeNumber: 'À COMPLÉTER — n° RGE',
    decennaleAssureur: 'À COMPLÉTER — assureur décennale',
    handibat: false, // mettre true si certifié
  },

  // Note Google (placeholder réaliste, à remplacer par la vraie)
  reviews: {
    googleRating: 4.5,
    googleCount: 127,
    googleUrl: 'https://g.page/r/XXXXXXXXXXX',
  },

  // ─── Mentions légales ──────────────────────────────────────────
  // ⚠️ Champs lus par les pages /mentions/legales et /mentions/confidentialite.
  //    Tous les "À COMPLÉTER" DOIVENT être remplis avant mise en ligne.
  legal: {
    address: '14 avenue du Général de Gaulle, 94160 Saint-Mandé',
    // Email RGPD/contact : à venir (Steve le fournira plus tard).
    dpoEmail: '',
    privacyUrl: '/mentions/confidentialite',
    legalNoticeUrl: '/mentions/legales',
    cguUrl: '/cgu',
    /** Forme juridique : SAS, SARL, EURL, EI… */
    legalForm: 'SAS (société par actions simplifiée)',
    /** Capital social */
    capital: '75 000 €',
    /** Code APE / NAF */
    ape: '6810Z',
    /** N° TVA intracommunautaire — NON affiché tant que non vérifié sur Infogreffe (consigne Steve). */
    tvaIntra: '',
    /** Nom du directeur de la publication (gérant / président) */
    publicationDirector: 'Anthony Destrières',
    /** Hébergeur du site — prérempli Vercel (cible de déploiement). À ajuster si autre. */
    host: {
      name: 'Vercel Inc.',
      address: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
      url: 'https://vercel.com',
    },
    /** Médiateur de la consommation — OBLIGATOIRE pour le BTP avec des particuliers.
     *  Si pas encore d'adhésion, il faut en souscrire un (ex. CM2C, Medicys…). */
    mediator: {
      name: 'À COMPLÉTER — médiateur de la consommation',
      url: 'À COMPLÉTER — site du médiateur',
    },
  },

  // ─── Logo ──────────────────────────────────────────────────────
  // Tant qu'on n'a pas le logo client, on affiche le brandName en typo serif navy
  // avec une icône lucide (Bath) dans un carré navy + point terracotta final.
  // Quand on l'aura : poser /public/logo.svg + logo-cream.svg et activer logoSrc.
  logoSrc: null as string | null,
  logoSrcCream: null as string | null,

  // ─── KPI stats hero ────────────────────────────────────────────
  // ⚠️ Chiffres PLACEHOLDER à valider avec le brief client.
  // Affichés en gros dans le hero des LP. 3 KPI strict.
  heroKpis: [
    { value: '4500+', label: 'chantiers réalisés' },
    { value: '4,5/5', label: '127 avis Google' },
    { value: '10 ans', label: 'garantie décennale' },
  ],

  // ─── Social proof temps réel ───────────────────────────────────
  // Phrase affichée dans le ZipGate sous "Réponse immédiate · 30 s".
  // Effet bandwagon ("d'autres l'ont fait, c'est crédible").
  // À automatiser Phase 2 : sync depuis Notion "leads ce mois ci".
  demandesCeMois: '127 demandes traitées ce mois à Marseille',
} as const;

export type ClientConfig = typeof client;
