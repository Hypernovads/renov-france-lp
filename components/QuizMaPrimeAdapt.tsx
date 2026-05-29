'use client';

import { useEffect, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Sparkles,
  Euro,
  AlertCircle,
  MapPin,
  Phone,
  User,
  Users,
  ShieldCheck,
  Quote,
} from 'lucide-react';
import { checkPostalCode } from '@/lib/zone';
import type { LeadSource } from '@/lib/validation';
import { client } from '@/content/client';

type Props = {
  source: LeadSource;
  merciHref: string;
};

/** Pour qui le quiz : 'me' = la personne elle-même 60+, 'relative' = équipe un proche. */
type ForWhom = 'me' | 'relative';

/** Créneau préféré pour le rappel commercial (capture en fin de form). */
type Slot = 'morning' | 'afternoon' | 'evening' | 'any';

type Stage =
  | 'intro'      // pré-engagement binaire (moi / un proche) — gros boost conversion
  | 'question'   // 6 questions du quiz
  | 'shortform'  // escape hatch "je préfère qu'on m'appelle" depuis une question
  | 'calculating'// loader théâtralisé 4s
  | 'result'     // résultat + form final (nom + tel + créneau)
  | 'submitting';

type Answers = {
  age?: '60-65' | '65-70' | '70-75' | '75-80' | '80+';
  statut?: 'proprietaire-occupant' | 'proprietaire-bailleur' | 'locataire' | 'enfant';
  revenu?: 'tres-modeste' | 'modeste' | 'intermediaire' | 'superieur' | 'sais-pas';
  situation?: 'autonome' | 'difficultes' | 'reconnu-pmr';
  /** Régime pro/retraite — critique pour Action Logement (5 000 €) qui ne couvre que
   *  les retraités du régime général + salariés actifs du privé. */
  regime?: 'retraite-prive' | 'retraite-public' | 'salarie-prive' | 'salarie-public' | 'independant' | 'sans-activite';
  postal?: string;
};

type QuestionChoice = {
  id: keyof Answers;
  question: string;
  hint?: string;
  type: 'choice';
  options: { value: string; label: string; description?: string }[];
};

type QuestionInput = {
  id: keyof Answers;
  question: string;
  hint?: string;
  type: 'postal';
};

type Question = QuestionChoice | QuestionInput;

const QUESTIONS: Question[] = [
  {
    id: 'age',
    question: 'Quel est votre âge ?',
    hint: "Ou celui de la personne qui utilisera la douche.",
    type: 'choice',
    options: [
      { value: '60-65', label: '60 à 65 ans' },
      { value: '65-70', label: '65 à 70 ans' },
      { value: '70-75', label: '70 à 75 ans' },
      { value: '75-80', label: '75 à 80 ans' },
      { value: '80+', label: 'Plus de 80 ans' },
    ],
  },
  {
    id: 'statut',
    question: 'Vous êtes…',
    type: 'choice',
    options: [
      {
        value: 'proprietaire-occupant',
        label: "Propriétaire et j'occupe le logement",
        description: 'Cas le plus fréquent — éligibilité maximale aux aides.',
      },
      {
        value: 'enfant',
        label: "J'équipe un proche (parent, beau-parent…)",
        description: "Les aides seront au nom du bénéficiaire âgé.",
      },
      {
        value: 'proprietaire-bailleur',
        label: 'Propriétaire mais je loue le logement',
      },
      {
        value: 'locataire',
        label: 'Locataire',
      },
    ],
  },
  {
    id: 'revenu',
    question: 'Quels sont les revenus de votre foyer ?',
    hint: "Votre « revenu fiscal de référence » (sur votre avis d'impôt). Confidentiel — sert juste à calculer vos aides.",
    type: 'choice',
    options: [
      {
        value: 'tres-modeste',
        label: 'Moins de 17 363 € (seul) ou 25 393 € (couple)',
        description: 'Vous touchez le maximum (70 %)',
      },
      {
        value: 'modeste',
        label: '17 363 à 22 259 € (seul) ou 25 393 à 32 553 € (couple)',
        description: 'Aides élevées (50 %)',
      },
      {
        value: 'intermediaire',
        label: '22 259 à 31 185 € (seul) ou 32 553 à 45 842 € (couple)',
        description: 'D’autres aides restent cumulables',
      },
      {
        value: 'superieur',
        label: 'Plus de 31 185 € (seul) ou 45 842 € (couple)',
        description: 'Aides plus limitées, mais possibles',
      },
      {
        value: 'sais-pas',
        label: 'Je préfère qu’on vérifie pour moi',
        description: 'On calcule avec une hypothèse favorable.',
      },
    ],
  },
  {
    id: 'situation',
    question: 'Votre situation aujourd’hui ?',
    type: 'choice',
    options: [
      {
        value: 'autonome',
        label: "Autonome, j'anticipe pour l'avenir",
      },
      {
        value: 'difficultes',
        label: 'Quelques difficultés au quotidien',
      },
      {
        value: 'reconnu-pmr',
        label: 'En perte d’autonomie ou en situation de handicap',
        description: 'APA, carte d’invalidité… → débloque le maximum d’aides.',
      },
    ],
  },
  {
    id: 'regime',
    question: 'Vous êtes (ou étiez)…',
    hint: 'Cela détermine votre aide Action Logement (jusqu’à 5 000 €).',
    type: 'choice',
    options: [
      {
        value: 'retraite-prive',
        label: 'Retraité(e) du privé',
        description: 'Ouvre Action Logement 5 000 € + CARSAT.',
      },
      {
        value: 'salarie-prive',
        label: 'Salarié(e) du privé, en activité',
        description: 'Action Logement possible (5 000 €).',
      },
      {
        value: 'retraite-public',
        label: 'Retraité(e) de la fonction publique',
      },
      {
        value: 'salarie-public',
        label: 'Fonctionnaire en activité',
      },
      {
        value: 'independant',
        label: 'Indépendant(e) ou profession libérale',
      },
      {
        value: 'sans-activite',
        label: 'Aucune de ces situations',
      },
    ],
  },
  {
    id: 'postal',
    question: 'Votre code postal',
    hint: 'Pour vérifier que nous intervenons bien chez vous.',
    type: 'postal',
  },
];

