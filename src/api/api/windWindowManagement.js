import request from '@/utils/request'

// 查询风窗列表
export function listWindow(query) {
	return request({
		url: '/api/window/info/list',
		method: 'get',
		params: query,
	})
}

// 查询风窗详细
export function getWindow(id) {
	return request({
		url: '/api/window/info/' + id,
		method: 'get',
	})
}

// 新增风窗配置
export function addWindow(data) {
	return request({
		url: '/api/window/info',
		method: 'post',
		data: data,
	})
}

// 修改风窗配置
export function updateWindow(data) {
	return request({
		url: '/api/window/info',
		method: 'put',
		data: data,
	})
}

// 删除风窗配置
export function delWindow(id) {
	return request({
		url: '/api/window/info/' + id,
		method: 'delete',
	})
}
//风窗标签保存
export function windowTagSet(data) {
	return request({
		url: '/api/devicetag/windowTagSet',
		method: 'post',
		data: data,
	})
}
