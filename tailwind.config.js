/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#229954',
        'hover-regal' : '#1E8449',
        //darks
        'color-layout-dark' : '#0B132B',
        'tcolor-dark' :'#5BC0BE',
        'sidebarbg-color' :'#1C2541',
        'linksbg-color':'#3A506B',
        //light
        'color-layour-light' : '#FDFFFC',
        'sidebarbg-color-light' : '#E71D36',
        'linksbg-color-light':'#FF9F1C',
        'new-regal-blue' : '#2EC4B6'
      },

    }, 
  },
  plugins: [

    require('flowbite/plugin')

  ],
}

