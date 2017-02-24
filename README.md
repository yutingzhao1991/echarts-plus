# echarts-plus
A visualization grammar extension for Echarts to make it more powerful. 

## Why use echarts plus?

Echarts is awsome, but echarts option design come from charts self. Build echarts option from data is unhandy. echarts-plus use a [vega](https://github.com/vega/vega)-like visualization grammar to build echarts option. It make us build echarts option from data become quick and more effective.

## Get Start

```sh
npm install echarts-plus # or import the builded js in your html.
```

```js
new EChartsPlus([{
  dt: '2016-01-01',
  value: 21323
}, {
  dt: '2016-01-02',
  value: 16528
}, {
  dt: '2016-01-03',
  value: 16028
}], {
  coord: 'rect',
  visions: [{
    channel: 'y',
    field: 'value'
  }, {
    channel: 'x',
    field: 'dt'
  }],
  custom: {
    title: {
      text: '直角坐标系demo'
    }
  }
}).renderTo('main')
```

When you need write a echarts-plus option, you only need follow next steps:

1. Choose a coord system, `(map | polar | rect )`.
2. Mapping your data column to vision channel of the coord system.
3. Done! Just try it.

当你需要构造一个ecahrts-plus的配置的时候，你只需要按照如下几部即可

1. 选择一个坐标系，当前有`(map | polar | rect )`坐标系可选。
2. 配置数据列到视觉通道的映射。
3. 完成！谁用谁知道。

### Examples

- [rect coord](https://github.com/yutingzhao1991/echarts-plus/blob/master/examples/rect/index.html)

### 配置手册

具体的配置如下：

```js
{
  name: '分平台库存', // 模块名称
  resources: [{ // 数据源配置，是一个数组，一个模块可以有多个数据源
    type: 'query-engin', // 数据源类型，当前只支持query-engin，回去按照具体配置请求queryEngin
    config: { // 数据源的配置
      func: 'getInventoryIdleRate', // queryEngin的请求配置
      dimensions: 'platform_id,dt',
      platform_id: '11,12'
    }
  },
  'dsp/getDspList' // 数据源可以是一个字符串，对应resource的名称，用于一些自定义的数据源。比如该配置就对应`src/apps/apollo/resources/dsp`中的getDspList数据源。
], 
  filters: ['dt', 'website_id', 'channel_id'], // 过滤器配置，使用AA中`vues/Selector.vue`组件，dt比较特殊，使用的`vues/Date-range`组件。
  piplines: [{
    method: 'map',
    args: [ .... ]
  }], // 处理数据的管道，对应sombra中的数据处理的方法，比如 autoMerge。当piplines为一个function时，默认认为是map，该function则对应是map的方法。
  charts: [{ // 可视化图表配置，是一个数组，一个模块可以有多个图表
    type: 'common', // 可视化图表的类型，对应sombra中支持的类型，通常情况下都使用 common 即可。
    resource: 0, // 使用的数据源，对应resources中的index。
    config: { // 对应type的可视化图表的类型，这里是type==common时的示例
      coord: 'rect', // 使用的坐标系，reat-直角坐标系，polar-极坐标系
      visions: [{ // 视觉通道配置，关联数据的列和可视化图表中的视觉通道
        channel: 'y', // y通道，代表y轴坐标所对应的数据属性，y通道可以有多个
        field: 'ad_inventory', // 这里意思是y轴对应展示数据中的ad_inventory
        option: { type: line } // 该数据属性映射到该视觉通道时的配置
      }, {
        channel: 'x',
        field: 'dt'
      }, {
        channel: 'legend',
        field: 'platform_id'
      }]
    },
    extOption: { // 用户自定义的图表配置，参考echarts的配置手册
      title: {
        text: '测试'
      }
    }
  }, {
    type: 'common',
    width: 4,
    resource: 1,
    config: {
      coord: 'polar', // 使用极坐标系，饼图
      visions: [{
        channel: 'y',
        field: 'ad_inventory'
      }, {
        channel: 'x',
        field: 'platform_id'
      }]
    }
  }]
}
```

### 视觉通道配置说明

不同的坐标系支持不同的视觉通道，不同的视觉通道又有其对应的配置规范，具体如下：

**y**

```
{
  index: 0, // 默认是0
  name: 'XXX',
  yAxis: {},
  series: {}
}
```
另外还会merge到 http://echarts.baidu.com/option.html#yAxis

**x**

```
{
  type: 'category',
  xAxis: {},
}
```
另外还会merge到 http://echarts.baidu.com/option.html#xAxis
