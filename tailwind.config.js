/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "custom-dark": "#111827",
        "custom-light": "#ffffff",
      },
      colors: {
        background: "var(--background, #ffffff)",
        foreground: "var(--foreground, #000000)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
