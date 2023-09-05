import request from '@/utils/request'

// 风窗下拉接口
export function windowListAll() {
	return request({
		url: '/api/window/adjust/windowListAll',
		method: 'get',
	})
}

//风窗基本信息
export function monitorInfo(query) {
	return request({
		url: '/api/window/adjust/monitorInfo',
		method: 'get',
		params: query,
	})
}
//监测曲线
export function curveList(query) {
	return request({
		url: '/api/window/adjust/curveList',
		method: 'get',
		params: query,
	})
}
// 风阻曲线
export function getVentrLine(query) {
	return request({
		url: '/api/window/adjust/getVentrLine',
		method: 'get',
		params: query,
	})
}
// 更多
export function windowMore(query) {
	return request({
		url: '/api/window/adjust/windowMore',
		method: 'get',
		params: query,
	})
}
// 风窗操作记录接口
export function operList(query) {
	return request({
		url: '/api/window/adjust/operList',
		method: 'get',
		params: query,
	})
}
// 风窗参数设定接口：
export function controlWindow(data) {
	return request({
		url: '/api/window/adjust/controlWindow',
		method: 'post',
		data: data,
	})
}
// 查询AB
export function havaAbId(query) {
	return request({
		url: '/api/window/adjust/havaAbId',
		method: 'get',
		params: query,
	})
}
