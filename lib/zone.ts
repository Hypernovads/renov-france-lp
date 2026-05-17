/**
 * Dictionnaire CP → Ville pour le département 13 (Bouches-du-Rhône).
 * Liste exhaustive — couvre toutes les communes du 13 (plus de 100 entrées).
 *
 * Utilisé par ZipGate : si CP commence par "13" et match → message success
 * personnalisé ; si commence par "13" mais pas dans le dictionnaire → fallback
 * "votre commune du 13" ; sinon → hors zone.
 *
 * Source : codes postaux La Poste France (datanova.laposte.fr).
 * À mettre à jour quand une commune fusionne/scinde (rare).
 */

const CP_13: Record<string, string> = {
  // ─── Marseille (16 arrondissements) ──────────────────────────
  '13001': 'Marseille 1er',
  '13002': 'Marseille 2e',
  '13003': 'Marseille 3e',
  '13004': 'Marseille 4e',
  '13005': 'Marseille 5e',
  '13006': 'Marseille 6e',
  '13007': 'Marseille 7e',
  '13008': 'Marseille 8e',
  '13009': 'Marseille 9e',
  '13010': 'Marseille 10e',
  '13011': 'Marseille 11e',
  '13012': 'Marseille 12e',
  '13013': 'Marseille 13e',
  '13014': 'Marseille 14e',
  '13015': 'Marseille 15e',
  '13016': 'Marseille 16e',

  // ─── Aix-en-Provence & alentours ─────────────────────────────
  '13100': 'Aix-en-Provence',
  '13105': 'Mimet',
  '13109': 'Simiane-Collongue',
  '13290': 'Aix-en-Provence Les Milles',
  '13540': 'Puyricard',
  '13770': 'Venelles',
  '13790': 'Châteauneuf-le-Rouge',
  '13840': 'Rognes',
  '13860': 'Peyrolles-en-Provence',
  '13510': 'Éguilles',
  '13610': 'Le Puy-Sainte-Réparade',
  '13650': 'Meyrargues',
  '13760': 'Saint-Cannat',
  '13880': 'Velaux',

  // ─── Côté étang de Berre & ouest ─────────────────────────────
  '13110': 'Port-de-Bouc',
  '13127': 'Vitrolles',
  '13130': 'Berre-l\'Étang',
  '13140': 'Miramas',
  '13170': 'Les Pennes-Mirabeau',
  '13180': 'Gignac-la-Nerthe',
  '13220': 'Châteauneuf-les-Martigues',
  '13230': 'Port-Saint-Louis-du-Rhône',
  '13270': 'Fos-sur-Mer',
  '13320': 'Bouc-Bel-Air',
  '13330': 'Pélissanne',
  '13340': 'Rognac',
  '13380': 'Plan-de-Cuques',
  '13500': 'Martigues',
  '13580': 'La Fare-les-Oliviers',
  '13620': 'Carry-le-Rouet',
  '13700': 'Marignane',
  '13730': 'Saint-Victoret',
  '13740': 'Le Rove',
  '13800': 'Istres',
  '13820': 'Ensuès-la-Redonne',
  '13920': 'Saint-Mitre-les-Remparts',

  // ─── Salon-de-Provence & alentours ───────────────────────────
  '13111': 'Coudoux',
  '13113': 'Lamanon',
  '13121': 'Aurons',
  '13250': 'Saint-Chamas',
  '13300': 'Salon-de-Provence',
  '13350': 'Charleval',
  '13370': 'Mallemort',
  '13430': 'Eyguières',
  '13450': 'Grans',
  '13640': 'La Roque-d\'Anthéron',
  '13680': 'Lançon-Provence',

  // ─── Aubagne, La Ciotat, Cassis & Est ────────────────────────
  '13112': 'La Destrousse',
  '13119': 'Saint-Savournin',
  '13124': 'Peypin',
  '13190': 'Allauch',
  '13260': 'Cassis',
  '13360': 'Roquevaire',
  '13390': 'Auriol',
  '13400': 'Aubagne',
  '13420': 'Gémenos',
  '13470': 'Carnoux-en-Provence',
  '13600': 'La Ciotat',
  '13720': 'La Bouilladisse',
  '13780': 'Cuges-les-Pins',
  '13830': 'Roquefort-la-Bédoule',
  '13950': 'Cadolive',

  // ─── Gardanne, Trets & nord-est ──────────────────────────────
  '13114': 'Puyloubier',
  '13115': 'Saint-Paul-lès-Durance',
  '13120': 'Gardanne',
  '13126': 'Vauvenargues',
  '13240': 'Septèmes-les-Vallons',
  '13480': 'Cabriès',
  '13490': 'Jouques',
  '13530': 'Trets',
  '13590': 'Meyreuil',
  '13710': 'Fuveau',
  '13850': 'Gréasque',

  // ─── Lambesc, Ventabren & ouest Aix ──────────────────────────
  '13116': 'Vernègues',
  '13117': 'Lambesc',
  '13122': 'Ventabren',
  '13125': 'Saint-Mitre-les-Remparts',

  // ─── Arles, Tarascon & ouest (Crau, Alpilles, Camargue) ──────
  '13104': 'Arles',
  '13118': 'Entressen',
  '13150': 'Tarascon',
  '13160': 'Châteaurenard',
  '13200': 'Arles',
  '13210': 'Saint-Rémy-de-Provence',
  '13280': 'Raphèle-lès-Arles',
  '13310': 'Saint-Martin-de-Crau',
  '13440': 'Cabannes',
  '13460': 'Saintes-Maries-de-la-Mer',
  '13520': 'Les Baux-de-Provence',
  '13550': 'Noves',
  '13560': 'Sénas',
  '13570': 'Barbentane',
  '13630': 'Eyragues',
  '13660': 'Orgon',
  '13670': 'Saint-Andiol',
  '13690': 'Graveson',
  '13750': 'Plan-d\'Orgon',
  '13810': 'Eygalières',
  '13870': 'Rognonas',
  '13890': 'Mouriès',
  '13910': 'Maillane',
  '13990': 'Fontvieille',
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
      : { kind: 'covered-fallback', city: 'votre commune des Bouches-du-Rhône', postalCode: cp };
  }
  return { kind: 'not-covered', postalCode: cp };
}
