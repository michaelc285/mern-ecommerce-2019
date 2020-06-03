const tailwindcss = require("tailwindcss");
module.exports = {
  purge: false,
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
};
