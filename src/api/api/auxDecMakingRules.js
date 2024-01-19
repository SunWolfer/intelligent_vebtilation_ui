import request from '@/utils/request'

// 查询触发点类型以及对应点位
export function getTriggerType(query) {
	return request({
		url: '/api/decision/config/getTriggerType',
		method: 'get',
		params: query,
	})
}
//2、查询动作设备类型及其点位
export function getDetailType(query) {
	return request({
		url: '/api/decision/config/getDetailType',
		method: 'get',
		params: query,
	})
}
//3、新增辅助决策
export function addDecision(data) {
	return request({
		url: '/api/decision/config/addDecision',
		method: 'post',
		data: data,
	})
}
//4、修改
export function updateDecision(data) {
	return request({
		url: '/api/decision/config/updateDecision',
		method: 'post',
		data: data,
	})
}
// 决策配置删除
export function removeConfigDecision(data) {
	return request({
		url: '/api/decision/config/remove',
		method: 'post',
		data: data,
	})
}

//决策规则查询
export function decListInfo(query) {
	return request({
		url: '/api/decision/config/list',
		method: 'get',
		params: query,
	})
}
//辅助决策规则查询
export function assListInfo(query) {
	return request({
		url: '/api/decision/advise/list',
		method: 'get',
		params: query,
	})
}
// 开始调控
export function beginRegulation(data) {
	return request({
		url: '/api/decision/advise/beginRegulation',
		method: 'post',
		data: data,
	})
}
// 取消调控
export function cancelRegulation(data) {
	return request({
		url: '/api/decision/advise/cancelRegulation',
		method: 'post',
		data: data,
	})
}
//自学习
export function autoLearnDecision(data) {
	return request({
		url: '/api/decision/advise/autoLearnDecision',
		method: 'post',
		data: data,
	})
}
//辅助决策删除
export function removeAdviseDecision(data) {
	return request({
		url: '/api/decision/advise/remove',
		method: 'post',
		data: data,
	})
}
