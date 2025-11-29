/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
  fadeIn: "fadeIn 0.5s ease-out",
  slideDown: "slideDown 0.6s ease-out",
},
keyframes: {
  fadeIn: {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  slideDown: {
    "0%": { transform: "translateY(-8px)", opacity: 0 },
    "100%": { transform: "translateY(0)", opacity: 1 },
  },
},

    },
  },
  plugins: [],
}
