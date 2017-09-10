var webpack = require('webpack');
var path = require("path");

module.exports = {

  devtool: "source-map",

  resolve: {
    extensions: [".js"],
  },

  module: {
    loaders: [
      // load ts/tsx with ts-loader
      { test: /\.tsx?$/, loader: "ts-loader", },
    ]
  },

  entry: {
    "three-control-demo": path.join(__dirname, "three-control-demo.ts"),
  },

  output: {
    path: path.join(__dirname, "build"),
    filename: '[name].bundled.js',
    sourceMapFilename: '[name].map',
  },

};
