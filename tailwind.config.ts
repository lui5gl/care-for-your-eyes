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
        box: "10px 10px 0 rgb(255 255 255 / 0.1)",
        button: "5px 5px 0 rgb(255 255 255 / 0.1)",
      },
      dropShadow: {
        font: "5px 5px 0 rgb(255 255 255 / 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