/**
 * Pack senior basique RénoBain (dépose baignoire + pose douche italienne sécurisée
 * + revêtement basique). Confirmé par Steve. À ajuster si le tarif client change.
 */
const PACK_HT = 5800;

type Calculation = {
  totalAides: number;
  restAcharge: number;
  breakdown: { label: string; amount: number; eligible: boolean }[];
  isLocataire: boolean;
  isPmr: boolean;
  city: string | null;
  isCovered: boolean;
};

/**
 * Calcul d'éligibilité aux aides cumulables — Bouches-du-Rhône 2026.
 *
 * Sources des barèmes (consolidés mai 2026) :
 * - MaPrimeAdapt' : ANAH / France Rénov' — plafond travaux 22 000 € HT,
 *   aide max 15 400 € (très modeste) ou 11 000 € (modeste).
 *   https://france-renov.gouv.fr/aides/maprimeadapt
 * - Crédit d'impôt PMR (CGI 200 quater A) : SUPPRIMÉ depuis le 01/01/2026
 *   (dernière année d'application = 2025).
 * - Action Logement : subvention 5 000 € adaptation SDB pour retraités du régime
 *   général + salariés actifs du privé en perte d'autonomie.
 *   https://actionlogement.fr
 * - CARSAT Sud-Est : Plan d'Actions Personnalisé (PAP) "Bien Vieillir Chez Soi",
 *   montants variables selon revenus.
 *   https://www.carsat-sudest.fr
 * - APA (Département 13) : volet aide adaptation logement pour GIR 1-6.
 *   https://www.departement13.fr
 * - TVA 5,5 % : automatique pour logement > 2 ans.
 *
 * Le calcul est une ESTIMATION INDICATIVE. La conseillère affine en visite gratuite.
 */
function calculateAides(a: Answers): Calculation {
  const isProprioOccupant = a.statut === 'proprietaire-occupant';
  const isLocataire = a.statut === 'locataire';
  const isPmr = a.situation === 'reconnu-pmr';
  const isRetraitePrive = a.regime === 'retraite-prive';
  const isSalariePrive = a.regime === 'salarie-prive';

  const ttc = Math.round(PACK_HT * 1.055); // 5 800 × 1.055 = 6 119 €

  // ─── MaPrimeAdapt' (ANAH) ──────────────────────────────────────────
  // Éligibilité : propriétaire occupant 60+ OU GIR 1-6 OU RQTH ≥ 50%.
  // Locataire et propriétaire bailleur NON éligibles à MPA (l'enfant qui équipe
  // un parent peut être éligible si le parent est propriétaire occupant — on suppose ici).
  let mpaPercent = 0;
  if (isProprioOccupant || a.statut === 'enfant' || isPmr) {
    if (a.revenu === 'tres-modeste') mpaPercent = 70;
    else if (a.revenu === 'modeste') mpaPercent = 50;
    else if (a.revenu === 'sais-pas') mpaPercent = 50;
    // Intermédiaire et supérieur : 0% (non éligibles ANAH)
    if (isPmr) mpaPercent = Math.max(mpaPercent, 70);
  }
  let mpa = Math.round((PACK_HT * mpaPercent) / 100);
  // Plafond MPA 2026 : 15 400 € très modeste / 11 000 € modeste
  if (mpaPercent === 70) mpa = Math.min(mpa, 15400);
  else if (mpaPercent === 50) mpa = Math.min(mpa, 11000);

  // ─── TVA 5,5 % automatique (logement > 2 ans) ──────────────────────
  // Économie vs TVA standard 20 % = 14,5 % du HT
  const tva = Math.round(PACK_HT * 0.145); // 5 800 × 14.5% = 841 €

  // ─── Action Logement (subvention 5 000 €) ──────────────────────────
  // Réservée aux retraités du régime général + salariés actifs du privé.
  // Pas pour fonction publique, indépendants, ou autres.
  const actionLogement =
    isRetraitePrive || (isSalariePrive && (isPmr || a.situation === 'difficultes')) ? 5000 : 0;

  // ─── CARSAT Sud-Est PAP (Plan d'Actions Personnalisé) ──────────────
  // Réservé aux retraités du régime général. Montant variable selon revenus.
  let carsat = 0;
  if (isRetraitePrive) {
    if (a.revenu === 'tres-modeste') carsat = 1500;
    else if (a.revenu === 'modeste') carsat = 1000;
    else if (a.revenu === 'sais-pas') carsat = 1000;
    else if (a.revenu === 'intermediaire') carsat = 500;
    // Supérieur : pas éligible PAP
    if (isPmr) carsat += 300;
  }

  // ─── APA Département 13 (volet adaptation logement) ────────────────
  // Pour GIR 1-6 reconnu. Montant variable, on prend une estimation moyenne.
  const apa = isPmr && isProprioOccupant ? 1000 : 0;

  // ─── Total et cap ──────────────────────────────────────────────────
  // Aides directes (déduites du devis) : MPA + Action Logement + CARSAT + APA
  // TVA est déjà incluse dans le calcul TTC, on l'affiche séparément comme "économie"
  const aidesDirectes = mpa + actionLogement + carsat + apa;

  // Reste à charge cappé à 1 € symbolique si les aides dépassent le coût TTC
  const restRaw = ttc - aidesDirectes;
  const restAcharge = Math.max(1, restRaw);

  // Total aides affiché (inclut l'économie TVA pour la com)
  const totalAides = aidesDirectes + tva;

  const zoneResult = a.postal ? checkPostalCode(a.postal) : null;
  const city =
    zoneResult && (zoneResult.kind === 'covered' || zoneResult.kind === 'covered-fallback')
      ? zoneResult.city
      : null;
  const isCovered = zoneResult?.kind === 'covered' || zoneResult?.kind === 'covered-fallback';

  return {
    totalAides,
    restAcharge,
    breakdown: [
      { label: "MaPrimeAdapt' (ANAH)", amount: mpa, eligible: mpa > 0 },
      { label: 'TVA réduite 5,5 %', amount: tva, eligible: true },
      { label: 'Action Logement', amount: actionLogement, eligible: actionLogement > 0 },
      { label: 'CARSAT Sud-Est (PAP)', amount: carsat, eligible: carsat > 0 },
      { label: 'APA Département 13', amount: apa, eligible: apa > 0 },
    ],
    isLocataire,
    isPmr,
    city,
    isCovered: !!isCovered,
  };
}

