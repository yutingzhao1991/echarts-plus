exports.defaultTranslator = function (field, value, item) {
  if (item && item[field + '__name']) {
    return item[field + '__name']
  } else {
    return value
  }
}

// copy from aa static/js/vintage TODO move to clib.
var colors = ["#5dabe1", "#fbc33b", "#a263bb", "#ED7D31", "#80d25c",
  "#8d4654", "#DDDF00", "#24CBE5", "#FF9655",
  "#FFF263", "#6AF9C4", "#7798BF", "#aaeeee",
  "#eeaaee", "#2b908f", "#90ee7e", "#f45b5b", "#f7a35c",
  "#8085e9"
]
var index = 0
exports.getColor = function () {
  return colors[index++ % colors.length]
}

exports.resetColor = function () {
  index = 0
}

exports.numberFormatter = function (value, col) {
  var res = value
  col = col || {}
  if (typeof col === 'string') {
    col = {
      format: col
    }
  }
  var type = col.format
  var fixed = col.fixed || 2
  if (type == 'date') {
    res = moment(res).format(col.dateFormat || 'YYYY-MM-DD HH:mm:ss')
  } else if (type == 'percent') {
    if (res !== 0) {
      let pre = ''
      if (Math.abs(res) < 1 / Math.pow(10, fixed + 2)) {
        res = 1 / Math.pow(10, fixed + 2)
        pre = '<'
      }
      res = res * 100
      res = parseFloat(res.toFixed(fixed))
      res = pre + res.toLocaleString() + '%'
    }
  } else if (type == 'human') {
    let unit = ''
    if (res >= 100000000) {
      unit = '亿'
      res = res / 100000000
    } else if (res >= 10000) {
      unit = '万'
      res = res / 10000
    }
    res = parseFloat(res.toFixed(fixed))
    res = res.toLocaleString() + unit
  } else if (type == 'number') {
    res = parseFloat(res.toFixed(fixed))
    res = res.toLocaleString()
  }
  return res
}
