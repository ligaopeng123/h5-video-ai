import HttpClient from '../../../HttpClient.js';

const getUsers = function() {
	
}

const getHomeData = function(params, success) {
	console.log(666)
	HttpClient.post({
		url: '/video/es/list/ai_views/video',
		params: params,
		success
	})
}

export default {
	getHomeData
}
	

