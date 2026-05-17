import type { LeadSource } from '@/lib/validation';

export type Image = { src: string; alt: string };

export type TrustItem = {
  label: string;
  /** Sous-titre descriptif (ex. "Certification artisan", "Assurée MAAF") */
  rating?: string;
  /** Nom semantique d'icône Lucide (résolu côté composant) */
  icon: 'shield-check' | 'award' | 'lock' | 'star' | 'clock';
};

export type PromiseItem = { icon: string; title: string; body: string };

export type BeforeAfterItem = {
  label: string;
  before: Image;
  after: Image;
};

export type IncludedItem = { icon: string; title: string; body: string };

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
  duration?: string;
  /** Icône à côté de la duration (default: clock). 'shield' pour les garanties. */
  metaIcon?: 'clock' | 'shield';
};

export type SpecItem = { label: string; value: string };

export type Testimonial = {
  name: string;
  city: string;
  rating: number;
  body: string;
  realisation?: string;
};

export type AideItem = {
  name: string;
  amount: string;
  body: string;
};

export type FaqItem = { q: string; a: string };

export type KpiStat = { value: string; label: string };

export type LPContent = {
  meta: {
    source: LeadSource;
    title: string;
    description: string;
    merciHref: string;
  };
  announcement: {
    /** Texte avant le mot surligné (ex. "Encore") */
    prefix?: string;
    /** Mot/expression mise en valeur en terracotta (ex. "2 créneaux d'expert") */
    highlight?: string;
    /** Texte après le surlignage (ex. "disponibles cette semaine — Marseille & Aix") */
    text: string;
    /** Affiche le petit point vert clignotant en tête */
    withDot?: boolean;
    href?: string;
  };
  hero: {
    /** Chip géo en haut du hero (ex. "Marseille · Bouches-du-Rhône") */
    locationChip?: string;
    /** Partie normale du H1 avant l'accent (ex. "Votre baignoire devient douche.") */
    h1Lead: string;
    /** Partie italique soulignée terracotta (ex. "En 1 jour.") */
    h1Highlight: string;
    /** Partie normale du H1 après l'accent (ex. "Sans casse.") */
    h1Tail?: string;
    sub: string;
    /** Image de fond optionnelle ; null = fond navy plein (look mockup V2) */
    bgImage?: Image | null;
  };
  trustStrip: TrustItem[];
  promiseGrid: {
    eyebrow: string;
    h2: string;
    /** Substring du h2 à mettre en italic-accent terracotta */
    h2Highlight?: string;
    intro?: string;
    items: PromiseItem[];
  };
  /** Si null : la LP n'a pas de slider avant/après (ex. LP 2 qui a un quiz à la place) */
  beforeAfter: {
    eyebrow: string;
    h2Lead: string;
    /** Suffix italic-accent terracotta (ex. "Le soir, votre douche.") */
    h2Highlight?: string;
    intro: string;
    /** Substrings à mettre en <strong> navy dans l'intro */
    introStrong?: string[];
    /** Stats highlight dans bloc cream (ex. "24h Pose complète / 0kg De gravats") */
    stats?: { value: string; unit?: string; label: string }[];
    /** Caption italic en bas du contenu gauche */
    caption?: string;
    /** Prefix de la légende sous le slider (ex. "Réalisation à") */
    itemCaptionPrefix?: string;
    items: BeforeAfterItem[];
  } | null;
  included: {
    eyebrow: string;
    h2: string;
    intro?: string;
    items: IncludedItem[];
  };
  process: {
    eyebrow: string;
    h2Lead: string;
    /** Mot italic-accent terracotta-light (ex. "aussi simple") */
    h2Highlight?: string;
    /** Partie après le highlight, sur 2e ligne (ex. "qu'une journée bien remplie.") */
    h2Tail?: string;
    steps: ProcessStep[];
  };
  gallery: {
    eyebrow: string;
    h2: string;
    images: Image[];
  };
  specs: {
    eyebrow: string;
    h2: string;
    items: SpecItem[];
  };
  testimonials: {
    eyebrow: string;
    h2: string;
    items: Testimonial[];
  };
  aides: {
    eyebrow: string;
    h2: string;
    intro: string;
    items: AideItem[];
  };
  faq: {
    eyebrow: string;
    h2: string;
    items: FaqItem[];
  };
  formLong: {
    eyebrow: string;
    h2: string;
    sub: string;
    projectTypes: string[];
    budgets: string[];
    timings: string[];
  };
  ctaFinal: {
    h2: string;
    sub: string;
    ctaLabel: string;
  };
  merci: {
    h1: string;
    sub: string;
    delaiRappel: string;
  };
};
