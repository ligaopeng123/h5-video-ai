<template>
	<view class="content">
		<view class="img">
			<image :src="HttpClient.getImg(disposeData.checkJpg)" alt="">
		</view>
		<view class="content-body">
			<h4>工单信息</h4>
			<p><text>工单编号：</text>{{disposeData.workCode}}</p>
			<p><text>工单状态：</text> <text :style="{'color': getTextColor(disposeData)}">{{disposeData.status == 0 ? '新建' : disposeData.status == 1 ? '处理中' : '已完成'}}</text></p>
			<p><text>创建时间：</text>{{disposeData.time}}</p>
			<p><text>处置建议：</text>{{disposeData.description}}</p>
		</view>
		<view class="content-body">
			<h4>事件信息</h4>
			<p><text>事件名称：</text>{{disposeData.workName}}</p>
			<p><text>告警时间：</text>{{detail.time_norm ? detail.time_norm : ''}}</p>
			<p><text>摄像头型号：</text>{{detail.device_model ? detail.device_model : ''}}</p>
			<p><text>摄像头IP：</text>{{detail.ip_addr ? detail.ip_addr : ''}}</p>
			<p><text>事件详情：</text>{{disposeData.status == 1 ? '已处置' : '未处置'}}</p>
		</view>
		<view>
			<h4>处置意见</h4>
			<view class="dispose-text">
				<view v-if="disposalList.length" v-for="(item, index) in disposalList" :key="index" class="text">
					<p><text>处置人：</text>{{item.disposePeople}}</p>
					<p><text>处置时间：</text>{{util.timestampToTime(item.disposeTime, null)}}</p>
					<p><text>处置意见：</text>{{item.disposeResult}}</p>
				</view>
				<view v-if="!disposalList.length" class="noData">
					暂无数据
				</view>
			</view>
		</view>
		<p class="disposeUser"><text>处置人：</text>{{username}}</p>
		<textarea ref="textarea" name="" id="" cols="30" rows="10" placeholder="请填写处置意见" class="textarea" @blur="bindTextAreaBlur"></textarea>
		<view class="bottom-botton">
			<button size="mini" type="primary" @tap="dispose">处置</button>
		</view>
		<mpopup ref="mpopup" :isdistance="true"></mpopup>
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
	import disposeApi from './emergency-dispose-api.js';
	import HttpClient from '@/HttpClient.js';
	import mpopup from '../../components/xuan-popup/xuan-popup.vue';
	import util from '@/utils/utils.js';
	import {
		mapState,
	} from 'vuex'
	var _this;
	export default {
		components: {
			mpopup
		},
		computed: mapState(['disposeData', 'username']),
		onLoad() {
			_this = this;
		},
		mounted() {
			_this.setDetailsData();
			_this.getEventworkorderds();
		},
		data() {
			return {
				textVlaue: '',
				HttpClient: HttpClient,
				detail: {},
				disposalList: [],
				util: util
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
				if (_this.textVlaue == '') {
					uni.showModal({
						title: "警告",
						content: "请输入处置意见！",
						showCancel: false,
						confirmText: "确定"
					})
				} else {
					console.log({
						disposeResult: _this.textVlaue,
						disposePeople: _this.username,
						uuid: _this.disposeData.eventUuid,
						workCode: _this.disposeData.workCode,
					})
					disposeApi.createWorkorderds({
						disposeResult: _this.textVlaue,
						disposePeople: _this.username,
						uuid: _this.disposeData.eventUuid,
						workCode: _this.disposeData.workCode,
					}, res => {
						if (res.data.code !== '0') {
							_this.$refs.mpopup.open({
								type: 'err',
								content: res.data.msg,
								timeout: 2000,
							});
						} else {
							_this.$refs.mpopup.open({
								type: 'success',
								content: '提交意见成功！',
								timeout: 2000,
							});
							_this.getEventworkorderds();
							_this.$refs.textarea.valueSync = '';
							// console.log(_this.$refs.textarea = '')
						}
					})
				}
			},
			setDetailsData() {
				disposeApi.getDetailsData(`/video/es/detail/ai_views/video/${_this.disposeData.eventUuid}`, {}, res => {
					if (res.data) {
						_this.detail = res.data;
					}
				});
			},
			getEventworkorderds() {
				disposeApi.getEventworkorderds(`/video/eventworkorderds/detail/${_this.disposeData.workCode}`, {}, res => {
					if (res.data) {
						_this.disposalList = res.data.data;
					}
				});
			},
			getTextColor: (item) => {
				return item.status == 0 ? '#cf3a31' : item.status == 1 ? '#1c90ff' : '#2a8e2b';
			}
		},
	}
</script>

<style>
	.disposeUser {
		display: flex;
	}

	.content-body p,
	.dispose-text {
		padding-left: 20upx;
		box-sizing: border-box;
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
		height: 100%;
		padding: 15upx;
		box-sizing: border-box;
		overflow-y: scroll;
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

	.noData {
		width: 100%;
		height: 140upx;
		background: #CCCCCC;
		text-align: center;
		line-height: 140upx;
	}
	
	.text {
		background-color: #CCCCCC;
		padding: 10upx;
		box-sizing: border-box;
	}
</style>
