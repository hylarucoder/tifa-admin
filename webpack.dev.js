const paths = require("./webpack.paths")
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
// const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const config = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: paths.build,
        compress: true,
        hot: true,
        port: 3000,
    },
    module: {
        rules: [
            // ... other rules
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    // ... other loaders
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            // ... other options
                            plugins: [
                                // ... other plugins
                                require.resolve('react-refresh/babel'),
                            ].filter(Boolean),
                        },
                    },
                ],
            },
        ],
    },
    output: {publicPath: '/'},
    plugins: [
        // new ErrorOverlayPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            PUBLIC_URL: '/',
            DEBUG: false
        }),
        new ReactRefreshWebpackPlugin()
    ],
})

module.exports = config
