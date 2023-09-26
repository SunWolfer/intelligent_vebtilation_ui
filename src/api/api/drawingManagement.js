import request from '@/utils/request'
// 查询历史版本
export function cadList() {
	return request({
		url: '/api/manage/cad/cadList',
		method: 'get',
	})
}
//修改文件名
export function cadEdit(data) {
	return request({
		url: '/api/manage/cad/edit',
		method: 'post',
		data: data,
	})
}
//删除版本
export function removeCad(data) {
	return request({
		url: '/api/manage/cad/removeCad',
		method: 'post',
		data: data,
	})
}
//cad转三维图
export function addCenterCadFile(query) {
	return request({
		url: '/api/manage/cad/convertToModel',
		method: 'get',
		params: query,
	})
}
//Cad发布到编辑器
export function setCadModelToEdit(data) {
	return request({
		url: '/api/model/setCadModelToEdit',
		method: 'post',
		data: data,
	})
}
//三维图预览
export function getRoadwayModelByTagType(query) {
	return request({
		url: '/api/model/getRoadwayModelByTagType',
		method: 'get',
		params: query,
	})
}
