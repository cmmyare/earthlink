import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#020617",
          subtle: "#020617"
        }
      },
      boxShadow: {
        soft: "0 18px 40px rgba(15,23,42,0.6)"
      }
    }
  },
  plugins: []
};

export default config;

