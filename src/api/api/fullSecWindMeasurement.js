//全断面测风
import request from '@/utils/request'

// 测风站设备列表
export function listView() {
	return request({
		url: '/api/anemometry/full/listView',
		method: 'get',
	})
}
// 电子看板数据
export function getBoard(query) {
	return request({
		url: '/api/anemometry/full/getBoard',
		method: 'get',
		params: query,
	})
}
// 风速传感器曲线
export function windFullLines(query) {
	return request({
		url: '/api/anemometry/full/windFullLines',
		method: 'get',
		params: query,
	})
}
//开始测风
export function startWindDev(id) {
	return request({
		url: '/api/anemometry/full/startWindDev/' + id,
		method: 'get',
	})
}
//一键测风
export function startWindDevAll() {
	return request({
		url: '/api/anemometry/full/startWindDevAll',
		method: 'get',
	})
}
//参数设置
export function setCollect(data) {
	return request({
		url: '/api/anemometry/full/setCollect',
		method: 'post',
		data: data,
	})
}
//历史记录查询
export function fullHisList(query) {
	return request({
		url: '/api/anemometry/full/his/list',
		method: 'get',
		params: query,
	})
}
