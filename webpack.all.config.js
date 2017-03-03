var config = require('./webpack.config.js')

config.entry = {
  'echarts-plus-all': './src/echarts-plus.js'
}
config.externals = {}

module.exports = config
