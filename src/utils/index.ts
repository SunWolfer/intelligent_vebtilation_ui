import { parseTime } from '@/utils/ruoyi'

/**
 * 表格时间格式化
 */
export function formatDate(cellValue: string | number | Date | null) {
	if (cellValue == null || cellValue === '') return ''
	const date = new Date(cellValue)
	const year = date.getFullYear()
	const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
	const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time: string | number | Date, option: string | undefined) {
	if (('' + time).length === 10) {
		time = parseInt(time + '') * 1000
	} else {
		time = +time
	}
	const d: any = new Date(time)
	const now = Date.now()

	const diff = (now - d) / 1000

	if (diff < 30) {
		return '刚刚'
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < 3600 * 24 * 2) {
		return '1天前'
	}
	if (option) {
		return parseTime(time, option)
	} else {
		return (
			d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
		)
	}
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url: string | null) {
	url = url == null ? window.location.href : url
	const search = url.substring(url.lastIndexOf('?') + 1)
	const obj: any = {}
	const reg = /([^?&=]+)=([^?&=]*)/g
	search.replace(reg, (rs: any, $1: string, $2: string) => {
		const name = decodeURIComponent($1)
		let val = decodeURIComponent($2)
		val = String(val)
		obj[name] = val
		return rs
	})
	return obj
}

/**
 * @returns {number} output value
 * @param str
 */
export function byteLength(str: string) {
	// returns the byte length of an utf8 string
	let s = str.length
	for (let i = str.length - 1; i >= 0; i--) {
		const code = str.charCodeAt(i)
		if (code > 0x7f && code <= 0x7ff) s++
		else if (code > 0x7ff && code <= 0xffff) s += 2
		if (code >= 0xdc00 && code <= 0xdfff) i--
	}
	return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual: string | any[]) {
	const newArray: any[] = []
	for (let i = 0; i < actual.length; i++) {
		if (actual[i]) {
			newArray.push(actual[i])
		}
	}
	return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json: any) {
	if (!json) return ''
	return cleanArray(
		Object.keys(json).map((key) => {
			if (json[key] === undefined) return ''
			return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
		}),
	).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url: string) {
	const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
	if (!search) {
		return {}
	}
	const obj: any = {}
	const searchArr = search.split('&')
	searchArr.forEach((v) => {
		const index = v.indexOf('=')
		if (index !== -1) {
			const name = v.substring(0, index)
			obj[name] = v.substring(index + 1, v.length)
		}
	})
	return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val: string) {
	const div = document.createElement('div')
	div.innerHTML = val
	return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target: any, source: string | any[]) {
	if (typeof target !== 'object') {
		target = {}
	}
	if (Array.isArray(source)) {
		return source.slice()
	}
	Object.keys(source).forEach((property) => {
		const sourceProperty = source[property as keyof typeof source]
		if (typeof sourceProperty === 'object') {
			target[property] = objectMerge(target[property], sourceProperty)
		} else {
			target[property] = sourceProperty
		}
	})
	return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element: any, className: string | any[]) {
	if (!element || !className) {
		return
	}
	let classString = element.className
	const nameIndex = classString.indexOf(className)
	if (nameIndex === -1) {
		classString += '' + className
	} else {
		classString =
			classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
	}
	element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type: string) {
	if (type === 'start') {
		return new Date().getTime() - 3600 * 1000 * 24 * 90
	} else {
		return new Date(new Date().toDateString())
	}
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export const deepClone = (source: any): object => {
	if (!source && typeof source !== 'object') {
		throw new Error('error arguments')
	}
	const targetObj: any = source.constructor === Array ? [] : {}
	Object.keys(source).forEach((keys) => {
		if (source[keys] && typeof source[keys] === 'object') {
			targetObj[keys] = deepClone(source[keys])
		} else {
			targetObj[keys] = source[keys]
		}
	})
	return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr: Iterable<unknown> | null | undefined) {
	return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
	const timestamp = +new Date() + ''
	const randomNum = parseInt((1 + Math.random()) * 65536 + '') + ''
	return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: { className: string }, cls: string) {
	return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param ele
 * @param {string} cls
 */
export function addClass(ele: { className: string }, cls: string) {
	if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param ele
 * @param {string} cls
 */
export function removeClass(ele: { className: string }, cls: string) {
	if (hasClass(ele, cls)) {
		const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
		ele.className = ele.className.replace(reg, ' ')
	}
}

export function makeMap(str: string, expectsLowerCase: any) {
	const map = Object.create(null)
	const list = str.split(',')
	for (let i = 0; i < list.length; i++) {
		map[list[i]] = true
	}
	return expectsLowerCase
		? (val: string) => map[val.toLowerCase()]
		: (val: string | number) => map[val]
}

export const exportDefault = 'export default '

export const beautifierConf = {
	html: {
		indent_size: '2',
		indent_char: ' ',
		max_preserve_newlines: '-1',
		preserve_newlines: false,
		keep_array_indentation: false,
		break_chained_methods: false,
		indent_scripts: 'separate',
		brace_style: 'end-expand',
		space_before_conditional: true,
		unescape_strings: false,
		jslint_happy: false,
		end_with_newline: true,
		wrap_line_length: '110',
		indent_inner_html: true,
		comma_first: false,
		e4x: true,
		indent_empty_lines: true,
	},
	js: {
		indent_size: '2',
		indent_char: ' ',
		max_preserve_newlines: '-1',
		preserve_newlines: false,
		keep_array_indentation: false,
		break_chained_methods: false,
		indent_scripts: 'normal',
		brace_style: 'end-expand',
		space_before_conditional: true,
		unescape_strings: false,
		jslint_happy: true,
		end_with_newline: true,
		wrap_line_length: '110',
		indent_inner_html: true,
		comma_first: false,
		e4x: true,
		indent_empty_lines: true,
	},
}

// 首字母大小
export function titleCase(str: string) {
	return str.replace(/( |^)[a-z]/g, (L: string) => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str: string) {
	return str.replace(/_[a-z]/g, (str1: string) => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str: string) {
	return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

export const getBase64 = (file: Blob) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = (_e) => {
			resolve(reader.result)
		}
		reader.onerror = (error) => reject(error)
	})
}
/**
 * 查找数组对象的某个下标
 * @param {Array} ary 查找的数组
 * @param {Functon} fn 判断的方法
 */
// eslint-disable-next-line
export const findIndex = <T = Recordable>(ary: Array<T>, fn: Fn): number => {
	if (ary.findIndex) {
		return ary.findIndex(fn)
	}
	let index = -1
	ary.some((item: T, i: number, ary: Array<T>) => {
		const ret: T = fn(item, i, ary)
		if (ret) {
			index = i
			return ret
		}
	})
	return index
}
