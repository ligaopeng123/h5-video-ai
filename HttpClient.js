let [IPAddress, token] = [uni.getStorageSync('IPAddress'), uni.getStorageSync('token')];

/**
 * 获取真实的请求路径
 * @param {Object} url
 */
const getIPAddress = function(url = '') {
	const _urk = !url.startsWith('/') && !url.startsWith('http:') ? '/' + url : url;
	let realUrl;
	if (IPAddress.endsWith('/') && url.startsWith('/')) {
		realUrl = IPAddress + url.replace('/', '');
	} else if (!IPAddress.endsWith('/') && !url.startsWith('/')) {
		realUrl = IPAddress + '/' + url;
	} else {
		realUrl = IPAddress + url;
	}
	return realUrl;
}


const getImg = function(imgUrl = '') {
	const ip = getIPAddress();
	let url;
	if (imgUrl != '') {
		if (ip.endsWith('/') && imgUrl.startsWith('/')) {
			url = ip + imgUrl.replace('/', '');
		} else if (!ip.endsWith('/') && !imgUrl.startsWith('/')) {
			url = ip + '/' + imgUrl;
		} else {
			url = ip + imgUrl;
		}
	} else {
		return;
	}

	return url;
}

const getAuthorization = () => {
	return token
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
	success
}) {
	uni.request({
		method: 'POST',
		// dataType: 'json',
		url: getIPAddress(url),
		header: {
			// 'content-type': 'application/json', //自定义请求头信息
			'Authorization': getAuthorization() //自定义请求头信息
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
	getImg
}

export default HttpClient;
