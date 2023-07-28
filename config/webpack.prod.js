const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')

module.exports = merge(base, {
  // PRODUCTION MODE
  mode: 'production',
  devtool: false,

  // PROD PLUGINS
  plugins: [new MiniCssExtractPlugin()],

  // PROD RULES
  module: {
    rules: [
      // CSS FILES
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  // OPTS
  // optimization: {
  //   minimize: true,
  //   minimizer: ['...', new CssMinimizerPlugin()],
  // },
})
