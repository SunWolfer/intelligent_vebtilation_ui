import request from '@/utils/request'

//监测统计
export function stateTotal() {
	return request({
		url: '/api/door/home/stateTotal',
		method: 'get',
	})
}

//风门列表
export function doorHomeList(query) {
	return request({
		url: '/api/door/home/list',
		method: 'get',
		params: query,
	})
}
