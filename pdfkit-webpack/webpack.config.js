var webpack = require('webpack');
var path = require("path");

module.exports = {

  devtool: "source-map",

  resolve: {
    extensions: [".js"],
    alias: {
      fs: path.join(__dirname, "node_modules", "pdfmake", "src", "browser-extensions", "virtual-fs.js"),
    }
  },

  module: {
    loaders: [ { test: /(pdfkit|linebreak|fontkit|unicode|brotli|png-js).*\.js$/, loader: "transform-loader?brfs" }, ]
  },

  entry: {
    "pdfkit-demo": path.join(__dirname, "pdfkit-demo.js"),
  },

  output: {
    path: path.join(__dirname, "build"),
    filename: '[name].bundled.js',
    sourceMapFilename: '[name].map',
  },


};

