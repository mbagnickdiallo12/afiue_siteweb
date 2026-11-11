import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        afi: {
          red: {
            DEFAULT: "#AD1B18",
            50: "#FEF2F2",
            100: "#FEE2E2",
            200: "#FECACA",
            300: "#FCA5A5",
            400: "#F87171",
            500: "#EF4444",
            600: "#DC2626",
            700: "#AD1B18", // Brand Primary
            800: "#8C1412",
            900: "#5E0A08",
            950: "#380403",
          },
          navy: {
            DEFAULT: "#191D38",
            50: "#F4F6FB",
            100: "#E9ECF7",
            200: "#D7DCF0",
            300: "#B9C2E3",
            400: "#929ED2",
            500: "#707DC0",
            600: "#4D5BA8",
            700: "#364183",
            800: "#222A5C",
            900: "#191D38", // Brand Deep Navy
            950: "#0D0F1F",
          },
          gold: {
            DEFAULT: "#CBD5E1",
            light: "#F1F5F9",
            dark: "#94A3B8",
          },
          accent: {
            DEFAULT: "#0C71C3",
            light: "#2EA3F2",
          },
          surface: {
            DEFAULT: "#F8FAFC",
            card: "#FFFFFF",
            muted: "#F1F5F9",
          },
        },
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(25, 29, 56, 0.05)",
        card: "0 4px 20px rgba(25, 29, 56, 0.08)",
        floating: "0 10px 30px rgba(173, 27, 24, 0.15)",
      },
      borderRadius: {
        afi: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
