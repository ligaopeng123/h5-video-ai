<template name="app-tags">
	<text :style="{'background': color}" class="text">
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
		
		},
	}
</script>

<style>
	.text{
		padding: 8upx;
		display: inline-block;
		text-align: center;
		height: 30upx;
		border-radius: 8upx;
		color: #FFFFFF;
		margin: 5upx;
	}
</style>
