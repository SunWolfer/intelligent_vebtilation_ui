import request from '@/utils/request'

// 查询主扇列表
export function listMainFan(query) {
	return request({
		url: '/api/fan/list',
		method: 'get',
		params: query,
	})
}

// 查询主扇详细
export function getMainFan(id) {
	return request({
		url: '/api/fan/' + id,
		method: 'get',
	})
}

// 新增主扇配置
export function addMainFan(data) {
	return request({
		url: '/api/fan',
		method: 'post',
		data: data,
	})
}

// 修改主扇配置
export function updateMainFan(data) {
	return request({
		url: '/api/fan',
		method: 'put',
		data: data,
	})
}

// 删除主扇配置
export function delMainFan(id) {
	return request({
		url: '/api/fan/' + id,
		method: 'delete',
	})
}
// 风机标签
export function paramAll(query) {
	return request({
		url: '/api/fan/paramAll',
		method: 'get',
		params: query,
	})
}
//风机标签保存
export function setParam(data) {
	return request({
		url: '/api/fan/setParam',
		method: 'post',
		data: data,
	})
}
