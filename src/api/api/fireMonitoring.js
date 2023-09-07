import request from '@/utils/request'

// 束管监测区域下拉
export function tubeDict() {
	return request({
		url: '/api/fire/tubeDict',
		method: 'get',
	})
}
//束管监测实时统计项查询
export function tubeRealTime(code) {
	return request({
		url: '/api/fire/tubeRealTime/' + code,
		method: 'get',
	})
}
//束管监测趋势图统计项查询
export function tubeTrend(query) {
	return request({
		url: '/api/fire/tubeTrend',
		method: 'get',
		params: query,
	})
}
//光纤测温通道下拉查询
export function temperatureDict() {
	return request({
		url: '/api/fire/temperatureDict',
		method: 'get',
	})
}
//光纤测温实时监测查询
export function temperatureRealTime(channel) {
	return request({
		url: '/api/fire/temperatureRealTime/' + channel,
		method: 'get',
	})
}
//光纤测温趋势监测查询
export function temperatureTrend(query) {
	return request({
		url: '/api/fire/temperatureTrend',
		method: 'get',
		params: query,
	})
}
