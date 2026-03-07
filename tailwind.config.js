/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        bg: "#080808",
        card: "#111111",
        border: "#1f1f1f",
        accent: "#7c5cfc",
        "accent-dim": "#3d2d8a",
        muted: "#555555",
        subtle: "#333333",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "pulse-dot": "pulseDot 2s infinite",
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.4, transform: "scale(0.8)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
}
