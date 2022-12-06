/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    animation: ["responsive", "motion-safe", "motion-reduce"],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      correct: "#55C106",
      almost: "#E7DD04",
      primary: "#DADADA",
      secondary: "#A0A0A0",
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {
      keyframes: {
        shake2: {
          "0%": {
            transform: "translate(-3px, 2px) rotate(-3deg)",
          },
          "33%": {
            transform: "translate(2px, 3px) rotate(-1deg)",
          },
          "66%": {
            transform: "translate(-2px, 4px) rotate(1deg)",
          },
          "100%": {
            transform: "translate(3px, 2px) rotate(3deg)",
          },
        },
      },
      animation: {
        shake2: "shake2 .2s linear 2",
      },
    },
  },
  plugins: [],
};
