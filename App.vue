<script>
	import ws from '@/websocket/ws.js'
	import {
		SockJS
	} from '@/websocket/sockjs.min.js'
	import HttpClient from '@/HttpClient.js'
	var _this;
	export default {
		onLoad: function() {
			_this = this;
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		mounted() {
			console.log(_this)
			this.connect();
			this.subscribe();
		},
		methods: {
			/**
			 * 创建连接
			 */
			connect() {
				console.log(HttpClient.getIPAddress())
				var socket = new SockJS(HttpClient.getIPAddress() + 'api/websocket');
				ws.connect(socket);
			},
			/**
			 * 断开连接
			 */
			disconnect(aa) {
				ws.disconnect()
			},
			/**
			 * 订阅
			 */
			subscribe() {
				ws.subscribe("/user/super/queue/subscribe", this.message)
			},
			/**
			 * 取消订阅
			 */
			unsubscribe() {
				ws.unsubscribe("/user/super/queue/subscribe")
			},
			/**
			 * 接收消息
			 * @param {Object} data
			 */
			message(data) {
				uni.$emit('websocket', {
					data: JSON.parse(data.body).data
				});
				// this.dataList.push(data.body)
			},
			/**
			 * 向服务端发送消息
			 */
			send() {
				ws.send('/app/websocktmsgs', this.msg)
			}/* ,
			android_addLocalNotification() {
				// uni.runtime.setBadgeNumber()
				const jyJPush = uni.requireNativePlugin('JY-JPush');
				jyJPush.android_addLocalNotification({
					builderId: "1", // builderId 编号，自己定义，如果不管，可以全部传递1
					content: "推送内容",
					title: "推送标题",
					notificationId: "1", // 消息ID，需要为数字，后续可以通过这个取消,
					year: "2019", // 预约发送的时间，若小于当前时间，则立即发送；若大于当前时间，则预约时间，时间到了就发送；但是APP需要在前台
					month: "12",
					day: "02",
					hour: "21",
					minute: "20",
					second: "21"
				}, result => {
					uni.showToast({
						icon: 'none',
						title: JSON.stringify(result)
					})
				});

				jyJPush.addJYJPushReceiveOpenNotificationListener(result=> {
				//  监听成功后，若点击推送消息，会触发result；数据格式保持极光返回的安卓/iOS数据一致
				uni.showToast({
				icon:'none',
				title: JSON.stringify(result)
				})
				});
			}, */
		}
	}
</script>

<style>
	@import '@/common/qiun.css';
</style>
