const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      process: require.resolve("process/browser"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new Dotenv(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
  },
};
