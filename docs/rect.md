
```js
{ // 对应type的可视化图表的类型，这里是type==common时的示例
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
  }],
  extOption: { // 用户自定义的图表配置，参考echarts的配置手册
    title: {
      text: '测试'
    }
  }
}
```

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
