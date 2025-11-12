/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
    "./src/shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7FFF00",
        secondary: "#312D2C",
        background: "#1c1c1c",
        white: "#FFFFFF",
        "primary-blue": "var(--primary-blue)",
        "primary-blue-dark": "var(--primary-blue-dark)",
        "input-bg": "var(--input-bg)",
        "text-secondary": "var(--text-secondary)",
      },
    },
  },
  plugins: [],
};
