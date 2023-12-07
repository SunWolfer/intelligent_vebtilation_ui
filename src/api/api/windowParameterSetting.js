import request from '@/utils/request'

export const infoList = (query) => {
	return request({
		url: '/api/window/config/getControllerList',
		method: 'get',
		params: query,
	})
}

export const windowParams = (data) => {
	return request({
		url: '/api/window/config/setConfigOrder',
		method: 'post',
		data: data,
	})
}
//恢复出厂,
export const reFactory = (data) => {
	return request({
		url: '/api/window/config/reFactory',
		method: 'post',
		data: data,
	})
}
// 自动标校
export const calibrate = (data) => {
	return request({
		url: '/api/window/config/calibrate',
		method: 'post',
		data: data,
	})
}
//重启设备
export const restart = (data) => {
	return request({
		url: '/api/window/config/restart',
		method: 'post',
		data: data,
	})
}
// 通用报警测试
export const testWarn = (data) => {
	return request({
		url: '/api/window/config/testWarn',
		method: 'post',
		data: data,
	})
}
// 下发读取配置命令
export const sendReadConfigOrder = (data) => {
	return request({
		url: '/api/window/config/sendReadConfigOrder',
		method: 'post',
		data: data,
	})
}
//读取当前状态
export const readWindowStatus = (data) => {
	return request({
		url: '/api/window/config/readWindowStatus',
		method: 'post',
		data: data,
	})
}
