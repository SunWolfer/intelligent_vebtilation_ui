import request from '@/utils/request'

// 查询参数列表
export function listSafeSupeData(query) {
	return request({
		url: '/api/attribute/boardList',
		method: 'get',
		params: query,
	})
}
// 历史曲线查询
export function trendLine(query) {
	return request({
		url: '/api/attribute/trendLine',
		method: 'get',
		params: query,
	})
}
