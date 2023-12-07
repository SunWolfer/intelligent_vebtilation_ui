import request from '@/utils/request'

// 查询参数列表
export function getControllerList(query) {
	return request({
		url: '/api/door/config/getControllerList',
		method: 'get',
		params: query,
	})
}

//参数设置
export function setConfigOrder(data) {
	return request({
		url: '/api/door/config/setConfigOrder',
		method: 'post',
		data: data,
	})
}
// 下发读取配置命令
export function sendReadConfigOrder(data) {
	return request({
		url: '/api/door/config/sendReadConfigOrder',
		method: 'post',
		data: data,
	})
}
// 恢复出厂
export function reFactory(data) {
	return request({
		url: '/api/door/config/reFactory',
		method: 'post',
		data: data,
	})
}
// 重启设备
export function restart(data) {
	return request({
		url: '/api/door/config/restart',
		method: 'post',
		data: data,
	})
}

// 读取条屏语音信息
export function readScreenMsgOrder(data) {
	return request({
		url: '/api/door/config/readScreenMsgOrder',
		method: 'post',
		data: data,
	})
}
// 下发条屏语音信息
export function setScreenMsgOrder(data) {
	return request({
		url: '/api/door/config/setScreenMsgOrder',
		method: 'post',
		data: data,
	})
}
// 读取控制寄存器信息
export function readControlRegisterOrder(data) {
	return request({
		url: '/api/door/config/readControlRegisterOrder',
		method: 'post',
		data: data,
	})
}
//下发控制寄存器信息
export function setControlRegisterOrder(data) {
	return request({
		url: '/api/door/config/setControlRegisterOrder',
		method: 'post',
		data: data,
	})
}
