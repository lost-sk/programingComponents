var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack'); // 新增

module.exports = {
    mode: 'development',
    entry: {
        'index': [
            './src/index.js'
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    },
    output: {
        path: path.resolve('./dist/src'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            root: path.resolve('./src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ]
    },
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.NamedModulesPlugin(), // 新增
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(), //新增
        new webpack.NoEmitOnErrorsPlugin()
    ]
};