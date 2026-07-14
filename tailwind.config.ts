import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBF7F1',
        mist: '#F6EFE6',
        sand: '#F1E7D8',
        ink: '#1B1714',
        'ink-soft': '#5C5249',
        clay: {
          DEFAULT: '#C0492B',
          dark: '#97371F',
          light: '#ECC7BA',
        },
        gold: {
          DEFAULT: '#D9A441',
          dark: '#B9852B',
        },
        pine: {
          DEFAULT: '#2F5D50',
          light: '#DCE7E2',
        },
        sage: {
          DEFAULT: '#5C7A6B',
          light: '#DDE7DF',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Cambria', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        blob: '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(27,23,20,0.04), 0 10px 30px -18px rgba(27,23,20,0.22)',
        lift: '0 24px 60px -24px rgba(151,55,31,0.40)',
        glow: '0 0 0 1px rgba(194,73,43,0.12), 0 30px 80px -30px rgba(194,73,43,0.45)',
        soft: '0 2px 4px rgba(27,23,20,0.03), 0 18px 50px -28px rgba(27,23,20,0.20)',
      },
      maxWidth: {
        prose: '68ch',
        shell: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
