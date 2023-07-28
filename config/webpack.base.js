const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const { DefinePlugin } = require('webpack')

const __base = path.resolve(__dirname, '..')
const __src = path.resolve(__base, 'src')

module.exports = {
  entry: {
    app: path.resolve(__src, 'main.ts'),
  },
  plugins: [
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // favicon: path.resolve(__src, 'assets', 'favicon.ico'),
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
        // plugins: '@babel/transform-runtime',
        // overrides: [
        //   { test: /\.vue$/, plugins: ['@babel/transform-typescript'] },
        // ],
        // use: {

        // options: {
        //   presets: [
        //     [
        //       '@babel/transform-typescript',
        //       {
        //         allExtensions: true,
        //       },
        //     ],
        //   ],
        // },
        // },
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
    // modules: ['node_modules'],
    alias: {
      '@': path.resolve(__base, 'src'),
    },
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__base, 'build'),
    clean: true,
  },
}
