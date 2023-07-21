import request from '@/utils/request'

// 查询温度修正值列表
export function listRevise(query) {
	return request({
		url: '/system/revise/list',
		method: 'get',
		params: query,
	})
}

// 查询温度修正值详细
export function getRevise(id) {
	return request({
		url: '/system/revise/' + id,
		method: 'get',
	})
}

// 新增温度修正值
export function addRevise(data) {
	return request({
		url: '/system/revise',
		method: 'post',
		data: data,
	})
}

// 修改温度修正值
export function updateRevise(data) {
	return request({
		url: '/system/revise',
		method: 'put',
		data: data,
	})
}

// 删除温度修正值
export function delRevise(id) {
	return request({
		url: '/system/revise/' + id,
		method: 'delete',
	})
}

// 导出温度修正值
export function exportRevise(query) {
	return request({
		url: '/system/revise/export',
		method: 'get',
		params: query,
	})
}
