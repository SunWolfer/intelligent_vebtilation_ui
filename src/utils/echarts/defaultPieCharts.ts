import useCharts from '@/hooks/useCharts'
import { dynamicHeight } from '@/utils/ruoyi'

export interface PieChartData {
	domId: string
	data: any[]
	colors: string[]
	title?: string
	subtext?: string
	unit?: string
}
export function defaultPieChart({
	domId,
	data = [],
	colors,
	title = '',
	subtext = '',
	unit = '',
}: PieChartData) {
	const { option } = useCharts(domId)

	option.value = {
		tooltip: {
			show: false,
		},
		title: {
			text: '{a|' + title + '}\n\n' + '\t\t{b|' + subtext + '}' + '{a|' + unit + '}',
			top: '40%',
			x: '23%',
			textStyle: {
				rich: {
					a: {
						color: '#ffffff',
						fontSize: dynamicHeight(21),
					},
					b: {
						color: '#ffffff',
						fontSize: dynamicHeight(28),
					},
				},
			},
		},
		legend: {
			orient: 'vertical',
			right: 20,
			top: 'center',
			align: 'left',
			itemGap: 20,
			textStyle: {
				rich: {
					a: {
						fontSize: dynamicHeight(16),
						color: '#fff',
					},
					b: {
						fontSize: dynamicHeight(16),
						color: '#40E6FF',
					},
					c: {
						fontSize: dynamicHeight(16),
						color: '#40E6FF',
					},
				},
			},
			//图例标记的图形高度
			itemHeight: 10,
			//图例标记的图形宽度
			itemWidth: 10,
			formatter: (name: any) => {
				let total = 0
				let target
				for (let i = 0; i < data.length; i++) {
					total += data[i].value
					if (data[i].name === name) {
						target = data[i].value
					}
				}
				let arr = [
					'{a|' + name + '}',
					'{b|' + target + '个}',
					'{c|' + ((target / total) * 100).toFixed(2) + '%}',
				]
				return arr.join('  ')
			},
		},
		color: colors,
		toolbox: {
			show: false,
		},
		series: [
			{
				type: 'pie',
				radius: ['60%', '90%'],
				avoidLabelOverlap: false,
				labelLine: {
					show: false,
				},
				label: {
					show: false,
				},
				center: ['30%', '50%'],
				data: data,
			},
		],
	}
}