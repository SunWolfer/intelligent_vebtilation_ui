import request from '@/utils/request'

// 查询风门列表
export function listThrottle(query) {
	return request({
		url: '/api/door/info/list',
		method: 'get',
		params: query,
	})
}

// 查询风门详细
export function getThrottle(id) {
	return request({
		url: '/api/door/info/' + id,
		method: 'get',
	})
}

// 新增风门配置
export function addThrottle(data) {
	return request({
		url: '/api/door/info',
		method: 'post',
		data: data,
	})
}

// 修改风门配置
export function updateThrottle(data) {
	return request({
		url: '/api/door/info',
		method: 'put',
		data: data,
	})
}

// 删除风门配置
export function delThrottle(configId) {
	return request({
		url: '/api/door/info/' + configId,
		method: 'delete',
	})
}
//查询标签
export function listTags(query) {
	return request({
		url: '/api/tag/listAll',
		method: 'get',
		params: query,
	})
}
//标签保存
export function addDoorTags(data) {
	return request({
		url: '/api/devicetag/doorTagSet',
		method: 'post',
		data: data,
	})
}
