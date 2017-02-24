/**
 * 通用图表，用于描述最常规的可视化图表
 * @module clib/sombra/builders/common
 */
var _ = require('lodash')
var rectCoord = require('./rect') // 直角坐标系
var polarCoord = require('./polar') // 极坐标系
var mapCoord = require('./map') // 地理坐标系

/**
 * build
 * @param {Array} data - 数据，最近48个小时的数据
 * @param {Object} config - 配置
 * @param {Array} config.visions - 视觉配置
 * @param {Object} [extOption] - 自定义的Echart配置
 * @returns {Object} ECharts的配置
 */
module.exports = function build (data, config, extOption) {
  // 初始化视觉通道所需要的配置
  // 参考g2的coord坐标系定义 https://antv.alipay.com/g2/doc/tutorial/start/coord.html
  var opt
  if (config.coord == 'rect') {
    opt = rectCoord.buildOption(data, config)
  } else if (config.coord == 'polar') {
    opt = polarCoord.buildOption(data, config)
  } else if (config.coord == 'map') {
    opt = mapCoord.buildOption(data, config)
  } else {
    opt = {}
    console.error('coord: ' + config.coord + ' is illegal')
  }

  opt = _.merge(opt, {
    tooltip: {
      show: true
    },
    _height: config.height || 320 // 这个高度不是ehcart中的设置，最后会应用到clib/vues/Echarts的height属性
  })
  
  // merge用户自定义的echarts配置
  if (extOption) {
    opt = _.merge(opt, extOption)
  }
  return opt
}
