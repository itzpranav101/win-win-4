/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: { xs: '400px' },
      fontFamily: {
        display: ['Newsreader', '"Iowan Old Style"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"DM Mono"', 'Menlo', 'monospace'],
      },
      colors: {
        // Pulled from the Win-Win logo mark
        brand: {
          50: '#eef6ff', 100: '#d9ebff', 200: '#bcdcff', 300: '#8ec6ff', 400: '#4aa8f5',
          500: '#12a0ee', 600: '#0a7fd0', 700: '#0b4fa8', 800: '#0b3a86', 900: '#0a2c66', 950: '#071a3d',
        },
        ink: { DEFAULT: '#0a0a0a', soft: '#3d3d3d', mute: '#6b6b6b' },
        paper: { DEFAULT: '#ffffff', deep: '#f4f4f1' },
        night: { DEFAULT: '#07090d', card: '#0e1219' },
        sky: { 50: '#f2f8fe', 100: '#e2f0fc', 200: '#c9e4f8' },
      },
      boxShadow: {
        card: '0 1px 2px rgb(11 22 38 / 0.04), 0 8px 24px -12px rgb(11 22 38 / 0.12)',
        lift: '0 2px 4px rgb(11 22 38 / 0.04), 0 24px 48px -20px rgb(11 58 134 / 0.28)',
      },
      keyframes: {
        'fade-up': { from: { opacity: 0, transform: 'translateY(14px)' }, to: { opacity: 1, transform: 'none' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'line-up': { from: { transform: 'translateY(110%)' }, to: { transform: 'translateY(0)' } },
        'rule-x': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
      animation: {
        'fade-up': 'fade-up .8s cubic-bezier(.16,1,.3,1) both',
        'spin-slow': 'spin-slow 60s linear infinite',
        'line-up': 'line-up 1.1s cubic-bezier(.16,1,.3,1) both',
        'rule-x': 'rule-x .9s cubic-bezier(.65,0,.35,1) both',
      },
    },
  },
  plugins: [],
};
