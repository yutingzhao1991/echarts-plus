!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n(require("echarts"),require("lodash"));else if("function"==typeof define&&define.amd)define(["echarts","lodash"],n);else{var t="object"==typeof exports?n(require("echarts"),require("lodash")):n(e.echarts,e._);for(var a in t)("object"==typeof exports?exports:e)[a]=t[a]}}(this,function(e,n){return function(e){function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var t={};return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=3)}([function(e,n,t){"use strict";function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){if(null==n.coord)return n;var t={},a=l(e,n);t=p.default.merge(t,a.option);var r=a.indexMap||{},s=u(e,n,n.series,r);t.series=s;var c=[];"series"===n.legendTarget?c=p.default.chain(s).map("name").compact().uniq().value():"item"===n.legendTarget&&(c=p.default.chain(s).map("data").flatten().map("name").compact().uniq().value()),c.length>0&&(t.legend={show:!0,data:c});var f=p.default.chain(n.series).map("visions").flatten().filter(function(e){return h.visionsOrder[e.channel]>=2}).value();return f.length>0&&(t.visualMap=o(e,n,f)),t=p.default.merge(t,h.coordOption[n.coord]),t=p.default.merge(t,i(n.option))}function i(e){var n=p.default.assign({},e);return n.yAxis&&!p.default.isArray(n.yAxis)&&(n.yAxis=[n.yAxis]),n.xAxis&&!p.default.isArray(n.xAxis)&&(n.xAxis=[n.xAxis]),n}function o(e,n,t){return t.map(function(t){var r,i=p.default.minBy(e,t.field)[t.field],o=p.default.maxBy(e,t.field)[t.field];return h.visualRange[t.channel]&&(r=a({},t.channel,h.visualRange[t.channel])),{min:i,max:o,dimension:h.visionsOrder[t.channel],show:"map"===n.coord,inRange:r,calculable:!0}})}function l(e,n,t){if(!t){var a=l(e,n,"x"),r=l(e,n,"y");return{option:{xAxis:a.axis,yAxis:r.axis},indexMap:p.default.assign(a.indexMap,r.indexMap)}}var i={},o=n.valueTranslator||f,u=n.option&&n.option[t+"Axis"]||[];p.default.isArray(u)||(u=[u]);var s=p.default.chain(n.series).map(function(e){var n=p.default.chain(e.visions).filter({channel:t}).map(function(n){return{option:e.option,field:n.field,channel:n.channel}}).value();return n.length>1&&console.warn("series has more then one x(y)Axis"),n}).flatten().value();return s.forEach(function(n){var a=n.option&&n.option[t+"AxisIndex"]||0;if(u[a]=u[a]||{type:"x"===t?"category":"value"},u[a].type=u[a].type||("x"===t?"category":"value"),"category"===u[a].type){var r=p.default.chain(e).uniqBy(n.field).sortBy(n.field).value(),l=[],s={};r.forEach(function(e,t){s[e[n.field]]=t,l.push(o(n.field,e[n.field],e))}),u[a].data=l,i[n.field]=s}}),{axis:s.length>0?u:null,indexMap:i}}function u(e,n,t,a){var r=n.itemTranslator||c,i=n.valueTranslator||f,o=p.default.chain(t).map(function(t){if(t.generator)return p.default.chain(e).groupBy(t.generator).map(function(e,r){var o={name:i(t.generator,r,e[0]),_plus_name:r};return p.default.assign(o,t),o.generator=null,u(e,n,[o],a)[0]}).sortBy(t.sort).value();var o=p.default.chain(t.visions).filter(function(e){return"name"!==e.channel}).sort(function(e,n){return h.visionsOrder[e.channel]-h.visionsOrder[n.channel]}).value(),l=p.default.find(t.visions,{channel:"name"}),c={};c.name=t.name||t.option&&t.option.name,c._plus_name=t._plus_name,c.data=[],e.map(function(e){var n=[];o.forEach(function(t){var r;r=!a[t.field]||"x"!==t.channel&&"y"!==t.channel?e[t.field]:a[t.field][e[t.field]],n.length<=h.visionsOrder[t.channel]&&(n.length=h.visionsOrder[t.channel]+1),n[h.visionsOrder[t.channel]]=r});var t=r(e);null==t&&l&&(t=i(l.field,e[l.field],e));var u=p.default.find(o,{channel:"x"});u&&a[u.field]?c.data[a[u.field][e[u.field]]]={name:null==t?c.name:t,value:2===n.length?n[1]:n}:c.data.push({name:null==t?c.name:t,value:n})}),c.type=t.type||h.seriesType[n.coord];var f=t.option;return"function"==typeof f&&(f=f(t,t._plus_name)),c=p.default.merge(c,f),c=p.default.merge(c,s(c.type))}).value();return p.default.flatten(o)}function s(e){return h.seriesOption[e]}function c(e){return null}function f(e,n,t){return t&&t[e+"__name"]?t[e+"__name"]:n}Object.defineProperty(n,"__esModule",{value:!0}),n.default=r;var d=t(5),p=function(e){return e&&e.__esModule?e:{default:e}}(d),h=t(4);e.exports=n.default},function(e,n){var t;t=function(){return this}();try{t=t||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(n,t){n.exports=e},function(e,n,t){"use strict";(function(a){function r(e){return e&&e.__esModule?e:{default:e}}function i(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),l=t(2),u=r(l),s=t(0),c=r(s),f=function(){function e(n,t){i(this,e),this._data=n,this._option=t,this._echartsOption=null,this.echarts=null}return o(e,[{key:"setData",value:function(e){return this._data=e,this.setOption(this._option),this}},{key:"setOption",value:function(e){return this._option=e,this.echarts&&(this._echartsOption=(0,c.default)(this._data,this._option),this.echarts.setOption(this._echartsOption)),this}},{key:"renderTo",value:function(e){return"string"==typeof e&&(e=document.getElementById(e)),this.echarts=u.default.init(e),this._echartsOption?this.echarts.setOption(this._echartsOption):this.setOption(this._option),this}},{key:"getECharts",value:function(){return this.echarts}}],[{key:"buildOption",value:function(e,n){return(0,c.default)(e,n)}}]),e}();a.EChartsPlus=a.EChartsPlus||f,a.echarts=a.echarts||u.default,n.default=f,e.exports=n.default}).call(n,t(1))},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.coordOption={rect:{},map:{}},n.seriesType={rect:"bar",polar:"pie",map:"map"},n.visionsOrder={x:0,y:1,angle:0,angle1:0,angle2:1,angle3:2,angle4:3,angle5:4,angle6:5,angle7:6,angle8:7,symbol:2,symbolSize:3,color:4,colorAlpha:5,opacity:6,colorLightness:7,colorSaturation:8,colorHue:9,name:-1},n.seriesOption={scatter:{},map:{mapType:"china"}},n.visualRange={symbolSize:[10,80],opacity:[.3,1],symbol:["circle","rect","roundRect","triangle","diamond","pin","arrow"]}},function(e,t){e.exports=n}])});
//# sourceMappingURL=echarts-plus.js.map