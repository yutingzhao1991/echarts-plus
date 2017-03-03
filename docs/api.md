### EChartsPlus

Class EChartsPlus

```js
var EChartsPlus = require('echarts-plus') // or window.EChartsPlus
var data = [{
  fieldA: 'xxx',
  value: 323
}]
var chart = new EChartsPlus(data, {
  coord: 'rect',
  // ...
})
```

### setData

```js
chart.setData([])
```

### setOption

```
chart.setOption({
  coord: 'rect', when coord == null, echarts-plus use option as echart option.
  series: [{
    visions: [{
      channel: 'xxx', // 映射的视觉通道，不同的坐标系支持不同的视觉通道
      field: 'xxx', // 映射到视觉通道上的数据属性
      option: { /* ... */ } // 视觉通道的配置，不同的坐标系支持的视觉通道不同，对应的配置也不同
    }]
  }]
  option: { /* ... */ } // 自定义的echarts配置
})
```

More option detail find in [coord](rect.md) option detail.

### buildOption

静态方法

```js
EChartsPlus.buildOption([], {})
```

### renderTo

```
chart.renderTo('main') # Argument is dom element id or dom element.
```

### getECharts

Return the Echarts install of EchartsPlus.

```
var ec = chart.getECharts()
ec.clear()
```
