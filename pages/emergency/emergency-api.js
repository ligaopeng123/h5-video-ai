import HttpClient from '@/HttpClient.js';

const getUsers = function() {
	
}

const emergencyData = function(params, success) {
	HttpClient.get({
		url: '/video/eventworkorder/list',
		params: params,
		success
	})
}

const closeWorkorder = function(url, params, success) {
	HttpClient.post({
		url: url,
		params: params,
		success
	})
}


export default {
	emergencyData,
	closeWorkorder
}
	

