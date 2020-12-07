/* eslint-disable no-undef */

const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
const drawGrid = require("./tailwind_plugins/drawGrid");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...defaultTheme.colors,
      holy: {
        blue: "#0000F8",
        white: "#FAFBFD",
        "light-blue": "#2726FF",
        yellow: "#FFFF00",
        cyan: "#00FFFF",
      },
    },
    drawGrid: {
      md: "6rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [plugin(drawGrid)],
};
