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

const getAuthorization = () => {
	return uni.getStorageSync('token')
}


/**
 * get方法
 */
const get = function({
	url,
	params,
	success
}) {
	uni.request({
		method: 'GET',
		// dataType: 'json',
		url: getIPAddress(url),
		header: {
			// 'content-type': 'application/json', //自定义请求头信息
			'Authorization': getAuthorization()
		},
		data: params || {},
		success: (res) => {
			success(res);
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
	Authorization
}) {
	uni.request({
		method: 'POST',
		// dataType: 'json',
		url: getIPAddress(url),
		header: {
			// 'content-type': 'application/json', //自定义请求头信息
			'Authorization': Authorization === null ? null : getAuthorization() //自定义请求头信息
		},
		data: params,
		success: (res) => {
			success(res);
		}
	});
}

const HttpClient = {
	get,
	post,
	getImg,
	getIPAddress
}

export default HttpClient;
