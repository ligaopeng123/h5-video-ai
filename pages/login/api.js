import HttpClient from '../../HttpClient.js';

const getUsers = function() {
	
}

const checkUser = function(userInfo, success) {
	console.log(666)
	HttpClient.post({
		url: '/oauth2/mobile/token',
		params: userInfo,
		success
	})
}

export default {
	checkUser
}
	

