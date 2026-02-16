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
        // Premium Himalayan theme
        primary: {
          50: "#f0f9f4",
          100: "#dcf2e3",
          200: "#bce5cc",
          300: "#8fd1a9",
          400: "#5ab47f",
          500: "#369862", // Main brand green (Himalayan nature)
          600: "#2a7a4f",
          700: "#246142",
          800: "#204e37",
          900: "#1c412f",
          950: "#0e2419",
        },
        accent: {
          50: "#fef7ed",
          100: "#fdecd4",
          200: "#fbd5a8",
          300: "#f8b771",
          400: "#f49038", // Warm gold accent
          500: "#f27612",
          600: "#e35d08",
          700: "#bc4609",
          800: "#96380f",
          900: "#793010",
          950: "#411706",
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
      },
      fontSize: {
        "display-1": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-2": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-3": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        "premium": "0 20px 60px -12px rgba(0, 0, 0, 0.15)",
        "premium-lg": "0 25px 80px -12px rgba(0, 0, 0, 0.2)",
      },
      backgroundImage: {
        "gradient-himalayan": "linear-gradient(135deg, #f0f9f4 0%, #dcf2e3 100%)",
        "gradient-premium": "linear-gradient(135deg, #1c412f 0%, #246142 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
