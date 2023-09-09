import request from '@/utils/request'

// 查询测风站列表
export function listWindMea(query) {
	return request({
		url: '/api/anemometry/full/list',
		method: 'get',
		params: query,
	})
}

// 查询测风站详细
export function getWindMea(id) {
	return request({
		url: '/api/anemometry/full/' + id,
		method: 'get',
	})
}

// 新增测风站
export function addWindMea(data) {
	return request({
		url: '/api/anemometry/full',
		method: 'post',
		data: data,
	})
}

// 修改测风站
export function updateWindMea(data) {
	return request({
		url: '/api/anemometry/full',
		method: 'put',
		data: data,
	})
}

// 删除测风站
export function delWindMea(id) {
	return request({
		url: '/api/anemometry/full/' + id,
		method: 'delete',
	})
}
//设置测风站参数
export function setWindDevParam(data) {
	return request({
		url: '/api/anemometry/full/setWindDevParam',
		method: 'post',
		data: data,
	})
}

//看板数据项
export function boardParamAll(query) {
	return request({
		url: 'api/anemometry/full/boardParamAll',
		method: 'get',
		params: query,
	})
}
//看板数据保存
export function setBoardParam(data) {
	return request({
		url: '/api/anemometry/full/setBoardParam',
		method: 'post',
		data: data,
	})
}
