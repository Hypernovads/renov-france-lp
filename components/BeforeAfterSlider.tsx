'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';
import type { BeforeAfterItem } from '@/content/types';

type Stat = { value: string; unit?: string; label: string };

type Props = {
  eyebrow: string;
  h2Lead: string;
  /** Mot/expression italic-accent terracotta (substring du h2 ou tail) */
  h2Highlight?: string;
  intro: string;
  /** Mots à mettre en gras navy dans l'intro (substrings) */
  introStrong?: string[];
  stats?: Stat[];
  /** Caption italic en bas du contenu gauche (ex. "→ Faites glisser le curseur…") */
  caption?: string;
  items: BeforeAfterItem[];
  /** Label affiché sous le slider (ex. "Réalisation à Aubagne · 1 journée · Sept. 2025") */
  itemCaptionPrefix?: string;
};

/**
 * Section Showcase Avant/Après — design mockup V3.
 * 2 cols desktop : contenu gauche (eyebrow + h2 + intro + stats cream block + caption italic),
 * slider drag 4:3 droite. Sur mobile : empilé.
 */
export function BeforeAfterSlider({
  eyebrow,
  h2Lead,
  h2Highlight,
  intro,
  introStrong = [],
  stats,
  caption,
  items,
  itemCaptionPrefix,
}: Props) {
  const [idx, setIdx] = useState(0);
  const current = items[idx];

  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">
          {/* ─── Colonne gauche : contenu ──────────────────────── */}
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl text-balance">
              {h2Lead}
              {h2Highlight && (
                <>
                  {' '}
                  <span className="italic-accent">{h2Highlight}</span>
                </>
              )}
            </h2>

            <p className="mt-6 text-base sm:text-[17px] text-slate leading-[1.7] text-pretty">
              <IntroWithStrong text={intro} strongs={introStrong} />
            </p>

            {/* Bloc stats cream avec border-left terracotta */}
            {stats && stats.length > 0 && (
              <div className="mt-7 grid grid-cols-2 gap-6 p-6 sm:p-7 bg-cream rounded-2xl border-l-[3px] border-terracotta">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-navy leading-none text-[36px] sm:text-[40px]">
                      {s.value}
                      {s.unit && (
                        <span className="text-terracotta text-lg sm:text-[18px] ml-0.5 align-baseline">
                          {s.unit}
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 text-[13px] text-slate font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {caption && (
              <p className="mt-6 text-[15px] text-slate italic leading-relaxed">{caption}</p>
            )}

            {/* Navigation entre réalisations (si > 1) */}
            {items.length > 1 && (
              <div className="mt-6 flex items-center gap-2">
                {items.map((it, i) => (
                  <button
                    key={it.label}
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-label={`Voir réalisation ${i + 1} sur ${items.length} — ${it.label}`}
                    aria-pressed={i === idx}
                    className={[
                      'h-1.5 rounded-full transition-all duration-300 ease-smooth',
                      i === idx ? 'w-8 bg-terracotta' : 'w-4 bg-navy/20 hover:bg-navy/40',
                    ].join(' ')}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ─── Colonne droite : slider ───────────────────────── */}
          <div>
            <CompareSlider key={idx} item={current} />
            <p className="mt-5 text-center text-[14px] text-slate italic">
              {itemCaptionPrefix ? `${itemCaptionPrefix} ` : ''}
              <strong className="text-navy not-italic font-semibold">{current.label}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntroWithStrong({ text, strongs }: { text: string; strongs: string[] }) {
  if (strongs.length === 0) return <>{text}</>;
  // Découpe le texte autour de chaque expression strong (split sur regex sans escape — assume strings simples)
  const pattern = new RegExp(
    `(${strongs.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'g',
  );
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((p, i) =>
        strongs.includes(p) ? (
          <strong key={i} className="text-navy font-semibold">
            {p}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function CompareSlider({ item }: { item: BeforeAfterItem }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50);

  const updateFromX = useCallback((clientX: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  /**
   * Pointer Events + pointer capture — le pointeur est "capturé" par le wrapper
   * dès le pointerdown, donc même si la souris sort du conteneur (ou même de la
   * fenêtre), pointermove + pointerup continuent à être routés vers cet élément.
   * Pattern standard pour les sliders drag (utilisé par shadcn, Radix, etc.).
   */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromX(e.clientX);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Drag en cours uniquement si le pointer est captured (= bouton enfoncé)
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    e.preventDefault();
    updateFromX(e.clientX);
  };
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // Accessibilité : flèches gauche/droite pour ajuster le slider au clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 5));
    }
  };

  return (
    <div
      ref={wrapperRef}
      role="slider"
      aria-label="Glisser pour comparer avant et après"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      style={{ touchAction: 'none' }}
      className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden select-none bg-navy-deep cursor-ew-resize shadow-[0_30px_60px_rgba(14,43,78,0.25)] focus:outline-none focus-visible:ring-4 focus-visible:ring-terracotta/40"
    >
      {/* AFTER (en fond plein) */}
      <Image
        src={item.after.src}
        alt={item.after.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 700px"
        className="object-cover pointer-events-none"
        draggable={false}
      />
      <span className="absolute top-5 right-5 z-20 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] bg-black/65 text-white backdrop-blur-md pointer-events-none">
        Après
      </span>

      {/* BEFORE clippé selon pos */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={item.before.src}
          alt={item.before.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 700px"
          className="object-cover"
          style={{ filter: 'saturate(0.7) brightness(0.85)' }}
          draggable={false}
        />
        <span className="absolute top-5 left-5 z-20 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] bg-black/65 text-white backdrop-blur-md">
          Avant
        </span>
      </div>

      {/* Handle vertical + knob (pointer-events:none pour laisser passer au wrapper) */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white z-10 pointer-events-none shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center size-[52px] rounded-full bg-cream text-navy shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          aria-hidden
        >
          <ChevronsLeftRight className="size-5" />
        </span>
      </div>
    </div>
  );
}
