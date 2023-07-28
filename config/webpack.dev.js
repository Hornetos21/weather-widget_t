const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')

module.exports = merge(base, {
  // DEVELOPMENT MODE
  mode: 'development',
  devtool: 'inline-source-map',

  // DEV SERVER CONFIG
  devServer: {
    // static: './dist',
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
})
