const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const CopyPlugin = require('copy-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: './src',
  resolve: {
    alias: {
      '~js': path.resolve(__dirname, '../src/controls/cube/js'),
      '~css': path.resolve(__dirname, '../src/controls/cube/css'),
      '~glsl': path.resolve(__dirname, '../src/controls/cube/glsl'),
      '~assets': path.resolve(__dirname, '../src/controls/cube/assets'),
    },
    fallback: {
      buffer: false,
    },
  },
  devServer: {
    port: 3500,
  },
  plugins: [
    new webpack.DefinePlugin({
      devMode,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: './src/static/**/*',
    //       to: '',
    //     },
    //   ],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|png|svg|gif|mp4)$/,
        //loader: 'file-loader',
        type: 'asset',
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
