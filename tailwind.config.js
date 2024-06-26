/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      colors: {
        customColor: '#200616',
        Demicolor2: '#373F51',
        Demicolor: '#D7D9D7'
      },
    },
  },
  plugins: [],
}