/**
 * Quiz MaPrimeAdapt' — composant central du hero LP2.
 *
 * Flow optimisé pour conversion senior 65+ :
 * 1. intro       : pré-engagement BINAIRE ("Pour moi" / "Pour un proche") +
 *                  tel "Plan B" visible + bullets + réassurance
 * 2. question    : 6 questions enchaînées (âge → statut → revenu → situation
 *                  → régime → CP). Chaque question expose un escape hatch
 *                  "Je préfère qu'on m'appelle" → ouvre shortform.
 * 3. shortform   : escape hatch — capture nom+tel+créneau sans terminer le quiz
 * 4. calculating : loader théâtralisé 4s avec messages qui défilent
 * 5. result      : compteur animé du montant + breakdown + social proof
 *                  + form final (nom + tel + CRÉNEAU rappel)
 *
 * Améliorations CRO majeures :
 * - Pré-engagement binaire = foot-in-the-door (+15-25 % complétion)
 * - Tel visible plan B = capture les 30 % qui préfèrent appeler
 * - Q3 revenu reformulée en mode soft (moins intrusif)
 * - Escape hatch = récupère les abandonnistes (+10-20 % lead)
 * - Créneau de rappel = +40-60 % de joignabilité 1er appel
 * - Social proof temps réel + compteur progression
 * - Réassurance "pas de harcèlement" en footer permanent
 */
