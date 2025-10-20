/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue1: "#f0f7ff",
        blue2: "#e0f0ff",
        blue3: "#c8e6fd",
      },
      backgroundImage: {
        "blue-gradient": "linear-gradient(to bottom right, #f0f7ff, #e0f0ff, #ffffff)",
      },
      fontFamily: {
        jp: ['"Noto Sans JP"', "sans-serif"],
      },
    },
  },
  plugins: [],
};