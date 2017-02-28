# echarts-plus

[![NPM version][npm-image]][npm-url]

A visualization grammar extension for Echarts to make it more powerful. 

## Why use echarts-plus?

Echarts is awsome, but echarts option by designed come from charts itself. Build echarts option from data is unhandy. echarts-plus use a [vega](https://github.com/vega/vega)-like visualization grammar to build echarts option. It let you build echarts option from data become quick and more effective.

Echarts 很强大，但是它的配置的设计是从图表本身的角度出发的。所以会导致从数据构建到 echarts 的配置变得很不友好。echarts-plus 从数据可视化本身出发，通过类似[vega](https://github.com/vega/vega)的一套可视化语法来让创建echarts图表配置变得更高效。

## Quick Start

Simple demo code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>echarts-plus rect</title>
</head>
<body>
  <div id="main" style="width:800px;height:400px;"></div>
  <script src="../../dist/echarts-plus.js"></script>
  <script>
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
    extOption: {
      title: {
        text: '直角坐标系demo'
      }
    }
  }).renderTo('main')
  </script>
</body>
</html>
```

Then you will get:

![demo](http://yutingzhao.com/echarts-plus/images/demo.png)

[Live Demo](http://yutingzhao.com/echarts-plus/examples/rect/index.html)

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

License
---

[![License][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/echarts-plus.svg?style=flat-square
[npm-url]: https://npmjs.org/package/echarts-plus
[license-image]: http://img.shields.io/npm/l/polymer-ext.svg?style=flat-square
[license-url]: #