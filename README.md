## 喜讯！《uCharts高性能跨全端图表》荣获插件大赛一等奖，感谢DCloud以及mpvue团队的鼓励和认可！感谢各位开发者的问题反馈和赞赏！uCharts团队一定会不负众望，为大家打造完美、方便、高性能的图表而奋斗！再次感谢！

# [uCharts官方网站](https://www.ucharts.cn)
# <https://www.ucharts.cn>
[![star](https://gitee.com/uCharts/uCharts/badge/star.svg?theme=gvp)](https://gitee.com/uCharts/uCharts/stargazers)

[![uCharts/uCharts](https://gitee.com/uCharts/uCharts/widgets/widget_card.svg?colors=393222,ebdfc1,fffae5,d8ca9f,393222,a28b40)](https://gitee.com/uCharts/uCharts)

# [在线文档（参数在API章节）](http://doc.ucharts.cn)

## QQ交流群:371774600
## 口令【`uniapp`】
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/QQqrcode.png?raw=true)

## 快速体验

一套代码编到7个平台，依次扫描二维码，亲自体验uCharts图表跨平台效果！IOS因demo比较简单无法上架，请自行编译。
![](https://box.kancloud.cn/58092090f2bccc6871ca54dbec268811_654x479.png)

## [更新记录](https://www.kancloud.cn/qiun/ucharts/content/%E6%9B%B4%E6%96%B0%E8%AE%B0%E5%BD%95.md)


## 支持图表类型
- 饼图   `pie`
- 圆环图 `ring`
- 线图   `line`（直线、曲线）
- 柱状图 `column`（分组、堆叠、温度计）
- 区域图 `area`（直线、曲线）
- 雷达图 `radar`
- 圆弧进度图 `arcbar`
- 仪表盘 `gauge`
- K线图  `candle`
- 混合图 `mix`（支持point、line直线曲线、column、area直线曲线）
- 玫瑰图 `rose`
- 词云图 `word`
- 漏斗图 `funnel`
- 地图 `map`


## 插件特点
- 改造后的插件可以跨端使用，支持H5、小程序（微信/支付宝/百度/头条/QQ/360）、APP，调用简单方便、性能及体验极佳。
- 虽然没有Echarts及F2图表功能强大，但可以实现一套业务逻辑各端通用，并解决了支付宝小程序图表显示模糊等问题。
- 支持单页面多图表，demo中单页10个图表，响应速度超快。
- 支持入场动画及ToolTip动画效果。
- 独特支持`横屏模式`感谢`masterLi`提供需求。

## 为何不用Echarts？
- 相比Echarts及F2的复杂的设置，本插件几乎等于傻瓜式的配置。
- Echarts在跨端使用更复杂，本插件只需要简单的两个`<canvas>`标签轻松区别搞定，代码整洁易维护。
- Echarts在IOS端图表显示错位，只能引用网页解决。
- 本插件打包后的体积相比Echarts小很多很多，所以性能更好。
- 如果您是uni-app初学者，那么强烈建议您使用uCharts，并且目前可以跨全端通用，减少工作量，增强一致性体验。
- 图表样式均可自定义，懂js的都可以读懂插件源码，直接修改u-charts.js源码即可。
- 本插件经过大量测试，反复论证并加以改造而成，请各位放心使用。

## uni-app图表选型参考流程

![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/xuanxing.png?raw=true)

## 亲手教您如何改造uCharts，打造您的专属图表
- 为何要改造uCharts?
- 并不是所有图表插件直接拿来就可以满足客户需求，如果您的UI设计师设计一个图表，如下图:

![](https://img.kancloud.cn/c2/1f/c21f7f84c5ff42d323267323d7f48b05_468x337.gif)

- 您会发现这个图表即使在echarts里也不是很好实现，那么就需要我们自己动手去实现。下面就让我们一起来完成，本文旨在抛砖引玉，希望各位朋友能够更好的应用uCharts来完成您的项目，如果您有更好的设计，请提交您的PR到github[uCharts跨端图表](https://github.com/16cheng/uCharts)，帮助更多朋友，感谢您的付出及贡献！

## [【uCharts 跨端图表改造教程】](https://gitee.com/uCharts/uCharts/wikis/%E6%94%B9%E9%80%A0uCharts%E6%89%93%E9%80%A0%E4%B8%93%E5%B1%9E%E5%9B%BE%E8%A1%A8?sort_id=1535997)


## 图表示例
![](https://img.kancloud.cn/ac/ef/acef49105d33936d872f8eb9d3526af1_468x453.gif)
![](https://img.kancloud.cn/b4/df/b4dfcc01461fc6b918932f1e15c06172_446x337.gif)
![](https://img.kancloud.cn/0f/8e/0f8e525821ab2fe671095ece89ff6a1a_460x342.gif)
![](https://box.kancloud.cn/1d5e2c60898de86f5f33f93020ff029e_468x342.gif)
![](https://box.kancloud.cn/63e5833a7ccd8308b0f8ab59522c36c1_468x349.gif)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/mix.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/mix2.gif?raw=true)
![](https://box.kancloud.cn/2f00fcf5a8ce7a9593aea3bc14b8f150_468x411.gif)
![](https://img.kancloud.cn/c2/1f/c21f7f84c5ff42d323267323d7f48b05_468x337.gif)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/yibiaopan.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/arcbar.gif?raw=true)
![](https://box.kancloud.cn/af4fb86f40538d85da3e8def8669b87d_468x342.gif)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/lineA.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/lineA-scroll.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/dashLine.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/area.gif?raw=true)
![](https://box.kancloud.cn/1a7b5b2908751cbb3f135e5071e42f1b_468x345.gif)
![](https://box.kancloud.cn/a3c42919a45fbf93db028fe9a0975adc_468x345.gif)
![](https://box.kancloud.cn/fe5f988bfb017c5d46d695e4626bd656_468x345.gif)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/radar.gif?raw=true)
![](https://github.com/16cheng/uCharts/blob/master/example/uni-app/static/lineB.gif?raw=true)


## 常见问题

各位遇到问题请先参考以下问题，如果仍不能解决，请留言。

### 通用问题
 - 如果用在您的项目上图表不显示，请先运行demo页面，如果demo页面也无法显示，请查看全局样式是否定义了`canvas的样式`，如有请取消。
- 图表`背景颜色`问题，很多朋友设置图表背景颜色时候，只修改了view和canvas的css,忘记了修改实例化参数中的`background:'#FFFFFF'`，导致图表画板右侧有一道白条（这个是图表配置中的右边距），所以特修改了demo中的`柱状图`的背景颜色供大家参考。
- 如果遇到`图表与预期尺寸不符合`，请检查canvas标签上的`css`与`cWidth、cHeihgt`设置的值是否相符，css请用`rpx`为单位，cWidth、cHeihgt的单位为`px`，请参考demo用uni.upx2px()方法转换。
- 如遇到开启拖拽，而实际`无法拖拽`的情况，请先检查canvas标签是否绑定的`touch事件`。
- 如果涉及到v-if切换显示图表组件，第二次可能会变空白，建议用v-show替代v-if切换显示图表组件。

### 头条问题
- 头条小程序目前不支持拖拽事件，后续官方支持的话，不必更换js文件，直接可用。

### 支付宝问题
- 在高分屏模式下，如果发现图表已显示，但位置不正确，请检查上级 `view` 容器的 `样式`。
- 为了解决高分屏模糊问题，需要在canvas标签定义width、height和style属性来控制canvas的缩放来达到匹配高分屏，具体逻辑为width、height的数值应为图表根据pixelRatio的比例放大后的尺寸，而style的尺寸为屏幕的宽和高（并非真实物理像素点）例如：
```
width="750" height="500" style="width:750rpx;height:500rpx;"。
```