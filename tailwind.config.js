/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b4fa9',
        primary_blue: '#325494',
        primary_yellow: '#F5C946',
        secondary: '#58DDB3',
        
      }
    },
  },
  plugins: [ require('flowbite/plugin')],
}

//#325494, #F5C946