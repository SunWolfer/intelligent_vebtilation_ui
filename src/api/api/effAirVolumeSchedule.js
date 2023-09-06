import request from '@/utils/request'

// 查询参数列表
export function listEffAirVolumeSchedule(query) {
	return request({
		url: '/api/report/reportList',
		method: 'get',
		params: query,
	})
}
