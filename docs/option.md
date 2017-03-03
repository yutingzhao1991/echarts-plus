通过配置EChartsPlus的Option可以快速的构建出ECharts的Option，同时也能够使用ECharts强大的自定义配置，具体配置参考：

```js
{
  coord: 'rect', // 使用的坐标系，可选 rect | map | polar，为空时会把该option当做echarts的option
  series: [{ // 数据系列，一个或者多个
    type: 'bar', // series类型，同ECharts：http://echarts.baidu.com/option.html#series-line.type
    name: 'xxx', // 同ECharts：http://echarts.baidu.com/option.html#series-line.name
    visions: [{ // 数据到视觉通道的配置
      channel: 'y', // 视觉通道类型，坐标系的不同和series类型的不同使得支持的视觉通道也不同，参考坐标系的文档
      field: 'value' // 要映射到该视觉通道上的数据属性或者数据值，对应数据总的一列
    }, {
      channel: 'x',
      field: 'dt'
    }],
    option: { // series的配置，同ECharts：http://echarts.baidu.com/option.html#series
      name: '值'
    }
  }],
  legendTarget: 'series', // legend对应切换的对象，可选 series | item，默认为空不显示legend
  option: { // 同ECharts的配置：http://echarts.baidu.com/option.html，会覆盖掉EChartsPlus默认生成的配置
    title: {
      text: '直角坐标系demo'
    },
    tooltip: {
      show: true
    }
  }
}
```