const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          // "url": require.resolve("url/"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "crypto": require.resolve("crypto-browserify"),
          "stream": require.resolve("stream-browserify") ,
          "querystring": require.resolve("querystring-es3"),
          "url": false,
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        }),
      ],
    },
  },
};

