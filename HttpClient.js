
import store from './store'

/**
 * 获取真实的请求路径
 * @param {Object} url
 */
const getIPAddress = function(url = '') {
	const _urk = !url.startsWith('/') && !url.startsWith('http:') ? '/' + url : url;
	const IPAddress = localStorage.getItem('IPAddress') || '';
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


const getAuthorization = ()=> {
	return store.state.token
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
		url: getIPAddress(url),
		header: {
			'Authorization': getAuthorization()
		},
		data: params,
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
		url: getIPAddress(url),
		header: {
			'content-type': 'application/json', //自定义请求头信息
			// 'Authorization': getAuthorization() //自定义请求头信息
		},
		data: params,
		success: (res) => {
			success(res);
		}
	});
}

const HttpClient = {
	get,
	post
}

export default HttpClient;
