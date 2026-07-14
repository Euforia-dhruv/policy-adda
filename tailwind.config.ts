import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBF8F3',
        mist: '#F4EDE2',
        sand: '#ECE2D2',
        walnut: '#5B4632',
        charcoal: '#2A241F',
        ink: '#211C18',
        'ink-soft': '#6B5F52',
        clay: {
          DEFAULT: '#B26A3E',
          dark: '#8A4F2C',
          light: '#E8CDB6',
        },
        gold: {
          DEFAULT: '#C49A5E',
          dark: '#A47C42',
        },
        bronze: '#9C6B3F',
        pine: {
          DEFAULT: '#2C4A3B',
          light: '#DCE7E0',
        },
        sage: {
          DEFAULT: '#6E7E6E',
          light: '#E2E8E0',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.04', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '0' }],
      },
      borderRadius: {
        blob: '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,0.65) inset, 0 18px 40px -26px rgba(33,28,24,0.35)',
        lift: '0 2px 1px rgba(255,255,255,0.6) inset, 0 34px 70px -34px rgba(33,28,24,0.45)',
        glow: '0 0 0 1px rgba(178,106,62,0.18), 0 30px 80px -30px rgba(178,106,62,0.45)',
        soft: '0 2px 4px rgba(33,28,24,0.04), 0 16px 44px -28px rgba(33,28,24,0.22)',
        emboss:
          '0 1px 0 rgba(255,255,255,0.75) inset, 0 22px 46px -28px rgba(33,28,24,0.42)',
        contact: '0 36px 70px -34px rgba(33,28,24,0.5)',
        inset: 'inset 0 2px 5px rgba(33,28,24,0.14), inset 0 0 0 1px rgba(33,28,24,0.04)',
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
          '50%': { opacity: '0.5' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'availability': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(44,74,59,0.5)' },
          '50%': { boxShadow: '0 0 0 6px rgba(44,74,59,0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        availability: 'availability 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
