/** @type {import('tailwindcss').Config} */
export default {
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
        'color-layout' : '#F1F5F7'
      },

    },
  },
  plugins: [

    require('flowbite/plugin')

  ],
}

