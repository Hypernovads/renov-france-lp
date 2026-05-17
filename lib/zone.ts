/**
 * Dictionnaire CP → Ville pour le département 13 (Bouches-du-Rhône).
 * Utilisé par ZipGate : si CP commence par "13" et match → message success
 * personnalisé ; sinon fallback "votre commune du 13".
 */

const CP_13: Record<string, string> = {
  '13001': 'Marseille 1er', '13002': 'Marseille 2e', '13003': 'Marseille 3e',
  '13004': 'Marseille 4e', '13005': 'Marseille 5e', '13006': 'Marseille 6e',
  '13007': 'Marseille 7e', '13008': 'Marseille 8e', '13009': 'Marseille 9e',
  '13010': 'Marseille 10e', '13011': 'Marseille 11e', '13012': 'Marseille 12e',
  '13013': 'Marseille 13e', '13014': 'Marseille 14e', '13015': 'Marseille 15e',
  '13016': 'Marseille 16e',
  '13100': 'Aix-en-Provence',
  '13127': 'Vitrolles',
  '13200': 'Arles',
  '13260': 'Cassis',
  '13300': 'Salon-de-Provence',
  '13400': 'Aubagne',
  '13500': 'Martigues',
  '13530': 'Trets',
  '13540': 'Puyricard',
  '13600': 'La Ciotat',
  '13700': 'Marignane',
  '13800': 'Istres',
};

export type ZoneCheckResult =
  | { kind: 'covered'; city: string; postalCode: string }
  | { kind: 'covered-fallback'; city: string; postalCode: string }
  | { kind: 'not-covered'; postalCode: string };

export function checkPostalCode(rawCp: string): ZoneCheckResult | null {
  const cp = rawCp.replace(/\s/g, '').trim();
  if (!/^\d{5}$/.test(cp)) return null;

  if (cp.startsWith('13')) {
    const city = CP_13[cp];
    return city
      ? { kind: 'covered', city, postalCode: cp }
      : { kind: 'covered-fallback', city: 'votre commune du 13', postalCode: cp };
  }
  return { kind: 'not-covered', postalCode: cp };
}
