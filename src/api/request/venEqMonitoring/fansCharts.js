import useCharts from '@/hooks/useCharts'
import {dynamicHeight} from '@/utils/ruoyi'
import {getSeriesData} from '@/utils/echarts/defaultLineCharts'

// 风机特性曲线
export function fanChart1({
	domId,
	xData,
	yData,
	legends,
	colors = ['#00FF00', '#00FFFF', '#FF00FF', '#FB9401'],
}) {
	const { option } = useCharts(domId)

	option.value = {
		legend: {
			data: legends,
			right: 5,
			top: 0,
			textStyle: {
				color: '#fff',
				fontSize: dynamicHeight(12),
			},
			icon: 'path://M801.171 547.589H222.83c-17.673 0-32-14.327-32-32s14.327-32 32-32h578.341c17.673 0 32 14.327 32 32s-14.327 32-32 32z',
		},
		grid: {
			left: 0,
			right: 0,
			top: 40,
			bottom: 10,
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
				type: 'category',
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(230, 230, 230, 1)',
					},
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					color: '#fff',
					margin: 6,
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 255, 255, 0.5)',
						type: 'dashed',
					},
				},
				boundaryGap: ['5%', '5%'],
				data: xData,
			},
		],
		yAxis: [
			{
				type: 'value',
				name: 'm3/s',
				axisLabel: {
					color: 'rgba(0, 255, 0, 1)',
					margin: 6,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(0, 255, 0, 1)',
					},
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 255, 255, 0.5)',
						type: 'dashed',
					},
				},
			},
			{
				type: 'value',
				position: 'left',
				name: '',
				axisLabel: {
					color: 'rgba(0, 255, 255, 1)',
					margin: 6,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(0, 255, 255, 1)',
					},
				},
				splitLine: {
					show: false,
				},
				offset: -40,
			},
			{
				type: 'value',
				name: '',
				position: 'right',
				axisLabel: {
					color: 'rgba(255, 0, 255, 1)',
					margin: 6,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 0, 255, 1)',
					},
				},
				splitLine: {
					show: false,
				},
				offset: -40,
			},
			{
				type: 'value',
				name: '',
				position: 'right',
				axisLabel: {
					color: 'rgba(255, 150, 0, 1)',
					margin: 6,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 150, 0, 1)',
					},
				},
				splitLine: {
					show: false,
				},
				offset: 0,
			},
		],
		series: [
			{
				// 通风阻力
				name: legends[0],
				type: 'line',
				smooth: true,
				symbol: 'none',
				itemStyle: {
					color: colors[0],
					borderWidth: 2,
				},
				yAxisIndex: 0,
				data: yData[0],
			},
			{
				// 全压
				name: legends[1],
				type: 'line',
				smooth: true,
				symbol: 'none',
				itemStyle: {
					color: colors[1],
					borderWidth: 2,
				},
				yAxisIndex: 1,
				data: yData[1],
			},
			{
				// 效率
				name: legends[2],
				type: 'line',
				smooth: true,
				symbol: 'none',
				itemStyle: {
					color: colors[2],
					borderWidth: 2,
				},
				yAxisIndex: 2,
				data: yData[2],
			},
			{
				// 功率
				name: legends[3],
				type: 'line',
				smooth: true,
				symbol: 'none',
				itemStyle: {
					color: colors[3],
					borderWidth: 2,
				},
				yAxisIndex: 3,
				data: yData[3],
			},
		],
	}
}
//温振监测分析
export function fanChart2({
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
}) {
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
	return {
		title: {
			text: title,
			textStyle: {
				color: 'rgba(75, 200, 252, 1)',
				fontSize: dynamicHeight(11),
				fontWeight: 400,
			},
			right: '0',
		},
		legend: {
			data: legends,
			x: legendPosition,
			textStyle: {
				color: '#fff',
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
					fontSize: dynamicHeight(11),
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
					fontSize: dynamicHeight(14),
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
					fontSize: dynamicHeight(11),
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
					fontSize: dynamicHeight(14),
				},
			},
		],
		series: seriesData,
	}
}
