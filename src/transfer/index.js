/**
 * EChartsPlus option transfer
 * 将 EChartsPlus 的配置转化为 ECharts 的配置
 */
import _ from 'lodash'
import { coordOption, visionsOrder, seriesOption, seriesType, visualRange } from './config'

export default function build (data, config) {
  // 没有找到坐标系，默认为是ECharts的Option
  if (config.coord == null) {
    return config
  }
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
  var visaulVisions = _.chain(config.series).map('visions').flatten().filter((v) => {
    return visionsOrder[v.channel] >= 2
  }).value()
  if (visaulVisions.length > 0) {
    opt.visualMap = generateVisualMap(data, config, visaulVisions)
  }

  // 合并默认配置
  opt = _.merge(opt, coordOption[config.coord])
  opt = _.merge(opt, generateUserOption(config.option))
  return opt
}

function generateUserOption (option) {
  var userOption = _.assign({}, option)
  if (userOption.yAxis && !_.isArray(userOption.yAxis)) {
    userOption.yAxis = [userOption.yAxis]
  }
  if (userOption.xAxis && !_.isArray(userOption.xAxis)) {
    userOption.xAxis = [userOption.xAxis]
  }
  return userOption
}

function generateVisualMap (data, config, visions) {
  return visions.map((v) => {
    var min = _.minBy(data, v.field)[v.field]
    var max = _.maxBy(data, v.field)[v.field]
    var range
    if (visualRange[v.channel]) {
      range = {
        [v.channel]: visualRange[v.channel]
      }
    }
    return {
      min: min,
      max: max,
      dimension: visionsOrder[v.channel],
      show: config.coord === 'map',
      inRange: range,
      calculable: true
    }
  })
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

  var axis = (config.option && config.option[channel + 'Axis']) || []
  if (!_.isArray(axis)) {
    axis = [axis]
  }
  var visions = _.chain(config.series).map((s) => {
    var axisVisions = _.chain(s.visions).filter({ channel: channel }).map((v) => {
      return {
        option: s.option,
        field: v.field,
        channel: v.channel // x or y
      }
    }).value()
    if (axisVisions.length > 1) {
      console.warn('series has more then one x(y)Axis')
    }
    return axisVisions
  }).flatten().value()
  visions.forEach((v) => {
    var axisIndex = (v.option && v.option[channel + 'AxisIndex']) || 0
    axis[axisIndex] = axis[axisIndex] || {
      type: channel === 'x' ? 'category' : 'value'
    }
    axis[axisIndex].type = axis[axisIndex].type || ( channel === 'x' ? 'category' : 'value' )
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
          name: valueTranslator(sConfig.generator, key, group[0]),
          _plus_name: key
        }
        _.assign(subConfig, sConfig)
        subConfig.generator = null
        return generateSeries(group, config, [subConfig], categoryIndexMap)[0]
      }).sortBy(sConfig.sort).value()
    }
    var visions = _.chain(sConfig.visions).filter((v) => {
      return v.channel !== 'name'
    }).sort((a, b) => {
      return visionsOrder[a.channel] - visionsOrder[b.channel]
    }).value()
    var nameVision = _.find(sConfig.visions, { channel: 'name' })
    var s = {
      // name: 'generator valueTranslator or user option',
      // data: [{
      //   name: 'itemTranslator',
      //   value: [channel_x, channel_y, symbolSize, ....]
      // }]
    }
    s.name = sConfig.name || (sConfig.option && sConfig.option.name)
    s._plus_name = sConfig._plus_name
    s.data = []
    data.map((item) => {
      var value = []
      visions.forEach((v) => {
        var valueCol
        if (categoryIndexMap[v.field] && (v.channel === 'x' || v.channel === 'y')) {
          valueCol = categoryIndexMap[v.field][item[v.field]]
        } else {
          valueCol = item[v.field]
        }
        if (value.length <= visionsOrder[v.channel]) {
          value.length = visionsOrder[v.channel] + 1
        }
        value[visionsOrder[v.channel]] = valueCol
      })
      var name = itemTranslator(item)
      if (name == null && nameVision) {
        name = valueTranslator(nameVision.field, item[nameVision.field], item)
      }
      var xVisions = _.find(visions, { channel: 'x' })
      if (xVisions && categoryIndexMap[xVisions.field]) {
        // 如果x轴是类目，那么通过data数组index来对应上数据的x位置
        s.data[categoryIndexMap[xVisions.field][item[xVisions.field]]] = {
          name: name == null ? s.name : name,
          value: value.length === 2 ? value[1] : value // 只有一个类目轴，简化数据
        }
      } else {
        s.data.push({
          name: name == null ? s.name : name,
          value: value
        })
      }
    })
    s.type = sConfig.type || seriesType[config.coord]
    var sOption = sConfig.option
    if (typeof sOption === 'function') {
      sOption = sOption(sConfig, sConfig._plus_name)
    }
    s = _.merge(s, sOption)
    s = _.merge(s, getSeriesDefaultOption(s.type))
    return s
  }).value()
  return _.flatten(series)
}

function getSeriesDefaultOption (type) {
  return seriesOption[type]
}

function defaultItemTranslator (item) {
  return null
}

function defaultValueTranslator (field, value, item) {
  if (item && item[field + '__name']) {
    return item[field + '__name']
  } else {
    return value
  }
}

module.exports = exports['default']
