import echarts from '@/utils/echarts'

import { isNull } from '@/utils/ruoyi'

const colorMap = new Map([
	[1, ['#00ff00']],
	[2, ['#0000ff', '#00ff00']],
	[3, ['#0000ff', '#ff00ff', '#00ff00']],
])

/**
 * @param {Object} domId
 * @param {Object} dataList
 * @param {Object} LegendList
 * @param xData
 * @param aName
 * @param xName
 */
export function getMoreLineMap(
	domId: string,
	dataList: any[],
	LegendList: any[],
	xData: any,
	aName: string,
	xName: string,
) {
	const charEle = document.getElementById(domId) as HTMLElement
	let myChart = echarts.init(charEle)
	aName = !isNull(aName) ? aName : ''
	xName = !isNull(xName) ? xName : ''
	let seriesList: { name: any; type: string; data: any }[] = []
	dataList.forEach((i: any, index: number) => {
		seriesList.push({
			name: LegendList[index],
			type: 'line',
			data: i,
		})
	})
	let option = {
		grid: {
			top: '15%',
			left: '2%',
			right: '2%',
			bottom: '5%',
			containLabel: true,
		},
		legend: {
			data: LegendList,
			top: 10,
			textStyle: {
				color: '#ccc',
				fontSize: 14,
			},
		},
		color: colorMap.get(LegendList.length),
		tooltip: {
			trigger: 'axis',
		},
		// x轴时间轴
		xAxis: {
			name: xName,
			type: 'category',
			data: xData,
			axisLine: {
				lineStyle: {
					color: '#fff',
				},
			},
		},
		dataZoom: [
			{
				type: 'inside',
				start: 0,
				end: 100,
			},
			{
				start: 0,
				end: 100,
				textStyle: {
					color: '#fff',
					fontSize: 14,
				},
			},
		],
		yAxis: {
			name: aName,
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#fff',
				},
			},
			splitLine: {
				show: false,
			},
		},
		// y轴
		series: seriesList,
	}
	myChart.setOption(option)
	// 自适应
	window.addEventListener('resize', () => {
		myChart.resize()
	})
}

/**
 * @param {Object} domId
 * @param {Object} dataList
 * @param {Object} LegendList
 * @param xData
 * @param aName
 * @param markLineData
 */
export function getMoreLineMapMarkLine(
	domId: string,
	dataList: any[],
	LegendList: any[],
	xData: any,
	aName: string,
	markLineData: string | any[],
) {
	const charEle = document.getElementById(domId) as HTMLElement
	let myChart = echarts.init(charEle)
	aName = !isNull(aName) ? aName : ''
	let seriesList: any[] = []
	dataList.forEach((i: any, index: number) => {
		seriesList.push({
			name: LegendList[index],
			type: 'line',
			data: i,
		})
	})
	//处理竖线
	let formattingMarkLine: any[] = []
	for (let i = 0; i < markLineData.length; i++) {
		let independentData = markLineData[i]
		for (let j = 0; j < independentData.length; j++) {
			if (!formattingMarkLine[j]) formattingMarkLine.push([])
			formattingMarkLine[j][i] = independentData[j]
		}
	}
	let markLine: any = {
		symbol: 'none',
		data: [],
		lineStyle: {
			type: 'solid',
			color: '#e01f54',
		},
	}
	formattingMarkLine.forEach((i: any, _index: number) => {
		markLine.data.push([
			{ xAxis: i[0] + '', yAxis: 0, symbol: 'circle', symbolSize: 1 },
			{ xAxis: i[0] + '', yAxis: i[1] / 2, symbol: 'circle', symbolSize: 1 },
			{
				label: {
					position: 'end',
					formatter: (_value: any) => {
						return (i[2] + '').split('').join('\n')
					},
					color: '#e01f54',
					fontWeight: 'bold',
				},
			},
		])
	})
	seriesList.push({
		symbolSize: 1, // 配置折线拐点的大小
		symbol: 'circle', // 配置折线拐点为实心
		type: 'scatter',
		xAxisIndex: 1,
		yAxisIndex: 1,
		data: markLineData[1],
		markLine: markLine,
	})
	let option = {
		grid: {
			top: '5%',
			left: '2%',
			right: '2%',
			bottom: '5%',
			containLabel: true,
		},
		legend: {
			data: LegendList,
			textStyle: {
				color: '#ccc',
				fontSize: 14,
			},
		},
		color: colorMap.get(LegendList.length),
		tooltip: {
			trigger: 'axis',
		},
		// x轴时间轴
		xAxis: [
			{
				name: '',
				type: 'category',
				data: xData,
				axisLine: {
					lineStyle: {
						color: '#fff',
					},
				},
			},
			{
				show: false,
				type: 'category',
				data: markLineData[0],
				offset: 25, //偏移的位置
				axisPointer: { type: 'none' }, //将表格线取消
				axisTick: { show: false },
				axisLine: { show: false },
				position: 'bottom', //x轴的位置，
				splitLine: {
					show: false,
				},
			},
		],
		dataZoom: [
			{
				type: 'inside',
				start: 0,
				end: 100,
				xAxisIndex: [0, 1], //表示x轴折叠
			},
			{
				start: 0,
				end: 100,
				textStyle: {
					color: '#fff',
					fontSize: 14,
				},
			},
		],
		yAxis: [
			{
				name: aName,
				type: 'value',
				axisLine: {
					lineStyle: {
						color: '#fff',
					},
				},
				splitLine: {
					show: false,
				},
			},
			{
				name: aName,
				show: false,
				type: 'value',
				axisLine: {
					lineStyle: {
						color: '#fff',
					},
				},
				splitLine: {
					show: false,
				},
			},
		],
		// y轴
		series: seriesList,
	}
	myChart.setOption(option)
	// 自适应
	window.addEventListener('resize', () => {
		myChart.resize()
	})
}

