var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    vendor0: ['vue/dist/vue.esm.js', 'vuex', 'vue-router'],
    vendor1: ['axios'],
    vendor2: ['element-ui']
  },
  output: {
    path: path.join(__dirname, '../dll/static/js'),
    filename: '[name].[chunkhash].dll.js',
    library: '[name]_[chunkhash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '../dll/[name]-manifest.json'),
      name: '[name]_[chunkhash]',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};