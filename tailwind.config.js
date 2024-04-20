const defaultTheme = require('tailwindcss/defaultTheme')
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  
})
