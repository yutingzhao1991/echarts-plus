/**
 * 构建极坐标系的option
 */
var defaultTranslator = require('./utils').defaultTranslator

exports.buildOption = function (data, config) {
  // 极坐标系，用于饼图
  var yVision = _.filter(config.visions, { channel: 'y' })
  var xVision = _.filter(config.visions, { channel: 'x' })
  var translator = config.translator || defaultTranslator // 用来翻译字段
  if (xVision.length > 1) {
    console.warn('there are more then one only one x channel exsit.')
  }
  if (xVision.length < 1) {
    console.warn('there are not find x channel.')
  }
  var series
  if (yVision.length > 1) {
    console.warn('when use polar coord, there are only one y channel exsit.')
  }
  series = [{
    name: yVision[0].option && yVision[0].option.name || yVision[0].field,
    type: 'pie',
    data: data.map((item) => {
      return {
        value: item[yVision[0].field],
        name: translator(xVision[0].field, item[xVision[0].field], item)
      }
    })
  }]
  return {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return params.name + ':' + params.value.toLocaleString() + '(' + params.percent + '%)'
      }
    },
    series: series
  }
}
