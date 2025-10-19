/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sakura1: "#ffe4e9",
        sakura2: "#ffd6e0",
        sakura3: "#ffc2d4",
      },
      backgroundImage: {
        "sakura-gradient": "linear-gradient(to bottom right, #ffe4e9, #ffd6e0, #fff)",
      },
      fontFamily: {
        jp: ['"Noto Sans JP"', "sans-serif"],
      },
    },
  },
  plugins: [],
};


