<template>
	<view class="content">
		<view class="img">
			<image :src="HttpClient.getImg(homeDetailData.checkJpg)" alt="">
		</view>
		<p class="text-overflow"><text>事件名称：</text>{{homeDetailData.title}}</p>
		<p><text>告警时间：</text>{{homeDetailData.time}}</p>
		<p><text>摄像头型号：</text>{{homeDetailData.device_model}}</p>
		<p><text>摄像头IP：</text>{{homeDetailData.ip_addr}}</p>
		<p><text>事件详情：</text>{{homeDetailData.status == 0 ? '未处置' : '已处置'}}</p>
		<p class="disposeUser"><text>处置人：</text>{{username}}</p>
		<textarea name="" id="" cols="30" rows="10" placeholder="请填写处置内容" class="textarea" @blur="bindTextAreaBlur"></textarea>
		<view class="bottom-botton">
			<button size="mini" type="primary" @tap="dispose">处置</button>
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

	import disposeApi from './event-dispose-api.js'
	import HttpClient from '@/HttpClient.js'
	import {
		mapState,
	} from 'vuex'
	var _this;
	export default {
		components: {
		},
		computed: mapState(['homeDetailData', 'username']),
		onLoad() {
			_this = this;
		},
		mounted() {
		},
		data() {
			return {
				textVlaue: '',
				HttpClient: HttpClient
			}
		},
		onUnload() {},
		onShareAppMessage() {},
		onNavigationBarButtonTap(e) {},
		methods: {
			bindTextAreaBlur(e) {
				_this.textVlaue = e.detail.value;
			},
			dispose() {
				if (_this.textVlaue != '') {
					const entity = {};
					entity['eventUuid'] = `${_this.homeDetailData.id}`;
					entity['workName'] = _this.homeDetailData.title;
					entity['sourceIp'] = `${_this.homeDetailData.device_name}`;
					entity['destIp'] = _this.homeDetailData.alarmClass.join(',');
					entity['status'] = `0`;
					entity['checkJpg'] = _this.homeDetailData.checkJpg;
					entity['description'] = _this.textVlaue;
					disposeApi.postDisposeText(entity, (res) => {
						if (res && res.data.data) {
							uni.showToast({
								title: '处置成功',
								duration: 1500
							});
						}
					});

					if (_this.homeDetailData.status !== '2' && _this.homeDetailData.status !== '1') {
						disposeApi.postStatus(`/video/es/update/ai_views/video/${_this.homeDetailData.id}`, {
							status: '1'
						}, (res) => {
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/event/event'
								});
							}, 1500)
						});
					}
				} else {
					uni.showModal({
						title: "警告",
						content: "请输入处置意见！",
						showCancel: false,
						confirmText: "确定"
					})
				}


			}
		},
	}
</script>

<style>
	.disposeUser {
		display: flex;
		align-items: center;
	}

	.textarea {
		width: 100%;
		border: solid 1px #CCCCCC;
		margin: 5px 0;
	}

	.bottom-botton {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.bottom-botton>button {
		margin: 0;
	}
	
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
	}
	
	.text-overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
</style>
