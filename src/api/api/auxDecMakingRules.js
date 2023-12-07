import request from '@/utils/request'

// 查询触发点类型以及对应点位
export function getTriggerType(query) {
	return request({
		url: '/api/decision/getTriggerType',
		method: 'get',
		params: query,
	})
}
//2、查询动作设备类型及其点位
export function getDetailType(query) {
	return request({
		url: '/api/decision/getDetailType',
		method: 'get',
		params: query,
	})
}
//3、新增辅助决策
export function addDecision(data) {
	return request({
		url: '/api/decision/addDecision',
		method: 'post',
		data: data,
	})
}
//4、修改
export function updateDecision(data) {
	return request({
		url: '/api/decision/updateDecision',
		method: 'post',
		data: data,
	})
}
//查询
export function decListInfo(query) {
	return request({
		url: '/api/decision/list',
		method: 'get',
		params: query,
	})
}
// 开始调控
export function beginRegulation(data) {
	return request({
		url: '/api/decision/beginRegulation',
		method: 'post',
		data: data,
	})
}
// 取消调控
export function cancelRegulation(data) {
	return request({
		url: '/api/decision/cancelRegulation',
		method: 'post',
		data: data,
	})
}
