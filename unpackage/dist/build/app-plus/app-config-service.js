
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/basic/index","pages/statistics/index","pages/app/index","pages/doc/index","pages/user/index","pages/basic/column/column","pages/basic/column/meter","pages/basic/column/stack","pages/basic/mix/mix","pages/basic/line/rotate","pages/basic/column/rotate","pages/basic/column/mark-line","pages/basic/candle/candle","pages/basic/line/line","pages/basic/line/line-scroll","pages/basic/line/curve","pages/basic/area/time","pages/basic/area/area","pages/basic/pie/pie","pages/basic/pie/rose","pages/basic/pie/ring","pages/basic/gauge/gauge","pages/basic/radar/radar","pages/basic/word/word","pages/basic/funnel/funnel","pages/basic/map/map","pages/basic/arcbar/arcbar","pages/basic/arcbar/mix","pages/basic/column/column-scroll","pages/doc/view","pages/app/demo/component","pages/app/demo/index","pages/app/demo/candle","pages/app/demo/scroll","pages/user/about","pages/user/feedback","pages/user/service","pages/user/account","pages/user/message","pages/user/login"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"视觉ai","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#333333","backgroundColor":"#F8F8F8","selectedColor":"#00B26A","list":[{"pagePath":"pages/basic/index","text":"预警","iconPath":"static/tabbar/warning.png","selectedIconPath":"static/tabbar/warning-selected.png"},{"pagePath":"pages/app/index","text":"处置","iconPath":"static/tabbar/dispose.png","selectedIconPath":"static/tabbar/dispose-selected.png"},{"pagePath":"pages/statistics/index","text":"统计","iconPath":"static/tabbar/statistics.png","selectedIconPath":"static/tabbar/statistics-selected.png"},{"pagePath":"pages/user/index","text":"我的","iconPath":"static/tabbar/mine.png","selectedIconPath":"static/tabbar/mine-selected.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uCharts","compilerVersion":"2.7.14","entryPagePath":"pages/basic/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/basic/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"uCharts跨全端图表","navigationBarTextStyle":"black"}},{"path":"/pages/statistics/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"统计分析","navigationBarTextStyle":"black"}},{"path":"/pages/app/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"应用","navigationBarTextStyle":"black"}},{"path":"/pages/doc/index","meta":{},"window":{"navigationBarTitleText":"手册","navigationBarTextStyle":"black"}},{"path":"/pages/user/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationBarTextStyle":"black"}},{"path":"/pages/basic/column/column","meta":{},"window":{"navigationBarTitleText":"基本柱状图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/column/meter","meta":{},"window":{"navigationBarTitleText":"温度计式图表","navigationBarTextStyle":"black"}},{"path":"/pages/basic/column/stack","meta":{},"window":{"navigationBarTitleText":"堆叠图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/mix/mix","meta":{},"window":{"navigationBarTitleText":"混合图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/line/rotate","meta":{},"window":{"navigationBarTitleText":"横屏模式带滚动条","navigationBarTextStyle":"black"}},{"path":"/pages/basic/column/rotate","meta":{},"window":{"navigationBarTitleText":"横屏图表","navigationBarTextStyle":"black"}},{"path":"/pages/basic/column/mark-line","meta":{},"window":{"navigationBarTitleText":"标记线","navigationBarTextStyle":"black"}},{"path":"/pages/basic/candle/candle","meta":{},"window":{"navigationBarTitleText":"基本K线图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/line/line","meta":{},"window":{"navigationBarTitleText":"基本折线图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/line/line-scroll","meta":{},"window":{"navigationBarTitleText":"折线图带滚动条","navigationBarTextStyle":"black"}},{"path":"/pages/basic/line/curve","meta":{},"window":{"navigationBarTitleText":"基本曲线图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/area/time","meta":{},"window":{"navigationBarTitleText":"时间X轴","navigationBarTextStyle":"black"}},{"path":"/pages/basic/area/area","meta":{},"window":{"navigationBarTitleText":"基本区域图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/pie/pie","meta":{},"window":{"navigationBarTitleText":"基本饼图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/pie/rose","meta":{},"window":{"navigationBarTitleText":"玫瑰图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/pie/ring","meta":{},"window":{"navigationBarTitleText":"基本环形图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/gauge/gauge","meta":{},"window":{"navigationBarTitleText":"仪表盘","navigationBarTextStyle":"black"}},{"path":"/pages/basic/radar/radar","meta":{},"window":{"navigationBarTitleText":"雷达图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/word/word","meta":{},"window":{"navigationBarTitleText":"词云图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/funnel/funnel","meta":{},"window":{"navigationBarTitleText":"漏斗图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/map/map","meta":{},"window":{"navigationBarTitleText":"地图","navigationBarTextStyle":"black"}},{"path":"/pages/basic/arcbar/arcbar","meta":{},"window":{"navigationBarTitleText":"基本圆弧进度条","navigationBarTextStyle":"black"}},{"path":"/pages/basic/arcbar/mix","meta":{},"window":{"navigationBarTitleText":"多重圆弧进度条","navigationBarTextStyle":"black"}},{"path":"/pages/basic/column/column-scroll","meta":{},"window":{"navigationBarTitleText":"柱状图带滚动条","navigationBarTextStyle":"black"}},{"path":"/pages/doc/view","meta":{},"window":{"navigationBarTitleText":"文档详情","navigationBarTextStyle":"black"}},{"path":"/pages/app/demo/component","meta":{},"window":{"navigationBarTitleText":"(v-for)组件内使用示例","navigationBarTextStyle":"black"}},{"path":"/pages/app/demo/index","meta":{},"window":{"navigationBarTitleText":"单页多图表好性能","navigationBarTextStyle":"black"}},{"path":"/pages/app/demo/candle","meta":{},"window":{"navigationBarTitleText":"K线图与柱状图联动","navigationBarTextStyle":"black"}},{"path":"/pages/app/demo/scroll","meta":{},"window":{"navigationBarTitleText":"scroll-view中使用","navigationBarTextStyle":"black"}},{"path":"/pages/user/about","meta":{},"window":{"navigationBarTitleText":"关于uCharts","navigationBarTextStyle":"black"}},{"path":"/pages/user/feedback","meta":{},"window":{"navigationBarTitleText":"问题反馈","navigationBarTextStyle":"black"}},{"path":"/pages/user/service","meta":{},"window":{"navigationBarTitleText":"服务条款及协议","navigationBarTextStyle":"black"}},{"path":"/pages/user/account","meta":{},"window":{"navigationBarTitleText":"帐号管理","navigationBarTextStyle":"black"}},{"path":"/pages/user/message","meta":{},"window":{"navigationBarTitleText":"新消息通知","navigationBarTextStyle":"black"}},{"path":"/pages/user/login","meta":{},"window":{"navigationBarTitleText":"登录","navigationBarTextStyle":"black"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
