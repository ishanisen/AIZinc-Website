import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0D10",
        surface: "#12161B",
        "surface-2": "#171C22",
        border: "#242B34",
        "text-primary": "#F5F7FA",
        "text-secondary": "#A7B0BC",
        "text-muted": "#6B7480",
        accent: "#35C2A1",
        "accent-hover": "#2BA78A",
        "badge-blue": "#5B8CFF",
        "badge-gold": "#E7B94C",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
