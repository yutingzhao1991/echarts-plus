/**
 * 构建地理坐标系的option
 */

const provinceDictData = {
  "8611": {
    "id": 8611,
    "name": "北京"
  },
  "8612": {
    "id": 8612,
    "name": "天津"
  },
  "8613": {
    "id": 8613,
    "name": "河北"
  },
  "8614": {
    "id": 8614,
    "name": "山西"
  },
  "8615": {
    "id": 8615,
    "name": "内蒙古"
  },
  "8621": {
    "id": 8621,
    "name": "辽宁"
  },
  "8622": {
    "id": 8622,
    "name": "吉林"
  },
  "8623": {
    "id": 8623,
    "name": "黑龙江"
  },
  "8631": {
    "id": 8631,
    "name": "上海"
  },
  "8632": {
    "id": 8632,
    "name": "江苏"
  },
  "8633": {
    "id": 8633,
    "name": "浙江"
  },
  "8634": {
    "id": 8634,
    "name": "安徽"
  },
  "8635": {
    "id": 8635,
    "name": "福建"
  },
  "8636": {
    "id": 8636,
    "name": "江西"
  },
  "8637": {
    "id": 8637,
    "name": "山东"
  },
  "8641": {
    "id": 8641,
    "name": "河南"
  },
  "8642": {
    "id": 8642,
    "name": "湖北"
  },
  "8643": {
    "id": 8643,
    "name": "湖南"
  },
  "8644": {
    "id": 8644,
    "name": "广东"
  },
  "8645": {
    "id": 8645,
    "name": "广西"
  },
  "8646": {
    "id": 8646,
    "name": "海南"
  },
  "8650": {
    "id": 8650,
    "name": "重庆"
  },
  "8651": {
    "id": 8651,
    "name": "四川"
  },
  "8652": {
    "id": 8652,
    "name": "贵州"
  },
  "8653": {
    "id": 8653,
    "name": "云南"
  },
  "8654": {
    "id": 8654,
    "name": "西藏"
  },
  "8661": {
    "id": 8661,
    "name": "陕西"
  },
  "8662": {
    "id": 8662,
    "name": "甘肃"
  },
  "8663": {
    "id": 8663,
    "name": "青海"
  },
  "8664": {
    "id": 8664,
    "name": "宁夏"
  },
  "8665": {
    "id": 8665,
    "name": "新疆"
  },
  "8671": {
    "id": 8671,
    "name": "台湾"
  },
  "8681": {
    "id": 8681,
    "name": "香港"
  },
  "8682": {
    "id": 8682,
    "name": "澳门"
  }
}

exports.buildOption = function (data, config) {
  var yVision = _.filter(config.visions, { channel: 'y' })
  var xVision = _.filter(config.visions, { channel: 'x' })
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
      min: _.minBy(d, 'value').value,
      max: _.maxBy(d, 'value').value,
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
