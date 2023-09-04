import request from '@/utils/request'

//主扇列表
export function manFanList() {
	return request({
		url: '/api/fan/mainFanList',
		method: 'get',
	})
}
//一键反风
export function backWindMain(data) {
	return request({
		url: '/api/fan/backWindMain',
		method: 'post',
		data: data,
	})
}
// 一键倒机
export function switchAsMain(data) {
	return request({
		url: '/api/fan/switchAsMain',
		method: 'post',
		data: data,
	})
}
//一号风机正向启动按钮
export function activeForwardStartMain(data) {
	return request({
		url: '/api/fan/activeForwardStartMain',
		method: 'post',
		data: data,
	})
}
// 一号风机停止按钮
export function activeStopMain(data) {
	return request({
		url: '/api/fan/activeStopMain',
		method: 'post',
		data: data,
	})
}
//一号风机反向启动
export function activeReverseStartMain(data) {
	return request({
		url: '/api/fan/activeReverseStartMain',
		method: 'post',
		data: data,
	})
}
//二号风机正向启动
export function standbyForwardStartMain(data) {
	return request({
		url: '/api/fan/standbyForwardStartMain',
		method: 'post',
		data: data,
	})
}
//二号风机停止按钮
export function standbyStopMain(data) {
	return request({
		url: '/api/fan/standbyStopMain',
		method: 'post',
		data: data,
	})
}
//二号风机反向启动
export function standbyReverseStartMain(data) {
	return request({
		url: '/api/fan/standbyReverseStartMain',
		method: 'post',
		data: data,
	})
}
//主扇风量定量调控
export function windControlMain(data) {
	return request({
		url: '/api/fan/windControlMain',
		method: 'post',
		data: data,
	})
}
//主扇最优智能调风
export function intelligentWindControlMain(data) {
	return request({
		url: '/api/fan/intelligentWindControlMain',
		method: 'post',
		data: data,
	})
}

//查询定制化风机参数信息
export function fanParamAllList(query) {
	return request({
		url: '/api/fan/fanParamAllList',
		method: 'get',
		params: query,
	})
}
// 风机参数定制化保存
export function fanParamCustom(data) {
	return request({
		url: '/api/fan/fanParamCustom',
		method: 'post',
		data: data,
	})
}
// 查询风机参数
export function mainFanInfo(query) {
	return request({
		url: '/api/fan/fanInfo',
		method: 'get',
		params: query,
	})
}
//风机特性曲线的转速和角度下拉
export function fanLineDict(query) {
	return request({
		url: '/api/fan/fanLineDict',
		method: 'get',
		params: query,
	})
}
//风机特性曲线
export function findFanLines(query) {
	return request({
		url: '/api/fan/findFanLines',
		method: 'get',
		params: query,
	})
}
//风机操作记录接口
export function fanOperList(query) {
	return request({
		url: '/api/fan/oper/list',
		method: 'get',
		params: query,
	})
}
//局扇风机列表
export function localFanList() {
	return request({
		url: '/api/fan/localFanList',
		method: 'get',
	})
}
//局扇风机风量频率定量调控
export function windControlLocal(data) {
	return request({
		url: '/api/fan/windControlLocal',
		method: 'post',
		data: data,
	})
}
//局扇一键倒机
export function switchAsLocal(data) {
	return request({
		url: '/api/fan/switchAsLocal',
		method: 'post',
		data: data,
	})
}
//局扇一号风机停止
export function activeStopLocal(data) {
	return request({
		url: '/api/fan/activeStopLocal',
		method: 'post',
		data: data,
	})
}
//局扇一号风机启动
export function activeStartLocal(data) {
	return request({
		url: '/api/fan/activeStartLocal',
		method: 'post',
		data: data,
	})
}

// 局扇二号风机停止
export function standbyStopLocal(data) {
	return request({
		url: '/api/fan/standbyStopLocal',
		method: 'post',
		data: data,
	})
}
// 局扇二号风机启动
export function standbyStartLocal(data) {
	return request({
		url: '/api/fan/standbyStartLocal',
		method: 'post',
		data: data,
	})
}
//瓦斯自动排放
export function gasOutLocal(data) {
	return request({
		url: '/api/fan/gasOutLocal',
		method: 'post',
		data: data,
	})
}
//局扇瓦斯点闭锁
export function gasElectricBlockLocal(data) {
	return request({
		url: '/api/fan/gasElectricBlockLocal',
		method: 'post',
		data: data,
	})
}
//局扇风电闭锁
export function windElectricBlockLocal(data) {
	return request({
		url: '/api/fan/windElectricBlockLocal',
		method: 'post',
		data: data,
	})
}
