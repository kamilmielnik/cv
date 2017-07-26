const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

const INDEX_HTML = path.join(__dirname, './index.html');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  inline: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  hot: true
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(INDEX_HTML);
});

app.listen(port, host, (error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(`App is listening at http://${host}:${port}`);
});
