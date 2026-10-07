/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0f172a',   // slate-900
          accent: '#0f766e', // teal-700
          light: '#f0fdfa',  // teal-50
        },
      },
    },
  },
  plugins: [],
}
