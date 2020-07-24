<template>
	<view class="uni-container">
		<view>
			<uni-list>
				<view class="home-list-item" :show-arrow="false" v-for="(item, index) in list" :key="item.id">
					<view class="home-list-item-left">
						<image :src="HttpClient.getImg(item.checkJpg) + '_130x130'" alt="" mode="widthFix" @tap="previewImg(item.checkJpg)">
					</view>
					<view class="home-list-item-right">
						<p class="text-overflow"  @tap="goToDetail(index)">
							{{item.title}}
						</p>
						<view>
							{{item.time}}
						</view>
						<scroll-view class="view-scroll" :scroll-x="true" :show-scrollbar="false">
							<app-tags v-for="(item, index) in item.alarmClass" :key="index" :text="getTagsText(item)" :color="getColor(item)"></app-tags>
						</scroll-view>
						<p>
							<button size="mini" type="primary" @tap="goToDispose(index)" v-if="item.status == 0">处置</button>
							<button size="mini" type="primary" @tap="phoneCall()">拨号</button>
						</p>
					</view>
				</view>
			</uni-list>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
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
	import userApi from '@/pages/user/api.js';
	import util from '@/utils/utils.js';
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import homeApi from './home-api.js'
	import HttpClient from '@/HttpClient.js'
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	var _this;
	var _lable;
	export default {
		components: {
			uniListItem,
			uniList
		},
		computed: {
			...mapGetters(['lable']),
			...mapState(['token', 'IPAddress', 'homeData'])
		},
		onLoad() {
			_this = this;
			if (!_this.token || !_this.IPAddress) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: false, // !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							uni.reLaunch({
								url: '/pages/user/login'
							});
						}
					}
				});
			} else {
				uni.$on('websocket', res => {
					_this.list = [_this.dataProcessing(res.data)].concat(_this.list)
				});
			}
		},
		mounted() {
			// 获取首页List数据之前先拿到label映射数据
			userApi.parsingclass(({
				data
			}) => {
				// errorMessage: "此token为黑名单"
				if (data && data.errorMessage === '此token为黑名单') {
					uni.reLaunch({
						url: '/pages/user/login'
					});
				} else {
					const lableData = data.data;
					_this.setLable(lableData);
					_lable = _this.lable;
					_this.getData(false);
					_this.getPhoneData();
				}
			});
		},
		data() {
			return {
				total: 0,
				list: [
					/* {
					title: "前台_04",
					checkName: "lei-chun-qiao",
					checkJpg: "group1/M00/04/82/wKgBT18VLd2APHQWAAARCEZOLIU967.jpg",
					time: "1595223511000"
				}, */
				],
				pageSize: 10,
				pageNumber: 1,
				navigateFlag: false,
				loadMoreText: "加载中...",
				showLoadMore: false,
				max: 0,
				phoneList: [],
				HttpClient: HttpClient
			}
		},
		onUnload() {
			_this.max = 0,
				_this.data = [],
				_this.loadMoreText = "加载更多",
				_this.showLoadMore = false;
		},
		onShareAppMessage() {},
		onNavigationBarButtonTap(e) {},
		onReachBottom() {
			if (_this.max > _this.total) {
				_this.loadMoreText = "没有更多数据了!"
				return;
			}
			_this.pageNumber++;
			_this.showLoadMore = true;
			_this.getData(true);
		},
		onPullDownRefresh() {
			_this.max = 0;
			_this.list = [];
			_this.pageNumber = 1;
			_this.getData(false);
		},
		methods: {
			...mapMutations(['setLable', 'setHomeDetailData']),
			getPhoneData() {
				homeApi.getPhoneData({
					regType: 'app',
					regCfgKey: 'phone'
				}, (res) => {
					if (res.data.records) {
						_this.phoneList = res.data.records[0].cfgValue.split(',');
					}
				});
			},
			getData(loading) {
				homeApi.getHomeData({
					pageSize: _this.pageSize,
					pageNumber: _this.pageNumber,
					sortName: 'time_norm',
					sortOrder: 'desc',
				}, (res) => {
					if (res.data.rows) {
						let data = res.data.rows.map(item => {
							return _this.dataProcessing(item)
						});
						if (loading) {
							_this.max += 10;
							_this.list = _this.list.concat(data);
						} else {
							_this.list = data;
							_this.max += 10;
							uni.stopPullDownRefresh();
						}
						_this.total = res.total;
					}
				});
			},
			phoneCall() {
				if (!_this.phoneList.length) {
					uni.showModal({
						title: "警告",
						content: "不存在可拨打电话，请前往PC系统添加!",
						showCancel: false,
						confirmText: "确定"
					})
					return;
				}
				if (_this.phoneList.length == 1) {
					uni.makePhoneCall({
						phoneNumber: _this.phoneList[0],
						success: () => {}
					});
				} else {
					_this.goDetailPage('make-phone-call', _this.phoneList);
				}
			},
			goToDetail(index) {
				_this.setHomeDetailData(_this.list[index]);
				_this.goDetailPage('event-detail');
			},
			goToDispose(index) {
				_this.setHomeDetailData(_this.list[index]);
				_this.goDetailPage('event-dispose');
			},
			goDetailPage(e, params) {
				let url = `/pages/event/${e}/${e}${params ? '?item=' + JSON.stringify(params) : ''}`;
				uni.navigateTo({
					url: url
				})
			},
			previewImg(logourl) {
				let imgsArray = [];
				imgsArray[0] = HttpClient.getImg(logourl);
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			dataProcessing(item) {
				item.title = item.device_name + ' | 预警 | ' + item.checkName;
				item.time = util.timestampToTime(item.time_norm, null);
				return item;
			},
			getTagsText: (item) => {
				return _lable.getValueByLable[item];
			},
			getColor: (label) => {
				return _lable.getColorByLable(label);
			}
		}
	}
</script>

<style>
	.uni-container {
		padding: 15upx;
		background-color: #f8f8f8;
	}

	.home-list-item {
		padding: 15upx;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		border-bottom: solid 1upx #cccc;
	}

	.home-list-item>>>.uni-list-item__content {
		flex-direction: row !important;
	}

	.home-list-item-left {
		width: 230upx;
		height: 180upx;
		display: flex !important;
		align-items: center;
		justify-content: center;
	}

	.home-list-item-left>image {
		width: 230upx;
		max-height: 180upx;
	}

	.home-list-item-right {
		display: flex;
		font-size: 18upx;
		flex: 1;
		padding-left: 5px;
		justify-content: space-around;
		flex-direction: column;
		overflow: hidden;
	}

	.home-list-item-right>p {
		width: 100%;
	}

	.home-list-item-right>p>button {
		margin: 0 2upx 0;
	}

	.text-overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.view-scroll {
		width: 100%;
		flex-direction: row;
		white-space: nowrap;
	}
</style>
