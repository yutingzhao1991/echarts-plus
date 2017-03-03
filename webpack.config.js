var path = require('path')

module.exports = {
  entry: {
    'echarts-plus': './src/echarts-plus.js'
  },
  output: {
    libraryTarget: 'umd',
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
      root: '_',
      commonjs2: 'lodash',
      commonjs: 'lodash',
      amd: 'lodash'
    },
    echarts: {
      root: 'echarts',
      commonjs2: 'echarts',
      commonjs: 'echarts',
      amd: 'echarts'
    }
  }
}