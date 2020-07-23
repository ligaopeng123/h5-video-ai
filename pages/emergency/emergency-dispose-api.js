import HttpClient from '@/HttpClient.js';

const getUsers = function() {
	
}

const getDetailsData = function(url,params, success) {
	HttpClient.get({
		url: url,
		params: params,
		success
	})
}

const createWorkorderds = function( params, success) {
	HttpClient.post({
		url: '/video/eventworkorderds/create',
		params: params,
		success
	})
}

const getEventworkorderds = function(url,params, success) {
	HttpClient.get({
		url: url,
		params: params,
		success
	})
}

export default {
	getDetailsData,
	getEventworkorderds,
	createWorkorderds
}
	

