<template name="app-tags">
	<text :style="{'background-color': getBackground(color), 'color': color, border: '1upx solid' + color }" class="text">
		{{text}}
	</text>
</template>
<script>
	// TODO 修复Android v3 加载过慢问题
	// #ifdef APP-PLUS
	var domModule = weex.requireModule('dom');
	domModule.addRule('fontFace', {
		'fontFamily': "uniicons",
		'src': "url('/static/uni.ttf')"
	});
	// #endif
	import HttpClient from '@/HttpClient.js'
	import {
		mapState,
	} from 'vuex'
	var _this;
	export default {
		name: 'app-tags',
		props: {
				'color': {
					type: String, //属性类型
					value: "#CCCC"
				},
				'text': {
					type: String, //属性类型
					value: "未知检测"
				},
			},
		components: {
		},
		computed: mapState(['disposeData', 'username']),
		onLoad() {
			_this = this;
		},
		mounted() {
	
		},
		data() {
			return {
			}
		},
		onUnload() {},
		onShareAppMessage() {},
		onNavigationBarButtonTap(e) {},
		methods: {
			getBackground(color) {
				var RGBA = "rgba(" + parseInt("0x" + color.slice(1, 3)) + "," + parseInt("0x" + color.slice(3, 5)) + "," + parseInt( "0x" + color.slice(5, 7)) + "," + 0.1 + ")";
				return RGBA
			}
		},
	}
</script>

<style>
	.text{
		display: inline-block;
		text-align: center;
		border-radius: 8upx;
		margin: 5upx;
		font-size: 22upx;
		font-weight: bolder;
		line-height: 22upx;
		padding: 10upx;
		box-sizing: border-box;
	}
</style>
