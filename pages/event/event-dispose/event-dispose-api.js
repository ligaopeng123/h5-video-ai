import HttpClient from '../../../HttpClient.js';

const getUsers = function() {
	
}

const postDisposeText = function(params, success) {
	HttpClient.post({
		url: '/video/eventworkorder/create',
		params: params,
		success
	})
}

const postStatus = function(url, params, success) {
	HttpClient.post({
		url: url,
		params: params,
		success
	})
}

export default {
	postDisposeText,
	postStatus
}
	

