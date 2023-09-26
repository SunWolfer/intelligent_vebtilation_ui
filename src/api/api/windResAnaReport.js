import request from '@/utils/request'

// 查询通风阻力分析结论
export function getVentResult(query) {
	return request({
		url: '/api/calculate/ventilationroadway/getVentResult',
		method: 'get',
		params: query,
	})
}
// 查询通风阻力分析汇总表
export function getVentList(query) {
	return request({
		url: '/api/calculate/ventilationroadway/getVentList',
		method: 'get',
		params: query,
	})
}
