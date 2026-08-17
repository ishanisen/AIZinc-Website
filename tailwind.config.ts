import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f6f8fd",
        surface: "#e9eef9",
        "surface-2": "#edf2fa",
        border: "color-mix(in srgb, #1e3a6e 32%, transparent)",
        "text-primary": "#1d1f20",
        "text-secondary": "color-mix(in srgb, #1d1f20 70%, transparent)",
        "text-muted": "color-mix(in srgb, #1d1f20 55%, transparent)",
        accent: "#1e3a6e",
        "accent-hover": "#16305e",
        "accent-soft": "#edf2fa",
        "accent-foreground": "#f6f8fd",
        "accent-700": "#122a52",
        "accent-100": "#edf2fa",
        "accent-200": "#d7e2f5",
        "accent-600": "#16305e",
        "badge-blue": "#2563EB",
        "badge-gold": "#B45309",
      },
      fontFamily: {
        sans: ["var(--font-instrument)", "system-ui", "sans-serif"],
        heading: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px color-mix(in srgb, #1d1f20 10%, transparent)",
        "card-hover":
          "0 3px 10px color-mix(in srgb, #1d1f20 16%, transparent)",
        search: "0 1px 2px color-mix(in srgb, #1d1f20 10%, transparent)",
      },
      maxWidth: {
        page: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
