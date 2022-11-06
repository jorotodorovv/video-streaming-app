const { merge } = require('webpack-merge');
const path = require("path");

const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  // context: path.join(__dirname, 'public'),
  // plugins: [
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       { from: 'configs', to: 'configs' },
  //     ]
  //   })
  // ]
});