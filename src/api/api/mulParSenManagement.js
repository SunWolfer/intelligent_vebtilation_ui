import request from '@/utils/request'
// 查询多参列表
export function listDuoshen(query) {
	return request({
		url: '/api/multiparameter/list',
		method: 'get',
		params: query,
	})
}

// 根据参数键名查询参数值
export function getDuoshenKey(configKey) {
	return request({
		url: '/api/multiparameter/' + configKey,
		method: 'get',
	})
}

// 新增参数配置
export function addDuoshen(data) {
	return request({
		url: '/api/multiparameter',
		method: 'post',
		data: data,
	})
}

// 修改参数配置
export function updateDuoshen(data) {
	return request({
		url: '/api/multiparameter',
		method: 'put',
		data: data,
	})
}

// 删除参数配置
export function delDuoshen(id) {
	return request({
		url: '/api/multiparameter/' + id,
		method: 'delete',
	})
}
// 关联风速传感器
export function relevancy(data) {
	return request({
		url: '/api/multiparameter/relevancy',
		method: 'post',
		data: data,
	})
}
// 查询关联表
export function relevancyList(query) {
	return request({
		url: '/api/multiparameter/relevancyList',
		method: 'get',
		params: query,
	})
}
