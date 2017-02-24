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

### API DOC

- [http://yutingzhao.com/echarts-plus](http://yutingzhao.com/echarts-plus)

