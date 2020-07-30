/**
 * 获取真实的请求路径
 * @param {Object} url
 */
const getIPAddress = function(url = '') {
	const IPAddress = uni.getStorageSync('IPAddress')
	const _urk = !url.startsWith('/') && !url.startsWith('http:') ? '/' + url : url;
	let realUrl;
	if (IPAddress.endsWith('/') && url.startsWith('/')) {
		realUrl = IPAddress + url.replace('/', '');
	} else if (!IPAddress.endsWith('/') && !url.startsWith('/')) {
		realUrl = IPAddress + '/' + url;
	} else {
		realUrl = IPAddress + url;
	}
	if (!realUrl.startsWith('http')) {
		realUrl.startsWith('/') ? realUrl = 'http:/' + realUrl : 'http://' + realUrl;
	}
	return realUrl;
}


const getImg = function(imgUrl = '') {
	const ip = getIPAddress();
	let url = imgUrl || '';
	if (ip.endsWith('/') && url.startsWith('/')) {
		url = ip + url.replace('/', '');
	} else if (!ip.endsWith('/') && !url.startsWith('/')) {
		url = ip + '/' + url;
	} else {
		url = ip + url;
	}

	return url;
}

const getWsIpAddress = function() {
	let IPAddress = uni.getStorageSync('IPAddress');
		IPAddress =	IPAddress.replace('https://', '');
		IPAddress =	IPAddress.replace('http://', '');
	console.log(IPAddress);
	return 'ws://' + IPAddress + '/api/appwebsocket';
}

const getAuthorization = () => {
	return uni.getStorageSync('token')
}


/**
 * get方法
 */
const get = function({
	url,
	params,
	success,
	fail
}) {
	uni.request({
		method: 'GET',
		timeout: 10000,
		// dataType: 'json',
		url: getIPAddress(url),
		header: {
			// 'content-type': 'application/json', //自定义请求头信息
			'Authorization': getAuthorization()
		},
		data: params || {},
		success: (res) => {
			uni.setStorageSync('connection', true);
			success(res);
		},
		fail: () => {
			uni.setStorageSync('connection', false);
			uni.reLaunch({
				url: '/pages/user/login'
			});
			fail && fail()
			setTimeout(()=> {
				uni.showToast({
					icon: 'none',
					title: '网络连接失败,请检查服务器地址',
					duration: 2000
				});
			})
		}
	});
}

/**
 * post 方法
 */
const post = function({
	url,
	params,
	success,
	Authorization,
	fail,
}) {
	uni.request({
		method: 'POST',
		// dataType: 'json',
		timeout: 15000,
		url: getIPAddress(url),
		header: {
			// 'content-type': 'application/json', //自定义请求头信息
			'Authorization': Authorization === null ? null : getAuthorization() //自定义请求头信息
		},
		data: params,
		success: (res) => {
			success(res);
		},
		fail: ()=> {
			uni.showToast({
				icon: 'none',
				title: '网络连接失败,请检查服务器地址'
			});
			fail ? fail() : '';
		}
	});
}

const HttpClient = {
	get,
	post,
	getImg,
	getIPAddress,
	getWsIpAddress
}

export default HttpClient;
