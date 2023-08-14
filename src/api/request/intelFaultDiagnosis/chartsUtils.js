import echarts from '@/utils/echarts/index'
import useCharts from '@/hooks/useCharts'

export const colors = ['#E93654', '#F36C04', '#F8D364', '#10D2F0', '#10A1F0']

//饼图
export function getType1PieChart(domId, data) {
	const { option } = useCharts(domId)

	const legends = data.map((i) => i.name)

	option.value = {
		color: ['#EAEA4B', '#FFAD58', '#3DD1F9', '#27E17E', '#FE5656', '#906BF9'],
		grid: {
			left: 0,
			top: 0,
			bottom: 10,
			right: 10,
			containLabel: true,
		},
		tooltip: {
			trigger: 'item',
			formatter: '{b} : {c} ({d}%)',
		},
		legend: {
			type: 'scroll',
			orient: 'vartical',
			top: 'center',
			right: '15',
			itemWidth: 16,
			itemHeight: 8,
			itemGap: 16,
			textStyle: {
				color: '#A3E2F4',
				fontSize: 16,
				fontWeight: 0,
			},
			data: legends,
		},
		polar: {
			center: ['40%', '50%'],
		},
		angleAxis: {
			interval: 1,
			type: 'category',
			data: [],
			z: 10,
			axisLine: {
				show: false,
				lineStyle: {
					color: '#0B4A6B',
					width: 1,
					type: 'solid',
				},
			},
			axisLabel: {
				interval: 0,
				show: true,
				color: '#0B4A6B',
				margin: 8,
				fontSize: 16,
			},
		},
		radiusAxis: {
			min: 40,
			max: 120,
			interval: 20,
			axisLine: {
				show: false,
				lineStyle: {
					color: '#0B3E5E',
					width: 1,
					type: 'solid',
				},
			},
			axisLabel: {
				formatter: '{value} %',
				show: false,
				padding: [0, 0, 20, 0],
				color: '#0B3E5E',
				fontSize: 16,
			},
			splitLine: {
				lineStyle: {
					color: '#0B3E5E',
					width: 2,
					type: 'solid',
				},
			},
		},
		calculable: true,
		series: [
			{
				center: ['40%', '50%'],
				type: 'pie',
				radius: ['5%', '10%'],
				labelLine: {
					show: false,
					length: 30,
					length2: 55,
				},
				data: [
					{
						name: '',
						value: 0,
						itemStyle: {
							color: '#0B4A6B',
						},
					},
				],
			},
			{
				center: ['40%', '50%'],
				type: 'pie',
				radius: ['90%', '95%'],
				labelLine: {
					show: false,
					length: 30,
					length2: 55,
				},
				name: '',
				data: [
					{
						name: '',
						value: 0,
						itemStyle: {
							color: '#0B4A6B',
						},
					},
				],
			},
			{
				center: ['40%', '50%'],
				stack: 'a',
				type: 'pie',
				radius: ['20%', '80%'],
				roseType: 'area',
				zlevel: 10,
				label: {
					show: true,
					color: '#A2CCDB',
					fontFamily: 'Adobe Heiti Std',
					formatter: '{c}',
					fontSize: 12,
					position: 'outside',
				},
				labelLine: {
					show: true,
					length: 10,
					length2: 40,
				},
				data: data,
			},
		],
	}
}

// 横向渐变柱图
export function getCrosswiseBarChart(domId, data) {
	const { option } = useCharts(domId)

	const dataName = data.map((i) => {
		return i.name
	})
	let data1 = []
	data.forEach((i, index) => {
		let color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
			{
				offset: 0,
				color: 'rgba(54,69,129,0)',
			},
			{
				offset: 0.98,
				color: colors[index],
			},
			{
				offset: 1,
				color: 'rgba(255,255,255,0.5)',
			},
		])
		data1.push({
			name: i.name,
			value: i.value,
			itemStyle: {
				borderRadius: [0, 30, 30, 0],
				shadowColor: colors[index],
				fontSize: 14,
				shadowBlur: 5,
				color: color,
			},
		})
	})
	option.value = {
		grid: {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			containLabel: true,
		},
		xAxis: {
			show: false,
			type: 'value',
		},
		yAxis: [
			{
				type: 'category',
				inverse: true,
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},

				axisLabel: {
					rich: {
						nt0: {
							color: '#fff',
							fontSize: 18,
							width: 38,
							height: 38,
							align: 'center',
							backgroundColor: colors[0],
						},
						nt1: {
							color: '#fff',
							fontSize: 18,
							width: 38,
							height: 38,
							align: 'center',
							backgroundColor: colors[1],
						},
						nt2: {
							color: '#fff',
							fontSize: 18,
							width: 38,
							height: 38,
							align: 'center',
							backgroundColor: colors[2],
						},
						nt3: {
							color: '#fff',
							fontSize: 18,
							width: 38,
							height: 38,
							align: 'center',
							backgroundColor: colors[3],
						},
						nt4: {
							color: '#fff',
							fontSize: 18,
							width: 38,
							height: 38,
							align: 'center',
							backgroundColor: colors[4],
						},
					},
					color: '#fff',
					fontSize: 18,
					formatter: (val, index) => {
						return `{nt${index}| ${index + 1}}`
					},
				},

				data: dataName,
			},
			{
				type: 'category',
				inverse: true,
				axisTick: 'none',
				axisLine: 'none',
				show: true,
				axisLabel: {
					color: '#A2CCDB',
					fontSize: '14',
				},
				data: data1,
			},
		],
		series: [
			{
				name: '数量',
				type: 'bar',
				barWidth: 15,
				data: data1,
				label: {
					color: '#A2CCDB',
					fontSize: '16',
					fontFamily: 'Adobe Heiti Std',
					show: true,
					position: [0, '-16px'],
					// 柱图名称
					formatter: (value) => {
						return value.name
					},
				},
			},
		],
	}
}
