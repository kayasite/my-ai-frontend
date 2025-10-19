/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sakura: {
          light: "#ffe4ec",
          DEFAULT: "#ffb7c5",
          dark: "#e17b93",
        },
        ink: "#1e1e2f",
      },
      fontFamily: {
        jp: ["'Noto Sans JP'", "sans-serif"],
      },
      backgroundImage: {
        "sakura-gradient":
          "linear-gradient(to bottom right, #fff5f7, #ffe4ec, #fdf2f8)",
      },
    },
  },
  plugins: [],
};

