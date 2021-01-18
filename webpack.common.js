const paths = require('./webpack.paths')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: './src/index.tsx',
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*',
      },
    }),
  ],
  output: {
    filename: '[name].[fullhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    path: paths.build,
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#1890ff',
                  'link-color': '#1890ff',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
}

module.exports = config
