/** @type {import('tailwindcss').Config} */
export default {
  // 💡 ADD THIS LINE: Enables dark mode based on the 'dark' class on the HTML tag
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
