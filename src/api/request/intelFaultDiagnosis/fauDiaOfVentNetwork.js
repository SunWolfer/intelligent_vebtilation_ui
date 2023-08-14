import {
	colors,
	getCrosswiseBarChart,
	getType1PieChart,
} from '@/api/request/intelFaultDiagnosis/chartsUtils'
import { defaultBarChart } from '@/utils/echarts/defaultBarCharts'
import useResetCharts from '@/hooks/useResetCharts'
import { dynamicWidth } from '@/utils/ruoyi'

export const fauDiaOfVentNetwork = () => {
	//   预警巷道列表
	const warnTunnelList = ref([
		{
			name: '1302回风绕道',
			value: '1',
		},
		{
			name: '1002辅运大巷',
			value: '1',
		},
		{
			name: '10112采空区',
			value: '2',
		},
		{
			name: '1002辅运大巷',
			value: '1',
		},
		{
			name: '1003辅运大巷',
			value: '1',
		},
	])

	const initTunnelChart = () => {
		getCrosswiseBarChart('fan_net_chart_1', warnTunnelList.value)
	}
	const { showCharts: showTunnelChart } = useResetCharts(initTunnelChart)
	// 预警趋势列表
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

	const initTrendChart = () => {
		const xData = warnTrendList.value.map((i) => i.label)
		const yDataList = warnTrendList.value.map((i) => i.value)
		defaultBarChart({
			domId: 'fan_net_chart_2',
			xData: xData,
			yDataList: [yDataList],
			colors: [['rgba(23, 242, 208, 1)', 'rgba(23, 242, 208, 0)']],
			barWidth: dynamicWidth(37),
		})
	}

	const { showCharts: showTrendChart } = useResetCharts(initTrendChart)

	// 预警类型
	const warnTypeList = ref([
		{
			name: '风量不足',
			value: '8',
		},
		{
			name: '风量超限',
			value: '7',
		},
		{
			name: '微风',
			value: '4',
		},
		{
			name: '循环风',
			value: '3',
		},
		{
			name: '风流短路',
			value: '2',
		},
		{
			name: '反向风',
			value: '1',
		},
	])
	const initTypeChart = () => {
		getType1PieChart('fan_net_chart_3', warnTypeList.value)
	}

	const { showCharts: showTypeChart } = useResetCharts(initTypeChart)
	// 日期
	const dateRange = ref([])
	//   表单
	const dataForm = ref({
		warnType: '',
		warnEquipment: '',
		eqType: '',
		dateTime: '',
	})
	//   预警列表
	const dataList = ref([
		{
			warnType: '1',
			warnTunnel: '',
			warnLevel: '1',
			dateTime: '',
		},
	])
	const warnLevelList = new Map([
		['1', [colors[0], '1级']],
		['2', [colors[1], '2级']],
		['3', [colors[2], '3级']],
		['4', [colors[3], '4级']],
		['5', [colors[4], '5级']],
	])

	return {
		showTunnelChart,
		showTrendChart,
		showTypeChart,
		warnTunnelList,
		dateRange,
		dataForm,
		dataList,
		warnLevelList,
	}
}
