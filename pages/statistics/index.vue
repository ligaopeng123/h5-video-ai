<template>
	<view class="qiun-columns">
		<view class="uni-header-logo">
			<view class="uni-header-text">告警事件</view>
			<view class="uni-header-text">{{total}}</view>
		</view>
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
			 :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchPie"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		isJSON
	} from '@/common/checker.js';
	import Utils from '@/utils/utils.js'
	import api from './api.js'
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'

	var _self;
	var canvaPie = null;

	export default {
		computed: {
			...mapGetters(['lable'])
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				total: 0
			}
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(900);
			this.getServerData();
		},
		methods: {
			getServerData() {
				api.getTotal(({
					data
				}) => {
					this.total = data.total || 0;
				});
				const {
					startTime,
					endTime
				} = Utils.getTimeStamp(null);

				api.getCharts({
					fields: this.lable.lableKeyStr,
					startTime: startTime,
					endTime: endTime,
				}, ({
					data
				}) => {
					const lableData = data.data;
					const defaultType = this.lable.getValueByLable;
					const series = [];
					for (let key in defaultType) {
						series.push({
							name: this.lable.labelChange(key),
							data: lableData[key] || 0
						});
					}

					_self.showPie("canvasPie", series);

				})
			},
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					colors: _self.lable.colors,
					type: 'rose',
					fontSize: 11,
					legend: {
						show: true,
						position: 'top',
						float: 'center',
						itemGap: 5,
						padding: 5,
						lineHeight: 15,
						margin: 5,
						borderWidth: 1
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						rose: {
							type: 'radius',
							minRadius: 10,
							activeOpacity: 0.5,
							offsetAngle: 0,
							labelWidth: 15
						}
					},
				});
			},
			touchPie(e) {
				canvaPie && canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			}
		}
	}
</script>

<style>
	.uni-header-logo {
		padding: 15px 15px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}

	.uni-header-text {
		text-align: center;
		align-items: center;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 900upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 900upx;
		background-color: #FFFFFF;
	}
</style>
