通过配置EChartsPlus的Option可以快速的构建出ECharts的Option，同时也能够使用ECharts强大的自定义配置，具体配置参考：

```js
{
  coord: 'rect', // 使用的坐标系，可选 rect | map | polar，为空时会把该option当做echarts的option
  series: [{ // 数据系列，一个或者多个
    type: 'bar', // series类型，同ECharts：http://echarts.baidu.com/option.html#series-line.type
    name: 'xxx', // 同ECharts：http://echarts.baidu.com/option.html#series-line.name
    gererator: 'field_xxx', // 对应数据中的一个数据属性。当该项存在时，数据会按照该属性分组生成多个series
    valueTranslator: Function, // 翻译值的名称, for series.name, category.data, legend.data
    itemTranslator: Function, // 翻译每个数据项名称, series: [{ data: [{ name: 'thisname', value: xx }] }]
    visions: [{ // 数据到视觉通道的配置
      channel: 'y', // 视觉通道类型，坐标系的不同和series类型的不同使得支持的视觉通道也不同，参考坐标系的文档
      field: 'value' // 要映射到该视觉通道上的数据属性或者数据值，对应数据总的一列
    }, {
      channel: 'x',
      field: 'dt'
    }],
    option: { // series的配置，同ECharts：http://echarts.baidu.com/option.html#series
      // 可以是一个Function，echarts-plus会执行它并传入series的配置，当存在generator的时候可以通过它获得灵活的option配置
      name: '值'
    }
  }],
  legendTarget: 'series', // legend对应切换的对象，可选 series | item，默认为空不显示legend，item仅对极坐标(polar)有效
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

目前所有支持的视觉通道和它的级别如下，生成series时会按照它对应的级别排序构造出series的数据。构建默认的visualMap是也是按照该顺序来的，所以你可以参考该优先级来，自定义visualMap从而配置视觉通道。

```js
channelCrder = {
  x: 0,
  y: 1,

  radius: 0,
  angle: 1,
  
  symbol: 2,
  symbolSize: 3,
  color: 4,
  colorAlpha: 5,
  opacity: 6,
  colorLightness: 7,
  colorSaturation: 8,
  colorHue: 9,

  name: -1
}
```