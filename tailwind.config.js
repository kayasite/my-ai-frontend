/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura1: "#fff5f8",
        sakura2: "#ffe4eb",
        sakura3: "#ffd4e3",
      },
      backgroundImage: {
        "sakura-gradient": "linear-gradient(to bottom right, #fff5f8, #ffe4eb, #ffffff)",
      },
      fontFamily: {
        jp: ['"Noto Sans JP"', "sans-serif"],
      },
    },
  },
  plugins: [],
};


