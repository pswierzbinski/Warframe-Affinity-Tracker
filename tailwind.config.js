
const { heroui } = require("@heroui/react");


module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  purge: [],
  darkMode: "class",
  plugins: [
    heroui()
  ], theme: {
    extend: {},
  },
  darkmode: "class",
  variants: {
    extend: {},
  },
}
