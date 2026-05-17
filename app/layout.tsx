import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
});

// Inter = équivalent Geist (même créateur Rasmus Andersson, esthétique très proche).
// Geist n'est pas servi par next/font/google sur Next 14.2.x.
const geist = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hypernovads-lp-sdb.vercel.app'),
  title: {
    default: 'Rénovation de salle de bain — Bouches-du-Rhône',
    template: '%s',
  },
  description: 'Spécialistes salle de bain dans les Bouches-du-Rhône. Devis gratuit sous 24 h.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
