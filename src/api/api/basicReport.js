import request from '@/utils/request'

// 查询参数列表
export function listBasicReport(query) {
	return request({
		url: '/api/report/base/getTimeLine',
		method: 'get',
		params: query,
	})
}
//报表信息查询
export function reportInfo(query) {
	return request({
		url: '/api/report/base/reportInfo',
		method: 'get',
		params: query,
	})
}
//报表信息保存
export function addReportBase(data) {
	return request({
		url: '/api/report/base',
		method: 'post',
		data: data,
	})
}

// 修改报表信息
export function updateReportBase(data) {
	return request({
		url: '/api/report/base',
		method: 'put',
		data: data,
	})
}

// 删除报表信息
export function delReportBase(configId) {
	return request({
		url: '/api/report/base/' + configId,
		method: 'delete',
	})
}
