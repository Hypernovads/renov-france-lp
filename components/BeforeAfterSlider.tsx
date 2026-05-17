'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import type { BeforeAfterItem } from '@/content/types';

type Props = {
  eyebrow: string;
  h2: string;
  intro?: string;
  items: BeforeAfterItem[];
};

export function BeforeAfterSlider({ eyebrow, h2, intro, items }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = items[activeIdx];

  return (
    <section className="section-pad bg-navy-deep text-cream relative overflow-hidden grain-overlay">
      <div className="container-tight relative z-10">
        <header className="max-w-2xl mb-10 sm:mb-14">
          <span className="eyebrow text-terracotta-light">{eyebrow}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-cream text-balance">
            {h2}
          </h2>
          {intro && <p className="mt-4 text-cream/75 max-w-xl text-pretty">{intro}</p>}
        </header>

        <CompareSlider key={activeIdx} item={current} />

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-sm text-cream/70">
            <span className="font-serif text-2xl text-cream tabular-nums">
              {String(activeIdx + 1).padStart(2, '0')}
            </span>
            <span className="mx-1.5 text-cream/40">/</span>
            <span className="tabular-nums">{String(items.length).padStart(2, '0')}</span>
            <span className="block sm:inline sm:ml-3 text-cream/90">— {current.label}</span>
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveIdx((i) => (i === 0 ? items.length - 1 : i - 1))}
              aria-label="Réalisation précédente"
              className="size-11 inline-flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setActiveIdx((i) => (i === items.length - 1 ? 0 : i + 1))}
              aria-label="Réalisation suivante"
              className="size-11 inline-flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareSlider({ item }: { item: BeforeAfterItem }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50);

  const onMove = useCallback((clientX: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  return (
    <div
      ref={wrapperRef}
      onMouseMove={(e) => {
        if (e.buttons === 1) onMove(e.clientX);
      }}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-lg overflow-hidden select-none bg-navy cursor-ew-resize shadow-2xl"
    >
      {/* AFTER (en fond, plein cadre) */}
      <Image
        src={item.after.src}
        alt={item.after.alt}
        fill
        sizes="(max-width: 768px) 100vw, 1024px"
        className="object-cover"
      />
      <span className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider bg-terracotta text-cream">
        Après
      </span>

      {/* BEFORE (clippé selon pos) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={item.before.src}
          alt={item.before.alt}
          fill
          sizes="(max-width: 768px) 100vw, 1024px"
          className="object-cover"
        />
        <span className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider bg-navy text-cream">
          Avant
        </span>
      </div>

      {/* Handle vertical */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white z-10 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <button
          type="button"
          aria-label="Glisser pour comparer"
          tabIndex={0}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (e.buttons === 1) onMove(e.clientX);
          }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-11 rounded-full bg-white text-navy shadow-xl pointer-events-auto cursor-ew-resize flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MoveHorizontal className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
