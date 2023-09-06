import request from '@/utils/request'

// 所有硬件设备列表查询
export function deviceAll() {
	return request({
		url: '/api/pageHome/deviceAll',
		method: 'get',
	})
}
// 所有巷道信息列表查询
export function roadAll() {
	return request({
		url: '/api/pageHome/roadAll',
		method: 'get',
	})
}
//巡检路线查询
export function infoPathList() {
	return request({
		url: '/api/pageHome/pathList',
		method: 'get',
	})
}
//巡检路线对应设备清单查询
export function infoPath(id) {
	return request({
		url: '/api/pageHome/path/' + id,
		method: 'get',
	})
}
//巡检设备信息查询
export function infoPathForm(query) {
	return request({
		url: '/api/pageHome/path/dev/info',
		method: 'get',
		params: query,
	})
}
//矿井总风量查询
export function totalAirVolume() {
	return request({
		url: '/api/pageHome/totalAirVolume',
		method: 'get',
	})
}
//风路分支图
export function branchDrawing() {
	return request({
		url: '/api/pageHome/wind/branch/drawing',
		method: 'get',
	})
}
//通风网络图
export function netWorkDrawing(query) {
	return request({
		url: '/api/pageHome/wind/network/drawing',
		method: 'get',
		params: query,
	})
}
//查询避灾路线
export function escapeRoadData(query) {
	return request({
		url: '/api/pageHome/escapeRoad',
		method: 'get',
		params: query,
	})
}
//预警列表查询
export function deviceWarnList() {
	return request({
		url: '/api/pageHome/deviceWarnList',
		method: 'get',
	})
}
