/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#a855f7',
          pink: '#ec4899',
          blue: '#3b82f6',
          indigo: '#6366f1',
        },
        dark: {
          bg: '#1a1a2e',
          'bg-darker': '#16213e',
          'bg-darkest': '#0f3460',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

