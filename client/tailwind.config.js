/** @type {import('tailwindcss').Config} */
module.exports = {
  purge : ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        buzzhive_orange:'#f54404',
        buzzhive_red:'#f54404',
        buzzhive_dark:{
          DEFAULT: '#030303',
          brighter:'#1a1a1a',
          brightest: '#272728',
        },
        buzzhive_border:{
          DEFAULT: '#343536',
        },
        buzzhive_text:{
          DEFAULT: 'rgb(215, 218, 220)',
          darker: '#818384',
        },
      },
    },
  },
  plugins: [],
}

