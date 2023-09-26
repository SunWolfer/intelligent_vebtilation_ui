import request from '@/utils/request'

// 查询参数列表
export function listWindowResCurve(query) {
	return request({
		url: '/api/window/ventr/ventrLine',
		method: 'get',
		params: query,
	})
}
//保存
export function saveVentrLine(data) {
	return request({
		url: '/api/window/ventr/saveVentrLine',
		method: 'post',
		data: data,
	})
}
//数据项删除
export function removeVentrLine(data) {
	return request({
		url: '/api/window/ventr/removeVentrLine',
		method: 'post',
		data: data,
	})
}
