/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 日期格式化
export function parseTime(time: any, pattern?: string): any {
	if (!time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time
				.replace(new RegExp(/-/gm), '/')
				.replace('T', ' ')
				.replace(new RegExp(/\.[\d]{3}/gm), '')
		}
		if (typeof time === 'number' && time.toString().length === 10) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj: any = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	}
	return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: string | any[], key: string) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
}

/**
 * 表单重置
 *
 * @param {string} formRef
 */
export const resetForm = (formRef: FormInstance | undefined) => {
	if (!formRef) return
	formRef.resetFields()
}

// 添加日期范围
export function addDateRange(params?: any, dateRange?: any[], propName?: string | undefined) {
	let search = params
	// search.params = typeof search.params === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {}
	dateRange = Array.isArray(dateRange) ? dateRange : []
	if (typeof propName === 'undefined') {
		search['beginTime'] = dateRange[0]
		search['endTime'] = dateRange[1]
	} else {
		search['begin' + propName] = dateRange[0]
		search['end' + propName] = dateRange[1]
	}
	return search
}

// 回显数据字典
export function selectDictLabel(datas: any, value: string | undefined) {
	if (value === undefined) {
		return ''
	}
	let actions: any[] = []
	Object.keys(datas).some((key) => {
		if (datas[key].value === '' + value) {
			actions.push(datas[key].label)
			return true
		}
	})
	if (actions.length === 0) {
		actions.push(value)
	}
	return actions.join('')
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas: any, value?: string | undefined, separator?: undefined) {
	if (value === undefined || !datas) {
		return ''
	}
	const actions: any = []
	const currentSeparator = undefined === separator ? ',' : separator
	const temp: any = value.split(currentSeparator)
	Object.keys(value.split(currentSeparator)).some((val) => {
		let match = false
		Object.keys(datas).some((key) => {
			if (datas[key].value === '' + temp[val]) {
				actions.push(datas[key].label + currentSeparator)
				match = true
			}
		})
		if (!match) {
			actions.push(temp[val] + currentSeparator)
		}
	})
	return actions.join('').substring(0, actions.join('').length - 1)
}

// 字符串格式化(%s )
export function sprintf(str: string) {
	let args = arguments,
		flag = true,
		i = 1
	str = str.replace(/%s/g, function () {
		let arg = args[i++]
		if (typeof arg === 'undefined') {
			flag = false
			return ''
		}
		return arg
	})
	return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str: string | number) {
	if (!str || str === 'undefined' || str === 'null') {
		return ''
	}
	return str
}

// 数据合并
export function mergeRecursive(source: { [x: string]: any }, target: { [x: string]: any }) {
	for (const p in target) {
		try {
			if (target[p].constructor === Object) {
				source[p] = mergeRecursive(source[p], target[p])
			} else {
				source[p] = target[p]
			}
		} catch (e) {
			source[p] = target[p]
		}
	}
	return source
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data: any, id = 'id', parentId = 'parentId', children = 'children') {
	let config = {
		id: id,
		parentId: parentId,
		childrenList: children,
	}

	const childrenListMap: any = {}
	const nodeIds: any = {}
	const tree: any[] = []

	for (let d of data) {
		let parentId = d[config.parentId]
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = []
		}
		nodeIds[d[config.id]] = d
		childrenListMap[parentId].push(d)
	}

	for (let d of data) {
		let parentId = d[config.parentId]
		if (nodeIds[parentId] == null) {
			tree.push(d)
		}
	}

	for (let t of tree) {
		adaptToChildrenList(t)
	}

	function adaptToChildrenList(o: { [x: string]: any }) {
		if (childrenListMap[o[config.id]] !== null) {
			o[config.childrenList] = childrenListMap[o[config.id]]
		}
		if (o[config.childrenList]) {
			for (let c of o[config.childrenList]) {
				adaptToChildrenList(c)
			}
		}
	}
	return tree
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: any) {
	let result = ''
	for (const propName of Object.keys(params)) {
		const value = params[propName]
		let part = encodeURIComponent(propName) + '='
		if (value !== null && value !== '' && typeof value !== 'undefined') {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
						let params = propName + '[' + key + ']'
						let subPart = encodeURIComponent(params) + '='
						result += subPart + encodeURIComponent(value[key]) + '&'
					}
				}
			} else {
				result += part + encodeURIComponent(value) + '&'
			}
		}
	}
	return result
}

