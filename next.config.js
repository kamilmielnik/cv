const fs = require('fs');
const path = require('path');

const tsConfig = fs.readFileSync('tsconfig.json', 'utf-8');
const tsConfigJson = JSON.parse(tsConfig);
const paths = tsConfigJson.compilerOptions.paths;
const tsConfigAliases = Object.fromEntries(
  Object.entries(paths).map(([key, value]) => [key, path.resolve(__dirname, ...value)])
);

module.exports = {
  compress: false,
  devIndicators: {
    buildActivity: false
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')]
  },
  webpack: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...tsConfigAliases
      }
    },
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader'
        }
      ]
    }
  })
};
