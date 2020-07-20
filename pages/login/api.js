import HttpClient from '../../HttpClient.js';

const getUsers = function() {
	
}

const checkUser = function(userInfo, success) {
	HttpClient.post({
		url: '/oauth2/mobile/token',
		params: userInfo,
		success
	})
}

const parsingclass = function(success) {
	HttpClient.get({
		url: '/video/parsingclass/listAll',
		success
	})
}

export default {
	checkUser,
	parsingclass
}
	

