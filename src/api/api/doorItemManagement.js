import request from '@/utils/request'

// 查询数据项
export function listTags(query) {
	return request({
		url: '/api/tag/list',
		method: 'get',
		params: query,
	})
}

// 查询数据项详细
export function getTags(id) {
	return request({
		url: '/api/tag/' + id,
		method: 'get',
	})
}

// 新增数据项配置
export function addTags(data) {
	return request({
		url: '/api/tag',
		method: 'post',
		data: data,
	})
}

// 修改数据项配置
export function updateTags(data) {
	return request({
		url: '/api/tag',
		method: 'put',
		data: data,
	})
}

// 删除数据项配置
export function delTags(id) {
	return request({
		url: '/api/tag/' + id,
		method: 'delete',
	})
}
