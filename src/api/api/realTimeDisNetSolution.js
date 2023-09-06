import request from '@/utils/request'

// 查询解算列表
export function listRealTimeDisNetSolution(query) {
	return request({
		url: '/api/calculate/ventilationroadway/realTimeList',
		method: 'get',
		params: query,
	})
}
//设置实时解算频率
export function setCalculateRateTime(data) {
	return request({
		url: '/api/calculate/ventilationroadway/setCalculateRateTime',
		method: 'post',
		data: data,
	})
}
