const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [require.resolve('react-refresh/babel')],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
  },
  output: { publicPath: '/' },
  plugins: [new ReactRefreshWebpackPlugin()],
})
