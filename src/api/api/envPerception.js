import request from '@/utils/request'

// 查询云图
export function listEnvPerceptionCloud(query) {
	return request({
		url: '/api/environment/gas/cloud',
		method: 'get',
		params: query,
	})
}
// 查传感器，也能查安监数据
export function getSensorAttribute(data) {
	return request({
		url: '/api/attribute/getSensorAttribute',
		method: 'post',
		data: data,
	})
}
// 查询传感器预警
export function sensorWarnList(query) {
	return request({
		url: '/api/attribute/sensorWarnList',
		method: 'get',
		params: query,
	})
}
