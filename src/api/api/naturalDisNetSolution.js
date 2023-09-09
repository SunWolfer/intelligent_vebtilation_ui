import request from '@/utils/request'

// 查询巷道信息列表
export function getRoadInfo(query) {
	return request({
		url: '/api/calculate/ventilationroadway/getRoadInfo',
		method: 'get',
		params: query,
	})
}
//自然分风解算模拟
export function naturedCalculateSimulate(data) {
	return request({
		url: '/api/calculate/ventilationroadway/naturedCalculateSimulate',
		method: 'post',
		data: data,
	})
}
//自然分风解算模拟通风网络图
export function reloadDrawing(data) {
	return request({
		url: '/api/calculate/ventilationroadway/network/drawing',
		method: 'post',
		data: data,
	})
}
