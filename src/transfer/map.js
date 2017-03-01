/**
 * 构建地理坐标系的option
 */
import { filter, maxBy, minBy } from 'lodash'
import provinceDictData from './province'

export default function buildOption (data, config) {
  var yVision = filter(config.visions, { channel: 'y' })
  var xVision = filter(config.visions, { channel: 'x' })
  if (xVision.length <= 0) {
    console.error('there are not find x channel.')
    return null
  }
  if (xVision.length > 1) {
    console.warn('there more then one x channel.')
  }
  if (yVision.length <= 0) {
    console.error('there are not find y channel.')
    return null
  }
  if (yVision.length > 1) {
    console.warn('there more then one y channel.')
  }
  xVision = xVision[0]
  yVision = yVision[0]
  var d = data.map((item) => {
    var name
    if (provinceDictData[item[xVision.field]]) {
      name = provinceDictData[item[xVision.field]].name
    } else {
      name = xVision.field
    }
    return {
      name: name,
      value: item[yVision.field]
    }
  })
  return {
    visualMap: {
      min: minBy(d, 'value').value,
      max: maxBy(d, 'value').value,
      left: 'left',
      top: 'bottom',
      text: ['高','低'], // 文本，默认为数值文本
      calculable: true
    },
    series: [{
      name: '中国',
      type: 'map',
      mapType: 'china',
      data: d
    }]
  }
}
