/**
 * EChartsPlus option transfer
 * 将 EChartsPlus 的配置转化为 ECharts 的配置
 */
import _ from 'lodash'
import { coordOption, visionsOrder, seriesOption, seriesType } from './config'

export default function build (data, config) {
  var opt = {}
  // 初始化类目轴相关配置信息
  // categoryInfo like this:
  // {
  //   option: {
  //     xAxis: [],
  //     yAxis: []
  //   },
  //   indexMap: {
  //     xxx_field: {
  //       xxxx: 1
  //     }
  //   }
  // }
  var categoryInfo = generateCategoryInfo(data, config)
  opt = _.merge(opt, categoryInfo.option)
  var categoryIndexMap = categoryInfo.indexMap || {}

  // 生成series
  var series = generateSeries(data, config, config.series, categoryIndexMap)
  opt.series = series

  // 生成legend
  var legends = []
  if (config.legendTarget === 'series') {
    legends = _.chain(series).map('name').compact().uniq().value()
  } else if (config.legendTarget === 'item') {
    legends = _.chain(series).map('data').flatten().map('name').compact().uniq().value()
  }
  if (legends.length > 0) {
    opt.legend = {
      show: true,
      data: legends
    }
  }

  // 生成 visualMap
  // TODO
  var colorVision = _.chain(config.series).map('visions').flatten().find({ channel: 'color' }).value()
  if (colorVision) {
    opt.visualMap = {
      min: _.minBy(data, colorVision.field)[colorVision.field],
      max: _.maxBy(data, colorVision.field)[colorVision.field],
      left: 'left',
      top: 'bottom',
      text: ['高','低'],
      calculable: true
    }
  }

  // 合并默认配置
  opt = _.merge(opt, coordOption[config.coord])
  opt = _.merge(opt, config.option)
  return opt
}

function generateCategoryInfo (data, config, channel) {
  if (!channel) {
    var xInfo = generateCategoryInfo(data, config, 'x')
    var yInfo = generateCategoryInfo(data, config, 'y')
    return {
      option: {
        xAxis: xInfo.axis,
        yAxis: yInfo.axis
      },
      indexMap: _.assign(xInfo.indexMap, yInfo.indexMap)
    }
  }

  var indexMap = {}
  var valueTranslator = config.valueTranslator || defaultValueTranslator

  var userOption = config.option || {}
  var axis = config[channel + 'Axis'] || []
  if (!_.isArray(axis)) {
    axis = [axis]
  }
  var visions = _.chain(config.series).map('visions').flatten().filter({ channel: channel }).value()
  visions.forEach((v) => {
    var axisIndex = (v.option && v.option[channel + 'AxisIndex']) || 0
    axis[axisIndex] = axis[axisIndex] || {
      type: channel === 'x' ? 'category' : 'value'
    }
    if (axis[axisIndex].type === 'category') {
      var categories = _.chain(data).uniqBy(v.field).sortBy(v.field).value()
      var categoriesName = []
      var indexMapItem = {}
      categories.forEach(function (c, index) {
        indexMapItem[c[v.field]] = index
        categoriesName.push(valueTranslator(v.field, c[v.field], c))
      })
      axis[axisIndex].data = categoriesName
      indexMap[v.field] = indexMapItem
    }
  })
  return {
    axis: visions.length > 0 ? axis : null,
    indexMap: indexMap
  }
}

function generateSeries (data, config, seriesConfig, categoryIndexMap) {
  var itemTranslator = config.itemTranslator || defaultItemTranslator
  var valueTranslator = config.valueTranslator || defaultValueTranslator
  var series = _.chain(seriesConfig).map((sConfig) => {
    if (sConfig.generator) {
      // 需要循环生成多个series
      return _.chain(data).groupBy(sConfig.generator).map((group, key) => {
        var subConfig = {
          name: valueTranslator(sConfig.generator, key, group[0])
        }
        _.assign(subConfig, sConfig)
        subConfig.generator = null
        return generateSeries(group, config, [subConfig], categoryIndexMap)[0]
      }).value()
    }
    var visions = _.chain(sConfig.visions).filter((v) => {
      return v.channel !== 'name'
    }).sort((a, b) => {
      return visionsOrder[a.channel] - visionsOrder[b.channel]
    }).value()
    var nameVision = _.find(sConfig.visions, { channel: 'name' })
    console.log(sConfig.visions, nameVision)
    var s = {}
    s.name = sConfig.name || (sConfig.option && sConfig.option.name)
    s.data = data.map((item) => {
      var value = visions.map((v) => {
        if (categoryIndexMap[v.field]) {
          return categoryIndexMap[v.field][item[v.field]]
        } else {
          return item[v.field]
        }
      })
      var name = itemTranslator(item)
      if (name == null && nameVision) {
        name = valueTranslator(nameVision.field, item[nameVision.field], item)
      }
      return {
        name: name || s.name,
        value: value
      }
    })
    s.type = sConfig.type || seriesType[config.coord]
    s = _.merge(s, sConfig.option)
    s = _.merge(s, getSeriesDefaultOption(s.type))
    return s
  }).value()
  return _.flatten(series)
}

function getSeriesDefaultOption (type) {
  return seriesOption[type]
}

function defaultItemTranslator (item) {
  return item.name || null
}

function defaultValueTranslator (field, value, item) {
  if (item && item[field + '__name']) {
    return item[field + '__name']
  } else {
    return value
  }
}

module.exports = exports['default']
