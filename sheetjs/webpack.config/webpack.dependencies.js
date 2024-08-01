const path = require('path');
const package = require('../package.json');

let libs = {};

for (const lib of Object.keys(package.dependencies)) {
  if (!['antd', 'moment', 'react', 'react-dom'].includes(lib)) {
    libs[lib] = lib;
  }
}

module.exports = {
  mode: "production",
  entry: libs,
  output: {
    path: path.join(__dirname, '../out/libs'),
    filename: '[name].js',
    library: ["[name]"],
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    minimize: true
  }
}