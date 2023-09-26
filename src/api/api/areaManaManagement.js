import request from '@/utils/request'

// 查询风路分支图
export function listRegion(query) {
	return request({
		url: '/api/manage/map/region/list',
		method: 'get',
		params: query,
	})
}
// 新增风路分支图
export function addRegion(data) {
	return request({
		url: '/api/manage/map/region',
		method: 'post',
		data: data,
	})
}

// 删除风路分支图
export function delRegion(id) {
	return request({
		url: '/api/manage/map/region/' + id,
		method: 'delete',
	})
}
//风路分支图区域同步：
export function synchronizeData(query) {
	return request({
		url: '/api/manage/map/region/synchronizeData',
		method: 'get',
		params: query,
	})
}
