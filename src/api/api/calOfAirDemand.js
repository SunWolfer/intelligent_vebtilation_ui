import request from '@/utils/request'

// 巷道下拉查询
export function getRoadDict(query) {
	return request({
		url: '/api/calculate/need/wind/getRoadDict',
		method: 'get',
		params: query,
	})
}
//配风巷道列表查询
export function getNeedRoads(query) {
	return request({
		url: '/api/calculate/need/wind/getNeedRoads',
		method: 'get',
		params: query,
	})
}
// 巷道需风量预测的条件信息查询
export function getRoadPredictInfo(query) {
	return request({
		url: '/api/calculate/need/wind/getRoadPredictInfo',
		method: 'get',
		params: query,
	})
}
//删除配风巷道
export function removeNeedRoad(data) {
	return request({
		url: '/api/calculate/need/wind/removeNeedRoad',
		method: 'post',
		data: data,
	})
}

//工作面需风量预测条件的保存
export function addWorkFace(data) {
	return request({
		url: '/api/calculate/need/wind/addWorkFace',
		method: 'post',
		data: data,
	})
}
//工作面需风量预测条件的修改
export function editWork(data) {
	return request({
		url: '/api/calculate/need/wind/editWork',
		method: 'post',
		data: data,
	})
}
//掘进面需风量预测条件的保存
export function addTunnelFace(data) {
	return request({
		url: '/api/calculate/need/wind/addTunnelFace',
		method: 'post',
		data: data,
	})
}
//掘进面需风量预测条件的修改
export function editTunnelFace(data) {
	return request({
		url: '/api/calculate/need/wind/editTunnelFace',
		method: 'post',
		data: data,
	})
}
//其它巷道需风量预测条件的保存
export function addOtherRoad(data) {
	return request({
		url: '/api/calculate/need/wind/addOtherRoad',
		method: 'post',
		data: data,
	})
}
//其它巷道需风量预测条件的修改
export function editOtherRoad(data) {
	return request({
		url: '/api/calculate/need/wind/editOtherRoad',
		method: 'post',
		data: data,
	})
}
//硐室需风量预测条件的保存
export function addChamber(data) {
	return request({
		url: '/api/calculate/need/wind/addChamber',
		method: 'post',
		data: data,
	})
}
//硐室需风量预测条件的修改
export function editChamber(data) {
	return request({
		url: '/api/calculate/need/wind/editChamber',
		method: 'post',
		data: data,
	})
}
//风速传感器下拉查询：
export function getWindSensorDict(query) {
	return request({
		url: '/api/calculate/need/wind/getWindSensorDict',
		method: 'get',
		params: query,
	})
}
//风速传感器监测值查询：
export function getWindSpeedByCode(query) {
	return request({
		url: '/api/calculate/need/wind/getWindSpeedByCode',
		method: 'get',
		params: query,
	})
}
//瓦斯传感器下拉查询：
export function getGasSensorDict(query) {
	return request({
		url: '/api/calculate/need/wind/getGasSensorDict',
		method: 'get',
		params: query,
	})
}
//瓦斯和CO2传感器监测值查询：
export function getRealValueByCode(query) {
	return request({
		url: '/api/calculate/need/wind/getRealValueByCode',
		method: 'get',
		params: query,
	})
}
//CO2传感器下拉查询：
export function getCo2SensorDict(query) {
	return request({
		url: '/api/calculate/need/wind/getCo2SensorDict',
		method: 'get',
		params: query,
	})
}
//人员定位位置下拉查询：
export function getPersonPositionDict(query) {
	return request({
		url: '/api/calculate/need/wind/getPersonPositionDict',
		method: 'get',
		params: query,
	})
}
//人员定位人数统计查询：
export function getPersonCountByCode(query) {
	return request({
		url: '/api/calculate/need/wind/getPersonCountByCode',
		method: 'get',
		params: query,
	})
}
