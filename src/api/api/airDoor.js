import request from '@/utils/request'

// 风门下拉接口
export function doorListAll() {
	return request({
		url: '/api/door/adjust/doorListAll',
		method: 'get',
	})
}
//风门基本信息
export function monitorInfo(query) {
	return request({
		url: '/api/door/adjust/monitorInfo',
		method: 'get',
		params: query,
	})
}
//风门参数查询
export function paramInfo(query) {
	return request({
		url: '/api/door/adjust/paramInfo',
		method: 'get',
		params: query,
	})
}
// 风门远程操作：
export function controlDoor(data) {
	return request({
		url: '/api/door/adjust/controlDoor',
		method: 'post',
		data: data,
	})
}
//风门参数设置：
export function setDoorParam(data) {
	return request({
		url: '/api/door/adjust/setDoorParam',
		method: 'post',
		data: data,
	})
}
//更多
export function doorMore(query) {
	return request({
		url: '/api/door/adjust/doorMore',
		method: 'get',
		params: query,
	})
}
// 风门操作记录接口
export function operList(query) {
	return request({
		url: '/api/door/adjust/operList',
		method: 'get',
		params: query,
	})
}
