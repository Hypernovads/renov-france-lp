# HYPERNOVADS — LP SDB

3 landing pages haute conversion pour un client en rénovation de salle de bain
(Bouches-du-Rhône). Stack : Next.js 14 (App Router) + Tailwind + TypeScript + Vercel.

---

## 🚀 Dev local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) — page d'index avec liens vers les LP.

LP live :
- [/baignoire-douche](http://localhost:3000/baignoire-douche) — LP 1
- `/maprimeadapt` — LP 2 (à venir)
- `/renovation-totale` — LP 3 (à venir)

## 📦 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Dev server (HMR) |
| `npm run build` | Build production |
| `npm run start` | Serveur production (après build) |
| `npm run typecheck` | Vérification TypeScript stricte |

## 📁 Structure

```
.
├── app/
│   ├── layout.tsx              # fonts DM Serif/DM Sans + globals
│   ├── page.tsx                # index dev (liens vers les LP)
│   ├── globals.css             # tokens Tailwind + .btn-primary etc.
│   ├── baignoire-douche/       # LP 1
│   ├── merci-baignoire-douche/ # page merci LP 1
│   └── api/lead/               # endpoint POST avec validation Zod
│
├── components/                 # composants partagés entre toutes les LP
│   ├── AnnouncementBar.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ZipGate.tsx             # form progressif CP → tel+propriétaire
│   ├── TrustStrip.tsx          # mobile : 2×2 + ligne pleine Google
│   ├── PromiseGrid.tsx
│   ├── BeforeAfterSlider.tsx   # slider drag avant/après
│   ├── IncludedSection.tsx
│   ├── ProcessSteps.tsx
│   ├── Gallery.tsx             # composition asymétrique magazine
│   ├── SpecsSection.tsx
│   ├── Testimonials.tsx
│   ├── AidesSection.tsx
│   ├── FaqAccordion.tsx
│   ├── FormLong.tsx            # form complet bas de page
│   ├── CtaFinal.tsx
│   ├── Footer.tsx
│   ├── StickyBottomMobile.tsx  # WhatsApp / Tel / Devis
│   └── icons.ts                # registry lucide-react
│
├── content/                    # contenu textuel par LP (FR)
│   ├── client.ts               # ⚠️ infos client centrales (À COMPLÉTER)
│   ├── types.ts                # schéma LPContent partagé
│   └── lp-baignoire-douche.ts  # LP 1
│
├── lib/
│   ├── validation.ts           # Zod schema lead
│   └── zone.ts                 # dictionnaire CP → Ville (dpt 13)
│
└── docs/                       # cahier des charges (versionné)
    ├── 00-brief-initial.md
    ├── 01-inspi-lp.md
    ├── 02-brief-client.md
    └── 03-wireframes.md
```

## ⚠️ Avant mise en ligne

`content/client.ts` contient des **placeholders volontairement voyants**
(`À COMPLÉTER`, `04 XX XX XX XX`, `SIRET 14 chiffres`…). **Tout remplacer**
avant déploiement Vercel. Une seule source à mettre à jour, les 3 LP suivent.

À remplacer aussi : les photos Unsplash dans `content/lp-*.ts` quand les vraies
réalisations client seront livrées (poser dans `/public/images/realisations/`).

## 🎨 Charte graphique

Tokens définis dans `tailwind.config.ts` :

| Couleur | Hex | Usage |
|---|---|---|
| `navy` | `#0E2B4E` | Titres, accent fort |
| `navy-deep` | `#061A33` | Fonds sombres, sections premium |
| `cream` | `#F5EFE6` | Fond clair par défaut |
| `cream-warm` | `#EDE3D3` | Bordures, surfaces secondaires |
| `terracotta` | `#C2693F` | CTAs, accents |
| `terracotta-deep` | `#A85428` | CTAs hover |
| `terracotta-light` | `#E8A87C` | Highlights sur fond sombre |
| `gold` | `#C9A875` | Étoiles Google, touches discrètes |
| `ink` | `#0A0A0A` | Body text |
| `slate` | `#5C6675` | Texte secondaire |

Fonts :
- **DM Serif Display** (`font-serif`) — h1, h2, h3, chiffres clés
- **DM Sans** (`font-sans`) — body, CTAs, labels

## 🔌 Endpoint /api/lead

Phase 1 actuelle : validation Zod + `console.log` + retour `{ ok, leadId }`.

Pour activer le webhook n8n en Phase 2, décommenter la section TODO dans
[app/api/lead/route.ts](app/api/lead/route.ts) et set les env :

```bash
# .env.local
N8N_WEBHOOK_URL=https://n8n.exemple.com/webhook/lead-intake
N8N_SECRET=xxxxxxxxxxxxxxxx
```

Schéma lead exhaustif dans [lib/validation.ts](lib/validation.ts).

## 🛣️ Roadmap

- [x] LP 1 baignoire-douche (Phase 1)
- [ ] LP 2 MaPrimeAdapt' (avec Quiz 5 étapes)
- [ ] LP 3 Rénovation totale
- [ ] Webhook n8n (Phase 2)
- [ ] Tracking Pixel + CAPI dédoublonné (Phase 3)
- [ ] Déploiement Vercel + sous-domaines

Détails dans [docs/00-brief-initial.md](docs/00-brief-initial.md).
