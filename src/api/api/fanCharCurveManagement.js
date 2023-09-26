import request from '@/utils/request'

// 风机下拉查询：
export function fanDict(query) {
	return request({
		url: '/api/manage/fan/line/fanDict',
		method: 'get',
		params: query,
	})
}
//转速角度下拉查询
export function fanLineDict(query) {
	return request({
		url: '/api/fan/fanLineDict',
		method: 'get',
		params: query,
	})
}
//风机特性曲线和列表查询：
export function fanLine(query) {
	return request({
		url: '/api/manage/fan/line/fanLine',
		method: 'get',
		params: query,
	})
}
//风机特性曲线新增修改：
export function saveFanLine(data) {
	return request({
		url: '/api/manage/fan/line/saveFanLine',
		method: 'post',
		data: data,
	})
}
//风机特性曲线删除：
export function removeFanLine(data) {
	return request({
		url: '/api/manage/fan/line/removeFanLine',
		method: 'post',
		data: data,
	})
}
