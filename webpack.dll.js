const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const pkg = require(path.join(process.cwd(), 'package.json'))

module.exports = {
  name: 'vendor',
  entry: {
    vendor: pkg.dllDependencies,
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: '[name].[fullhash:8].js',
    library: '[name]_[fullhash]',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dll'],
    }),
    new webpack.DllPlugin({
      name: '[name]_[fullhash]',
      path: path.resolve(__dirname, 'dll/manifest.json'),
    }),
  ],
}
