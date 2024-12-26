/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        primary: '#F78620',
        secondary: '#FAD841',
        gray: '#5F5F5F',
        black: '#000000',
      }
      
    },
  },
  plugins: [],
}

