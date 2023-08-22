/** @type {import('tailwindcss').Config} */
/*eslint-env node*/

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-radix")()],
};