// 返回项目路径
export function getNormalPath(p: string) {
	if (p.length === 0 || !p || p === 'undefined') {
		return p
	}
	let res = p.replace('//', '/')
	if (res[res.length - 1] === '/') {
		return res.slice(0, res.length - 1)
	}
	return res
}

// 验证是否为blob格式
export async function blobValidate(data: { text: () => any }) {
	try {
		const text = await data.text()
		JSON.parse(text)
		return false
	} catch (error) {
		return true
	}
}

import { useWindowSize } from '@vueuse/core'
import { FormInstance } from 'element-plus'

const { width, height } = useWindowSize()

const designWidth = 2520
const designHeight = 1080
//返回动态宽度
export function dynamicWidth(val: number) {
	return (val / designWidth) * width.value
}
//返回动态高度
export function dynamicHeight(val: number) {
	return (val / designHeight) * height.value
}

const baseURL = import.meta.env.VITE_APP_BASE_API
// 通用下载方法
export function oldDownload(fileName: string) {
	// let a = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
	// window.open(a)
	window.location.href =
		baseURL + '/common/download?fileName=' + encodeURI(fileName) + '&delete=' + true
}
/**
 * 判断当前值是否为空
 * @param {Object} data
 */
export function isNull(data: any): boolean {
	return data === null || data === undefined || data === ''
}

/**
 * 下载Json工具
 * @param str
 * @param fileName
 */
export const saveAsJson = (str: BlobPart, fileName: string) => {
	//指定类型文件类型application/json;charset=utf-8
	const blob = new Blob([str], { type: 'application/json;charset=utf-8' })
	const href = URL.createObjectURL(blob)
	const alink = document.createElement('a')
	alink.style.display = 'none'
	alink.download = fileName // 下载后文件名
	alink.href = href
	document.body.appendChild(alink)
	alink.click()
	document.body.removeChild(alink) // 下载完成移除元素
	URL.revokeObjectURL(href) // 释放掉blob对象
}

/**
 * 获取输入内容的长度
 * @param value
 * @return number
 */
export const getInputSize = (value: any) => {
	if (!value) {
		return 0
	}
	const charCount = value.split('').reduce((prev: number, curr: string) => {
		// 英文字母和数字等算一个字符；这个暂时还不完善；
		if (/[a-z]|[0-9]|[,;.!@#-+/\\$%^*()<>?:"'{}~]/i.test(curr)) {
			return prev + 1
		}
		// 其他的算是2个字符
		return prev + 2
	}, 0)

	// 向上取整，防止出现半个字的情况
	return Math.ceil(charCount / 2)
}

//获取静态文件路径
export function getEmeImgUrl(name: string) {
	return 'url(' + import.meta.env.BASE_URL + 'file/emergencyResponse/' + name + ')'
}

/**
 * 自定义函数名：PrefixZero
 * @param num
 * @param n
 */
export function PrefixZero(num: number, n: number) {
	return (Array(n).join('0') + num).slice(-n)
}
//随机颜色，十六进制方法；
export function getRandomColor() {
	const rand = Math.floor(Math.random() * 0xffffff).toString(16)
	if (rand.length == 6) {
		return rand
	} else {
		return getRandomColor()
	}
}
export function getMonthStartEnd() {
	const date = new Date()
	const monthStartDate = new Date(date.getFullYear(), date.getMonth(), 1) // 获取本月第一天的日期时间
	const monthEndDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59)
	const monthStart = parseTime(monthStartDate)
	const monthEnd = parseTime(monthEndDate)
	return [monthStart, monthEnd]
}

// 非负浮点数
export const PositiveNum = /^\d+(\.\d+)?$/
// 数字
export const isNum = /^(([1-9]\d*)|([0][.]{1}[0-9]{0,2}[1-9]+)|([1-9]\d*[.]{1}[0-9]+))$/g
