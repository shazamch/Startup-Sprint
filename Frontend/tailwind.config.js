/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1836b2',
        'custom-yellow': '#e7c94d',
        main: {
          blue: '#1836b2',
          yellow: '#e7c94d',
        },
        zinc: {
          950: '#09090b',
          800: '#27272a',
          500: '#71717a',
          400: '#a1a1aa',
          50: '#fafafa',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}