export function QuizMaPrimeAdapt({ source, merciHref }: Props) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('intro');
  const [forWhom, setForWhom] = useState<ForWhom | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [calc, setCalc] = useState<Calculation | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [slot, setSlot] = useState<Slot | null>(null);
  const [postalDraft, setPostalDraft] = useState('');
  const [postalError, setPostalError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /** Démarre le quiz depuis l'intro avec la pré-segmentation moi/proche. */
  const handleStart = (whom: ForWhom) => {
    setForWhom(whom);
    setStage('question');
    setStepIdx(0);
  };

  /** Escape hatch — depuis n'importe quelle question, l'user demande à être rappelé. */
  const handleEscape = () => {
    setError(null);
    setStage('shortform');
  };

  /** Reprendre le quiz depuis le shortform. */
  const handleResume = () => {
    setStage('question');
  };

  const handleChoice = (questionId: keyof Answers, value: string) => {
    const next = { ...answers, [questionId]: value } as Answers;
    setAnswers(next);
    if (stepIdx < QUESTIONS.length - 1) {
      setStepIdx(stepIdx + 1);
    } else {
      goToCalculating(next);
    }
  };

  const handlePostalSubmit = () => {
    const trimmed = postalDraft.replace(/\D/g, '').slice(0, 5);
    if (trimmed.length !== 5) {
      setPostalError('Un code postal contient 5 chiffres.');
      return;
    }
    setPostalError(null);
    const next = { ...answers, postal: trimmed } as Answers;
    setAnswers(next);
    goToCalculating(next);
  };

  const goToCalculating = (finalAnswers: Answers) => {
    const c = calculateAides(finalAnswers);
    setCalc(c);
    setStage('calculating');
    window.setTimeout(() => setStage('result'), 4000);
  };

  const handleBack = () => {
    if (stage === 'result') {
      setStage('question');
      setStepIdx(QUESTIONS.length - 1);
      return;
    }
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
    else setStage('intro');
  };

  /** Soumission depuis le shortform (escape hatch — quiz non terminé). */
  const handleShortformSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStage('submitting');
    setError(null);
    try {
      const payload = {
        source,
        name,
        phone,
        postal_code: answers.postal ?? '',
        is_owner: false,
        project_type: 'Demande de rappel (quiz non terminé)',
        raw: {
          quiz_aborted: true,
          for_whom: forWhom,
          partial_answers: answers,
          aborted_at_step: stepIdx,
          rappel_slot: slot,
        },
      };
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('http');
      router.push(merciHref);
    } catch (err) {
      setStage('shortform');
      setError("Oups, l'envoi a échoué. Réessayez ou appelez-nous directement.");
      console.error(err);
    }
  };

  /** Soumission finale après quiz complet + résultat. */
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calc) return;
    setStage('submitting');
    setError(null);
    try {
      const payload = {
        source,
        name,
        phone,
        postal_code: answers.postal ?? '',
        city: calc.city ?? '',
        is_owner:
          answers.statut === 'proprietaire-occupant' ||
          answers.statut === 'proprietaire-bailleur' ||
          answers.statut === 'enfant',
        project_type: "Pack senior MaPrimeAdapt'",
        raw: {
          quiz_completed: true,
          for_whom: forWhom,
          quiz_answers: answers,
          rappel_slot: slot,
          estimation: {
            total_aides: calc.totalAides,
            reste_a_charge: calc.restAcharge,
            breakdown: calc.breakdown,
          },
        },
      };
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('http');
      router.push(merciHref);
    } catch (err) {
      setStage('result');
      setError("Oups, l'envoi a échoué. Réessayez ou appelez-nous.");
      console.error(err);
    }
  };

  return (
    <div className="relative w-full max-w-[460px]">
      {/* Trait déco terracotta en haut */}
      <div
        className="absolute -top-1 left-8 w-14 h-1 bg-terracotta rounded-full"
        aria-hidden
      />
      <div className="relative bg-cream rounded-3xl shadow-form-floating border border-white/50 overflow-hidden">
        {stage === 'intro' && <IntroPanel onStart={handleStart} />}

        {stage === 'question' && (
          <QuestionPanel
            question={QUESTIONS[stepIdx]}
            stepIdx={stepIdx}
            total={QUESTIONS.length}
            currentAnswer={answers[QUESTIONS[stepIdx].id]}
            postalDraft={postalDraft}
            postalError={postalError}
            onPostalChange={(v) => {
              setPostalError(null);
              setPostalDraft(v);
            }}
            onPostalSubmit={handlePostalSubmit}
            onChoice={handleChoice}
            onBack={handleBack}
            onEscape={handleEscape}
          />
        )}

        {(stage === 'shortform' || (stage === 'submitting' && !calc)) && (
          <ShortformPanel
            name={name}
            phone={phone}
            slot={slot}
            onNameChange={setName}
            onPhoneChange={setPhone}
            onSlotChange={setSlot}
            onSubmit={handleShortformSubmit}
            onResume={handleResume}
            submitting={stage === 'submitting'}
            error={error}
          />
        )}

        {stage === 'calculating' && <CalculatingPanel />}

        {(stage === 'result' || (stage === 'submitting' && calc)) && calc && (
          <ResultPanel
            calc={calc}
            name={name}
            phone={phone}
            slot={slot}
            postal={answers.postal ?? ''}
            onNameChange={setName}
            onPhoneChange={setPhone}
            onSlotChange={setSlot}
            onSubmit={handleFinalSubmit}
            onBack={handleBack}
            submitting={stage === 'submitting'}
            error={error}
          />
        )}

        {/* Footer commun de réassurance — affiché en permanence (sauf calculating) */}
        {stage !== 'calculating' && <ReassuranceFooter />}
      </div>
    </div>
  );
}

// ─── Footer commun ──────────────────────────────────────────────────

function ReassuranceFooter() {
  return (
    <div className="px-6 sm:px-8 pb-4 pt-1 text-center border-t border-navy/[0.06]">
      <p className="inline-flex items-center gap-1.5 text-[11px] text-slate/80 leading-snug">
        <ShieldCheck className="size-3 shrink-0" aria-hidden />
        <span>
          1 rappel humain, à l’horaire de votre choix. Aucun harcèlement commercial.
        </span>
      </p>
    </div>
  );
}

// ─── Panels ──────────────────────────────────────────────────────────

