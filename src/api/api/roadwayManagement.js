import request from '@/utils/request'

// 查询巷道列表
export function listVentWay(query) {
	return request({
		url: '/api/calculate/ventilationroadway/list',
		method: 'get',
		params: query,
	})
}
// 查询巷道详细
export function getVentWay(query) {
	return request({
		url: '/api/calculate/ventilationroadway/getRoadInfo',
		method: 'get',
		params: query,
	})
}
// 添加巷道信息
export function addVentWay(data) {
	return request({
		url: '/api/calculate/ventilationroadway',
		method: 'post',
		data: data,
	})
}
// 修改巷道配置
export function updateVentWay(data) {
	return request({
		url: '/api/calculate/ventilationroadway',
		method: 'put',
		data: data,
	})
}
// 删除巷道配置
export function delVentWay(id) {
	return request({
		url: '/api/calculate/ventilationroadway/' + id,
		method: 'delete',
	})
}
//巷道导入模板
export function importTemplate() {
	return request({
		url: '/api/calculate/ventilationroadway/importTemplate',
		method: 'post',
	})
}
//查询风路分支图区域
export function listRegion(query) {
	return request({
		url: '/api/manage/map/region/listAll',
		method: 'get',
		params: query,
	})
}
