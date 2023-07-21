import request from '@/utils/request'

// 查询传感器上下线日志列表
export function listLog(query) {
	return request({
		url: '/monitor/sensorlog/list',
		method: 'get',
		params: query,
	})
}

// 查询传感器上下线日志详细
export function getLog(id) {
	return request({
		url: '/monitor/sensorlog/' + id,
		method: 'get',
	})
}

// 新增传感器上下线日志
export function addLog(data) {
	return request({
		url: '/monitor/sensorlog',
		method: 'post',
		data: data,
	})
}

// 修改传感器上下线日志
export function updateLog(data) {
	return request({
		url: '/monitor/sensorlog',
		method: 'put',
		data: data,
	})
}

// 删除传感器上下线日志
export function delLog(id) {
	return request({
		url: '/monitor/sensorlog/' + id,
		method: 'delete',
	})
}

// 导出传感器上下线日志
export function exportLog(query) {
	return request({
		url: '/monitor/sensorlog/export',
		method: 'get',
		params: query,
	})
}
