const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    clean: true,
  },
  devServer: {
    port: 3000,
    hot: true,
    proxy: {
      // 当你的前端代码尝试访问以 '/api' 开头的路径时，
      // 请求会被代理到 'target' 指定的服务器
      '/inter-api': {
        target: 'https://supos03.demo.devcloud.supos.net', // 替换为你的后端服务器地址
        changeOrigin: true, // 如果你的后端服务器不在同一域名下，需要设置为true
        //pathRewrite: { '^/api': '' }, // 移除请求路径中的 '/api' 前缀
        secure: false, // 如果你的后端服务器使用了HTTPS，但证书无效，设置为false可以绕过证书验证
      },
    },
  },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
