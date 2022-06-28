/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Old theme color
        // theme: "#151828",
        theme: "#191c2f",
        gray: "#2D2F3E",
        "gray-500": "#6B7280",
        lightgray: "#2D2F3E",
        graytext: "#9CA3AF",
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
