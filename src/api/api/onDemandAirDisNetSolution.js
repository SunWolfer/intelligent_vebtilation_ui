import request from '@/utils/request'

// 查询是否允许设置固定风量
export function setFixedOk(query) {
	return request({
		url: '/api/calculate/ventilationroadway/setFixedOk',
		method: 'get',
		params: query,
	})
}
//按需分风解算模拟
export function fixedCalculateSimulate(data) {
	return request({
		url: '/api/calculate/ventilationroadway/fixedCalculateSimulate',
		method: 'post',
		data: data,
	})
}
