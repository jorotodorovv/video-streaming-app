const { merge } = require('webpack-merge');
const path = require("path");
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public'),
      },
    ],
    compress: true,
    port: 3001,
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
});