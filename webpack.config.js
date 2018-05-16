
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production';

console.log('devMode-->',devMode);
module.exports = {
    optimization: {
         minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    entry: { main: './client/app/app.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].[hash].js',
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
              ],
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        //minimize: true,
                        removeComments: true,
                        //collapseWhitespace: false
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules| app | lib)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //   presets: ['@babel/preset-env']
                    // }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {} ),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: './client/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
          })
    ]
};

