import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        grey: "#D0D5DD",
        black_primary: "#101828",
        black_secondary: "#344054",
        black_tertiary: "#475467",
        light_grey: "#FCFCFD",
        blue_primary: "#146AA3",
        dark_blue_primary: "#10537f",
        light_blue_primary: "#DBEEFB",
        blue_highlight: "#76beee",
        hover_grey: "#f9fafb",
        hint_text_grey: "#667085",
        divider_grey: "#EAECF0",
        background_blue: "#EDF6FD",
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
};
export default config;
