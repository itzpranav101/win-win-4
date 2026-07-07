/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './index.tsx', './App.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        corporate: {
          blue: '#002B5B',
          gold: '#D4B483',
          goldDark: '#B59E6D',
          stone: '#F5F5F0',
          grey: '#E5E5E0',
        },
      },
    },
  },
  plugins: [],
};
