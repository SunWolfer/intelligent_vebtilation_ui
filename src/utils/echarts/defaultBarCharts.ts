import useCharts from '@/hooks/useCharts'
import echarts from '@/utils/echarts/index'

export interface barData {
	domId: string
	xData: string[]
	yDataList: number[][]
	legends?: string[]
	yUnit?: string
	xUnits?: string
	colors: string[][]
	// 单柱宽度
	barWidth?: number
	// 	是否区域渐变
	isArea?: boolean
	// 是否有边框
	hasBorder?: boolean
	// 是否自定义边框
	otherBorder?: boolean
	// 	是否显示x轴线
	showXSplitLine?: boolean
	// 	是否显示y轴线
	showYSplitLine?: boolean
	// 圆柱弧度
	barBorderRadius?: number
	// 	辅助线
	markLineList?: any[]
	// 	是否堆叠
	stack?: any
	// 	图例位置
	legendPosition?: string
}

export function defaultBarChart({
	domId,
	xData,
	yDataList,
	legends,
	yUnit = '',
	xUnits = '',
	colors,
	barWidth = 10,
	isArea = true,
	hasBorder = false,
	otherBorder = false,
	showXSplitLine = false,
	showYSplitLine = false,
	barBorderRadius = 0,
	markLineList = [],
	stack = '',
	legendPosition = 'center',
}: barData) {
	const { option } = useCharts(domId)
	let seriesData: any[] = []

	for (let i = 0; i < yDataList.length; i++) {
		let yData = yDataList[i]
		let series: any = {
			name: legends && legends[i],
			type: 'bar',
			barWidth: barWidth,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[
						{
							offset: 0,
							color: colors[i][0], // 0% 处的颜色
						},
						{
							offset: 0.98,
							color: colors[i][1], // 100% 处的颜色
						},
					],
					false,
				),
				shadowColor: colors[i][0],
				shadowBlur: 2,
				borderRadius: barBorderRadius,
				borderWidth: hasBorder ? 1 : 0,
				borderColor: otherBorder ? colors[i][2] : colors[i][0],
			},
			data: yData,
		}
		if (isArea) {
			series.areaStyle = {
				color: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[
						{
							offset: 0,
							color: colors[i][0],
						},
						{
							offset: 1,
							color: colors[i][1],
						},
					],
					false,
				),
			}
		}
		seriesData.push(series)
		if (stack) {
			series.stack = stack
		}
	}
	if (markLineList.length > 0) {
		for (let i = 0; i < markLineList.length; i++) {
			let data = markLineList[i]
			seriesData.push({
				type: 'bar',
				markLine: {
					symbol: 'none',
					data: [
						{
							name: data.name,
							yAxis: data.value,
							label: {
								formatter: data.name,
								color: data.color,
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

	option.value = {
		legend: {
			data: legends,
			top: 0,
			right: legendPosition,
			textStyle: {
				color: '#fff',
			},
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
					padding: [0, 0, 0, 0], //间距分别是 上 右 下 左
				},
				type: 'category',
				boundaryGap: 1,
				axisLine: {
					show: false,
				},
				axisLabel: {
					color: '#FFFFFF',
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
				name: yUnit,
				nameLocation: 'end', // 坐标轴名称显示位置
				nameTextStyle: {
					padding: [0, 30, -5, 0], //间距分别是 上 右 下 左
					color: 'rgba(0, 160, 233, 1)',
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
					color: '#FFFFFF',
				},
			},
		],
		series: seriesData,
	}
}
