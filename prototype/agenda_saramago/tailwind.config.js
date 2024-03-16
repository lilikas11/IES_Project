/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tangerine: ["Tangerine", "serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a7c7eb",

          secondary: "#758ca4",

          accent: "#224160",

          neutral: "#ebcba7",

          "base-100": "#fefcf9",

          info: "#38bdf8",

          success: "#22c55e",

          warning: "#fbbf24",

          error: "#e85151",

        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
