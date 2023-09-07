import request from '@/utils/request'

// 查询安监列表
export function listSafeSupStaReport(query) {
	return request({
		url: '/api/attribute/dayMonthReport',
		method: 'get',
		params: query,
	})
}
//安监数据点位类型
export function safeTypeDict() {
	return request({
		url: '/api/attribute/typeDict',
		method: 'get',
	})
}
