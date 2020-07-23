import HttpClient from '@/HttpClient.js';



const getTotal = function(success) {
	HttpClient.get({
		url: 'video/es/list/ai_views/video',
		params: {
			isDay: true
		},
		success
	})
}

const getCharts = function(params, success) {
	HttpClient.get({
		url: 'video/es/stat/ai_views/video',
		params: params,
		success
	})
}

export default {
	getTotal,
	getCharts
}
	

