import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",
        surface: "#FFFFFF",
        "surface-2": "#F3EDE4",
        border: "#E8E0D4",
        "text-primary": "#2C2419",
        "text-secondary": "#6B635A",
        "text-muted": "#9A9288",
        accent: "#2D6A6A",
        "accent-hover": "#245656",
        "accent-soft": "#E8F2F2",
        "accent-foreground": "#FFFFFF",
        "badge-blue": "#2563EB",
        "badge-gold": "#B45309",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(44 36 25 / 0.04), 0 4px 16px -2px rgb(44 36 25 / 0.06)",
        "card-hover":
          "0 8px 28px -4px rgb(44 36 25 / 0.1), 0 4px 12px -4px rgb(44 36 25 / 0.06)",
        search:
          "0 2px 16px -2px rgb(44 36 25 / 0.1), 0 0 0 1px rgb(232 224 212 / 0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
