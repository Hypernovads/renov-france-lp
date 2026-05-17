import type { LeadSource } from '@/lib/validation';

export type Image = { src: string; alt: string };

export type TrustItem = {
  label: string;
  /** Lucide icon name (kebab — résolu côté composant) */
  icon: 'shield-check' | 'award' | 'wrench' | 'clock' | 'star';
  /** Pour Google : note + nombre d'avis */
  rating?: string;
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

export type LPContent = {
  meta: {
    source: LeadSource;
    title: string;
    description: string;
    merciHref: string;
  };
  announcement: {
    text: string;
    href?: string;
  };
  hero: {
    h1: string;
    h1Highlight?: string;
    sub: string;
    bgImage: Image;
    trustChips: string[];
  };
  trustStrip: TrustItem[];
  promiseGrid: {
    eyebrow: string;
    h2: string;
    items: PromiseItem[];
  };
  /** Si null : la LP n'a pas de slider avant/après (ex. LP 2 qui a un quiz à la place) */
  beforeAfter: {
    eyebrow: string;
    h2: string;
    intro?: string;
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
    h2: string;
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
