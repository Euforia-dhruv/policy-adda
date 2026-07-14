import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBF6EE',
        sand: '#F1E7D6',
        ink: '#211B16',
        'ink-soft': '#5A4F45',
        clay: {
          DEFAULT: '#C2492B',
          dark: '#9A3A22',
          light: '#E8B6A4',
        },
        ocher: '#E0A458',
        sage: {
          DEFAULT: '#5C7A6B',
          light: '#DDE7DF',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        blob: '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(33,27,22,0.04), 0 8px 24px -12px rgba(33,27,22,0.18)',
        lift: '0 12px 40px -16px rgba(154,58,34,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config
