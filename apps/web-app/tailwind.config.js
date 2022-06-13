/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: "#151828",
        gray: "#2D2F3E",
        lightgray: "#2D2F3E",
        border: "#818392",
      },
      spacing: {
        sidebarClosed: "93px",
        sidebarOpen: "231px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
