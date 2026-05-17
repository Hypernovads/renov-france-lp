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
  brandName: 'À COMPLÉTER — Nom commercial',
  legalName: 'À COMPLÉTER — Raison sociale',
  siret: 'À COMPLÉTER — SIRET 14 chiffres',
  rcs: 'À COMPLÉTER — RCS Ville',
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

  // ─── Mentions légales footer ───────────────────────────────────
  legal: {
    address: 'À COMPLÉTER — Adresse siège, CP Ville',
    dpoEmail: 'rgpd@a-completer.fr',
    privacyUrl: '/mentions/confidentialite',
    legalNoticeUrl: '/mentions/legales',
  },

  // ─── Logo ──────────────────────────────────────────────────────
  // Tant qu'on n'a pas le logo client, on affiche le brandName en typo serif navy.
  // Quand on l'aura : poser /public/logo.svg + logo-cream.svg et activer logoSrc.
  logoSrc: null as string | null,
  logoSrcCream: null as string | null,
} as const;

export type ClientConfig = typeof client;
