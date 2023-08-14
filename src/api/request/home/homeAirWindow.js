import useResetCharts from '@/hooks/useResetCharts'
import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
import {
	getChart1,
	getChart2,
	getChart3,
	getChart4,
	getLineChartOption,
} from '@/api/request/home/remoterControlCharts'
import useEquipmentParams from '@/hooks/useEquipmentParams'

export const homeAirWindow = () => {
	const dataForm = ref({})

	const equipmentParams = useEquipmentParams()
	onMounted(() => {
		dataForm.value = equipmentParams.dataParams
	})
	onBeforeUnmount(() => {
		equipmentParams.cleanParams()
	})

	// 风阻特性曲线
	const initChart1 = () => {
		let xData = []
		let yData = [[]]
		for (let i = 0; i < 15; i++) {
			xData.push(i)
			yData[0].push(Math.random() * 100)
		}

		defaultLineChart({
			domId: 'window_chart_1',
			xData: xData,
			yDataList: yData,
			legends: [],
			legendPosition: 'center',
			units: '风阻(kN)',
			title: '开度(%)',
			colors: [['rgba(75, 200, 252, 1)', 'rgba(75, 200, 252, 0.6)']],
		})
	}
	const { showCharts: showChart1 } = useResetCharts(initChart1)
	// 监测曲线
	const initChart2 = () => {
		let names = ['风量', '开度', '风速', '断面']
		let xData = []
		let yData = [[], [], [], []]
		for (let i = 0; i < 15; i++) {
			xData.push('8:0' + i + '')
			yData[0].push(Math.random() * 100)
			yData[1].push(Math.random() * 100)
			yData[2].push(Math.random() * 100)
			yData[3].push(Math.random() * 100)
		}
		getLineChartOption('window_chart_2', names, xData, yData)
	}
	const { showCharts: showChart2 } = useResetCharts(initChart2)

	// 巷道饼图
	const initChart3 = () => {
		getChart1('window_chart_3', 88)
		getChart2('window_chart_4', 88)
		getChart3('window_chart_5', 88, '当前风量', '风量范围')
		getChart4('window_chart_6', 88, '当前风速')
	}
	const { showCharts: showChart3 } = useResetCharts(initChart3)

	// 显示更多
	const moreVisible = ref(false)

	const initMoreVisible = () => {
		moreVisible.value = true
	}

	return {
		dataForm,
		showChart1,
		showChart2,
		showChart3,
		moreVisible,
		initMoreVisible,
	}
}
