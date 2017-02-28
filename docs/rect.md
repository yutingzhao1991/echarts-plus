### rect - 直角坐标系

**视觉通道**

- y
- x
- legend

**option**

```js
{
  coord: 'rect',
  coordConfig: {
    legendTarget: 'y' // y| legend | null  当有legend且存在多个y通道时，可以通过该配置指定图表中的legend用于切换y还是legend细分。当为空时图表中的legend为 legend:y
  },
  visions: [{ // 视觉通道配置，关联数据的列和可视化图表中的视觉通道
    channel: 'y', // y通道，代表y轴坐标所对应的数据属性，y通道可以有多个
    field: 'ad_inventory', // 这里意思是y轴对应展示数据中的ad_inventory
    option: { // 该数据属性映射到该视觉通道时的配置
      name: 'xxx', // 名称，tooltip中会显示，默认使用field
      yAxis: {}, // 同echarts：http://echarts.baidu.com/option.html#yAxis
      series: {
        type: 'bar' // 同echarts：http://echarts.baidu.com/option.html#series
      }
    } 
  }, {
    channel: 'x',
    field: 'dt',
    option: {
      type: 'category',
      xAxis: {} // 同echarts：http://echarts.baidu.com/option.html#xAxis
    }
  }, {
    channel: 'legend',
    field: 'platform_id'
  }],
  extOption: { // 用户自定义的图表配置，参考echarts的配置手册
    title: {
      text: '测试'
    }
  }
}
```
