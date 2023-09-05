import echarts from '@/utils/echarts/index'
import useCharts from '@/hooks/useCharts'
import { dynamicHeight } from '@/utils/ruoyi'

export function getChart1(domId, value) {
	const { option } = useCharts(domId)
	const colorLeftAlpha = ['#00FCF788', '#00FCF70c']
	const color1 = {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 1,
		y2: 1,
		colorStops: [
			{
				offset: 0,
				color: 'rgba(255,255,255,0.1)',
			},
			{
				offset: 1,
				color: 'rgba(255,255,255,0.3)',
			},
		],
		global: false,
	}
	const color2 = {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 1,
		y2: 1,
		colorStops: [
			{
				offset: 0,
				color: 'rgba(0, 255, 255, 0.8)',
			},
			{
				offset: 1,
				color: 'rgba(0, 255, 255, 1)',
			},
		],
		global: false,
	}

	option.value = {
		series: [
			// 外侧灰色轴线
			{
				type: 'gauge',
				radius: '80%', // 位置
				center: ['50%', '65%'],
				min: 0,
				max: 100,
				startAngle: 180,
				endAngle: 0,
				axisLine: {
					show: true,
					lineStyle: {
						// 轴线样式
						width: 2, // 宽度
						color: [[1, 'rgba(229,229,229,0.3)']], // 颜色
					},
				},
				axisTick: {
					// 刻度
					show: false,
				},
				splitLine: {
					// 分割线
					show: false,
				},
				axisLabel: {
					// 刻度标签
					show: false,
				},
				pointer: {
					// 仪表盘指针
					show: false,
				},
				detail: {
					// 仪表盘详情
					show: false,
				},
			},
			{
				name: '内部阴影',
				type: 'gauge',
				radius: '70%',
				center: ['50%', '65%'],
				splitNumber: 10,
				startAngle: 180,
				endAngle: 0,
				axisLine: {
					lineStyle: {
						color: [
							[
								value / 100,
								new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: colorLeftAlpha[0],
									},
									{
										offset: 1,
										color: colorLeftAlpha[1],
									},
								]),
							],
							[1, 'rgba(33, 232, 255, 0)'],
						],
						width: 30,
					},
				},
				axisLabel: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				itemStyle: {
					show: false,
				},
			},
			{
				name: '内部小圆',
				type: 'gauge',
				radius: '72%',
				center: ['50%', '65%'],
				startAngle: 180,
				endAngle: 0,
				splitNumber: 10,
				axisLine: {
					lineStyle: {
						color: [
							[value / 100, color2],
							[1, '#5098ed'],
						],
						width: 10,
					},
				},
				axisLabel: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				itemStyle: {
					show: false,
				},
			},
			{
				name: '外部刻度',
				type: 'gauge',
				radius: '70%',
				center: ['50%', '65%'],
				min: 0, //最小刻度
				max: 100, //最大刻度
				splitNumber: 10, //刻度数量
				startAngle: 180,
				endAngle: 0,
				axisLine: {
					show: true,
					lineStyle: {
						width: 1,
						color: [[1, 'rgba(0,0,0,0)']],
					},
				}, //仪表盘轴线
				axisLabel: {
					show: true,
					color: '#ffffff',
					fontSize: dynamicHeight(14),
					fontFamily: 'SourceHanSansSC-Regular',
					fontWeight: 'bold',
					// position: "top",
					distance: -30,
					formatter: function (v) {
						switch (v + '') {
							case '0':
								return '0'
							case '10':
								return '10'
							case '20':
								return '20'
							case '30':
								return '30'
							case '40':
								return '40'
							case '50':
								return '50'
							case '60':
								return '60'
							case '70':
								return '70'
							case '80':
								return '80'
							case '90':
								return '90'
							case '100':
								return '100'
						}
					},
				}, //刻度标签。
				axisTick: {
					show: true,
					splitNumber: 3,
					lineStyle: {
						color: color1, //用颜色渐变函数不起作用
						width: 1,
					},
					length: -6,
				}, //刻度样式
				splitLine: {
					show: false,
					length: -12,
					lineStyle: {
						color: color1, //用颜色渐变函数不起作用
					},
				}, //分隔线样式
				detail: {
					show: false,
				},
			},
			// 中间白色半圆
			{
				type: 'gauge',
				radius: '40%', // 位置
				center: ['50%', '65%'],
				min: 0,
				max: 100,
				startAngle: 180,
				endAngle: 0,
				axisLine: {
					show: true,
					lineStyle: {
						// 轴线样式
						width: 120, // 宽度
						color: [
							[
								1,
								new echarts.graphic.RadialGradient(0.5, 1, 1, [
									{
										offset: 1,
										color: 'rgba(229, 229, 229,0.15)',
									},
									{
										offset: 0.72,
										color: 'rgba(229, 229, 229,0.05)',
									},
									{
										offset: 0.7,
										color: 'rgba(229, 229, 229,0.4)',
									},
									{
										offset: 0.401,
										color: 'rgba(229, 229, 229,0.05)',
									},
									{
										offset: 0.4,
										color: 'rgba(229, 229, 229,0.8)',
									},
									{
										offset: 0,
										color: 'rgba(229, 229, 229,0.8)',
									},
								]),
							],
						], // 颜色
					},
				},
				axisTick: {
					// 刻度
					show: false,
				},
				splitLine: {
					// 分割线
					show: false,
				},
				axisLabel: {
					// 刻度标签
					show: false,
				},
				pointer: {
					// 仪表盘指针
					show: false,
				},
				detail: {
					// 仪表盘详情
					show: false,
				},
			},
			{
				type: 'gauge',
				radius: '78%', // 位置
				center: ['50%', '65%'],
				min: 0,
				max: 100,
				startAngle: 180,
				endAngle: 0,
				axisLine: {
					show: false,
				},
				data: [
					{
						value: value,
						name: '当前开度',
					},
				],
				pointer: {
					// 仪表盘指针
					show: true,
					length: '75%',
					radius: '20%',
					width: 3, //指针粗细
				},
				itemStyle: {
					color: 'rgba(255,255,255,0)',
					borderColor: '#f3f5f6',
					borderWidth: '2',
					borderType: 'solid',
				},
				axisTick: {
					// 刻度
					show: false,
				},
				splitLine: {
					// 分割线
					show: false,
				},
				axisLabel: {
					// 刻度标签
					show: false,
				},
				detail: {
					// 仪表盘详情
					show: true,
					formatter: function (value) {
						return value + '%'
					},
					offsetCenter: ['0%', '30%'],
					fontSize: dynamicHeight(18),
					color: '#08b5d6',
				},
				title: {
					show: true,
					offsetCenter: [0, '50%'],
					color: '#fff',
					fontSize: dynamicHeight(14),
				},
			},
		],
	}
}

