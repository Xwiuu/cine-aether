/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'void': '#0B0B0B',       // Preto profundo
          'flash': '#FFFFFF',      // Branco puro
          'neon': '#7C5CFF',       // Violeta elétrico
          'hologram': '#00C2A8',   // Turquesa sutil
          'surface': '#1A1A1A',    // Cinza escuro
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }