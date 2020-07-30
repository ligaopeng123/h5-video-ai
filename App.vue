<script>
	import ws from '@/websocket/ws.js'
	import HttpClient from '@/HttpClient.js'
	import dateUtil from '@/utils/date.util.js';
	import mqtt from '@/utils/mqtt.js'
	import {
		mapGetters,
		mapState
	} from 'vuex'
	var _this;
	let Message  = true;
	export default {
		computed: {
			...mapGetters(['lable']),
			...mapState(['token', 'IPAddress', 'homeData'])
		},
		onLaunch: function() {
			_this = this;
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		mounted() {
			uni.$on('business', res => {
				let str = res.data;
				if (str === 'login') {
					_this.connect();
				}

				if (str === 'logout') {
					_this.unconnect();
				}
			});
		},
		methods: {
			connect: function() {
				uni.connectSocket({
					url: HttpClient.getWsIpAddress(),
					header: {
						'content-type': 'application/json'
					},
					method: 'GET'
				});

				uni.onSocketOpen(function(res) {
				uni.showToast({
				    title: '连接成功',
				    duration: 1000
				});
					console.log('WebSocket连接已打开！');
					_this.subscribe();
				});
			},
			subscribe: function() {
				
				uni.onSocketMessage(function(res) {
					if (Message) {
						uni.showToast({
						    title: '订阅成功',
						    duration: 1000
						});
					}
					uni.$emit('websocket', {
						data: JSON.parse(res.data).data
					});
					Message = false;
				});
			},
			publish: function() {

			},
			unsubscribe: function() {

			},
			onSocketError: function() {
				uni.onSocketError(function(res) {
					uni.showToast({
					    title: '连接失败',
					    duration: 1000
					});
					console.log('WebSocket连接打开失败，请检查！');
				});
			},
			android_addLocalNotification(data) {
				// uni.runtime.setBadgeNumber()
				const date = new Date(data.time_norm);
				const jyJPush = uni.requireNativePlugin('JY-JPush');
				jyJPush.android_addLocalNotification({
					builderId: "1", // builderId 编号，自己定义，如果不管，可以全部传递1
					content: __this.getLaleText(item.alarmClass), // 标签
					title: data.device_name, // 摄像头名称
					notificationId: "1", // 消息ID，需要为数字，后续可以通过这个取消,
					year: dateUtil.getFullYear(date), // 预约发送的时间，若小于当前时间，则立即发送；若大于当前时间，则预约时间，时间到了就发送；但是APP需要在前台
					month: dateUtil.getMonth(date),
					day: dateUtil.getDay(date),
					hour: dateUtil.dateFormatH(date),
					minute: dateUtil.getMinutes(date),
					second: dateUtil.getSeconds(date)
				}, result => {});

			},
			addJYJPushReceiveOpenNotificationListener() {
				jyJPush.addJYJPushReceiveOpenNotificationListener(result => {
					//  监听成功后，若点击推送消息，会触发result；数据格式保持极光返回的安卓/iOS数据一致
					uni.navigateTo({
						url: 'pages/event/event-detail/event-detail'
					});
				});
			},
			getLaleText(alarmClass) { // 将label转换成文字
				return alarmClass.map(item => {
					return _this.lable.getValueByLable[item];
				}).join(',')
			}
		}
	}
</script>

<style>
	@import '@/common/qiun.css';
</style>
