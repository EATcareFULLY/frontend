/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {},
    variants: {
      extend: {},
    },
  },
  plugins: [],
}

