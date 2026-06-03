import { z } from 'zod';

const phoneRegex = /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;
const postalRegex = /^\d{5}$/;

export const leadSourceSchema = z.enum([
  'lp_baignoire_douche',
  'lp_maprimeadapt',
  'lp_renovation',
]);

export type LeadSource = z.infer<typeof leadSourceSchema>;

export const leadSchema = z.object({
  source: leadSourceSchema,

  // UTM
  campaign: z.string().max(120).optional().default(''),
  adset: z.string().max(120).optional().default(''),
  ad: z.string().max(120).optional().default(''),

  // Coordonnées
  name: z.string().max(80).optional().default(''),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().regex(phoneRegex, 'Téléphone invalide'),
  // Optionnel : vide accepté pour les leads "early form" (CP pas encore connu).
  // Si rempli, doit être un CP FR à 5 chiffres.
  postal_code: z.union([z.string().regex(postalRegex, 'CP invalide (5 chiffres)'), z.literal('')]).optional().default(''),
  city: z.string().max(80).optional().default(''),

  is_owner: z.boolean(),

  project_type: z.string().max(120).optional().default(''),
  budget: z.string().max(60).optional().default(''),
  timing: z.string().max(60).optional().default(''),

  // Honeypot — DOIT être vide
  website: z.string().max(0, 'spam').optional().default(''),

  raw: z.record(z.unknown()).optional(),

  /** Lead "partiel" — capturé après l'early form (nom+tel) avant la fin du quiz.
   *  Statut Notion : "🟡 Quiz en cours". À enrichir/upgrader si le quiz est complété. */
  is_partial: z.boolean().optional().default(false),

  /** ID de la page Notion existante à mettre à jour (au lieu d'en créer une nouvelle).
   *  Utilisé pour le flow : early form → create Notion → fin de quiz → update même page. */
  notion_page_id: z.string().optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;
