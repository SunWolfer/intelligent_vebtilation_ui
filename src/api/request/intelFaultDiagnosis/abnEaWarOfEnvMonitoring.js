import {
	getCrosswiseBarChart,
	getType2PieChart,
} from '@/api/request/intelFaultDiagnosis/chartsUtils'
import { defaultBarChart } from '@/utils/echarts/defaultBarCharts'
import { dynamicWidth } from '@/utils/ruoyi'

export const abnEaWarOfEnvMonitoring = () => {
	//   预警点位
	const warnPointList = ref([
		{
			name: '风量不足',
			value: '1',
		},
		{
			name: '风量超限',
			value: '1',
		},
		{
			name: '反向风异常',
			value: '2',
		},
		{
			name: '循环风异常',
			value: '1',
		},
		{
			name: '微风异常',
			value: '1',
		},
	])
	const initWarnPointList = () => {
		getCrosswiseBarChart('fan_mon_chart_1', warnPointList.value)
	}

	//   预警趋势
	const warnTrendList = ref([
		{
			label: '1月',
			value: Math.random() * 100,
		},
		{
			label: '2月',
			value: Math.random() * 100,
		},
		{
			label: '3月',
			value: Math.random() * 100,
		},
		{
			label: '4月',
			value: Math.random() * 100,
		},
		{
			label: '5月',
			value: Math.random() * 100,
		},
		{
			label: '6月',
			value: Math.random() * 100,
		},
		{
			label: '7月',
			value: Math.random() * 100,
		},
		{
			label: '8月',
			value: Math.random() * 100,
		},
		{
			label: '9月',
			value: Math.random() * 100,
		},
		{
			label: '10月',
			value: Math.random() * 100,
		},
		{
			label: '11月',
			value: Math.random() * 100,
		},
		{
			label: '12月',
			value: Math.random() * 100,
		},
	])
	const initWarnTrendList = () => {
		const xData = warnTrendList.value.map((i) => i.label)
		const yDataList = warnTrendList.value.map((i) => i.value)
		defaultBarChart({
			domId: 'fan_mon_chart_2',
			xData: xData,
			yDataList: [yDataList],
			colors: [['rgba(23, 242, 208, 1)', 'rgba(23, 242, 208, 0)']],
			barWidth: dynamicWidth(37),
			showSplitArea: true,
		})
	}
	//   预警设备类型
	const warnEquipList = ref([
		{
			name: '一氧化碳',
			value: '8',
		},
		{
			name: '二氧化碳',
			value: '7',
		},
		{
			name: '氧气',
			value: '4',
		},
		{
			name: '烟雾',
			value: '3',
		},
		{
			name: '环境温度',
			value: '2',
		},
		{
			name: '甲烷',
			value: '1',
		},
	])
	const initWarnEquipList = () => {
		getType2PieChart('fan_mon_chart_3', warnEquipList.value)
	}

	return {
		initWarnPointList,
		initWarnTrendList,
		initWarnEquipList,
	}
}
