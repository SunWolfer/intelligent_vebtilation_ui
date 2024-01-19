import request from '@/utils/request'

// 查询三维图可编辑版本
export function getEditModelVersion() {
	return request({
		url: '/api/manage/cad/getEditModelVersion',
		method: 'get',
	})
}
// 查询系统当前版本：
export function getNowSysVersion() {
	return request({
		url: '/api/manage/cad/getNowSysVersion',
		method: 'get',
	})
}
// 发布模型到系统：
export function setModelUse(data) {
	return request({
		url: '/api/manage/cad/setModelUse',
		method: 'post',
		data: data,
	})
}
// 根据版本的tag 以及 类型获取三维模型数据：
export function getRoadwayModelByTagType(query) {
	return request({
		url: '/api/model/getRoadwayModelByTagType',
		method: 'get',
		params: query,
	})
}
// 根据版本的tag获取巷道信息：
export function getRoadInfoByTag(query) {
	return request({
		url: '/api/calculate/ventilationroadway/getRoadInfoByTag',
		method: 'get',
		params: query,
	})
}
// 查询平面模型
export function getPlaneModel(query) {
	return request({
		url: '/api/model/getPlaneModel',
		method: 'get',
		params: query,
	})
}
//查询文字模型
export function getTextModel(query) {
	return request({
		url: '/api/model/getTextModel',
		method: 'get',
		params: query,
	})
}
//初始化模型保存
export function saveRoadwayModel(data) {
	return request({
		url: '/api/model/saveRoadwayModel',
		method: 'post',
		data: data,
	})
}
//三维模型保存删除
export function roadwayModelEdit(data) {
	return request({
		url: '/api/model/roadwayModelEdit',
		method: 'post',
		data: data,
	})
}
//查询单个巷道是否绑定设备
export function roadHaveDevice(query) {
	return request({
		url: '/api/calculate/ventilationroadway/roadHaveDevice',
		method: 'get',
		params: query,
	})
}
// 查询多个巷道是否绑定设备
export function roadHaveDeviceList(data) {
	return request({
		url: '/api/calculate/ventilationroadway/roadHaveDeviceList',
		method: 'post',
		data: data,
	})
}
//三维模型绑定点位信息
export function bindDevice(data) {
	return request({
		url: '/api/calculate/ventilationroadway/bindDevice',
		method: 'post',
		data: data,
	})
}
/**
 * 更改巷道颜色
 * 参数：code 巷道编号 tag 版本对应tag color 十六进制的颜色
 * @param data
 * @return {Promise<unknown>}
 */
export function updateModelColor(data) {
	return request({
		url: '/api/model/updateModelColor',
		method: 'post',
		data: data,
	})
}
/**
 * 解算模拟
 * @returns {Promise<unknown>}
 */
export function calculateRealTime() {
	return request({
		url: '/api/calculate/ventilationroadway/calculateRealTime',
		method: 'get',
	})
}