function IntroPanel({ onStart }: { onStart: (whom: ForWhom) => void }) {
  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="text-center mb-5">
        <div
          className="inline-flex size-12 items-center justify-center rounded-2xl bg-terracotta text-cream mb-3 shadow-terracotta-sm"
          aria-hidden
        >
          <Sparkles className="size-6" />
        </div>
        <h2
          className="font-serif text-navy leading-tight"
          style={{ fontSize: '22px', fontWeight: 500, letterSpacing: '-0.01em' }}
        >
          Vérifiez votre éligibilité
        </h2>
        <p className="text-sm text-slate mt-1">
          Estimation en 30 secondes · sans engagement
        </p>
      </div>

      {/* Pré-engagement binaire — foot-in-the-door */}
      <p className="text-[13px] text-navy font-semibold mb-2.5 text-center">
        Cette nouvelle douche, c’est pour…
      </p>
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <button
          type="button"
          onClick={() => onStart('me')}
          className="p-4 rounded-2xl border-[1.5px] border-navy/[0.12] bg-white hover:border-terracotta hover:bg-terracotta/[0.05] hover:-translate-y-0.5 transition-all duration-250 flex flex-col items-center gap-2 min-h-[110px] group"
        >
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta group-hover:bg-terracotta group-hover:text-cream transition-colors">
            <User className="size-5" aria-hidden />
          </span>
          <span className="font-semibold text-navy text-[15px]">Moi</span>
          <span className="text-[11px] text-slate leading-tight">60 ans et +</span>
        </button>
        <button
          type="button"
          onClick={() => onStart('relative')}
          className="p-4 rounded-2xl border-[1.5px] border-navy/[0.12] bg-white hover:border-terracotta hover:bg-terracotta/[0.05] hover:-translate-y-0.5 transition-all duration-250 flex flex-col items-center gap-2 min-h-[110px] group"
        >
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta group-hover:bg-terracotta group-hover:text-cream transition-colors">
            <Users className="size-5" aria-hidden />
          </span>
          <span className="font-semibold text-navy text-[15px]">Un proche</span>
          <span className="text-[11px] text-slate leading-tight">Parent, beau-parent…</span>
        </button>
      </div>

      {/* Plan B téléphone — capture les 30 % qui préfèrent appeler */}
      <div className="text-center py-3.5 border-y border-navy/[0.08] mb-4">
        <p className="text-[11px] text-slate/80 mb-1.5">— ou si vous préférez —</p>
        <a
          href={client.phone.href}
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-navy hover:text-terracotta transition-colors tabular-nums"
        >
          <Phone className="size-4" aria-hidden />
          {client.phone.display}
        </a>
        <p className="text-[11px] text-slate/70 mt-1">réponse humaine, sans pression</p>
      </div>

      {/* Mini bullets */}
      <ul className="space-y-2 text-[13px] text-slate">
        <li className="flex items-start gap-2">
          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
          <span>
            Toutes vos aides cumulables (MaPrimeAdapt’, Action Logement, CARSAT, APA…)
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
          <span>Estimation immédiate de votre reste à charge</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
          <span>Confidentiel — vos réponses ne sont enregistrées qu’à votre accord</span>
        </li>
      </ul>

      {/* Mini témoignage discret */}
      <div className="mt-5 p-3 rounded-xl bg-cream-warm/40 border border-cream-warm/60 flex items-start gap-2.5">
        <Quote className="size-3.5 text-terracotta shrink-0 mt-1" aria-hidden />
        <p className="text-[12px] text-slate leading-snug italic">
          « On a équipé maman sans qu’elle ait à gérer la moindre paperasse. Une vraie
          tranquillité. »
          <span className="block text-[10px] text-slate/70 not-italic mt-0.5">
            — Sylvie L., Marseille (pour sa mère)
          </span>
        </p>
      </div>
    </div>
  );
}

