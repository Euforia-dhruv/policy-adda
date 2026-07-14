import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#171721',
        surface: '#1e1e2a',
        elevated: '#272735',
        slate: '#70707d',
        mist: '#e2e3ed',
        ash: '#c3c3cc',
        ivory: '#ededf3',
        cobalt: {
          DEFAULT: '#5266eb',
          dark: '#3f4fd6',
        },
        white: '#ffffff',
      },
      fontFamily: {
        display: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '0' }],
      },
      borderRadius: {
        blob: '12px',
        '4xl': '12px',
      },
      boxShadow: {
        card: 'none',
        lift: 'none',
        glow: 'none',
        soft: 'none',
        emboss: 'none',
        contact: 'none',
        inset: 'none',
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
        availability: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(82,102,235,0.5)' },
          '50%': { boxShadow: '0 0 0 6px rgba(82,102,235,0)' },
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
