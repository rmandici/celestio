/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        festival: {
          sky: '#0b1d2a',
          dusk: '#6a0f52',
          glow: '#f6c054',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(246,192,84,0.25)'
      }
    },
  },
  plugins: [],
};