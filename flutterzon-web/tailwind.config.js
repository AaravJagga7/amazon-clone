/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          nav: '#131921',
          subnav: '#232f3e',
          yellow: '#ffd814',
          yellowHover: '#f7ca00',
          orange: '#ffa41c',
          orangeHover: '#fa8900',
          darkOrange: '#c45500',
          blue: '#007185',
          link: '#0066c0',
          lightBg: '#eaeded',
        }
      }
    },
  },
  plugins: [],
}

