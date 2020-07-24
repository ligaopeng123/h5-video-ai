<script>
		import ws from '@/websocket/ws.js'
		import {SockJS} from '@/websocket/sockjs.min.js'
		import HttpClient from '@/HttpClient.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			/**
			 * 创建连接
			 */
			connect() {
				var socket = new SockJS(HttpClient.getIPAddress() + 'api/websocket');
				ws.connect(socket)
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
			}
		}
	}
</script>

<style>
	@import '@/common/qiun.css';
</style>
