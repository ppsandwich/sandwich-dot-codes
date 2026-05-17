import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F5EFE4",
          dark: "#1a1816",
        },
        foreground: {
          DEFAULT: "#292524",
          dark: "#e8e0d4",
        },
        mustard: "#D6B347",
        teal: "#6F9D9A",
        salmon: "#D98B73",
        slime: "#9FB06F",
        lavender: "#B8A7CC",
        sky: "#9BB7D4",
        muted: "#7C736C",
        border: "#463F3A",
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "headline": ["clamp(2rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "subhead": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      rotate: {
        "1": "1deg",
        "2": "2deg",
        "3": "3deg",
        "-1": "-1deg",
        "-2": "-2deg",
        "-3": "-3deg",
      },
      boxShadow: {
        "tactile": "4px 4px 0px 0px #463F3A",
        "tactile-lg": "6px 6px 0px 0px #463F3A",
        "tactile-sm": "2px 2px 0px 0px #463F3A",
        "paper": "2px 2px 8px rgba(41, 37, 36, 0.12), -1px -1px 4px rgba(41, 37, 36, 0.06)",
      },
      borderWidth: {
        "3": "3px",
      },
      animation: {
        "wobble": "wobble 0.5s ease-in-out",
        "float": "float 6s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
      },
      keyframes: {
        wobble: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
