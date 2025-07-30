/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
      },
      colors: {
        'red-brand': '#B71C1C',
      }
    },
  },
  plugins: [],
}