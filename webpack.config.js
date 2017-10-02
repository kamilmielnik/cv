const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const IS_DEV_ENV = process.env.NODE_ENV === 'development';
const IS_PROD_ENV = process.env.NODE_ENV === 'production';

const SRC_DIR = path.resolve(__dirname, 'src');
const ENTRY_FILE = path.resolve(SRC_DIR, 'index.js');
const ENTRY_FILE_DEV = path.resolve(SRC_DIR, 'index-dev.js');
const DIST_DIR = path.resolve(__dirname, 'dist');
const BUNDLE_DIST = 'bundle.js';
const CSS_DIST = 'styles.css';

const extractSass = new ExtractTextPlugin({
  filename: CSS_DIST,
  allChunks: true,
  disable: IS_DEV_ENV
});

const config = {
  output: {
    filename: BUNDLE_DIST,
    path: DIST_DIR,
    publicPath: '/'
  },
  entry: ENTRY_FILE,
  resolve: {
    modules: [
      SRC_DIR,
      'node_modules'
    ],
    extensions: ['.js', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                camelCase: true,
                minimize: true,
                modules: true,
                localIdentName: '[local]-[hash:base64:8]'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    extractSass,
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
      hash: true,
      files: {
        css: [ CSS_DIST ],
        js: [ BUNDLE_DIST ]
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['> 0.1%']
          })
        ]
      }
    })
  ]
};

if (IS_PROD_ENV) {
  config.plugins.push(
    new StyleExtHtmlWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      sourceMap: false
    }),
    new CopyWebpackPlugin([
      {
        from: 'index.html'
      }
    ])
  );
}

if (IS_DEV_ENV) {
  config.devtool = 'eval';
  config.entry = [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    ENTRY_FILE_DEV
  ];

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      cache: true,
      debug: true
    })
  );
}

module.exports = config;
