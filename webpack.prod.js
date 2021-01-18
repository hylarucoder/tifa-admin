const paths = require('./webpack.paths')

const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')


const HtmlWebpackPlugin = require('html-webpack-plugin')
// const autoprefixer = require('autoprefixer')

const postCSSLoaderOptions = {
    ident: 'postcss',
    plugins: () => [
        require('postcss-flexbugs-fixes'),
        // autoprefixer({
        //     flexbox: 'no-2009',
        // }),
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
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['build']}),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: path.resolve(__dirname, 'dll/manifest.json'),
        // }),
        new HtmlWebpackPlugin({
            title: 'Production',
            template: 'public/index.html',
        }),
        new InlineManifestWebpackPlugin('manifest'),

        // new AddAssetHtmlPlugin({
        //     filepath: path.resolve(__dirname, './dll/vendor**.js'),
        //     includeSourcemap: true,
        // }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].css',
        }),
    ],
    output: {
        path: paths.build,
        publicPath: '/',
        filename: 'js/[name].[contenthash].bundle.js',
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    }
})
