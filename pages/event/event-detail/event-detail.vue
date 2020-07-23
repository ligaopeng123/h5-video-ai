<template>
	<view class="content">
		<view class="img">
			<image :src="HttpClient.getImg(homeDetailData.checkJpg)" />
		</view>
		<view>
			<p class="text-overflow" :title="homeDetailData.title">事件名称：{{homeDetailData.title}}</p>
			<p>告警时间：{{homeDetailData.time}}</p>
			<p>异常标识：<app-tags v-for="(item, index) in homeDetailData.alarmClass" :key="index" :text="getTagsText(item)" :color="getColor(item)"></app-tags>
			</p>
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
	import HttpClient from '@/HttpClient.js'
	import {
		mapState,
		mapGetters
	} from 'vuex'
	var _this;
	export default {
		components: {},
		computed: { 
			...mapGetters(['lable']),
			...mapState(['homeDetailData'])
		},
		onLoad() {
			_this = this;
		},
		mounted() {
		},
		data() {
			return {
				detailData: {},
				HttpClient: HttpClient
			}
		},
		onUnload() {},
		onShareAppMessage() {},
		onNavigationBarButtonTap(e) {},
		onReachBottom() {},
		onPullDownRefresh() {},
		methods: {
			getTagsText: (item) => {
				return _this.lable.getValueByLable[item];
			},
			getColor: (label) => {
				return _this.lable.getColorByLable(label);
			}
		},
	}
</script>

<style>
	.content {
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
		font-size: 20upx;
	}

	.img {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10upx;
	}

	.text-overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