export interface MonitoringAndAnalysisLineOptions {
	title: string
	yAxisUnit: string | number
	legendData: any[]
	xAxisData: any[]
	xData: any[]
	yData: any[]
	zData: any[]
	warning?: any[]
	warnings?: any[]
	warns?: any[]
}

//监测分析折线图
export function getMonitoringAndAnalysisLine({
	title,
	yAxisUnit,
	legendData,
	xAxisData,
	xData,
	yData,
	zData,
	warning,
	warnings,
	warns,
}: MonitoringAndAnalysisLineOptions) {
	return {
		title: {
			text: title,
		},
		xAxis: {
			data: xAxisData,
			boundaryGap: true,
			axisLine: {
				lineStyle: {
					color: '#61BEFF',
					width: 1,
				},
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#FFFFFF', //这里用参数代替了
				},
			},
		},
		grid: {
			left: 20,
			right: 10,
			bottom: 20,
			top: 50,
			containLabel: true,
		},
		color: colorMap.get(legendData.length),
		itemStyle: {
			color: '#61BEFF',
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
			padding: [10, 10],
		},
		yAxis: {
			name: yAxisUnit,
			axisTick: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: '#61BEFF',
					width: 1,
				},
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#fff', //这里用参数代替了
				},
			},
		},
		toolbox: {
			show: true,
			feature: {
				saveAsImage: {
					backgroundColor: 'rgba(0,83,168,0.5)',
					iconStyle: {
						borderColor: '#ffffff',
					},
					emphasis: {
						iconStyle: {
							borderColor: '#ffffff',
						},
					},
				},
			},
		},
		legend: {
			data: legendData,
			top: 5,
			textStyle: {
				fontSize: 12,
				color: '#FFFFFF',
			},
		},
		series: [
			{
				name: legendData[0],
				smooth: true,
				type: 'line',
				data: xData,
				markLine: {
					data: warning,
				},
			},
			{
				name: legendData[1],
				smooth: true,
				type: 'line',
				data: yData,
				markLine: {
					data: warnings,
				},
			},
			{
				name: legendData[2],
				smooth: true,
				type: 'line',
				data: zData,
				markLine: {
					data: warns,
				},
			},
		],
	}
}

//首页饼状图
export function getHomePieChart(domId: string, dataList: any[], deviceAll: any) {
	const charEle = document.getElementById(domId) as HTMLElement
	let myChart = echarts.init(charEle)
	let option = {
		tooltip: {
			show: false,
			trigger: 'item',
		},
		legend: {
			selectedMode: false,
			orient: 'vertical',
			right: '1%',
			top: 'center',
			itemWidth: 15,
			itemHeight: 15,
			textStyle: {
				color: '#82CBFF',
				fontSize: 13,
			},
			formatter: (name: any) => {
				if (dataList.length) {
					const item = dataList.filter((item: { name: any }) => item.name === name)[0]
					return `${name}  ${item.value}  ${item.percentage}`
				}
			},
		},
		title: [
			{
				text: '设备总数',
				x: '22%',
				top: '55%',
				textStyle: {
					color: '#ffffff',
					fontSize: 14,
					fontFamily: 'Adobe Heiti Std R',
					fontWeight: 'normal',
				},
			},
			{
				text: deviceAll,
				x: '25%',
				y: '40%',
				textStyle: {
					fontSize: '26',
					color: '#ffffff',
					fontFamily: 'Adobe Heiti Std R',
					fontWeight: 'normal',
				},
			},
		],
		series: [
			{
				name: '',
				type: 'pie',
				radius: ['40%', '90%'],
				center: ['30%', '50%'],
				roseType: 'area',
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					color: (list: { dataIndex: number }) => {
						const colorList = [
							{
								colorStart: '#0487ED',
								colorEnd: '#0FD5F9',
							},
							{
								colorStart: '#FD6865',
								colorEnd: '#f8b2b1',
							},
							{
								colorStart: '#FFCD5E',
								colorEnd: '#FF9000',
							},
							{
								colorStart: '#C1C049',
								colorEnd: '#FFFE95',
							},
							{
								colorStart: '#932AE1',
								colorEnd: '#EE7CFF',
							},
						]
						return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
							{
								//左、下、右、上
								offset: 0,
								color: colorList[list.dataIndex]['colorStart'],
							},
							{
								offset: 1,
								color: colorList[list.dataIndex]['colorEnd'],
							},
						])
					},
				},
				label: {
					show: false,
					position: 'inside',
				},
				emphasis: {
					label: {
						show: false,
					},
				},
				labelLine: {
					show: false,
				},

				data: dataList,
			},
		],
	}
	myChart.setOption(option)
	// 自适应
	window.addEventListener('resize', () => {
		myChart.resize()
	})
}
