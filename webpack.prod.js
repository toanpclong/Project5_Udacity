const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.min.js",
    libraryTarget: "var",
    library: "Client",
  },
  devtool: "inline-source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new WorkboxPlugin.GenerateSW(),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
};
