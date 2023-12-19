/**
 * 精准判断对象类型
 * @param obj
 */
export function typeOf(obj: any): string {
	const toString = Object.prototype.toString
	const map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object',
	}
	return map[toString.call(obj) as keyof typeof map]
}

/**
 * 深拷贝
 * @param data
 */
export function deepCopy(data: any) {
	const t = typeOf(data)
	let o: any

	if (t === 'array') {
		o = []
	} else if (t === 'object') {
		o = {}
	} else {
		return data
	}

	if (t === 'array') {
		for (let i = 0; i < data.length; i++) {
			o.push(deepCopy(data[i]))
		}
	} else if (t === 'object') {
		for (const i in data) {
			o[i] = deepCopy(data[i])
		}
	}
	return o
}

/**
 * 深覆盖
 * @param target
 * @param merged
 */
export function deepMerge(target: any, merged: Record<string, any>) {
	for (const key in merged) {
		if (target[key] && typeof target[key] === 'object') {
			deepMerge(target[key], merged[key])
			continue
		}
		if (typeof merged[key] === 'object') {
			target[key] = deepCopy(merged[key])

			continue
		}
		target[key] = merged[key]
	}

	return target
}

/**
 * 判断是否是对象或数组
 * @param obj
 * @returns {boolean}
 */
export function isObject(obj: any) {
	return typeof obj === 'object' && obj !== null
}

/**
 * 判定对象数组相等
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export function isEqual(obj1: any, obj2: any) {
	// 两个数据有任何一个不是对象或数组
	if (!isObject(obj1) || !isObject(obj2)) {
		// 值类型(注意：参与equal的一般不会是函数)
		return obj1 === obj2
	}
	// 如果传的两个参数都是同一个对象或数组
	if (obj1 === obj2) {
		return true
	}

	// 两个都是对象或数组，而且不相等
	// 1.先比较obj1和obj2的key的个数，是否一样
	const obj1Keys = Object.keys(obj1)
	const obj2Keys = Object.keys(obj2)
	if (obj1Keys.length !== obj2Keys.length) {
		return false
	}

	// 如果key的个数相等,就是第二步
	// 2.以obj1为基准，和obj2依次递归比较
	for (const key in obj1) {
		// 比较当前key的value  --- 递归
		const res = isEqual(obj1[key], obj2[key])
		if (!res) {
			return false
		}
	}

	// 3.全相等
	return true
}

/**
 * 过滤数组数字
 * @param array
 * @returns {*}
 */
export function filterNonNumber(array: any[]) {
	return array.filter((n: any) => typeof n === 'number')
}

/**
 * 数组数字求和
 * @param nums
 * @returns {*}
 */
export function mulAdd(nums: number[]) {
	const newNums = filterNonNumber(nums)
	return newNums.reduce((all: any, num: any) => all + num, 0)
}

/**
 * 合并相同的stack data
 * @param item
 * @param series
 * @returns {*[]}
 */
export function mergeSameStackData(item: { stack: any; data: any }, series: any[]) {
	const stack = item.stack

	if (!stack) return [...item.data]

	const stacks = series.filter(({ stack: s }) => s === stack)

	const index = stacks.findIndex(({ data: d }) => d === item.data)

	const datas = stacks.splice(0, index + 1).map(({ data }) => data)

	const dataLength = datas[0].length

	return new Array(dataLength).fill(0).map((_foo, i) => mulAdd(datas.map((d: any[]) => d[i])))
}

/**
 * 获取两个点的距离
 * @param pointOne
 * @param pointTwo
 * @returns {number}
 */
export function getTwoPointDistance(pointOne: number[], pointTwo: number[]) {
	const minusX = Math.abs(pointOne[0] - pointTwo[0])

	const minusY = Math.abs(pointOne[1] - pointTwo[1])

	return Math.sqrt(minusX * minusX + minusY * minusY)
}

/**
 * getLinearGradientColor
 * @param ctx
 * @param begin
 * @param end
 * @param color
 */
export function getLinearGradientColor(ctx: any, begin: any, end: any, color: string | any[]) {
	if (!ctx || !begin || !end || !color.length) return

	let colors = color

	typeof colors === 'string' && (colors = [color, color])

	const linearGradientColor = ctx.createLinearGradient(...begin, ...end)

	const colorGap = 1 / (colors.length - 1)

	colors.forEach((c: any, i: number) => linearGradientColor.addColorStop(colorGap * i, c))

	return linearGradientColor
}

/**
 * 获取折现长度
 * @param points
 * @returns {*}
 */
export function getPolylineLength(points: string | any[]) {
	const lineSegments: any[] = new Array(points.length - 1)
		.fill(0)
		.map((_foo, i) => [points[i], points[i + 1]])
	const lengths = lineSegments.map((item: any) => getTwoPointDistance(item[0], item[1]))

	return mulAdd(lengths)
}

/**
 * 获取点到线的距离
 * @param point
 * @param linePointOne
 * @param linePointTwo
 * @returns {number}
 */
export function getPointToLineDistance(point: any, linePointOne: any, linePointTwo: any) {
	const a = getTwoPointDistance(point, linePointOne)
	const b = getTwoPointDistance(point, linePointTwo)
	const c = getTwoPointDistance(linePointOne, linePointTwo)

	return (0.5 * Math.sqrt((a + b + c) * (a + b - c) * (a + c - b) * (b + c - a))) / c
}

/**
 * 初始化需要的charts series
 * @param series
 * @param config
 * @param type
 * @returns {*}
 */
export function initNeedSeries(series: any[], config: any, type: any) {
	series = series.filter(({ type: st }) => st === type)

	series = series.map((item: any) => deepMerge(deepCopy(config), item))

	return series.filter(({ show }) => show)
}

/**
 * 弧度转为角度
 * @param radian
 * @returns {number}
 */
export function radianToAngle(radian: number) {
	return (radian / Math.PI) * 180
}

/**
 * 随机一个数，需提供最大最小值
 * @param minNum
 * @param maxNum
 * @returns {number}
 */
export function randomExtend(minNum: number, maxNum: number) {
	if (arguments.length === 1) {
		return parseInt(Math.random() * minNum + 1 + '', 10)
	} else {
		return parseInt(Math.random() * (maxNum - minNum + 1) + minNum + '', 10)
	}
}

/**
 * @description Get the coordinates of the specified radian on the circle
 * @param {Number} x      Circle x coordinate
 * @param {Number} y      Circle y coordinate
 * @param {Number} radius Circle radius
 * @param {Number} radian Specfied radian
 * @return {Array} Postion of point
 */
export function getCircleRadianPoint(x: number, y: number, radius: number, radian: number) {
	return [x + Math.cos(radian) * radius, y + Math.sin(radian) * radius]
}

/**
 * 获取随机uuid
 */
export function generateId(hasHyphen?: any) {
	const str = hasHyphen
		? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
		: 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
	return str.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0
		const v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}
