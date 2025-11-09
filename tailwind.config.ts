import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        midnight: "#0b132b",
        blueDeep: "#1c2541",
        blueSoft: "#3a506b",
        gold: "#f0b429",
        goldSoft: "#f7cc66"
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: []
};

export default config;
