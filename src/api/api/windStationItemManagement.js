import request from '@/utils/request'

// 查询参数列表
export function listWindStation(query) {
	return request({
		url: '/api/anemometry/full/board/list',
		method: 'get',
		params: query,
	})
}

// 查询数据项详细
export function getWindStation(id) {
	return request({
		url: '/api/anemometry/full/board/' + id,
		method: 'get',
	})
}

// 新增数据项配置
export function addWindStation(data) {
	return request({
		url: '/api/anemometry/full/board',
		method: 'post',
		data: data,
	})
}

// 修改数据项配置
export function updateWindStation(data) {
	return request({
		url: '/api/anemometry/full/board',
		method: 'put',
		data: data,
	})
}

// 删除数据项配置
export function delWindStation(id) {
	return request({
		url: '/api/anemometry/full/board/' + id,
		method: 'delete',
	})
}
