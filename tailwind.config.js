/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#467D9A',
        secondary: '#549BC2',
        black: '#000000',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ["Poppins", 'sans-serif'],
      },
    },
  },
  plugins: [],
};

