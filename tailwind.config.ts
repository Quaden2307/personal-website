import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070a14", // void
        foreground: "#eaedf6", // starlight
        hull: "#0e1424",
        border: "#212c4e", // hairline
        dust: "#96a0c2",
        amber: {
          DEFAULT: "#ffb454",
          dim: "rgba(255, 180, 84, 0.14)",
        },
        ion: "#7fa7ff",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
