import HttpClient from '../../HttpClient.js';

const getUsers = function() {
	
}

export const CONFIG_URL = '/admin/config/info';

const checkUser = function(userInfo, success) {
	HttpClient.post({
		url: '/oauth2/mobile/token',
		params: userInfo,
		success
	})
}

const getLogo = function(success) {
	HttpClient.get({
		url: CONFIG_URL,
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
	parsingclass,
	getLogo
}
	

