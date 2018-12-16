const path = require("path");
const merge = require("webpack-merge");
const webpackCommon = require("./webpack.common")
module.exports = merge(webpackCommon,{
  mode: "development",
  target: "node",
  entry: path.join(__dirname, "../src/client/serverEntry.js"),
  output: {
    filename: "server.js",
    path: path.join(__dirname, "../dist"),
    publicPath: "public",
    libraryTarget: "commonjs2"
  }
});
