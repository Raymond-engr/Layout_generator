/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nohemi: ['Nohemi', 'sans-serif'],
        sfpro: ['SF Pro Text', 'sans-serif'],
        mermaid: ['Mermaid', 'serif']
      }
    },
  },
  plugins: [],
}

