'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Props = {
  prefix?: string;
  highlight?: string;
  text: string;
  /** Affiche le dot vert pulsant en tête */
  withDot?: boolean;
  href?: string;
  /** Si true : remplace `{semaine}` dans `text` par la semaine en cours formatée
   *  (ex. "du 17 au 23 mai"). Calculé côté client pour rester frais. */
  withWeek?: boolean;
};

export function AnnouncementBar({
  prefix,
  highlight,
  text,
  withDot,
  href,
  withWeek = false,
}: Props) {
  const [week, setWeek] = useState('');

  useEffect(() => {
    if (!withWeek) return;
    setWeek(formatCurrentWeekRange());
  }, [withWeek]);

  // Substitue {semaine} dans text par la plage calculée
  const finalText =
    withWeek && week ? text.replace('{semaine}', week) : text.replace(' {semaine}', '');

  const inner = (
    <div className="container-wide flex items-center justify-center gap-2 py-3 text-center text-[14px] sm:text-[15px] text-cream/95">
      {withDot && (
        <span
          className="inline-block size-1.5 rounded-full bg-emerald-400 shrink-0 mr-0.5 animate-pulse-green"
          aria-hidden
        />
      )}
      <p className="text-pretty leading-snug">
        {prefix && <span>{prefix} </span>}
        {highlight && (
          <strong className="text-terracotta-light font-semibold">{highlight}</strong>
        )}
        {highlight && <span> </span>}
        <span>{finalText}</span>
      </p>
    </div>
  );

  return (
    <div className="bg-navy-deep text-cream">
      {href ? (
        <Link
          href={href}
          className="block hover:bg-navy transition-colors duration-300 ease-smooth"
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}

/**
 * Calcule la semaine ISO en cours formatée pour affichage.
 * Lundi = début de semaine, dimanche = fin.
 * Format : "du 17 au 23 mai" (ou "du 30 mai au 5 juin" si la semaine déborde).
 */
function formatCurrentWeekRange(): string {
  const now = new Date();
  const day = now.getDay(); // 0=dimanche, 1=lundi, ..., 6=samedi
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];
  const mDay = monday.getDate();
  const sDay = sunday.getDate();
  const mMonth = months[monday.getMonth()];
  const sMonth = months[sunday.getMonth()];

  if (mMonth === sMonth) {
    return `du ${mDay} au ${sDay} ${sMonth}`;
  }
  return `du ${mDay} ${mMonth} au ${sDay} ${sMonth}`;
}