export function getChart2(domId, value) {
	const { option } = useCharts(domId)
	const dataArr = value
	const startAngle = -120
	option.value = {
		series: [
			{
				type: 'gauge',
				splitNumber: 120,
				radius: '80%',
				center: ['35%', '45%'],
				startAngle: startAngle,
				endAngle: 360 + startAngle,
				axisLine: {
					show: false,
					lineStyle: {
						color: [
							[dataArr / 100, '#07FCFF'],
							[1, '#095286'],
						],
						fontSize: dynamicHeight(14),
					},
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: true,
					length: 10,
					lineStyle: {
						color: 'auto',
						width: 2,
					},
				},
				axisLabel: {
					show: false,
				},
				pointer: {
					// 仪表盘指针
					show: false,
				},
				detail: {
					fontSize: dynamicHeight(28),
					offsetCenter: [0, 0],
					valueAnimation: true,
					formatter: '{value}%' + '\n {icon|面积率}',
					color: '#ffffff',
					rich: {
						icon: {
							fontSize: dynamicHeight(16),
							color: '#ffffff',
						},
					},
				},
				data: [
					{
						value: dataArr,
						name: '当前面积',
					},
				],
				title: {
					show: true,
					offsetCenter: ['40%', '105%'],
					color: '#fff',
					fontSize: dynamicHeight(14),
				},
			},
		],
	}
}

