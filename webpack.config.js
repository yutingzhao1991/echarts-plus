var path = require('path')

module.exports = {
  entry: {
    'echarts-plus': './src/echarts-plus.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: process.env.NODE_ENV == 'dev' ? 'cheap-module-source-map' : 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  externals : {
    lodash: {
      commonjs: 'lodash',
      amd: 'lodash',
      root: '_'
    },
    echarts: 'echarts'
  }
}