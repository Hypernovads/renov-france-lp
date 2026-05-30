# Roadmap — CRM SaaS interne « Rénovation »

> **Décision (2026-05-31)** : on garde Notion comme MVP CRM pendant l'été.
> Réévaluation **rentrée septembre 2026** selon le volume de leads + chantiers.
> Si ça monte (≥ 30-50 leads/mois ou besoin de workflows fins), on attaque le SaaS custom.

---

## 🎯 Vision

Un **CRM web interne** (toi + Anthony, pas un SaaS public) qui :
- Centralise tout l'opérationnel rénovation (prospects → clients → chantiers → factures → dossiers d'aides)
- A un **vrai design soigné** (vs l'austère de Notion)
- Automatise **un maximum de workflows** : WhatsApp, SMS, email, relances, génération PDF, signature électronique
- Reste **léger, rapide, mobile-friendly** (consultable depuis chantier sur téléphone)

---

## 🛠️ Stack proposée

| Couche | Choix | Pourquoi |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) + TypeScript | Continuité avec la LP, on maîtrise |
| **UI** | shadcn/ui + Tailwind + Recharts | Look pro par défaut, customisable |
| **Backend** | Supabase (Postgres + Auth + Storage + RLS + Realtime) | Tout-en-un, hosting inclus, sync live possible |
| **Tableaux** | TanStack Table | Performant sur gros volumes |
| **Auth** | Supabase Auth (email magic link) | Toi + Anthony, simple |
| **Notifs** | Le code `lib/notify.ts` existant (Telegram + …) | Réutilisable tel quel |
| **Hosting** | Vercel (front) + Supabase (back) | Déjà en place pour la LP |

---

## 📦 Périmètre MVP — Semaine 1 (5-7 jours intenses)

### Bases (CRUD complet + filtres/tri/recherche)
- Prospects
- Devis
- Clients
- Chantiers
- Factures
- Dossiers d'aides (MaPrimeAdapt', Action Logement, CARSAT, APA)
- Catalogue prestations
- Sous-traitants
- Fournisseurs
- Photothèque
- Témoignages

### Dashboard temps réel
- KPIs : nb prospects mois, taux conversion, chantiers en cours, CA encaissé, aides obtenues
- Graphiques : CA mensuel (barres), pipeline (donut), évolution leads par source LP
- Alertes : factures en retard, dossiers d'aides en attente > X jours, devis sans réponse > Y jours

### Réutilisé tel quel
- `/api/lead` (déjà en place) → écrit dans Supabase + Telegram + on peut garder Notion en miroir
- `lib/notify.ts` (Telegram) → ré-importé directement

### Migration data Notion → Supabase
Script one-shot (export Notion API → mapping → insert Supabase).

---

## 🤖 Approche multi-agents (Claude / Cursor)

**1 jour de spec amont (le plus important) → 5-7 jours de build**

| Agent | Périmètre |
|---|---|
| **Architect** | Schéma Postgres + RLS policies + types TS partagés + spec API |
| **Backend** | API routes + auth + migration Notion → Supabase + tests intégration |
| **Frontend** | Layout + dashboard + 11 pages CRUD + responsive mobile |
| **QA** | Tests E2E Playwright + accessibility + revue cross-agent |

Workflow : agents qui s'auto-valident, Steve valide les jalons (J+1 spec, J+3 backend complet, J+5 frontend complet, J+7 polish + tests).

---

## 🔁 Roadmap automatisations (post-MVP)

### Phase Workflow 1 — Communication client
- **WhatsApp auto** (via WhatsApp Business API ou Twilio) :
  - Nouveau lead → message d'accueil dans la minute (« Bonjour {nom}, on vous rappelle d'ici 1h »)
  - RDV fixé → confirmation J-1 et J-jour
  - Chantier livré → message de remerciement + lien avis Google
- **SMS** (Twilio / OVH SMS) :
  - Rappels RDV
  - Confirmations livraison
- **Email** (Resend / Postmark) :
  - Devis envoyé → email + PDF en pièce jointe
  - Relance auto J+3 si devis pas ouvert
  - Demande d'avis J+7 après livraison

### Phase Workflow 2 — Pipeline & documents
- **Génération PDF auto** : devis et factures (template HTML → PDF via Puppeteer ou react-pdf)
- **Signature électronique** : intégration Yousign / Dropbox Sign sur les devis
- **Relances paiement auto** : facture impayée J+5, J+15, J+30 → email + SMS
- **Suivi dossiers d'aides** : notif chaque changement de statut ANAH (si API dispo, sinon manuel)

### Phase Workflow 3 — Intelligence
- **Scoring leads** : prédire la probabilité de conversion (modèle simple basé sur âge + statut + revenu + zone)
- **Suggestions chantiers** : recommander des prestations selon profil
- **Détection no-show RDV** : alerte si client n'a pas confirmé J-1
- **Boucle qualité Meta** : statut lead Notion/Supabase → événement custom CAPI → Meta optimise vers les vrais convertisseurs

### Phase Workflow 4 — Apps mobiles
- App mobile native (React Native) ou PWA installable
- Notifications push pour Anthony quand il est sur le chantier
- Capture photos chantier directement depuis téléphone → Photothèque

---

## 🚦 Triggers de décision « on lance »

À évaluer rentrée septembre 2026 :
- ≥ 30-50 leads/mois → Notion devient lent + frictions au quotidien
- ≥ 3-4 personnes dans l'équipe → besoin de rôles + permissions fines
- Volume devis ≥ 20/mois → génération PDF auto devient critique
- Volume factures ≥ 20/mois → relances paiement auto deviennent critiques
- Volonté de scaler la pub Meta → la boucle qualité (CAPI feedback) devient critique

---

## 💸 Estimation coûts récurrents (post-MVP)

| Poste | Coût mensuel estimé |
|---|---|
| Supabase (Pro) | 25 €/mois |
| Vercel (Pro) | 20 €/mois |
| WhatsApp Business API (selon volume) | 0,05 à 0,15 € / conversation initiée |
| SMS (Twilio) | ~0,05 € / SMS |
| Email (Resend Pro) | 20 €/mois (50k emails) |
| Signature électronique (Yousign basique) | ~0,50 € / signature |
| **TOTAL fixe** | **~70 €/mois** (hors volume WhatsApp/SMS/signature) |

Vs le coût d'un CRM SaaS pro type Pipedrive/HubSpot équivalent : 80-200 €/mois × N users, sans le custom métier.

---

## 📂 Migration Notion → SaaS

Données à migrer (par base Notion) :
- Toutes les pages avec leur propriétés (mapping Notion API → schema Supabase)
- Toutes les **relations** (Prospect↔Client, Client↔Chantiers, etc.) → relations Postgres FK
- Toutes les pièces jointes (Photothèque) → Supabase Storage
- L'**ID `LD-X` / `CLI-X` / etc.** conservés (auto-increment SERIAL repris à partir du dernier ID Notion)

Le SaaS peut tourner **en miroir** de Notion pendant 1-2 semaines (double écriture) → bascule progressive sans risque.

---

## 🔗 Liens utiles

- Espace Notion CRM actuel : https://www.notion.so/355de4447f1280e7aa40e59b2ef06b2e
- Dashboard Notion : https://www.notion.so/370de4447f12812baad5c606c1b1e3a0
- Repo LP (où le code `/api/lead` et `lib/notify.ts` vivront aussi côté CRM) : ce projet

---

*Doc à enrichir au fur et à mesure des apprentissages Notion de l'été (workflows manquants, frictions répétées, idées d'auto). Plus on a de matière en septembre, plus le SaaS sera taillé sur mesure.*
