/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0d0d0d",
        "surface-high": "#161616",
        primary: "#5f8bff",
        "primary-light": "#b3c5ff",
        accent: "#00e475",
        muted: "#8b90a0",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
