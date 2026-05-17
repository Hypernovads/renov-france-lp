import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0E2B4E',
          deep: '#061A33',
          soft: '#1A3D6B',
        },
        cream: {
          DEFAULT: '#F5EFE6',
          warm: '#EDE3D3',
        },
        terracotta: {
          DEFAULT: '#C2693F',
          deep: '#A85428',
          light: '#E8A87C',
        },
        gold: '#C9A875',
        ink: '#0A0A0A',
        graphite: '#2A2A2A',
        slate: {
          DEFAULT: '#5C6675',
        },
        mist: '#E8EDF2',
      },
      fontFamily: {
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        magazine: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      backgroundImage: {
        'grain':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        'diagonal-pattern':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 0l60 60M60 0L0 60' stroke='%23F5EFE6' stroke-width='0.3' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'terracotta-sm': '0 4px 20px rgba(194,105,63,0.3)',
        'terracotta-lg': '0 8px 28px rgba(194,105,63,0.4)',
        'terracotta-xl': '0 10px 28px rgba(194,105,63,0.45)',
        'card-soft': '0 4px 20px rgba(14,43,78,0.05)',
        'card-lift': '0 20px 40px rgba(14,43,78,0.12)',
        'card-deep': '0 24px 48px rgba(14,43,78,0.12)',
        'form-floating': '0 20px 60px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.15)',
        'pill-google': '0 8px 32px rgba(14,43,78,0.08)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(74,222,128,0.6)' },
          '50%': { boxShadow: '0 0 0 6px rgba(74,222,128,0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'slide-down': 'slide-down 400ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'pulse-green': 'pulse-green 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
