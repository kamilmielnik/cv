const path = require('path');

const getAbsolutePath = (relativePath) => path.resolve(__dirname, relativePath);

module.exports = {
  input: {
    favicon: getAbsolutePath('html/favicon-v2.ico'),
    html: getAbsolutePath('html/index.html'),
    modules: [
      getAbsolutePath('src'),
      getAbsolutePath('node_modules/sidebar')
    ]
  }
};
