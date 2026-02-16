import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earth Luxury: Deep Forest Green
        primary: {
          50: "#f0f4f2",
          100: "#d9e4dd",
          200: "#b8cdc0",
          300: "#8aad9a",
          400: "#5d8770",
          500: "#456b56", // Deep forest green
          600: "#365546",
          700: "#2d4538",
          800: "#26382f",
          900: "#1f2e26",
          950: "#0f1813", // Deepest forest
        },
        // Premium Gold Accents
        accent: {
          50: "#fefbf3",
          100: "#fdf6e3",
          200: "#faebc5",
          300: "#f6d99d",
          400: "#f1c074",
          500: "#d4a574", // Luxury gold
          600: "#b8935f",
          700: "#98764d",
          800: "#7d6041",
          900: "#685037",
          950: "#38281c",
        },
        // Stone & Warm Browns
        stone: {
          50: "#faf9f7",
          100: "#f3f1ed",
          200: "#e8e3d9",
          300: "#d9d1c0",
          400: "#c7baa5",
          500: "#b5a68f",
          600: "#9d8e7a",
          700: "#827466",
          800: "#6b6056",
          900: "#585049",
          950: "#2e2924",
        },
        // Charcoal & Black
        charcoal: {
          50: "#f7f7f7",
          100: "#e3e3e3",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#313131",
          950: "#1a1a1a", // Deep charcoal
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        urdu: ["var(--font-urdu)", "Noto Nastaliq Urdu", "serif"],
      },
      fontSize: {
        "display-1": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-2": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-3": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        "soft": "0 2px 8px rgba(0, 0, 0, 0.04)",
        "premium": "0 8px 24px rgba(0, 0, 0, 0.08)",
        "premium-lg": "0 16px 48px rgba(0, 0, 0, 0.12)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.06)",
      },
      backgroundImage: {
        "gradient-earth": "linear-gradient(135deg, #faf9f7 0%, #f3f1ed 100%)",
        "gradient-forest": "linear-gradient(135deg, #2d4538 0%, #1f2e26 100%)",
        "gradient-gold": "linear-gradient(135deg, #d4a574 0%, #b8935f 100%)",
        "gradient-stone": "linear-gradient(135deg, #faf9f7 0%, #e8e3d9 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
