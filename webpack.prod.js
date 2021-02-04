const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

var InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

const postCSSLoaderOptions = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      flexbox: 'no-2009',
    }),
  ],
}

module.exports = merge(common, {
  dependencies: ['vendor'],
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: postCSSLoaderOptions,
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['build'] }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, 'dll/manifest.json'),
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'public/index.html',
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),

    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './dll/vendor**.js'),
      includeSourcemap: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].css',
    }),
  ],
  output: {
    publicPath: '',
  },
})
