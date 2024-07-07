/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: { sans: "Roboto Mono, monospace" },

    extend: {
      colors: {
        "custom-gray": "#222831",
        "custom-green": "#0e271b",
        "custom-green-500": "#294939",
        "custom-blue": "#2D4059",
        "custom-orange": "#FF5722",
        "custom-light-gray": "#EEEEEE",
      },
    },
  },
  plugins: [],
};
