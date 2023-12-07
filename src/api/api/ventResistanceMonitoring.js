import request from '@/utils/request'

// 查询参数列表
export function multiParameterLines(query) {
	return request({
		url: '/api/multiparameter/multiParameterLines',
		method: 'get',
		params: query,
	})
}
