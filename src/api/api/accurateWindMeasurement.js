import request from '@/utils/request'

// 所有风速传感器设备列表
export function listView() {
	return request({
		url: '/api/anemometry/sensor/listView',
		method: 'get',
	})
}
