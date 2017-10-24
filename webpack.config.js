const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const IS_DEV_ENV = process.env.NODE_ENV === 'development';
const IS_PROD_ENV = process.env.NODE_ENV === 'production';

const SRC_DIR = path.resolve(__dirname, 'src');
const STYLES_DIR = path.resolve(SRC_DIR, 'styles');
const ENTRY_FILE = path.resolve(SRC_DIR, 'index.js');
const ENTRY_FILE_DEV = path.resolve(SRC_DIR, 'index-dev.js');
const INDEX_FILE = path.resolve(__dirname, 'html', 'index.html');
const DIST_DIR = path.resolve(__dirname, 'dist');
const BUNDLE_DIST = 'bundle.js';
const CSS_DIST = 'styles.css';
const INDEX_DIST = 'index.html';

const extractSass = (config) => {
  if (IS_DEV_ENV) {
    return [
      {
        loader: config.fallback
      },
      ...config.use
    ];
  }

  return ExtractTextPlugin.extract(config);
};

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
    extensions: [
      '.js',
      '.scss'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader'
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                camelCase: true,
                localIdentName: '[local]-[hash:base64:5]',
                minimize: IS_PROD_ENV,
                modules: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  ctx: {
                    autoprefixer: {
                      browsers: [
                        '> 0.1%'
                      ]
                    }
                  }
                }
              }
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                data: '@import \'globals.scss\';',
                includePaths: [
                  STYLES_DIR
                ],
                sourceMap: false
              }
            }
          ]
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
    new HtmlWebpackPlugin({
      template: INDEX_FILE,
      filename: INDEX_DIST,
      inject: true,
      hash: true,
      files: {
        css: [
          CSS_DIST
        ],
        js: [
          BUNDLE_DIST
        ]
      }
    })
  ]
};

if (IS_PROD_ENV) {
  config.plugins.push(
    new ExtractTextPlugin({
      allChunks: true,
      filename: CSS_DIST,
      ignoreOrder: true
    }),
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
        from: INDEX_FILE
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
