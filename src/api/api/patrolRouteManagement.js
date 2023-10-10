import request from '@/utils/request'

// 巡检路线查询
export function pathList(query) {
	return request({
		url: '/api/manage/path/pathList',
		method: 'get',
		params: query,
	})
}
// 查询路线
export function getPath(id) {
	return request({
		url: '/api/manage/path/detail/' + id,
		method: 'get',
	})
}
// 新增路线查询
export function addPath(data) {
	return request({
		url: '/api/manage/path',
		method: 'post',
		data: data,
	})
}

// 修改路线查询
export function updatePath(data) {
	return request({
		url: '/api/manage/path',
		method: 'put',
		data: data,
	})
}

// 删除路线查询
export function delPath(id) {
	return request({
		url: '/api/manage/path/' + id,
		method: 'delete',
	})
}

// 查询设备类型
export function getDeviceType(query) {
	return request({
		url: '/api/manage/path/getDeviceType',
		method: 'get',
	})
}
//根据设备类型查询设备
export function getDeviceByType(query) {
	return request({
		url: '/api/manage/path/getDeviceByType',
		method: 'get',
		params: query,
	})
}
