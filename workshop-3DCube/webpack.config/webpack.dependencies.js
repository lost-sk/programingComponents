const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const CopyPlugin = require('copy-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: './src',
  output: {
    clean: true,
    //path: path.join(__dirname, '../dist'),
    //filename: '[name].js',
    library: {
      name: 'Regl',
      type: 'umd',
    },
  },
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
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024,
          },
        },
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
