const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackCommon = require("./webpack.common")
const HtmlPlugin = require("html-webpack-plugin");
const mode = process.env.NODE_ENV === "development";
const config = merge(webpackCommon,{
  mode:mode?"development":"production",
  entry: path.join(__dirname, "../src/client/app.js"),
  output: {
    filename: "[name].[hash].js",
    path: path.join(__dirname, "../dist"),
    publicPath: "/public/"
  },
  plugins: [
    new HtmlPlugin({
      filename:"index.html",
      template: path.join(__dirname, "../src/client/template.html")
    })
  ]
});
if(mode){
  config.entry={
    app:[
      "react-hot-loader/patch",
       path.join(__dirname,"../src/client/app.js")
    ]
  }
  config.devServer={
    host:"0.0.0.0",
    port:"8000",
    compress:true,
    hot:true,
    contentBase:path.join(__dirname,"../dist"),
    overlay:{
      errors:true
    },
    publicPath:"/public",
    historyApiFallback:{
      index:"/public/index.html"
    }
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}
module.exports = config;
