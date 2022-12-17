/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        Poppins:['Poppins', "sans-serif"]
      },
      colors:{
        secondary:"#201625",
        primary:"#1B1220"
      },
      screens:{
        "xs":"375px",
        
      }
    },
 
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
],
variants: {
  scrollbar: ['rounded']
}
};
