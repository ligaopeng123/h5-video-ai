import HttpClient from '@/HttpClient.js';

const getUsers = function() {
	
}

const getHomeData = function(params, success) {
	HttpClient.get({
		url: '/video/es/list/ai_views/video',
		params: params,
		success
	})
}

const getPhoneData = function(params, success) {
	HttpClient.get({
		url: '/video/videoconfig/list',
		params: params,
		success
	})
}


export default {
	getHomeData,
	getPhoneData
}
	

