<template>
	<view class="uni-container">
		<view>
			<uni-list>
				<view class="home-list-item" :show-arrow="false" v-for="(item, index) in list" :key="item.id">
					<view class="home-list-item-left">
						<image :src="HttpClient.getImg(item.checkJpg) + '_130x130'" alt="" mode="widthFix" @tap="previewImg(item.checkJpg)">
					</view>
					<view class="home-list-item-right">
						<p class="text-overflow" @tap="goToDetail(index)">
							{{item.workName}}
						</p>
						<p>
							{{item.time}}
						</p>
						<p>
							<text>状态：</text> <text :style="{'color': getTextColor(item)}">{{item.status == 0 ? '新建' : item.status == 1 ? '处理中' : '已完成' }}</text>
						</p>
						<scroll-view class="view-scroll" :scroll-x="true" :show-scrollbar="false">
							<app-tags v-for="(item, index) in item.destIp.split(',')" :key="index" :text="getTagsText(item)" :color="getColor(item)"></app-tags>
						</scroll-view>
						<p>
							<button size="mini" type="primary" @tap="goToDispose(index)" v-if="item.status != 2">处理</button>
							<button size="mini" type="primary" @tap="close(item, index)" v-if="item.status != 2">关闭</button>
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

	import util from '@/utils/utils.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import emergencyApi from './emergency-api.js';
	import HttpClient from '@/HttpClient.js';
	import userApi from '@/pages/user/api.js';
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	var _this;
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
								url: '/pages/login/login'
							});
						}
					}
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
						url: '/pages/login/login'
					});
				} else {
					const lableData = data.data;
					_this.setLable(lableData);
					_this.getData(false);
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
			if (_this.max >= _this.total) {
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
			...mapMutations(['setLable', 'setDisposeData']),
			getData(loading) {
				emergencyApi.emergencyData({
					pageSize: _this.pageSize,
					pageNumber: _this.pageNumber,
					sortName: 'createTime',
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
						_this.total = res.data.total;
					}
				});
			},
			close(item, index) {
				if (`${item.status}` === '0') {
					return false;
				}
				if (`${item.status}` === '2') {
					return false;
				}
				if (`${item.status}` === '1') {
					emergencyApi.closeWorkorder(
						'/video/eventworkorder/update/' + `${item.uuid}`, {
							status: '2',
							uuid: `${item.status}`,
						}, res => {
							uni.showToast({
								title: '关闭成功',
								duration: 1500
							});
							let item = _this.list[index];
							item.status = 2;
							_this.$set(_this.list, index, item);
						});
				}
			},
			goToDispose(index) {
				_this.setDisposeData(_this.list[index]);
				_this.goDetailPage('emergency-dispose');
			},
			goDetailPage(e, params) {
				let url = `/pages/emergency/${e}`;
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
				item.time = util.timestampToTime(item.createTime, null);
				return item;
			},
			getTagsText: (item) => {
				return _this.lable.getValueByLable[item];
			},
			getColor: (label) => {
				return _this.lable.getColorByLable(label);
			},
			getTextColor: (item) => {
				return	item.status == 0 ? '#cf3a31' : item.status == 1 ? '#1c90ff' : '#2a8e2b';
			}
		}
	}
</script>

<style>
	.uni-container {
		padding: 15upx;
		background-color: #f8f8f8;
		font-size: 18upx;
	}

	.home-list-item {
		width: 100%;
		display: flex;
		padding: 15upx;
		box-sizing: border-box;
		border-bottom: solid 1upx #cccc;
	}

	.home-list-item-left {
		width: 230upx;
		height: 220upx;
		display: flex !important;
		align-items: center;
		justify-content: center;
	}

	.home-list-item-left>image {
		width: 230upx;
		max-height: 200upx;
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
