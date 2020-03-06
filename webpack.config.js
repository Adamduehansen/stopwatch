const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "Stopwatch.ts"),
  module: {
    rules: [
      {
        test: /\.ts?/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "stopwatch.js"
  }
}