# 00 — Brief initial : Projet LP SDB

> **Source** : conversation initiale Steve × Claude, mai 2026
> **Statut** : brief de cadrage, pré-démarrage phase 1

---

## 🎯 Contexte client

- **Vertical** : rénovation de salle de bain (travaux, lead gen)
- **Mission HYPERNOVADS** : LP haute conversion + acquisition Meta (puis Google, puis Native)
- **Référence inspirante mentionnée** : `ecoshower.fr` (acteur connu, site traditionnel non-Shopify → absent de Trendtrack, à scraper via Meta Ad Library publique ou Adplexity)
- **Contrainte ads** : profil Meta perso de Steve banni → passage par BM de l'associé ou compte d'agence loué (à confirmer avant lancement)

---

## 📐 Scope V1 validé

**3 LP dédiées en parallèle** (une par angle/cible, pas une LP fourre-tout) :

| # | LP | Cible | Angle principal |
|---|----|----|----|
| 1 | **Baignoire → Douche** | 50-70 ans, propriétaires | Best-seller du marché, "en 1 jour sans gros chantier" |
| 2 | **Douche sécurisée senior** | 60+ (et enfants qui équipent leurs parents) | Sécurité / autonomie / aides MaPrimeAdapt' jusqu'à 70% |
| 3 | **Rénovation totale** | 35-55 ans | Clé-en-main, esthétique, conception 3D offerte |

Stack : **Next.js + Vercel**, 3 LP partageant des composants communs.

---

## 🏗️ Structure type de LP (squelette commun aux 3)

### Above the fold (mobile-first, form en hero)

- **H1** : bénéfice + ancrage temps
- **Sub** : preuve sociale + zone d'intervention
- **Formulaire 3 champs MAX** : code postal · téléphone · "Êtes-vous propriétaire ?" (Oui/Non)
- **CTA** : "Obtenir mon devis gratuit"
- **Trust line** : ✓ pose rapide · ✓ garantie 10 ans · ✓ devis 100% gratuit

### Sections (ordre éprouvé)

1. **Bandeau confiance** : logos RGE, Qualibat, garantie décennale, Google ★ moyenne
2. **Bénéfices** : 4 cards icônes
3. **Avant / Après** : slider visuel 4-6 réalisations
4. **Comment ça marche** : 3-4 étapes (RDV expert → devis → travaux → SAV)
5. **Témoignages** : 3 cards + 1 vidéo client
6. **Combien ça coûte** : fourchette + rappel des aides (MaPrimeRénov'/MaPrimeAdapt', TVA 5,5%, éco-PTZ)
7. **FAQ** : prix, durée, propriétaire/locataire, copropriété, garantie
8. **Formulaire #2** (long form) : +Nom, +Email, +créneau souhaité, +budget estimé
9. **Footer** : mentions, RGPD, SIRET

### Mobile
- **Sticky CTA bas d'écran** : "Mon devis gratuit ›"

### Spécificités par LP

**LP 1 — Baignoire → Douche**
- Angle principal : "Sans casse, sans gros chantier"
- Visuels : avant/après marquants, baignoires anciennes → douches modernes

