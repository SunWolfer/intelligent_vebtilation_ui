import request from '@/utils/request'

// 查询预警等级列表
export function listWarnLevel(query) {
	return request({
		url: '/api/warn/level/list',
		method: 'get',
		params: query,
	})
}
//预警等级变更
export function updateWarnLevel(data) {
	return request({
		url: '/api/warn/level',
		method: 'put',
		data: data,
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
