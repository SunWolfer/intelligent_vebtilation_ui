import request from '@/utils/request'

// 所有风速传感器设备列表
export function listView() {
	return request({
		url: '/api/anemometry/sensor/listView',
		method: 'get',
	})
}
//风速传感器曲线
export function windSensorLines(query) {
	return request({
		url: '/api/anemometry/sensor/windSensorLines',
		method: 'get',
		params: query,
	})
}
//查询历史记录
export function sensorHisList(query) {
	return request({
		url: '/api/anemometry/sensor/his/list',
		method: 'get',
		params: query,
	})
}
// 查询预警记录
export function warnList(query) {
	return request({
		url: '/api/warn/list',
		method: 'get',
		params: query,
	})
}
