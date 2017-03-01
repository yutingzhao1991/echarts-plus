/**
 * 构建直角坐标系的option
 */
import { filter, chain, assign, find, merge } from 'lodash'
import utils from './utils'

var visionsOrder = {
  x: 0,
  y: 1,
  size: 2
}

export default function buildOption (data, config) {
  // 直角坐标系
  // 折线图，柱状图，气泡图等都属于该类坐标系，需要添加直角坐标轴
  var categoryIndex = {} // x轴分类索引，用于构建series数据的时候查找位置
  var yVision = filter(config.visions, { channel: 'y' })
  var xVision = filter(config.visions, { channel: 'x' })
  var translator = config.translator || utils.defaultTranslator // 用来翻译字段
  var opt = {}
  if (xVision.length > 1) {
    console.warn('there are more then one only one x channel exsit.')
  }
  if (xVision.length < 1) {
    console.warn('there are not find x channel.')
  }
  var series
  opt.xAxis = xVision.map((v) => {
    var type = v.option && v.option.type || 'category'
    var ret = {
      type: type
    }
    var categories = chain(data).uniqBy(v.field).sortBy(v.field).value()
    var categoriesXIndex = {}
    var categoriesXName = []
    categories.forEach(function (c, index) {
      categoriesXIndex[c[v.field]] = index
      categoriesXName.push(translator(v.field, c[v.field], c))
    })
    categoryIndex[v.field] = categoriesXIndex
    if (type == 'category') {
      ret.data = categoriesXName
    }
    return assign(ret, v.option && v.option.xAxis)
  })
  opt.yAxis = chain(yVision).uniqBy((v) => {
    return v.option && v.option.index || 0
  }).map((v) => {
    var yAxisOpt = {
      type: 'value'
    }
    if (v.option && v.option.format) {
      yAxisOpt.axisLabel = {
        formatter: function (value) {
          return utils.numberFormatter(value, v.option.format)
        }
      }
    }
    return assign(yAxisOpt, v.option && v.option.yAxis)
  }).value()

  // 按照配置将数据的数据属性映射到不同的视觉通道上
  // 按照legend构建series数据
  var legendVision = find(config.visions, { channel: 'legend' })
  var legendField, legendTarget
  if (legendVision) {
    legendField = legendVision.field
    if (yVision.length > 0) {
      // 当有细分而且存在多个指标的时候，可以设置legend用于切换指标还是切换细分
      // legendTarget in (y,series)
      // 当 legendTarget == null 时使用 series:y 作为一个legend项
      legendTarget = config.coordConfig && config.coordConfig.legendTarget
    }
  }
  
  if (legendField) {
    utils.resetColor()
    series = chain(data).groupBy(legendField).map((group, legend) => {
      var name = translator(legendField, legend, group[0])
      if (yVision.length > 1) {
        // 当有多个指标（yVision）时，每个legend为维度+指标。
        var color = utils.getColor()
        return yVision.map((vision) => {
          var itemName = name + ':' + (vision.option && vision.option.name || vision.field)
          var seriesName
          if (legendTarget === 'y') {
            seriesName = vision.option && vision.option.name || vision.field
          } else if (legendTarget === 'legend') {
            seriesName = name
          } else {
            seriesName = itemName
          }
          return generateRectSeries({
            data: group,
            visions: config.visions,
            yVision: vision,
            categoryIndex: categoryIndex,
            name: seriesName,
            itemName: itemName,
            color: color
          })
        })
      } else {
        return generateRectSeries({
          data: group,
          visions: config.visions,
          yVision: yVision[0],
          categoryIndex: categoryIndex,
          name: name
        })
      }
    }).flatten().value()
  } else {
    series = yVision.map((v) => {
      return generateRectSeries({
        data: data,
        visions: config.visions,
        yVision: v,
        categoryIndex: categoryIndex
      })
    })
  }
  opt.legend = {
    show: true,
    data: chain(series).map((s) => {
      return s.name
    }).uniq().value()
  }
  opt.series = series
  return opt
}

function generateRectSeries (params) {
  var { data, visions, yVision, categoryIndex, name, color, itemName } = params
  var list = []
  visions = chain(visions).filter((v) => {
    return v.channel !== 'legend' && v.channel !== 'y'
  }).push(yVision).sortBy((item) => {
    return visionsOrder[item.field]
  }).value()
  list = data.map((item) => {
    var value = visions.map((v) => {
      // 获取映射到坐标系中视觉通道上的值，如果是分类通道，那么需要按照categoryIndex转化为对应分类的index
      return categoryIndex[v.field] == null ? item[v.field] : categoryIndex[v.field][item[v.field]]
    })
    return {
      name: itemName || name,
      value: value
    }
  })
  return merge({
    yAxisIndex: yVision.option && yVision.option.index || 0,
    name: name || (yVision.option && yVision.option.name || yVision.field),
    type: 'bar', // 可能会被yVision.option.series.type覆盖
    color: color, // for legend get serise color
    lineStyle: {
      normal: {
        color: color
      }
    },
    itemStyle: {
      normal: {
        color: color
      }
    },
    data: list
  }, yVision.option && yVision.option.series)
}
