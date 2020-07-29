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
	var data = {
				serve: {
					host: '192.168.1.79',
					port: '8083',
					path: '/mqtt',
				},
				onTopic: 'video/app/topic',
				Qos: 0,
				sendMassage: 'Hello EMQ-X！',
				time:0,
				receiveMessage: '',
				client: null,
				//MQTT连接的配置
				options: {
					wsOptions: {},
					protocolVersion: 4, //MQTT连接协议版本
					clientId: 'skfsk',
					keepalive: 60,
					clean: false,
					username: '',
					password: '',
					reconnectPeriod: 1000, //1000毫秒，两次重新连接之间的间隔
					connectTimeout: 30 * 1000, //1000毫秒，两次重新连接之间的间隔
					resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
				},
			};
	export default {
		computed: {
			...mapGetters(['lable']),
		},
		onLaunch: function() {
			_this = this;
			_this.data = Object.assign(_this, data);
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
			connect: function() {
				var hosts = '',
					// #ifdef H5
					hosts = 'ws://' + _this.serve.host + ':' + _this.serve.port + _this.serve.path
				//#endif
				// #ifdef MP-WEIXIN 
				hosts = 'wxs://' + _this.serve.host + _this.serve.path
				//#endif
				// #ifdef APP-PLUS
				hosts = 'wx://' + _this.serve.host + ':' + _this.serve.port + _this.serve.path
				//#endif
				console.log(hosts)
				if (_this.client == null || _this.client.connented == false) {
					uni.showLoading({
						title: '连接中···'
					})
					_this.client = mqtt.connect(
						hosts,
						_this.options
					);
			
					_this.client.on('connect', () => {
						uni.hideLoading();
						_this.subscribe();
						_this.showToast('连接成功', 1000, 'success')
					});
					_this.client.on('message', (topic, message) => {
						let data = JSON.parse(message);
						android_addLocalNotification(data.data);
						uni.$emit('websocket', { data: data.data });
					});
				}
			
				_this.client.on('reconnect', error => {
					uni.hideLoading();
					_this.showToast('正在重连···', 1000)
			
				});
				_this.client.on('error', error => {
					uni.hideLoading();
					_this.showToast('连接失败!', 1000)
				});
			
			},
			subscribe: function() {
				// 判断是否已成功连接
				if (!_this.client || !_this.client.connected) {
					_this.showToast('客户端未连接', 1000)
					return;
				}
				_this.client.subscribe(_this.onTopic, {
					qos: _this.Qos
				}, error => {
					if (!error) {
						_this.showToast('订阅成功', 1000, 'success')
					}
				});
			
				/* //订阅多个主题
			_this.client.subscribe(['one', 'two', 'three'], { qos: 1 }, err => {
				console.log(err || '订阅成功');
				_this.show(err || '订阅成功');
			 });
			
				    // 订阅不同 qos 的不同主题
				    _this.client.subscribe(
				        [
				            { hello: 1 },
				            { 'one/two/three': 2 },
				            { '#': 0 }
				        ],
				        (err) => {
				          _this.show();console.log(err || '订阅成功')
				        },
				    )
					
					
			}); */
			},
			publish: function() {
				// 判断是否已成功连接
				if (!_this.client || !_this.client.connected) {
					_this.showToast('客户端未连接', 1000)
					return;
				}
				if (_this.sendMassage != '') {
					var send=''
					send=_this.sendMassage+(_this.time++)
					_this.client.publish(_this.onTopic,send, error => {
						console.log(error || '消息发布成功');
						_this.showToast('消息发布成功', 1000, 'success')
					});
				} else {
					_this.showToast('发布消息为空', 1000)
				}
			
			},
			unsubscribe: function() {
				_this.client.unsubscribe(
					// topic, topic Array, topic Array-Onject
					// ['one', 'two', 'three'],
					_this.onTopic,
					err => {
						console.log(err || '取消订阅成功');
						_this.showToast('取消订阅成功', 1000, 'success')
					}
				);
			},
			unconnect: function() {
				_this.client.end();
				_this.client = null
				_this.showToast('成功断开连接', 1000, 'success')
				console.log('断开连接');
			},
			showToast: function(title, time, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon,
				});
				setTimeout(function() {
					uni.hideToast();
				}, time);
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
