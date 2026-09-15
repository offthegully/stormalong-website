import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ---------------------------------------------------------------
        // Press House (Direction D). The redesign's palette.
        // Rule from the canvas review, finding 09: type on a coloured
        // ground is always `parchment` on a tile from `cider.*`, and gold
        // only ever sits on ink. Every pairing below clears 4.5:1.
        // ---------------------------------------------------------------
        ink: {
          DEFAULT: "#0A1A2B", // navy — mastheads, footers, dark sections
          deep: "#07131f",
        },
        paper: {
          DEFAULT: "#F0E6D2", // cream — the page ground
          light: "#FBF6EA", // type on coloured tiles, raised cards
          dark: "#E5D9C0", // banded sections on cream
        },
        gold: {
          DEFAULT: "#C9A227",
          dark: "#9A6B24",
          pale: "#F5E6BE",
        },
        brick: {
          DEFAULT: "#A8321F", // primary action
          dark: "#7C2314",
          light: "#A8402C",
        },
        wine: "#63202C",
        moss: {
          DEFAULT: "#35604A",
          light: "#3D5A49",
        },
        // Ink-on-cream text ramp
        prose: {
          DEFAULT: "#4A4638",
          muted: "#6B6450",
          faint: "#8A836C",
          fainter: "#B3AB92",
        },
        // Per-cider tile grounds. Not an eyedropper of the label: hue is
        // taken from the can, then separated *by value* within each hue
        // family so no two tiles read alike. Lowest contrast against
        // paper.light is 5.44:1. See canvas review finding 09.
        cider: {
          "legendary-dry": "#164A7A",
          "farmstand-unfiltered": "#12482C",
          "mass-appeal": "#07253F",
          "light-of-the-sun": "#5A6015",
          "red-skies-at-night": "#722710",
          "massive-appeal": "#471813",
          "alysons-orchard": "#216156",
          "blue-hills": "#68521A",
          "happy-holidays": "#161206",
          "white-mountain-magic": "#3C3831",
          "blue-skies": "#27636B",
          "beachcomber-cidah": "#194340",
          "boston-heirloom": "#352A0C",
          "grand-banks": "#3D5A49",
          "kingston-black": "#181A22",
        },
      },
      fontFamily: {
        // Press House runs on two faces and no more. The legacy
        // direction's Oswald, Poppins, Bebas Neue and Cinzel are gone
        // along with the pages that used them — layout.tsx stopped
        // loading them, so their --font-* variables no longer resolve.
        sans: ["var(--font-libre-franklin)", "Helvetica Neue", "Arial", "sans-serif"],
        slab: ["var(--font-alfa-slab)", "Georgia", "serif"],
        franklin: ["var(--font-libre-franklin)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