export function getChart3(domId, value, title, title2) {
	const { option } = useCharts(domId)
	const dataArr = value
	option.value = {
		title: [
			{
				text:
					'{title|' +
					title2 +
					'}' +
					'\n{range|(324-610)}' +
					'\n{num|' +
					dataArr +
					'}' +
					'{icon|m³/min}',
				x: '50%',
				y: '30%',
				textAlign: 'center',
				textStyle: {
					rich: {
						title: {
							fontSize: dynamicHeight(16),
							fontFamily: 'Adobe Heiti Std',
							color: '#FFFFFF',
							lineHeight: dynamicHeight(25),
						},
						range: {
							fontSize: dynamicHeight(12),
							fontFamily: 'Adobe Heiti Std',
							color: '#FFFFFF',
							lineHeight: dynamicHeight(30),
						},
						num: {
							fontWeight: '500',
							color: '#07FCFF',
							fontFamily: '微软雅黑',
							fontSize: dynamicHeight(30),
							lineHeight: dynamicHeight(60),
						},
						icon: {
							fontSize: dynamicHeight(16),
							color: '#07FCFF',
							fontFamily: '微软雅黑',
						},
					},
				},
			},
			{
				text: title,
				left: 'center',
				top: '85%',
				textStyle: {
					color: '#FFFFFF',
					fontSize: dynamicHeight(18),
					fontFamily: 'Adobe Heiti Std',
					fontWeight: 'normal',
				},
			},
		],
		series: [
			{
				type: 'gauge',
				radius: '90%', // 1行3个
				center: ['50%', '65%'],
				splitNumber: 10,
				// min: 0,
				max: 100,
				startAngle: 180,
				endAngle: 0,
				z: 99,
				// 线
				axisLine: {
					lineStyle: {
						width: 1,
						color: [[1, 'rgba(255,255,255,0)']],
					},
				},
				//刻度标签。
				axisTick: {
					show: false,
				},
				splitLine: {
					//文字和刻度的偏移量
					show: false,
				},
				// //刻度线文字
				axisLabel: {
					show: false,
				},
				data: [
					{
						value: dataArr,
						name: 'SCORE',
						itemStyle: {
							color: '#56E4FF',
						},
					},
				],
				pointer: {
					show: true,
					icon: 'path://M514.048 128q79.872 0 149.504 30.208t121.856 82.432 82.432 122.368 30.208 150.016q0 78.848-30.208 148.48t-82.432 121.856-121.856 82.432-149.504 30.208-149.504-30.208-121.856-82.432-82.432-121.856-30.208-148.48q0-79.872 30.208-150.016t82.432-122.368 121.856-82.432 149.504-30.208z',
					width: 15,
					length: 15, // 指针长度
					offsetCenter: [0, '-90%'],
					itemStyle: {
						color: '#56E4FF',
						shadowColor: '#56E4FF',
						shadowBlur: 5,
						shadowOffsetY: 2,
					},
				},
				detail: {
					show: false,
				},
				title: {
					// 仪表盘标题。
					show: false,
				},
			},
			{
				type: 'pie',
				radius: ['85%', '90%'],
				center: ['50%', '65%'],
				startAngle: 180,
				endAngle: 0,
				color: [
					{
						type: 'linear',
						x: 1,
						y: 0,
						x2: 0,
						y2: 0,
						colorStops: [
							{
								offset: 0,
								color: '#55E4FF', // 0% 处的颜色
							},
							{
								offset: 1,
								color: '#0F4CFF', // 100% 处的颜色
							},
						],
					},
					'transparent',
				],
				legendHoverLink: false,
				z: 10,
				labelLine: {
					show: false,
				},
				data: [
					{
						value: (50 * dataArr) / 100,
					},
					{
						value: 100 - (50 * dataArr) / 100,
					},
				],
			},
			{
				type: 'pie',
				label: {
					show: false,
				},
				center: ['50%', '65%'],
				radius: ['0%', '80%'],
				startAngle: 180,
				data: [
					{
						value: 100,
						itemStyle: {
							color: {
								type: 'radial',
								x: 0.5,
								y: 0.5,
								r: 0.5,
								colorStops: [
									{ offset: 0, color: '#019FFF' },
									{ offset: 1, color: '#019FFF' },
								],
							},
							opacity: 0.2,
						},
					},
					{
						value: 100,
						color: 'transparent',
					},
				],
			},
		],
	}
}