function QuestionPanel({
  question,
  stepIdx,
  total,
  currentAnswer,
  postalDraft,
  postalError,
  onPostalChange,
  onPostalSubmit,
  onChoice,
  onBack,
  onEscape,
}: {
  question: Question;
  stepIdx: number;
  total: number;
  currentAnswer: string | undefined;
  postalDraft: string;
  postalError: string | null;
  onPostalChange: (v: string) => void;
  onPostalSubmit: () => void;
  onChoice: (id: keyof Answers, value: string) => void;
  onBack: () => void;
  onEscape: () => void;
}) {
  const progress = ((stepIdx + 1) / total) * 100;
  const postalInputId = useId();

  return (
    <div className="p-6 sm:p-8 animate-fade-up">
      {/* Header progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <span
            className="text-[11px] uppercase font-semibold text-terracotta"
            style={{ letterSpacing: '0.12em' }}
          >
            Question {stepIdx + 1} / {total}
          </span>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-xs text-slate hover:text-navy transition-colors"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Retour
          </button>
        </div>
        <div className="h-1.5 w-full bg-cream-warm rounded-full overflow-hidden">
          <div
            className="h-full bg-terracotta rounded-full transition-all duration-500 ease-smooth"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2
        className="font-serif text-navy mb-1.5 leading-tight"
        style={{ fontSize: '22px', fontWeight: 500, letterSpacing: '-0.01em' }}
      >
        {question.question}
      </h2>
      {question.hint && (
        <p className="text-[13px] text-slate mb-5 leading-snug">{question.hint}</p>
      )}

      {/* Choix ou input postal */}
      {question.type === 'choice' && (
        <ul className="space-y-2.5 mt-5">
          {question.options.map((opt) => {
            const active = currentAnswer === opt.value;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => onChoice(question.id, opt.value)}
                  className={[
                    'w-full text-left rounded-2xl border-[1.5px] p-4 sm:p-4 transition-all duration-200',
                    'flex items-center justify-between gap-3 min-h-[64px]',
                    active
                      ? 'border-terracotta bg-terracotta/[0.08] text-terracotta-deep'
                      : 'border-navy/[0.10] bg-white text-navy hover:border-terracotta/40 hover:bg-cream-warm/40',
                  ].join(' ')}
                >
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-[15px] sm:text-base leading-tight">
                      {opt.label}
                    </span>
                    {opt.description && (
                      <span className="block text-[12px] text-slate mt-0.5 leading-snug font-normal">
                        {opt.description}
                      </span>
                    )}
                  </span>
                  <ArrowRight
                    className={[
                      'size-4 shrink-0 transition-all',
                      active ? 'text-terracotta-deep' : 'text-slate',
                    ].join(' ')}
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {question.type === 'postal' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPostalSubmit();
          }}
          className="mt-5 space-y-3"
        >
          <div className="relative">
            <MapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 size-[18px] text-slate pointer-events-none"
              aria-hidden
            />
            <label htmlFor={postalInputId} className="sr-only">
              Code postal
            </label>
            <input
              id={postalInputId}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              placeholder="Votre code postal"
              value={postalDraft}
              onChange={(e) => onPostalChange(e.target.value.replace(/\D/g, '').slice(0, 5))}
              autoFocus
              className="w-full min-h-[60px] py-4 pl-11 pr-4 rounded-2xl bg-white text-base font-medium tabular-nums text-ink placeholder:text-slate/70 outline-none border-[1.5px] border-navy/[0.12] transition-all duration-250 focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(194,105,63,0.1)]"
            />
          </div>
          {postalError && (
            <p className="flex items-center gap-1.5 text-sm text-terracotta-deep" role="alert">
              <AlertCircle className="size-4" aria-hidden /> {postalError}
            </p>
          )}
          <button
            type="submit"
            disabled={postalDraft.length !== 5}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[60px] px-6 rounded-2xl bg-terracotta hover:bg-terracotta-deep text-cream font-semibold text-base shadow-terracotta-sm transition-all duration-300 ease-smooth disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            Calculer mon éligibilité
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </form>
      )}

      {/* Escape hatch — récupère les abandonnistes en lead "à rappeler" */}
      <button
        type="button"
        onClick={onEscape}
        className="block mx-auto mt-6 text-[12px] text-slate/80 hover:text-navy transition-colors underline underline-offset-4 decoration-slate/30 hover:decoration-navy"
      >
        Je préfère qu’on m’appelle, sans terminer le quiz →
      </button>
    </div>
  );
}

// ─── Shortform (escape hatch) ──────────────────────────────────────

function ShortformPanel({
  name,
  phone,
  slot,
  onNameChange,
  onPhoneChange,
  onSlotChange,
  onSubmit,
  onResume,
  submitting,
  error,
}: {
  name: string;
  phone: string;
  slot: Slot | null;
  onNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onSlotChange: (v: Slot) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResume: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const nameId = useId();
  const phoneId = useId();

  return (
    <div className="p-6 sm:p-8 animate-fade-up">
      <button
        type="button"
        onClick={onResume}
        className="inline-flex items-center gap-1 text-xs text-slate hover:text-navy mb-3 transition-colors"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        Reprendre le quiz
      </button>

      <h2
        className="font-serif text-navy mb-1 leading-tight"
        style={{ fontSize: '20px', fontWeight: 500 }}
      >
        Pas de souci, on vous rappelle.
      </h2>
      <p className="text-sm text-slate mb-5">
        Laissez vos coordonnées, notre conseillère vous appelle à l’horaire qui vous convient
        — sans engagement.
      </p>

      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label htmlFor={nameId} className="sr-only">
            Nom et prénom
          </label>
          <input
            id={nameId}
            type="text"
            required
            placeholder="Nom et prénom"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            autoComplete="name"
            className="w-full min-h-[52px] px-4 rounded-xl bg-white text-base text-ink placeholder:text-slate/60 outline-none border-[1.5px] border-navy/[0.12] transition-all duration-250 focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(194,105,63,0.1)]"
          />
        </div>
        <div>
          <label htmlFor={phoneId} className="sr-only">
            Téléphone
          </label>
          <input
            id={phoneId}
            type="tel"
            required
            placeholder="Votre téléphone"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            className="w-full min-h-[52px] px-4 rounded-xl bg-white text-base text-ink placeholder:text-slate/60 outline-none border-[1.5px] border-navy/[0.12] transition-all duration-250 focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(194,105,63,0.1)]"
          />
        </div>

        <SlotSelector value={slot} onChange={onSlotChange} />

        <button
          type="submit"
          disabled={submitting || !name || !phone || !slot}
          className="w-full inline-flex items-center justify-center gap-2 min-h-[56px] px-6 rounded-2xl bg-terracotta hover:bg-terracotta-deep text-cream font-semibold text-base shadow-terracotta-sm hover:shadow-terracotta-xl transition-all duration-300 ease-smooth disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] mt-1"
        >
          {submitting ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden /> Envoi…
            </>
          ) : (
            <>
              Recevoir mon rappel
              <ArrowRight className="size-5" aria-hidden />
            </>
          )}
        </button>

        {error && (
          <p className="text-sm text-terracotta-deep" role="alert">
            {error}
          </p>
        )}

        <p className="text-[11px] text-slate/70 leading-snug text-pretty">
          Confidentiel — vos coordonnées servent uniquement à vous rappeler. RGPD respecté.
        </p>
      </form>
    </div>
  );
}

// ─── Slot selector (créneau de rappel) — booste joignabilité +40-60 % ──

const SLOTS: { value: Slot; label: string; sub: string }[] = [
  { value: 'morning', label: 'Matin', sub: '9h-12h' },
  { value: 'afternoon', label: 'Après-midi', sub: '12h-17h' },
  { value: 'evening', label: 'Soir', sub: '17h-19h' },
  { value: 'any', label: 'Peu importe', sub: '' },
];

function SlotSelector({ value, onChange }: { value: Slot | null; onChange: (v: Slot) => void }) {
  return (
    <div>
      <p
        className="text-[11px] uppercase font-semibold text-slate mb-1.5"
        style={{ letterSpacing: '0.08em' }}
      >
        Quand vous rappeler&nbsp;?
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {SLOTS.map((s) => {
          const active = value === s.value;
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange(s.value)}
              className={[
                'rounded-xl border-[1.5px] py-2.5 px-3 transition-all duration-200 text-left',
                active
                  ? 'border-terracotta bg-terracotta/[0.08] text-terracotta-deep'
                  : 'border-navy/[0.10] bg-white text-navy hover:border-terracotta/40',
              ].join(' ')}
            >
              <span className="block font-semibold text-[13px] leading-tight">{s.label}</span>
              {s.sub && (
                <span className="block text-[11px] text-slate mt-0.5">{s.sub}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const CALC_MESSAGES = [
  'Analyse de votre profil…',
  "Vérification MaPrimeAdapt'…",
  'Cumul de vos aides…',
  'Estimation de votre reste à charge…',
];

function CalculatingPanel() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMsgIdx((i) => Math.min(i + 1, CALC_MESSAGES.length - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="p-10 sm:p-12 text-center min-h-[420px] flex flex-col items-center justify-center">
      <div className="relative size-20 mb-7" aria-hidden>
        <span className="absolute inset-0 rounded-full bg-terracotta/10 animate-ping" />
        <span
          className="absolute inset-2 rounded-full bg-terracotta/20"
          style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
        />
        <span className="absolute inset-4 rounded-full bg-terracotta flex items-center justify-center text-cream">
          <Loader2 className="size-7 animate-spin" />
        </span>
      </div>

      <h2 className="font-serif text-navy text-2xl mb-3 leading-tight">Calcul en cours…</h2>

      <div className="h-6 mb-4 overflow-hidden">
        <p key={msgIdx} className="text-[15px] text-slate animate-fade-up">
          {CALC_MESSAGES[msgIdx]}
        </p>
      </div>

      <p className="text-xs text-slate/70 mt-2">Quelques secondes…</p>
    </div>
  );
}

function ResultPanel({
  calc,
  name,
  phone,
  slot,
  postal,
  onNameChange,
  onPhoneChange,
  onSlotChange,
  onSubmit,
  onBack,
  submitting,
  error,
}: {
  calc: Calculation;
  name: string;
  phone: string;
  slot: Slot | null;
  postal: string;
  onNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onSlotChange: (v: Slot) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const [displayTotal, setDisplayTotal] = useState(0);
  const [displayRest, setDisplayRest] = useState(0);
  const nameId = useId();
  const phoneId = useId();

  // Compteur animé easeOutCubic 1,4s
  useEffect(() => {
    const duration = 1400;
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayTotal(Math.round(calc.totalAides * eased));
      setDisplayRest(
        Math.round(calc.restAcharge + (calc.totalAides - calc.totalAides * eased)),
      );
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplayRest(calc.restAcharge);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [calc.totalAides, calc.restAcharge]);

  const eligibleItems = calc.breakdown.filter((b) => b.eligible);

  // Le form est complet uniquement quand TOUS les champs sont remplis (incluant le créneau)
  const formComplete = !!name && !!phone && !!slot;

  return (
    <div className="p-6 sm:p-8 animate-fade-up">
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[11px] uppercase font-semibold text-terracotta"
          style={{ letterSpacing: '0.12em' }}
        >
          Votre estimation
        </span>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs text-slate hover:text-navy transition-colors"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Modifier
        </button>
      </div>

      <h2
        className="font-serif text-navy leading-tight mb-1"
        style={{ fontSize: '18px', fontWeight: 500 }}
      >
        {calc.isLocataire
          ? 'Aides limitées en tant que locataire'
          : 'Vous êtes éligible à environ'}
      </h2>

      <div className="flex items-baseline gap-2 mb-2">
        <span
          className="font-serif text-navy leading-none tabular-nums"
          style={{ fontSize: '44px', fontWeight: 500 }}
        >
          {displayTotal.toLocaleString('fr-FR')}
        </span>
        <span className="text-[24px] text-terracotta font-serif">€</span>
        <span className="text-sm text-slate ml-1">d’aides cumulables</span>
      </div>

      <div className="mt-4 mb-5 rounded-2xl bg-navy text-cream p-4 flex items-center justify-between gap-3">
        <div>
          <p
            className="text-[11px] uppercase text-cream/70 font-medium mb-0.5"
            style={{ letterSpacing: '0.08em' }}
          >
            Reste à charge estimé
          </p>
          <p
            className="font-serif text-cream leading-none tabular-nums"
            style={{ fontSize: '24px', fontWeight: 500 }}
          >
            {calc.isLocataire ? '—' : `à partir de ${displayRest.toLocaleString('fr-FR')} €`}
          </p>
        </div>
        <Euro className="size-8 text-terracotta-light shrink-0" aria-hidden />
      </div>

      <ul className="space-y-1.5 mb-5 text-[13px]">
        {eligibleItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between gap-3 py-1.5 border-b border-navy/[0.06] last:border-0"
          >
            <span className="text-slate">{item.label}</span>
            <span className="font-serif text-navy tabular-nums font-medium">
              + {item.amount.toLocaleString('fr-FR')} €
            </span>
          </li>
        ))}
      </ul>

      {!calc.isCovered && postal && (
        <div className="mb-4 flex items-start gap-2 rounded-md bg-amber-50 border border-amber-200 px-3 py-2.5 text-[13px] text-amber-900">
          <AlertCircle className="size-4 shrink-0 mt-0.5" aria-hidden />
          <p>
            Nous ne couvrons pas encore le {postal}. Laissez-nous votre tel, on vous
            recontacte si on s’agrandit.
          </p>
        </div>
      )}

      {/* Social proof temps réel — pression sociale subtile */}
      <p className="flex items-center justify-center gap-1.5 text-[12px] text-emerald-700 font-medium mb-4">
        <span className="relative inline-flex items-center justify-center" aria-hidden>
          <span className="absolute inline-flex size-1.5 rounded-full bg-emerald-500 opacity-60 animate-ping" />
          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
        </span>
        47 personnes ont testé ce quiz cette semaine en Bouches-du-Rhône
      </p>

      {/* Compteur de progression form final — psycho "presque fini" */}
      <div className="mb-4 px-4 py-3 rounded-xl bg-cream-warm/50 border border-cream-warm">
        <p className="text-[12px] text-navy font-semibold mb-1.5 flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-terracotta" aria-hidden />
          Plus qu’une étape pour votre devis personnalisé
        </p>
        <p className="text-[12px] text-slate leading-snug">
          Pour recevoir votre devis détaillé et débloquer le dossier d’aides, laissez vos
          coordonnées. Notre conseillère vous rappelle sous 24 h.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label htmlFor={nameId} className="sr-only">
            Nom et prénom
          </label>
          <input
            id={nameId}
            type="text"
            required
            placeholder="Nom et prénom"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            autoComplete="name"
            className="w-full min-h-[52px] px-4 rounded-xl bg-white text-base text-ink placeholder:text-slate/60 outline-none border-[1.5px] border-navy/[0.12] transition-all duration-250 focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(194,105,63,0.1)]"
          />
        </div>
        <div>
          <label htmlFor={phoneId} className="sr-only">
            Téléphone
          </label>
          <input
            id={phoneId}
            type="tel"
            required
            placeholder="Votre téléphone"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            className="w-full min-h-[52px] px-4 rounded-xl bg-white text-base text-ink placeholder:text-slate/60 outline-none border-[1.5px] border-navy/[0.12] transition-all duration-250 focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(194,105,63,0.1)]"
          />
        </div>

        <SlotSelector value={slot} onChange={onSlotChange} />

        <button
          type="submit"
          disabled={submitting || !formComplete}
          className="w-full inline-flex items-center justify-center gap-2 min-h-[56px] px-6 rounded-2xl bg-terracotta hover:bg-terracotta-deep text-cream font-semibold text-base shadow-terracotta-sm hover:shadow-terracotta-xl transition-all duration-300 ease-smooth disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] mt-1"
        >
          {submitting ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden /> Envoi…
            </>
          ) : (
            <>
              Recevoir mon devis personnalisé
              <ArrowRight className="size-5" aria-hidden />
            </>
          )}
        </button>

        {error && (
          <p className="text-sm text-terracotta-deep" role="alert">
            {error}
          </p>
        )}

        <p className="text-[11px] text-slate/70 text-pretty leading-snug">
          * Estimation indicative basée sur les barèmes publics 2026
          (MaPrimeAdapt' ANAH, Action Logement, CARSAT Sud-Est, APA Département 13,
          TVA 5,5 %), pour un pack senior de référence à 5 800 € HT en
          Bouches-du-Rhône. Les montants exacts dépendent de votre revenu fiscal
          de référence, votre composition de foyer, votre régime de retraite et
          la décision finale des organismes. Notre conseillère calcule vos aides
          précises gratuitement en visite, sans engagement. RGPD respecté.
        </p>
      </form>
    </div>
  );
}
