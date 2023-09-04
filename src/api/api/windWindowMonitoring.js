import request from '@/utils/request'

//监测统计
export function stateTotal() {
	return request({
		url: '/api/window/home/stateTotal',
		method: 'get',
	})
}

//风门列表
export function windowHomeList(query) {
	return request({
		url: '/api/window/home/list',
		method: 'get',
		params: query,
	})
}
