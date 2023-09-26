import request from '@/utils/request'

// 安全出口查询
export function escapeExitList(query) {
	return request({
		url: '/api/escape/escapeExitList',
		method: 'get',
		params: query,
	})
}
//安全出口添加
export function saveEscapeExit(data) {
	return request({
		url: '/api/escape/saveEscapeExit',
		method: 'post',
		data: data,
	})
}
//安全出口删除
export function deleteEscape(id) {
	return request({
		url: '/api/escape/' + id,
		method: 'delete',
	})
}
//系统避灾路线查询：
export function getEscapePaths(query) {
	return request({
		url: '/api/escape/getEscapePaths',
		method: 'get',
		params: query,
	})
}
//系统避灾路线保存：
export function saveEscapePaths(data) {
	return request({
		url: '/api/escape/saveEscapePaths',
		method: 'post',
		data: data,
	})
}
//系统避灾路线修改：
export function updateEscapePaths(data) {
	return request({
		url: '/api/escape/updateEscapePaths',
		method: 'post',
		data: data,
	})
}
//系统避灾路线删除：
export function removeEscapePaths(data) {
	return request({
		url: '/api/escape/removeEscapePaths',
		method: 'post',
		data: data,
	})
}
