import request from '@/utils/request'

// 查询参数列表
export function listFanItem(query) {
	return request({
		url: '/api/fan/property/list',
		method: 'get',
		params: query,
	})
}

// 查询数据项详细
export function getFanItem(id) {
	return request({
		url: '/api/fan/property/' + id,
		method: 'get',
	})
}

// 新增数据项配置
export function addFanItem(data) {
	return request({
		url: '/api/fan/property',
		method: 'post',
		data: data,
	})
}

// 修改数据项配置
export function updateFanItem(data) {
	return request({
		url: '/api/fan/property',
		method: 'put',
		data: data,
	})
}

// 删除数据项配置
export function delFanItem(id) {
	return request({
		url: '/api/fan/property/' + id,
		method: 'delete',
	})
}
