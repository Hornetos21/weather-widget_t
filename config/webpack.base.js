const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const dotenv = require('dotenv')

dotenv.config()

const __base = path.resolve(__dirname, '..')
const __src = path.resolve(__base, 'src')

module.exports = {
  entry: {
    app: path.resolve(__src, 'main.ts'),
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      'process.env': JSON.stringify(process.env),
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__base, 'public', 'index.html'),
    }),
  ],
  module: {
    rules: [
      // vue-loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      // babel
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/transform-runtime',
              '@babel/transform-typescript',
            ],
          },
        },
      },

      // files
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json', '.scss'],
    modules: [path.resolve(__base, 'src'), 'node_modules'],
    alias: {
      '@': path.resolve(__base, 'src'),
    },
    preferAbsolute: true,
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__base, 'build'),
    clean: true,
  },
}
