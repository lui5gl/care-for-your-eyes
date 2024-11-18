import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        box: "8px 8px 0 rgb(255 255 255 / 0.5)",
      },
      dropShadow: {
        font: "6px 6px 0 rgb(255 255 255 / 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
