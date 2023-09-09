import request from '@/utils/request'

// 查询风速传感器列表
export function listWindSpeed(query) {
	return request({
		url: '/api/anemometry/sensor/list',
		method: 'get',
		params: query,
	})
}

// 查询风速传感器
export function getWindSpeed(id) {
	return request({
		url: '/api/anemometry/sensor/' + id,
		method: 'get',
	})
}

// 新增风速传感器
export function addWindSpeed(data) {
	return request({
		url: '/api/anemometry/sensor',
		method: 'post',
		data: data,
	})
}

// 修改风速传感器
export function updateWindSpeed(data) {
	return request({
		url: '/api/anemometry/sensor',
		method: 'put',
		data: data,
	})
}

// 删除风速传感器
export function delWindSpeed(configId) {
	return request({
		url: '/api/anemometry/sensor/' + configId,
		method: 'delete',
	})
}
//测风传感器配置
export function setSensor(data) {
	return request({
		url: '/api/anemometry/sensor/setSensor',
		method: 'post',
		data: data,
	})
}
