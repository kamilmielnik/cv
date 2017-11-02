const path = require('path');

module.exports = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  env: {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  },
  input: {
    favicon: path.resolve(__dirname, 'html', 'favicon-v2.ico'),
    html: path.resolve(__dirname, 'html', 'index.html'),
    js: path.resolve(__dirname, 'src', 'index.js'),
    jsDev: path.resolve(__dirname, 'src', 'index-dev.js'),
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules', 'sidebar')
    ],
    styles: path.resolve(__dirname, 'src', 'styles'),
    stylesGlobals: 'globals.scss',
  },
  output: {
    directory: path.resolve(__dirname, 'dist'),
    css: 'styles.css',
    html: 'index.html',
    js: 'bundle.js'
  }
};