export function getChart4(domId, value, title) {
	const { option } = useCharts(domId)
	const dataArr = value
	const colorLeftAlpha = ['#00FCF788', '#00FCF70c']
	option.value = {
		title: [
			{
				text: title,
				left: 'center',
				top: '85%',
				textStyle: {
					color: '#FFFFFF',
					fontSize: dynamicHeight(18),
					fontFamily: 'Adobe Heiti Std',
					fontWeight: 'normal',
				},
			},
		],
		series: [
			{
				min: 0,
				max: 120,
				radius: '75%',
				type: 'gauge',
				axisLine: {
					lineStyle: {
						width: 10,
						color: [
							[0.3, '#67e0e3'],
							[0.7, '#37a2da'],
							[1, '#fd666d'],
						],
					},
				},
				pointer: {
					// 仪表盘指针
					show: true,
					length: dynamicHeight(88),
					width: 5, //指针粗细
				},

				axisTick: {
					distance: 0,
					length: 5,
					lineStyle: {
						color: '#35b8d8',
						width: 2,
					},
				},
				splitLine: {
					distance: 0,
					length: 5,
					lineStyle: {
						color: '#35b8d8',
						width: 2,
					},
				},
				axisLabel: {
					color: '#3488db',
					distance: 15,
					fontSize: dynamicHeight(12),
				},
				detail: {
					fontSize: dynamicHeight(17),
					offsetCenter: [0, '70%'],
					valueAnimation: true,
					formatter: '{value} km/h',
					color: '#ffffff',
				},
				data: [
					{
						value: dataArr,
					},
				],
			},
		],
	}
}
//湿度温度
export function getChart5(domId, type, value, title) {
	let myChart = echarts.init(document.getElementById(domId))
	const colors =
		type === '1' ? ['#22baf8', '#173c5e', '#0a92f6'] : ['#fbc573', '#7f7177', '#fab777']
	let option = {
		title: {
			text: '{a|' + value + '}',
			x: 'center',
			y: 'center',
			textStyle: {
				rich: {
					a: {
						fontSize: 20,
						color: '#ffffff',
						fontWeight: '400',
					},
				},
			},
		},
		graphic: {
			elements: [
				{
					type: 'image',
					z: 4,
					style: {
						image: type === '1' ? chartsIcon1 : chartsIcon2,
						width: 42,
						height: 42,
					},
					left: 'center',
					top: 'center',
					silent: true,
				},
				{
					type: 'text',
					z: 4,
					style: {
						text: type === '1' ? '%RH' : '℃',
						fill: 'rgba(46, 251, 255, 1)',
						font: '13px "MicrosoftYaHei", sans-serif',
					},
					silent: true,
					left: 'center',
					bottom: '30%',
				},
				{
					type: 'text',
					z: 4,
					style: {
						text: title,
						fill: 'rgba(255, 255, 255, 1)',
						font: '18px "Adobe Heiti Std R", sans-serif',
					},
					silent: true,
					left: 'center',
					bottom: '1%',
				},
			],
		},
		series: [
			{
				type: 'gauge',
				radius: '60%',
				center: ['50%', '50%'],
				clockwise: false,
				startAngle: '90',
				endAngle: '-270',
				splitNumber: 40,
				detail: {
					offsetCenter: [0, 0],
					formatter: ' ',
				},
				pointer: {
					show: false,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: [
							[0, colors[1]],
							[
								38 / 100,
								new echarts.graphic.LinearGradient(0, 0, 1, 0, [
									{
										offset: 0,
										color: colors[0],
									},
									{
										offset: 0.3,
										color: colors[0],
									},
									{
										offset: 1,
										color: colors[1],
									},
								]),
							],
							[1, colors[1]],
						],
						width: 8,
						shadowColor: 'rgba(33, 174, 234, 0)',
						shadowBlur: 0,
					},
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: true,
					length: 8,
					distance: -8,
					lineStyle: {
						shadowBlur: 10,
						shadowColor: 'rgba(0, 255, 255, 0)',
						shadowOffsetY: '0',
						color: '#020f18',
						width: 1,
					},
				},
				axisLabel: {
					show: false,
				},
			},
			{
				type: 'pie',
				radius: ['44%', '48%'],
				itemStyle: {
					color: colors[1],
				},
				label: {
					show: false,
				},
				data: _dashed(),
			},
			{
				type: 'pie',
				radius: ['70%', '71.5%'],
				itemStyle: {
					shadowBlur: 20,
					shadowColor: colors[0],
					color: colors[2],
				},
				label: {
					show: false,
				},
				data: [100],
			},
			{
				type: 'pie',
				radius: ['61%', '61.5%'],
				itemStyle: {
					shadowBlur: 0,
					shadowColor: colors[1],
					color: colors[0],
				},
				label: {
					show: false,
				},
				data: [100],
			},
			{
				type: 'pie',
				radius: ['68%', '69.5%'],
				itemStyle: {
					shadowBlur: 0,
					shadowColor: colors[0],
					color: colors[1],
				},
				label: {
					show: false,
				},
				data: [100],
			},
		],
	}

	myChart.setOption(option)
	// 自适应
	window.addEventListener('resize', () => {
		myChart.resize()
	})

	function _dashed() {
		let dataArr = []
		for (let i = 0; i < 100; i++) {
			if (i % 2 === 0) {
				dataArr.push({
					name: (i + 1).toString(),
					value: 10,
					itemStyle: {
						color: colors[1],
					},
				})
			} else {
				dataArr.push({
					name: (i + 1).toString(),
					value: 50,
					itemStyle: {
						color: 'rgb(0,0,0,0)',
						borderWidth: 1,
						borderColor: colors[2],
					},
				})
			}
		}
		return dataArr
	}

	function doing() {
		let option = myChart.getOption()
		option.series[1].startAngle = option.series[1].startAngle - 1
		myChart.setOption(option)
	}
	let timer
	function startTimer() {
		timer = setInterval(doing, 100)
	}
	setTimeout(startTimer, 1000)
}
// 监测曲线
export function getLineChartOption(domId, names, lineX, value) {
	const { option } = useCharts(domId)
	let charts = {
		names: names,
		lineX: lineX,
		value: value,
	}
	let color = ['rgba(108, 61, 226', 'rgba(29, 255, 243', 'rgba(255, 0, 255', 'rgba(3, 125, 220']
	let yAxis = [
		{
			type: 'value',
			position: 'left',
			axisLabel: {
				color: 'rgba(108, 61, 226, 1)',
				fontSize: dynamicHeight(14),
			},
			splitLine: {
				show: false,
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: 'rgba(108, 61, 226, 1)',
				},
			},
		},
		{
			type: 'value',
			position: 'right',
			offset: 0,
			axisLabel: {
				formatter: '{value}',
				color: 'rgba(29, 255, 243, 1)',
				fontSize: dynamicHeight(14),
			},
			splitLine: {
				show: false,
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: 'rgba(29, 255, 243, 1)',
				},
			},
		},
		{
			type: 'value',
			position: 'right',
			offset: 35,
			axisLabel: {
				formatter: '{value}',
				color: 'rgba(255, 0, 255, 1)',
				fontSize: dynamicHeight(12),
			},
			splitLine: {
				show: false,
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: 'rgba(255, 0, 255, 1)',
				},
			},
		},
		{
			type: 'value',
			position: 'right',
			offset: 65,
			axisLabel: {
				formatter: '{value}',
				color: 'rgba(3, 125, 220, 1)',
				fontSize: dynamicHeight(14),
			},
			splitLine: {
				show: false,
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: 'rgba(3, 125, 220, 1)',
				},
			},
		},
	]
	let lineY = []
	for (let i = 0; i < charts.names.length; i++) {
		let x = i
		if (x > color.length - 1) {
			x = color.length - 1
		}
		let data = {
			name: charts.names[i],
			type: 'line',
			color: color[x] + ')',
			smooth: true,
			yAxisIndex: i,
			showSymbol: false,
			areaStyle: {
				color: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[
						{
							offset: 0,
							color: color[x] + ', 0.5)',
						},
						{
							offset: 0.8,
							color: color[x] + ', 0)',
						},
					],
					false,
				),
				shadowColor: 'rgba(0, 0, 0, 0.1)',
				shadowBlur: 10,
			},
			symbol: 'circle',
			symbolSize: 5,
			data: charts.value[i],
		}
		lineY.push(data)
	}

	option.value = {
		tooltip: {
			trigger: 'axis',
		},
		legend: {
			data: charts.names,
			textStyle: {
				fontSize: dynamicHeight(12),
				color: 'rgb(0,253,255,0.6)',
			},
			right: '4%',
		},
		grid: {
			top: '14%',
			left: '4%',
			right: '4%',
			bottom: '12%',
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: charts.lineX,
			axisLabel: {
				color: 'rgb(0,253,255,0.6)',
				formatter: function (params) {
					return params.split(' ')[0]
				},
			},
		},
		yAxis: yAxis,
		series: lineY,
	}
}
