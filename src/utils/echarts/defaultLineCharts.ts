import useCharts from '@/hooks/useCharts'
import echarts from '@/utils/echarts/index'
import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'

// 普通折线
export interface lineData {
	domId: string
	xData: string[]
	yDataList: number[][]
	legends: string[]
	// 图例位置
	legendPosition: string
	title?: string
	units?: string
	xUnits?: string
	colors: string[][]
	// 	是否平滑
	smooth?: boolean
	// 	是否区域渐变
	isArea?: boolean
	// 渐变区间
	areaInterval?: number[][]
	// 	是否显示圆点
	showSymbol?: boolean
	// 	是否显示x轴线
	showXSplitLine?: boolean
	// 	是否显示y轴线
	showYSplitLine?: boolean
	// 	辅助线
	markLineList?: any[]
	// 	线虚实
	lineTypes?: any[]
}

export function getSeriesData({
	yDataList,
	lineTypes,
	legends,
	smooth,
	showSymbol,
	colors,
	isArea,
	areaInterval,
	markLineList,
	symbolItemStyle,
}: any) {
	let seriesData: any = []

	for (let i = 0; i < yDataList.length; i++) {
		let yData = yDataList[i]
		let lineType = lineTypes[i] ?? 'solid'
		let series: any = {
			name: legends[i],
			type: 'line',
			smooth: smooth,
			symbol: 'circle', //拐点的形状
			symbolSize: 8,
			showSymbol: showSymbol,
			itemStyle: {
				color: symbolItemStyle.color ? symbolItemStyle.color : colors[i][0],
				borderColor: colors[i][0],
				borderWidth: symbolItemStyle.borderWidth ? symbolItemStyle.borderWidth : 1,
			},
			lineStyle: {
				color: colors[i][0],
				width: 2,
				type: lineType,
			},
			data: yData,
		}
		if (isArea) {
			if (areaInterval.length === 0) {
				for (let j = 0; j < yDataList.length; j++) {
					areaInterval.push([0, 1])
				}
			}
			series.areaStyle = {
				color: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[
						{
							offset: areaInterval[i][0],
							color: colors[i][0],
						},
						{
							offset: areaInterval[i][1],
							color: colors[i][1],
						},
					],
					false,
				),
			}
		}
		seriesData.push(series)
	}
	if (markLineList.length > 0) {
		for (let i = 0; i < markLineList.length; i++) {
			let data = markLineList[i]
			seriesData.push({
				type: 'line',
				markLine: {
					symbol: 'none',
					data: [
						{
							name: data.name,
							yAxis: data.value,
							label: {
								formatter: data.name,
								color: data.color,
								padding: [0, 0, 0, -40],
							},
							lineStyle: {
								type: 'dashed',
								color: data.color,
							},
						},
					],
				},
			})
		}
	}

	return seriesData
}

export function defaultLineChart({
	domId,
	xData,
	yDataList,
	legends,
	legendPosition = 'right',
	title = '',
	units = '',
	xUnits = '',
	colors,
	smooth = true,
	isArea = true,
	areaInterval = [],
	showSymbol = false,
	showXSplitLine = false,
	showYSplitLine = false,
	markLineList = [],
	lineTypes = [],
}: lineData) {
	const { option } = useCharts(domId)

	let seriesData = getSeriesData({
		yDataList: yDataList,
		lineTypes: lineTypes,
		legends: legends,
		smooth: smooth,
		showSymbol: showSymbol,
		colors: colors,
		isArea: isArea,
		areaInterval: areaInterval,
		markLineList: markLineList,
		symbolItemStyle: {},
	})

	option.value = {
		title: {
			text: title,
			textStyle: {
				color: 'rgba(75, 200, 252, 1)',
				fontSize: dynamicWidth(11),
				fontWeight: 400,
			},
			right: '0',
		},
		legend: {
			data: legends,
			x: legendPosition,
			textStyle: {
				color: '#fff',
				fontSize: dynamicWidth(14),
				fontWeight: 400,
			},
			icon: 'path://M801.171 547.589H222.83c-17.673 0-32-14.327-32-32s14.327-32 32-32h578.341c17.673 0 32 14.327 32 32s-14.327 32-32 32z',
		},
		grid: {
			left: '5%',
			right: '5%',
			top: '15%',
			bottom: '5%',
			containLabel: true,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'line',
				lineStyle: {
					color: 'rgba(50, 216, 205, 1)',
				},
			},
		},
		xAxis: [
			{
				name: xUnits,
				nameLocation: 'end', // 坐标轴名称显示位置
				nameTextStyle: {
					fontSize: dynamicWidth(12),
					fontWeight: 400,
					padding: [0, 0, 0, 0], //间距分别是 上 右 下 左
				},
				type: 'category',
				boundaryGap: false,
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(230, 230, 230, 1)',
					},
				},
				axisLabel: {
					color: 'rgba(255, 255, 255, 0.6)',
					fontSize: dynamicWidth(14),
				},
				splitLine: {
					show: showXSplitLine,
					lineStyle: {
						color: 'rgba(230, 230, 230, 0.3)',
						type: 'dashed',
					},
				},
				data: xData,
			},
		],
		yAxis: [
			{
				type: 'value',
				name: units,
				nameLocation: 'end', // 坐标轴名称显示位置
				nameTextStyle: {
					fontSize: dynamicWidth(12),
					fontWeight: 400,
					padding: [0, 0, 0, 0], //间距分别是 上 右 下 左
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(230, 230, 230, 1)',
					},
				},
				// max: 1000,
				splitLine: {
					show: showYSplitLine,
					lineStyle: {
						color: 'rgba(230, 230, 230, 0.3)',
						type: 'dashed',
					},
				},
				axisLabel: {
					color: 'rgba(255, 255, 255, 0.6)',
					fontSize: dynamicWidth(14),
				},
			},
		],
		series: seriesData,
	}
}

