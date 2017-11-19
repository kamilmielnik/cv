const path = require('path');

module.exports = {
  env: {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  },
  input: {
    favicon: path.resolve(__dirname, 'html', 'favicon-v2.ico'),
    html: path.resolve(__dirname, 'html', 'index.html'),
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules', 'sidebar')
    ],
    stylesGlobals: 'globals.scss'
  }
};
