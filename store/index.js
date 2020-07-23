import Vue from 'vue'
import Vuex from 'vuex'
import VideoRecognitionService from './lable.js'

Vue.use(Vuex);


function setItem(key, value) {
	uni.setStorageSync(key, value);
}

export function getItem(key) {
	return uni.getStorageSync(key)
}

const store = new Vuex.Store({
	state: {
		token: getItem('token') || null,
		IPAddress: getItem('IPAddress') || '',
		username: getItem('username') || '',
		loginProvider: "",
		lable: '',
		openid: null,
		testvuex: false,
		colorIndex: 0,
		colorList: ['#FF0000', '#00FF00', '#0000FF'],
		homeDetailData: {},
		disposeData: {}
	},
	mutations: {
		login(state, provider) {
			state.token = provider.token;
			state.username = provider.username;
			setItem('token', provider.token);
			setItem('username', provider.username);
		},
		setIPAddress(state, provider) {
			state.IPAddress = provider.IPAddress;
			setItem('IPAddress', provider.IPAddress);
		},
		logout(state) {
			setItem('token', null);
			state.token = null;
		},
		setLable(state, data) {
			state.lable = new VideoRecognitionService(data);
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setTestTrue(state) {
			state.testvuex = true
		},
		setTestFalse(state) {
			state.testvuex = false
		},
		setColorIndex(state, index) {
			state.colorIndex = index
		},
		setHomeDetailData(state, index) {
			state.homeDetailData = index
		},
		setDisposeData(state, index) {
			state.disposeData = index
		}
	},
	getters: {
		currentColor(state) {
			return state.colorList[state.colorIndex]
		},
		lable(state) {
			return state.lable;
		}
	},
	actions: {
		// lazy loading openid
		getUserOpenId: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function() { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})


export default store
