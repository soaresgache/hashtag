import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A1626",
          soft: "#1C2A3A",
          muted: "#5A6B7B",
        },
        brand: {
          50: "#EEF4FF",
          100: "#D9E6FF",
          200: "#BBD1FF",
          300: "#8FB4FF",
          400: "#5C8DFF",
          500: "#2E66F0",
          600: "#1E4FD1",
          700: "#173EA8",
          800: "#163687",
          900: "#16306E",
        },
        accent: "#13C2C2",
        paper: "#FBFCFE",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.21, 0.6, 0.35, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
