import { headers } from 'next/headers';
import { checkPostalCode } from './zone';

/**
 * Géolocalisation IP via headers Vercel.
 *
 * Vercel injecte automatiquement la géoloc dans 4 headers sur chaque requête
 * (gratuit, pas de quota, pas d'API tierce) :
 * - x-vercel-ip-city           : ex. "Marseille" (URI-encoded)
 * - x-vercel-ip-country        : ex. "FR"
 * - x-vercel-ip-country-region : ex. "PAC" (code région ISO)
 * - x-vercel-ip-postal-code    : ex. "13008" — le plus fiable pour cibler une zone
 *
 * Docs : https://vercel.com/docs/edge-network/headers/request-headers#x-vercel-ip-*
 *
 * En dev local (pas de Vercel) → tous les headers sont absents → on retourne null.
 */
export type GeoInfo = {
  city: string | null;
  country: string | null;
  region: string | null;
  postalCode: string | null;
};

export function getGeoFromHeaders(): GeoInfo {
  const h = headers();
  const decode = (v: string | null) => {
    if (!v) return null;
    try {
      return decodeURIComponent(v);
    } catch {
      return v;
    }
  };
  return {
    city: decode(h.get('x-vercel-ip-city')),
    country: h.get('x-vercel-ip-country'),
    region: h.get('x-vercel-ip-country-region'),
    postalCode: h.get('x-vercel-ip-postal-code'),
  };
}

/**
 * Construit le chip géo affiché en haut du hero ("MARSEILLE · BOUCHES-DU-RHÔNE").
 *
 * Stratégie (assumée prudente pour ne pas faire de fausse promesse) :
 * 1. Si l'IP est en Bouches-du-Rhône (CP 13xxx) ET qu'on connaît la ville dans
 *    notre référentiel `lib/zone.ts` → on personnalise : "{VILLE} · BOUCHES-DU-RHÔNE"
 *    (ex. "AIX-EN-PROVENCE · BOUCHES-DU-RHÔNE" pour un visiteur d'Aix)
 * 2. Sinon (hors zone, IP inconnue, VPN, dev local…) → on garde le fallback du
 *    content file, qui marque NOTRE zone d'intervention ("Marseille · Bouches-du-Rhône")
 *
 * On ne montre JAMAIS la ville d'un visiteur hors Bouches-du-Rhône (ex. Lyon, Paris)
 * pour ne pas créer la fausse promesse "on intervient chez vous".
 */
/** Fallback ultime si le content file n'a pas défini de chip (rare). */
const DEFAULT_CHIP = 'Marseille · Bouches-du-Rhône';

export function getLocationChip(fallback: string | undefined): string {
  const safeFallback = fallback ?? DEFAULT_CHIP;
  const geo = getGeoFromHeaders();

  // Pas en France ou pas de CP → fallback direct
  if (geo.country !== 'FR' || !geo.postalCode) return safeFallback;

  const zone = checkPostalCode(geo.postalCode);
  // Seul cas où on personnalise : ville connue dans notre référentiel 13xxx.
  // `covered-fallback` (CP 13 mais ville non listée) → on garde le fallback,
  // l'intitulé générique "votre commune des Bouches-du-Rhône" rendrait mal en chip.
  if (zone?.kind === 'covered') {
    return `${zone.city} · Bouches-du-Rhône`;
  }
  return safeFallback;
}
