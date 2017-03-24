import echarts from 'echarts'
import transfer from './transfer'

class EChartsPlus {

  constructor (data, option) {
    this._data = data
    this._option = option
    this._echartsOption = null

    this.echarts = null
  }

  setData (data) {
    this._data = data
    this.setOption(this._option)
    return this
  }

  setOption (option) {
    this._option = option
    if (this.echarts) {
      this._echartsOption = transfer(this._data, this._option)
      console.log(this._echartsOption)
      this.echarts.setOption(this._echartsOption)
    }
    return this
  }

  static buildOption (data, option) {
    return transfer(data, option)
  }

  renderTo (ele) {
    if (typeof ele === 'string') {
      // ele is a id
      ele = document.getElementById(ele)
    }
    this.echarts = echarts.init(ele)
    if (this._echartsOption) {
      // option already cached
      this.echarts.setOption(this._echartsOption)
    } else {
      // generate echartsOption
      this.setOption(this._option)
    }
    return this
  }

  getECharts () {
    return this.echarts
  }
}

global.EChartsPlus = global.EChartsPlus || EChartsPlus
global.echarts = global.echarts || echarts

export default EChartsPlus

module.exports = exports['default']
