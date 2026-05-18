'use client';

import { useEffect, useId, useRef, useState } from 'react';
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
} from 'lucide-react';
import { checkPostalCode } from '@/lib/zone';
import type { LeadSource } from '@/lib/validation';

type Props = {
  source: LeadSource;
  merciHref: string;
};

type Stage = 'intro' | 'question' | 'calculating' | 'result' | 'submitting';

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
    question: 'Quelle tranche de revenu fiscal ?',
    hint: "Confidentiel. Sert uniquement à estimer votre taux MaPrimeAdapt'.",
    type: 'choice',
    options: [
      { value: 'tres-modeste', label: 'Moins de 20 000 € / an', description: '→ très modeste' },
      { value: 'modeste', label: '20 000 — 28 000 € / an', description: '→ modeste' },
      {
        value: 'intermediaire',
        label: '28 000 — 38 000 € / an',
        description: '→ intermédiaire',
      },
      { value: 'superieur', label: 'Plus de 38 000 € / an' },
      { value: 'sais-pas', label: 'Je ne sais pas exactement' },
    ],
  },
  {
    id: 'situation',
    question: 'Votre situation aujourd’hui ?',
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
        label: "Reconnu en perte d'autonomie (GIR 1-6 ou RQTH ≥ 50 %)",
        description: "MaPrimeAdapt' 70 % automatique + APA possible.",
      },
    ],
  },
  {
    id: 'regime',
    question: 'Votre régime professionnel / retraite ?',
    hint: "Critique pour Action Logement (5 000 €) — réservée aux retraités du régime général et salariés actifs du privé.",
    type: 'choice',
    options: [
      {
        value: 'retraite-prive',
        label: 'Retraité·e du régime général (ex-salarié·e du privé)',
        description: 'Éligible Action Logement 5 000 € + CARSAT.',
      },
      {
        value: 'salarie-prive',
        label: 'Actif·ve, salarié·e du privé',
        description: 'Éligible Action Logement 5 000 € si en perte d’autonomie.',
      },
      {
        value: 'retraite-public',
        label: 'Retraité·e fonction publique',
      },
      {
        value: 'salarie-public',
        label: 'Actif·ve fonction publique',
      },
      {
        value: 'independant',
        label: 'Indépendant·e / profession libérale',
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
 * Flow :
 * 1. intro       : pitch "Vérifiez votre éligibilité en 30 sec" + CTA Commencer
 * 2. question    : 6 questions enchaînées (âge → statut → revenu → situation → régime → CP)
 * 3. calculating : écran 4s avec 4 messages qui défilent (théâtralisation)
 * 4. result      : estimation animée + breakdown + form (nom+tel) → submit /api/lead
 *
 * Design :
 * - Card cream avec trait déco terracotta top (cohérence ZipGate LP1)
 * - Progress bar terracotta + "Question X / 5"
 * - Cards de réponses (pas de radio plats) — UX senior-friendly
 * - Animations slide-down entre questions
 * - Loader théâtralisé : icône qui pulse + texte qui change toutes les 1s
 * - Résultat : compteur animé du montant, breakdown des aides, form final
 */
export function QuizMaPrimeAdapt({ source, merciHref }: Props) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('intro');
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [calc, setCalc] = useState<Calculation | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [postalDraft, setPostalDraft] = useState('');
  const [postalError, setPostalError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setStage('question');
    setStepIdx(0);
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
        project_type: 'Pack senior MaPrimeAdapt’',
        raw: {
          quiz_answers: answers,
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

  // ─── Rendu ──────────────────────────────────────────────────────────
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
          />
        )}

        {stage === 'calculating' && <CalculatingPanel />}

        {(stage === 'result' || stage === 'submitting') && calc && (
          <ResultPanel
            calc={calc}
            name={name}
            phone={phone}
            postal={answers.postal ?? ''}
            onNameChange={setName}
            onPhoneChange={setPhone}
            onSubmit={handleFinalSubmit}
            onBack={handleBack}
            submitting={stage === 'submitting'}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

// ─── Panels ──────────────────────────────────────────────────────────

function IntroPanel({ onStart }: { onStart: () => void }) {
  return (
    <div className="p-7 sm:p-9 text-center">
      <div
        className="inline-flex size-14 items-center justify-center rounded-2xl bg-terracotta text-cream mb-5 shadow-terracotta-sm"
        aria-hidden
      >
        <Sparkles className="size-7" />
      </div>
      <h2
        className="font-serif text-navy mb-2 leading-tight"
        style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '-0.01em' }}
      >
        Vérifiez votre éligibilité
      </h2>
      <p className="text-sm text-slate mb-6">
        6 questions simples · 45 secondes · sans engagement
      </p>

      <ul className="text-left space-y-2.5 mb-7 text-[14px] text-slate">
        <li className="flex items-start gap-2.5">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
          <span>
            Toutes vos aides cumulables (MaPrimeAdapt', TVA 5,5 %, crédit d'impôt, caisses de
            retraite)
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
          <span>Estimation immédiate de votre reste à charge</span>
        </li>
        <li className="flex items-start gap-2.5">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
          <span>Confidentiel — vos réponses ne sont enregistrées qu'à votre accord final</span>
        </li>
      </ul>

      <button
        type="button"
        onClick={onStart}
        className="w-full inline-flex items-center justify-center gap-2.5 min-h-[60px] px-6 rounded-2xl bg-terracotta hover:bg-terracotta-deep text-cream font-semibold text-base shadow-terracotta-sm hover:shadow-terracotta-xl transition-all duration-300 ease-smooth hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
        style={{ letterSpacing: '0.01em' }}
      >
        Commencer le quiz
        <ArrowRight className="size-5" aria-hidden />
      </button>
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
}) {
  const progress = ((stepIdx + 1) / total) * 100;
  const postalInputId = useId();

  return (
    <div className="p-6 sm:p-8 animate-fade-up">
      {/* Header : progress + numéro */}
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
                    'w-full text-left rounded-2xl border-[1.5px] p-4 sm:p-4.5 transition-all duration-200',
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
      {/* Animation cercles concentriques */}
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

      <h2 className="font-serif text-navy text-2xl mb-3 leading-tight">
        Calcul en cours…
      </h2>

      {/* Messages qui défilent */}
      <div className="h-6 mb-4 overflow-hidden">
        <p
          key={msgIdx}
          className="text-[15px] text-slate animate-fade-up"
        >
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
  postal,
  onNameChange,
  onPhoneChange,
  onSubmit,
  onBack,
  submitting,
  error,
}: {
  calc: Calculation;
  name: string;
  phone: string;
  postal: string;
  onNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const [displayTotal, setDisplayTotal] = useState(0);
  const [displayRest, setDisplayRest] = useState(0);
  const nameId = useId();
  const phoneId = useId();

  // Compteur animé du montant des aides (1.4s ease-out)
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

  return (
    <div className="p-6 sm:p-8 animate-fade-up">
      {/* Eyebrow + back */}
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

      {/* Montant principal animé */}
      <div className="flex items-baseline gap-2 mb-2">
        <span
          className="font-serif text-navy leading-none tabular-nums"
          style={{ fontSize: '44px', fontWeight: 500 }}
        >
          {displayTotal.toLocaleString('fr-FR')}
        </span>
        <span className="text-[24px] text-terracotta font-serif">€</span>
        <span className="text-sm text-slate ml-1">d'aides cumulables</span>
      </div>

      {/* Reste à charge */}
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

      {/* Breakdown */}
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

      {/* Zone non-couverte */}
      {!calc.isCovered && postal && (
        <div className="mb-4 flex items-start gap-2 rounded-md bg-amber-50 border border-amber-200 px-3 py-2.5 text-[13px] text-amber-900">
          <AlertCircle className="size-4 shrink-0 mt-0.5" aria-hidden />
          <p>
            Nous ne couvrons pas encore le {postal}. Laissez-nous votre tel, on vous
            recontacte si on s'agrandit.
          </p>
        </div>
      )}

      {/* Form final */}
      <form onSubmit={onSubmit} className="space-y-3 mt-2">
        <p className="text-[12px] text-slate text-pretty leading-snug">
          Pour recevoir votre devis personnalisé et débloquer le dossier d'aides, laissez vos
          coordonnées. Notre conseillère vous rappelle sous 24 h.
        </p>

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

        <button
          type="submit"
          disabled={submitting || !name || !phone}
          className="w-full inline-flex items-center justify-center gap-2 min-h-[56px] px-6 rounded-2xl bg-terracotta hover:bg-terracotta-deep text-cream font-semibold text-base shadow-terracotta-sm hover:shadow-terracotta-xl transition-all duration-300 ease-smooth disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
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
