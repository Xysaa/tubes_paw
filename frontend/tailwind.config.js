/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0f0f0f',
        primary: '#84cc16',
        secondary: '#1f2937',
      }
    },
  },
  plugins: [],
}