**LP 2 — Senior**
- Typo plus grosse (16-18px base mobile, contraste élevé)
- Visuels : seniors souriants en autonomie (pas peur/déclin)
- Argument santé publique : "1 chute sur 3 chez les + de 65 ans a lieu dans la SDB" (source en footer)
- Section dédiée aux aides : MaPrimeAdapt' (jusqu'à 70%), caisse de retraite, Action Logement, AGIRC-ARRCO
- Témoignages : enfants qui équipent leurs parents (cible d'achat indirecte forte)
- Form hero : ajout dropdown "Âge du bénéficiaire" (60-70 / 70-80 / 80+)

**LP 3 — Rénovation totale**
- Visuels haut de gamme, moodboard + rendus 3D + réalisations photos
- Section "Conception 3D offerte" — gros driver de leads
- Aides : éco-PTZ, TVA 5,5%, MaPrimeRénov' (si volet performance énergétique)
- Mention "Financement possible à partir de X€/mois"
- Form hero : ajout dropdown "Surface SDB" (< 5m² / 5-8m² / 8-12m² / + 12m²)

---

## ⚙️ Phase 2 — Système routing leads (n8n self-hosted)

### Architecture

```
[Webhook IN] → [Normalize] → [Validate]
                                  ↓
                          [IF spam/invalid?]
                            ├── YES → [Stop]
                            └── NO →
                                  ↓
                ┌─────────────────┼─────────────────┐
                ↓                 ↓                 ↓
        [Notion Create]    [Telegram Send]    [Meta CAPI Lead]
                ↓                 ↓                 ↓
                └─────────[Merge & log]─────────────┘
```

### Détail des nodes

1. **Webhook IN** — POST, auth header `x-hpn-secret` (clé partagée stockée en env)
2. **Normalize** — mappe les payloads sources (LP form vs Meta Lead Ad webhook) vers un schéma unique :
```json
{
  "source": "lp_baignoire_douche" | "lp_senior" | "lp_renov" | "meta_leadad",
  "campaign": "...", "adset": "...", "ad": "...",
  "name": "...", "email": "...", "phone": "...",
  "postal_code": "...", "is_owner": true,
  "project_type": "...", "budget": "...",
  "raw": {...}
}
```
3. **Validate** — regex tél FR (`^(?:\+33|0)[1-9]\d{8}$`), email, CP FR (5 chiffres), honeypot vide
4. **Notion Create Page** — DB "Leads", statut auto = "Nouveau"
5. **Telegram Send Message** — Bot API, chat_id privé, message markdown avec lien direct vers la page Notion créée
6. **Meta CAPI Lead** (V1 obligatoire) — event `Lead` server-side, `event_id` = id Notion (dédup avec Pixel), `client_user_data` hashé (em, ph, fn, ln, zp)

### Côté LP Next.js

- Route API `app/api/lead/route.ts` qui reçoit le form
- Validation Zod côté serveur
- POST vers `/webhook/lead-intake` avec auth header
- Retour `{ ok: true }` → redirection page merci `/merci-{slug-lp}`
- Track côté client : `gtag('event', 'generate_lead')` + Pixel `Lead`

### Côté Meta Lead Ads natifs

- Webhook configuré dans Meta Business → événement `leadgen` → URL n8n
- n8n récupère `leadgen_id`, fetch via Graph API `/v18.0/{leadgen_id}` avec page access token

### Notion DB "Leads" — schéma

| Champ | Type | Notes |
|---|---|---|
| Nom | Title | |
| Téléphone | Phone | |
| Email | Email | |
| Code postal | Text | |
| Ville | Text | Auto-fill via API CP |
| Type travaux | Select | Baignoire→Douche / Senior / Rénov totale |
| Propriétaire | Checkbox | |
| Budget | Select | |
| Source | Select | LP / Meta Lead Ad / Google |
| Campagne | Text | |
| Adset | Text | |
| Ad | Text | |
| Statut | Select | Nouveau / Contacté / RDV pris / Devis envoyé / Signé / Perdu |
| Date arrivée | Created time | |
| Notes | Text | |

### Message Telegram type

```
🚨 NOUVEAU LEAD - [Type travaux]
📍 [Ville - CP]
👤 [Prénom] · 📞 [Tel cliquable]
💰 Budget : [X]
🎯 Source : Meta - [Campagne]
🔗 Voir dans Notion
```

---

## 📊 Phase 3 — Tracking carré dès J1

Stack proposée :

1. **Pixel + CAPI dédoublonné** (event_id partagé client/serveur)
2. **UTM standardisés** — convention HYPERNOVADS
3. **GTM sur les LP** — events front + dataLayer propre
4. **Server-side Lead via n8n** → CAPI Meta + Google Ads conversion API en parallèle
5. **Call tracking** — point critique : beaucoup de leads convertissent par téléphone sur ce vertical
   - Option low-tech : numéro dédié par campagne
   - Option pro : Dexem / CallRail (recommandé, à budgéter avec client)
6. **Boucle qualité retournée à Meta** ← LE point qui change tout :
   - Statut Notion "RDV pris" → event custom Meta "Qualified Lead"
   - Statut Notion "Signé" → event Meta "Purchase" avec valeur réelle du chantier
   - L'algo Meta arrête de chercher des "form fillers" et trouve des vrais payeurs
   - Effet x2 à x3 sur le ROAS à 60 jours

---

## 🎯 Stratégie acquisition Meta

### Phase de test (2 semaines)

Deux campagnes en parallèle pour A/B :

- **Campagne A** : objectif Leads, formulaire natif Meta (volume +, qualité -)
- **Campagne B** : objectif Leads, destination LP (volume -, qualité +)

KPI à comparer : **coût par lead qualifié** (pas CPL brut).
- Le natif sort souvent 30-50% moins cher en CPL
- Mais 2-3x moins qualifié sur le vertical travaux
- La LP gagne quasi toujours à 30 jours sur coût/lead qualifié

### Setup audiences

- Advantage+ Leads
- Broad FR + zone géo client (rayon 30-50km autour de ses agences)
- Exclusion auto : locataires (filtre formulaire "Êtes-vous propriétaire ?")

### Créas

- Avant/après vidéo court (15-30s)
- Statiques témoignages
- UGC client réel

---

## 🔍 Concurrents à scanner

### Marché FR (Meta Ad Library publique + Adplexity)

| Marque | Segment |
|---|---|
| **Ecoshower** | Référence client mentionnée |
| **Hexagon** | Leader segment senior |
| **Renovea** | Rénov totale |
| **Camif Habitat** | Rénov totale |
| **Illico Travaux** | Multi-segments |
| **Indépendance Royale** | Senior, agressif Meta + Native |
| **Maison Confort** | Multi-segments |
| **France Solutions Habitat** | Multi-segments |
| **Cuisinella / Schmidt SDB** | Rénov totale haut de gamme |

### Marché US (Adplexity — marketing 2 crans au-dessus)

| Marque | Spécialité |
|---|---|
| **Bath Fitter** | Mastodonte, "tub-to-shower in one day" |
| **Re-Bath** | Conversion baignoire |
| **Jacuzzi Bath Remodel** | Énorme spend Meta |
| **West Shore Home** | Lead gen ultra-agressif |
| **Mad City Windows & Baths** | Multi-produits |
| **Luxury Bath** | Premium |
| **Home Smart Industries** | Multi-segments |

**Mots-clés US à taper sur Adplexity** :
- `tub to shower conversion`
- `one day bathroom remodel`
- `walk-in shower`
- `walk-in tub` (très puissant côté senior)
- `bathroom remodel free quote`

### Ce qu'on cherche en regardant les LP

1. Position et nombre de champs du form en hero
2. Présence ou non d'un quiz pré-formulaire (US adore les quiz)
3. Construction du social proof (avant/après vs vidéos vs Trustpilot)
4. Traitement de l'objection prix (fourchette ? financement ? aides ?)
5. Trust badges et leur position
6. Sticky CTA mobile

---

## 🎨 3 angles créa à voler en priorité

1. **"Avant / Après" en split-screen** — vidéo 15s ou statique. Le plus fort sur ce vertical, tous les acteurs l'utilisent.
2. **"En 1 jour seulement"** — l'argument temps tue le frein "ça va durer 3 semaines de chantier". UGC client qui filme sa SDB neuve le soir.
3. **"Aides jusqu'à X€"** — chiffre concret (ex : "Jusqu'à 14 000€ d'aides MaPrimeAdapt'") + bouton "Vérifier mon éligibilité". Hyper performant cold traffic senior.

---

## 🛤️ Roadmap d'exécution

### Phase 0 — Cadrage (en cours)
- [x] Brief initial validé
- [ ] Recherche LP FR + US sur Adplexity (Steve, week-end)
- [ ] Brief client complet (`02-brief-client.md`)
- [ ] Inspis collectées (`01-inspi-lp.md`)

### Phase 1 — Les 3 LP
- [ ] Wireframes finalisés des 3 LP (`03-wireframes.md`)
- [ ] Copy draft des 3 LP (1 doc par LP)
- [ ] Structure repo Next.js (pages, composants partagés, /api/lead, env)
- [ ] Build composants partagés (Hero, Form, Sections, Sticky CTA)
- [ ] Build LP 1 (baignoire → douche)
- [ ] Build LP 2 (senior)
- [ ] Build LP 3 (rénov totale)
- [ ] Pages merci
- [ ] Déploiement Vercel + sous-domaines

### Phase 2 — Automatisations
- [ ] Setup n8n self-hosted (instance + sécurité)
- [ ] Création Notion DB "Leads" + intégration
- [ ] Création Telegram bot + chat_id
- [ ] Workflow n8n `/lead-intake` (webhook → Notion + Telegram + CAPI)
- [ ] Workflow n8n Meta Leadgen webhook (Graph API fetch → mêmes sorties)
- [ ] Tests bout en bout (LP form + Meta lead ad)

### Phase 3 — Tracking
- [ ] Pixel + CAPI dédoublonné (event_id)
- [ ] GTM setup + dataLayer
- [ ] UTM convention HYPERNOVADS
- [ ] Google Ads conversion API en parallèle
- [ ] Call tracking (option à valider : numéros dédiés vs Dexem/CallRail)
- [ ] Boucle qualité : statut Notion → events custom Meta (Qualified Lead + Purchase)

### Phase 4 — Lancement
- [ ] Validation BM Meta (associé ou loué)
- [ ] Setup campagnes A (natif) + B (LP)
- [ ] Premiers visuels + textes ads
- [ ] Lancement test 2 semaines
- [ ] Itération créa + LP sur base data

---

## 🧠 Convention de travail

- Livrables en **français**
- Réponses **opérationnelles**, pas conceptuelles
- **Étape par étape**, on ne lance pas la phase N+1 tant que la phase N n'est pas validée
- Tout passe par le projet Claude `LP SDB` (knowledge files versionnés `00-`, `01-`, `02-`...)

---

*Document de travail — itérer librement, dater les modifications majeures.*
