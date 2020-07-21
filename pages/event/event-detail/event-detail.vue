<template>
	<view class="content">
		<view class="img">
			<image :src="HttpClient.getImg(homeDetailData.checkJpg)" />
		</view>
		<view>
			<p class="text-overflow" :title="homeDetailData.title">事件名称：{{homeDetailData.title}}</p>
			<p>告警时间：{{homeDetailData.time}}</p>
			<p>异常标识：{{homeDetailData.label}}</p>
		</view>
	</view>
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

	import uLink from '@/components/uLink.vue'
	import userApi from '@/pages/login/api.js';
	import HttpClient from '@/HttpClient.js'
	import {
		mapState,
	} from 'vuex'
	var _this;
	export default {
		components: {
			uLink
		},
		computed: mapState(['homeDetailData']),
		onLoad() {
			_this = this;
		},
		mounted() {
			console.log(_this.homeDetailData.checkJpg)
		},
		data() {
			return {
				detailData: {},
				HttpClient: HttpClient
			}
		},
		onUnload() {
		},
		onShareAppMessage() {},
		onNavigationBarButtonTap(e) {},
		onReachBottom() {},
		onPullDownRefresh() {},
		methods: {},
	}
</script>

<style>
	@import '@/common/uni-nvue.css';
</style>
