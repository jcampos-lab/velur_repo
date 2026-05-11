import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        cream: "#FDFDFC",
        stone: "#FBFBF9",
        ink: "#1A1A1A",
        amber: "#FF5B1A",
        "amber-tint": "#FFE8DC",
        line: "#D9D6CF",
        muted: "#6E6E6E",
        positive: "#1F7A4D",
      },
      fontFamily: {
        sans: ["var(--font-bricolage)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(80px, 10vw, 144px)", { lineHeight: "0.92", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(56px, 7vw, 96px)", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "section-heading": ["clamp(48px, 6vw, 88px)", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
        "section-heading-lg": ["clamp(56px, 7vw, 96px)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "stat-number": ["clamp(72px, 10vw, 144px)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "card-number": ["clamp(56px, 7vw, 88px)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "block-heading": ["clamp(28px, 3vw, 48px)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "sub-heading": ["clamp(24px, 3vw, 36px)", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        "body-lg": ["20px", { lineHeight: "1.55" }],
        "body": ["18px", { lineHeight: "1.55" }],
        "body-sm": ["17px", { lineHeight: "1.5" }],
        "caption": ["13px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "caption-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "mono-label": ["12px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "mono-lg": ["14px", { lineHeight: "1.4" }],
        "editorial-quote": ["clamp(22px, 2.5vw, 32px)", { lineHeight: "1.4" }],
      },
      spacing: {
        "section-sm": "96px",
        "section-md": "128px",
        "section-lg": "144px",
        "section-xl": "160px",
      },
      maxWidth: {
        content: "1440px",
        prose: "720px",
        "prose-sm": "600px",
        "prose-xs": "360px",
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
        btn: "8px",
      },
      transitionTimingFunction: {
        "velur": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-opacity": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "draw-line": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        "pulse-dot": "pulse-opacity 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
