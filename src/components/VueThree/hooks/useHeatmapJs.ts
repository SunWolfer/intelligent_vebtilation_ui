import { DataCircle, Heatmap } from '../../../../types/heatmap'

export interface heatmapPointRule {
	// 数据最小值
	min: number
	// 数据最大值
	max: number
	// dom长度
	width: number
	// dom宽度
	height: number
	// 中心点
	center: DataCircle
	// 浓度递减梯度
	decLen: number
	// 生成点个数
	len: number
	// 半径
	radius: number
}

export const useHeatmapJs = () => {
	const createdHeatmapDom = (width: number, height: number) => {
		let element = document.createElement('div')
		element.style.width = width + 'px'
		element.style.height = height + 'px'
		element.style.display = 'none'
		document.body.appendChild(element)
		return element
	}

	let heatPoints = ref<DataCircle[]>([])

	const createHeatmapPointData = (pointRule: heatmapPointRule) => {
		heatPoints.value = []
		let { x: startX, y: startY, value: startValue, radius } = pointRule.center

		const distanceX = pointRule.width / pointRule.len

		for (let i = 0; i < pointRule.len; i++) {
			let value = startValue - pointRule.decLen * i
			heatPoints.value.push({
				x: startX + distanceX * i,
				y: startY,
				value: value > 0 ? value : 0,
				radius: radius,
			})
		}
	}
	const heatmapInstance = ref<Heatmap<'value', 'x', 'y'>>()
	const initHeatmap = (pointRule: heatmapPointRule): string => {
		heatmapInstance.value = h337.create({
			container: createdHeatmapDom(pointRule.width, pointRule.height),
		})
		createHeatmapPointData(pointRule)
		let sData = {
			data: heatPoints.value,
			min: pointRule.min,
			max: pointRule.max,
		}
		heatmapInstance.value.setData(sData)
		return heatmapInstance.value.getDataURL()
	}

	return {
		initHeatmap,
		heatmapInstance,
	}
}
