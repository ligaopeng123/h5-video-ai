<template>
	<view class="content-background">
		<view class="uni-header-logo header-logo-img">
			<image class="uni-header-image" :src="logoImg"></image>
		</view>
		<view class="uni-header-logo busines-logo-name">
			{{businesLogoName}}
		</view>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="name" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">服务器地址：</text>
				<m-input class="m-input" type="text" clearable focus v-model="IP" placeholder="请输入服务器地址"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
	</view>
</template>

<script>
	import userApi from './api.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '@/components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				businesLogoName: '视觉AI安全预警云平台',
				logoImg: '/static/logo/Logo_changqing.png',
				hasProvider: false,
				name: '',
				IP: '',
				password: '',
				positionTop: 0,
			}
		},
		computed: mapState(['IPAddress', 'username']),
		methods: {
			...mapMutations(['login', 'setIPAddress', 'setLable']),
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					username: this.name,
					password: this.password
				};
				
				this.setIPAddress({IPAddress: this.IP});
				
				userApi.checkUser(data, ({statusCode, data, errMsg, errorMessage})=> {
					if(statusCode === 200) {
						this.setToken({
							token: 'Bearer '+ data.access_token, 
							username: this.name
						});
					} else {
						uni.showToast({
							icon: 'none',
							mask: true,
							title: errorMessage || data.errorMessage,
							duration: 2000
						});
					}
				});
			},
			setToken({token, username}) {
				this.login({token, username});
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				uni.reLaunch({
					url: '/pages/tabBar/event/event',
				});
				// TODO 放在默认页面里面处理 每次都需要更新
				// userApi.parsingclass(({data})=> {
				// 	const lableData = data.data;
				// 	this.setLable(lableData);
				// })
			},
		},
		onReady() {
			userApi.getLogo(({data})=> {
				const OEM = data._value.OEM;
				this.businesLogoName = OEM.getBusinesLogoName;
				const logoImg = OEM.getBusinesLoginLogoImgApp;
				if(logoImg && !logoImg.includes('assets/img')) {
					this.logoImg = logoImg;
				}
			})
			this.IP = this.IPAddress;
			this.name = this.username;
			this.initPosition();
		}
	}
</script>

<style>
	.content-background {
		background: url(@/static/logo/login.png) no-repeat fixed top;
		height: 100%;
		width: 100%;
		z-index: 9999;
	}
	
	.uni-header-logo {
	    padding: 30rpx;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
		text-align: center;
		margin-top: 0px;
	}
	
	.header-logo-img {
		padding-top: 150rpx !important;
	}
	
	.uni-header-image {
	    width: 100px;
	    height: 100px;
	}
	
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	
	/* 重写样式 */
	.uni-header-image {
		width: 50%;
		height: 60px;
	}
	.input-group {
		background-color: rgba(0,0,0,0);
		color: #e5e5e5;
	}
	.uni-input-input {
	    background: rgba(0,0,0,0);
	}
	.uni-input-input:-webkit-autofill {
	   -webkit-box-shadow: 0 0 0px 1000px rgba(0,0,0,0) inset !important;
	   -webkit-text-fill-color: #fff !important;
	}
	.uni-input-input:focus {
	  outline:none;
	  border: 1px solid red;
	}
	.busines-logo-name {
		font-size: 1.5em;
		color: #277C9C;
	}
	
	.input-row .title {
	    width: 90px;
	    padding-left: 12px;
	    font-size: 14px;
	}
	.input-placeholder {
		font-size: 14px;
	}
	.input-group::before {
	    height: 0px;
	}
	.input-group::after {
	    height: 0px;
	}
</style>
