import type { Config } from "tailwindcss";

/* The site is styled with CSS modules; these tokens mirror app/globals.css for any utility use. */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "var(--ground)",
        "ground-deep": "var(--ground-deep)",
        paper: "var(--paper)",
        "paper-deep": "var(--paper-deep)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        sky: "var(--sky)",
      },
      fontFamily: {
        sans: ['"General Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
