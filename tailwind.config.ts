import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        primary_hover: "var(--primary-hover)",
        secondary: "var(--secondary)",
        secondary_hover: "var(--secondary-hover)",
        background: "var(--background)",
        card: "var(--card)",
        text_primary: "var(--text-primary)",
        text_secondary: "var(--text-secondary)",
        border: "var(--border)",
        accent: "var(--accent)",
        brand_header: "var(--brand-header)",
        brand_orange: "var(--brand-orange)",
        brand_orange_hover: "var(--brand-orange-hover)",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        premium: "0 8px 30px rgba(0, 0, 0, 0.04)",
        premium_hover: "0 20px 40px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
