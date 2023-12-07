import request from '@/utils/request'

// 风门控制器列表接口
export function getControllerList() {
	return request({
		url: '/api/door/control/logic/getControllerList',
		method: 'get',
	})
}
//下发控制逻辑
export function sendLogicOrder(data) {
	return request({
		url: '/api/door/control/logic/sendLogicOrder',
		method: 'post',
		data: data,
	})
}
// 读取控制逻辑
export function readLogicOrder(data) {
	return request({
		url: '/api/door/control/logic/readLogicOrder',
		method: 'post',
		data: data,
	})
}
