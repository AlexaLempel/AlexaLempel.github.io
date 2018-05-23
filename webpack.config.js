const path = require("path");

module.exports = {
  entry: path.join(__dirname, "lib", "index.js"),
  output: {
    path: path.join(__dirname, "lib"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", "*"]
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env']
          }
        },
        exclude: /node_modules/
      }
    ]
  }
};
