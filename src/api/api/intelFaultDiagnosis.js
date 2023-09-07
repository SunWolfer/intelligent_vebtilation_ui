// 故障诊断接口
import request from '@/utils/request'

// 通风动力和通风设施预警类型top5查询
export function findYjlxTopFive(query) {
	return request({
		url: '/api/warn/findYjlxTopFive',
		method: 'get',
		params: query,
	})
}
// 通风动力预警列表查询
export function powerListView(query) {
	return request({
		url: '/api/warn/powerListView',
		method: 'get',
		params: query,
	})
}
//设备类型下拉
export function findDevTypeDict(query) {
	return request({
		url: '/api/warn/findDevTypeDict',
		method: 'get',
		params: query,
	})
}
//预警类型下拉
export function findYjlxDict(query) {
	return request({
		url: '/api/warn/findYjlxDict',
		method: 'get',
		params: query,
	})
}
// 删除
export function delWarn(id) {
	return request({
		url: '/api/warn/' + id,
		method: 'delete',
	})
}
// 通风网络预警列表
export function roadListView(query) {
	return request({
		url: '/api/warn/roadListView',
		method: 'get',
		params: query,
	})
}
//通风网络和环境监测预警趋势查询
export function monthTrend(query) {
	return request({
		url: '/api/warn/monthTrend',
		method: 'get',
		params: query,
	})
}
//通风网络和环境监测预警巷道/点位Top5查询
export function findYjdwTopFive(query) {
	return request({
		url: '/api/warn/findYjdwTopFive',
		method: 'get',
		params: query,
	})
}
//通风网络预警类型饼图查询
export function findYjlxPieChart(query) {
	return request({
		url: '/api/warn/findYjlxPieChart',
		method: 'get',
		params: query,
	})
}
//通风设施预警列表查询
export function deviceListView(query) {
	return request({
		url: '/api/warn/deviceListView',
		method: 'get',
		params: query,
	})
}
// 环境监测预警列表查询
export function envListView(query) {
	return request({
		url: '/api/warn/envListView',
		method: 'get',
		params: query,
	})
}
//环境监测预警设备类型饼图查询
export function findYjsbPieChart(query) {
	return request({
		url: '/api/warn/findYjsbPieChart',
		method: 'get',
		params: query,
	})
}
