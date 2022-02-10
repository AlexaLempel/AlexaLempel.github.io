const path = require("path");
const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, "index.js"),
  output: {
    path: path.join(__dirname, "lib"),
    filename: "bundle.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
           process: 'process/browser',
           Buffer: ['buffer', 'Buffer']
    }),
  ],
  resolve: {
    extensions: [".js", "*"],
    alias: {
      zlib: require.resolve('browserify-zlib'),
      stream : require.resolve('stream-browserify'),
      process: "process/browser"
    }
  }
};
