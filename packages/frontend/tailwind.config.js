/* eslint-disable no-undef */

const plugin = require("tailwindcss/plugin");
const drawGrid = require("./tailwind_plugins/drawGrid");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    drawGrid: {
      md: "6rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [plugin(drawGrid)],
};
