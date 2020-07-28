<script>
	import ws from '@/websocket/ws.js'
	import {
		SockJS
	} from '@/websocket/sockjs.min.js'
	import HttpClient from '@/HttpClient.js'
	import dateUtil from '@/utils/date.util.js';
	import mqtt from '@/utils/mqtt.min.js'
	import {
		mapGetters,
		mapState
	} from 'vuex'
	var _this;
	export default {
		computed: {
			...mapGetters(['lable']),
		},
		onLaunch: function() {
			_this = this;
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		mounted() {
		/* 	var socketTask = uni.connectSocket({
				url: 'ws://192.168.1.79:8083/mqtt', //仅为示例，并非真实接口地址。
				complete: (res) => {
					console.log(res);
				}
			});
			// _this.addJYJPushReceiveOpenNotificationListener();
			uni.onSocketMessage(function(res) {
				console.log('收到服务器内容：' + res);
			}) */
			_this.connect();
			// _this.subscribe();
		},
		methods: {
			connect() {
				// #ifdef H5
				var client = mqtt.connect('ws://192.168.1.79:8083/mqtt')
				// #endif
				// #ifdef MP-WEIXIN||APP-PLUS
				var client = mqtt.connect('ws://192.168.1.79:8083/mqtt')
				// #endif
				client.on('connect', function() {
					// _this.logs.push('on connect')
					client.subscribe('presence', function(err) {
						if (!err) {
							client.publish('presence', 'hello mqtt')
						}
					})
				}).on('reconnect', function() {
					// _this.logs.push('on reconnect')
				}).on('error', function() {
					// _this.logs.push('on error')
				}).on('end', function() {
					// _this.logs.push('on end')
				}).on('message', function(topic, message) {
					console.log(message);
					console.log(topic)
					uni.$emit('websocket', {
						data: {
							title: '111111',
							alarmClass: ['label01'],
							time_norm: 1595930310489,
							device_name: '一'
						}
					});
					_this.android_addLocalNotification({
							title: '111111',
							alarmClass: ['label01'],
							time_norm: 1595930310489,
							device_name: '一'
						});
				})
			},
			/**
			 * 创建连接
			 */
			/* connect() {
				console.log(HttpClient.getIPAddress())
				var socket = new SockJS(HttpClient.getIPAddress() + 'api/websocket');
				ws.connect(socket);
			}, */
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
				ws.subscribe("/user/super/queue/subscribe", _this.message);
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
				let item = JSON.parse(data.body).data;
				// _this.android_addLocalNotification(item);
				uni.$emit('websocket', {
					data: item
				});
				// this.dataList.push(data.body)
			},
			/**
			 * 向服务端发送消息
			 */
			send() {
				ws.send('/app/websocktmsgs', _this.msg)
			},
			android_addLocalNotification(data) {
				// uni.runtime.setBadgeNumber()
				const date = new Date(data.time_norm);
				const jyJPush = uni.requireNativePlugin('JY-JPush');
				jyJPush.android_addLocalNotification({
					builderId: "1", // builderId 编号，自己定义，如果不管，可以全部传递1
					content: _this.getLaleText(item.alarmClass), // 标签
					title: data.device_name, // 摄像头名称
					notificationId: "1", // 消息ID，需要为数字，后续可以通过这个取消,
					year: dateUtil.getFullYear(date), // 预约发送的时间，若小于当前时间，则立即发送；若大于当前时间，则预约时间，时间到了就发送；但是APP需要在前台
					month: dateUtil.getMonth(date),
					day: dateUtil.getDay(date),
					hour: dateUtil.dateFormatH(date),
					minute: dateUtil.getMinutes(date),
					second: dateUtil.getSeconds(date)
				}, result => {
				});
				
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
