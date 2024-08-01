const webpack = require('webpack')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: './src/controls/echarts-gl/echarts',
  output: {
    clean: true,
    library: {
      name: 'Echarts',
      type: 'umd',
    },
  },

  devServer: {
    port: 3500,
  },
  plugins: [
    new webpack.DefinePlugin({
      devMode,
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
            maxSize: 10 * 1024,
          },
        },
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