interface ITooltip {
	line1Title?: string
	unit?: string
}
interface ISymbolItemStyle {
	color?: string
	borderWidth?: number
}
//自定义折线
export interface gradualLineData extends lineData {
	// 自定义提示框
	tooltip: ITooltip
	// 	自定义圆点形状
	symbolItemStyle?: ISymbolItemStyle
}
export function gradualLineChart({
	domId,
	xData,
	yDataList,
	legends,
	units,
	xUnits = '',
	colors,
	smooth = true,
	isArea = true,
	areaInterval = [],
	showSymbol = false,
	showXSplitLine = false,
	showYSplitLine = false,
	markLineList = [],
	lineTypes = [],
	tooltip = { line1Title: '时间', unit: '' },
	symbolItemStyle = {},
}: gradualLineData) {
	const { option } = useCharts(domId)
	let seriesData = getSeriesData({
		yDataList: yDataList,
		lineTypes: lineTypes,
		legends: legends,
		smooth: smooth,
		showSymbol: showSymbol,
		colors: colors,
		isArea: isArea,
		areaInterval: areaInterval,
		markLineList: markLineList,
		symbolItemStyle: symbolItemStyle,
	})
	option.value = {
		legend: {
			data: legends,
			right: 5,
			top: 0,
			textStyle: {
				color: '#fff',
			},
			icon: 'path://M801.171 547.589H222.83c-17.673 0-32-14.327-32-32s14.327-32 32-32h578.341c17.673 0 32 14.327 32 32s-14.327 32-32 32z',
		},
		grid: {
			left: '2%',
			right: '5%',
			top: '15%',
			bottom: '10%',
			containLabel: true,
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'transparent',
			borderWidth: 0,
			padding: 0,
			axisPointer: {
				// 坐标轴指示器配置项。
				type: 'line', // 'line' 直线指示器  'shadow' 阴影指示器  'none' 无指示器  'cross' 十字准星指示器。
				axis: 'auto', // 指示器的坐标轴。
				snap: true, // 坐标轴指示器是否自动吸附到点上
			},
			formatter: (params: any) => {
				let res = `
				<div class="four-corner-line-border" style="height: ${dynamicHeight(32) * (params.length + 1)}px;">
					<div class='four-corner-line-border-text'>${tooltip.line1Title}：${params[0].name}</div>`
				for (let i = 0; i < params.length; i++) {
					res += `<div class='four-corner-line-border-text'>${params[i].seriesName}：${params[i].data}${tooltip.unit}</div>`
				}
				res += `</div>`
				return res
			},
		},
		xAxis: [
			{
				name: xUnits,
				nameLocation: 'end', // 坐标轴名称显示位置
				nameTextStyle: {
					padding: [0, 0, 0, 0], //间距分别是 上 右 下 左
				},
				type: 'category',
				boundaryGap: false,
				axisLine: {
					show: false,
				},
				axisLabel: {
					color: 'rgba(255, 255, 255, 0.4)',
				},
				splitLine: {
					show: showXSplitLine,
					lineStyle: {
						color: 'rgba(230, 230, 230, 0.3)',
						type: 'dashed',
					},
				},
				data: xData,
			},
		],
		yAxis: [
			{
				type: 'value',
				name: units,
				nameLocation: 'end', // 坐标轴名称显示位置
				nameTextStyle: {
					padding: [0, 30, -5, 0], //间距分别是 上 右 下 左
				},
				// max: 1000,
				splitLine: {
					show: showYSplitLine,
					lineStyle: {
						color: 'rgba(230, 230, 230, 0.3)',
						type: 'dashed',
					},
				},
				axisLabel: {
					color: 'rgba(255, 255, 255, 0.4)',
				},
			},
		],
		series: seriesData,
	}
}
