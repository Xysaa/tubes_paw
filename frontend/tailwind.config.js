/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gym-green': '#39FF14', // Warna hijau neon (Neon Green)
        'gym-black': '#0a0a0a', // Hitam pekat
        'zinc': {
          900: '#18181b', // Warna kartu
          800: '#27272a', // Warna border
        }
      },
    },
  },
  plugins: [],
}