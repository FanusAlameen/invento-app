/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["forest"],
  },
  theme: {
    extend: {
      fontFamily: {
        mont: ['Montserrat', 'sans-serif']
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}