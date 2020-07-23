<template>
	<view class="content">
		<view class="inputArea logo" style="text-align: center;">
			<image class="logo-img" :src="logoImg"></image>
		</view>
		<view class="inputArea logo-name" style="text-align: center;">
			{{businesLogoName}}
		</view>
		<view class="inputArea">
			<input v-model="name" placeholder="请输入用户名" type="text" maxlength="11" class="inputClass" />
		</view>
		<view class="inputArea">
			<input v-model="password" placeholder="请输入登录密码" type="password" class="inputClass" />
		</view>
		<view class="inputArea">
			<input v-model="IP" placeholder="请输入服务器地址" type="text" maxlength="11" class="inputClass" />
		</view>
		<view style="padding: 0 10%;text-align: center;">
			<text style="color: red;">{{message}}</text>
		</view>
		<view class="inputArea">
			<view class="login-button" @click="goLogin">登 录</view>
		</view>
		<!--
		<view class="inputArea">
			<text style="float:right;color:blue;" @click="openRegisterPage">>>注册>></text>
		</view>
		-->
	</view>
</template>

<script>
	var _self;
	import userApi from './api.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	export default {
		data() {
			return {
				businesLogoName: '视觉AI安全预警云平台',
				name: '',
				password: '',
				IP: '',
				message: '',
				logoImg: '/static/logo/Logo_changqing.png'
			}
		},
		computed: mapState(['IPAddress', 'username']),
		onLoad() {
			_self=this;
		},
		methods: {
			...mapMutations(['login', 'setIPAddress', 'setLable']),
			openRegisterPage() {
				uni.navigateTo({
					url: '../login/register',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (_self.password.length < 6) {
					_self.message = "用户名不能为空";
					return false;
				}
				
				if (!_self.name) {
					_self.message = "用户名不能为空";
					return false;
				}
				
				uni.showLoading({
					title: '登录中...',
					mask: false
				});
				
				const data = {
					username: this.name,
					password: this.password
				};
				
				this.setIPAddress({IPAddress: this.IP});
				
				userApi.checkUser(data, ({statusCode, data, errMsg, errorMessage})=> {
					uni.hideLoading();
					if(statusCode === 200) {
						this.setToken({
							token: 'Bearer '+ data.access_token, 
							username: this.name
						});
						_self.message = '';
					} else {
						_self.message = errorMessage || data.errorMessage
					}
				}, ()=> {
					uni.hideLoading();
					this.message = "网络连接失败,请检查服务器地址";
				});
			},
			setToken({token, username}) {
				this.login({token, username});
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				uni.reLaunch({
					url: '/pages/event/event',
				});
			}
		},
		onReady() {
			userApi.getLogo(({data})=> {
				const OEM = data._value.OEM;
				this.businesLogoName = OEM.getBusinesLogoName;
				const logoImg = OEM.getBusinesLoginLogoImgApp;
				if(logoImg && !logoImg.includes('assets/img')) {
					_self.logoImg = logoImg;
				}
			})
			this.IP = this.IPAddress;
			this.name = this.username;
		}
	}
</script>

<style>
	.content {
		background: url(@/static/logo/login.png) no-repeat fixed top;
		height: 100vmax;
		width: 100%;
	}
	.logo {
		padding: 100upx !important;
	}
	.logo-name {
		color: #C8C7CC;
	}
	.inputArea {
		padding: 20upx 10%;
	}
	.inputClass {
		border: 2px solid #ccc;
		border-radius: 44upx;
		outline: 0;
		width: 90%;
		padding: 16upx 30upx;
		background-color: #FFFFFF;
	}
	.logo-img {
		width: 60%;
		height: 150upx;
	}
	.login-button {
		background: #2fc25b;
		color: #FFFFFF;
		border-radius: 44upx;
		font-size: 36upx;
		text-align: center;
		padding: 20upx;
	}
</style>
