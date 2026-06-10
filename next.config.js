/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  /**
   * Redirections HTTP au niveau Vercel edge.
   *
   * `/` → `/maprimeadapt` (TEMPORAIRE — code HTTP 307)
   * --------------------------------------------------
   * Tant que les LP1 (baignoire-douche) et LP3 (rénovation totale) ne sont pas
   * finalisées et publiables, on ne veut pas qu'un visiteur tombe sur la page
   * d'index dev (qui liste les 3 LPs). On le redirige direct vers la seule LP
   * publiable : MaPrimeAdapt'.
   *
   * `permanent: false` = code 307 (Temporary Redirect) — les navigateurs et
   * Google ne cachent PAS la redirection, on pourra la retirer facilement
   * quand les 2 autres LP seront prêtes (sans avoir à attendre que les caches
   * 308 se vident côté users).
   *
   * Les routes /baignoire-douche, /maprimeadapt, /renovation-totale, /merci-*,
   * /cgu, /mentions/* restent accessibles normalement — la redirection ne
   * touche QUE la racine.
   */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/maprimeadapt',
        permanent: false, // 307 — retrait facile quand LP1/LP3 prêtes
      },
    ];
  },
};

module.exports = nextConfig;
