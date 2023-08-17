import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
import useResetCharts from '@/hooks/useResetCharts'

export const fireMonitoring = () => {
	//束管监测表单
	const dataForm1 = ref({
		areaData: '',
		statisticalDate: '1',
	})
	// 束管监测列表数据
	const beamTubeMonitoringData = ref([
		{
			label: 'CO2',
			value: '0.0787 %',
			text: 'fire-text-blue',
		},
		{
			label: 'O2',
			value: '20.5746 %',
			text: 'fire-text-yellow',
		},
		{
			label: 'N2',
			value: '79.3467 %',
			text: 'fire-text-purple',
		},
		{
			label: 'CH4',
			value: '0 %',
			text: 'fire-text-green',
		},
		{
			label: 'CO',
			value: '0 ppm',
			text: 'fire-text-green',
		},
		{
			label: 'C2H2',
			value: '0 ppm',
			text: 'fire-text-purple',
		},
		{
			label: 'C2H4',
			value: '0 ppm',
			text: 'fire-text-yellow',
		},
		{
			label: 'C2H6',
			value: '0 ppm',
			text: 'fire-text-blue',
		},
	])
	const chooseForm1Date = (type) => {
		if (dataForm1.value.statisticalDate === type) return
		dataForm1.value.statisticalDate = type
	}

	const beamXData = ref([])
	// 束管监测折线数据1
	const beamYDataList1 = ref([])
	// 束管监测折线数据2
	const beamYDataList2 = ref([])
	const initChartLeft = () => {
		beamXData.value = [
			'10:30',
			'11:30',
			'12:30',
			'13:30',
			'14:30',
			'15:30',
			'16:30',
			'17:30',
			'18:30',
			'19:30',
			'20:30',
			'21:30',
		]
		beamYDataList1.value = [[], [], [], []]
		beamYDataList2.value = [[], [], [], []]
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 12; j++) {
				beamYDataList1.value[i].push(Math.random() * 100)
				beamYDataList2.value[i].push(Math.random() * 100)
			}
		}

		defaultLineChart({
			domId: 'fire-charts-1',
			xData: beamXData.value,
			yDataList: beamYDataList1.value,
			legends: ['CO2', 'O2', 'N2', 'CH4'],
			units: '%',
			colors: [
				['rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0)'],
				['rgba(255, 215, 29, 1)', 'rgba(255, 215, 29, 0)'],
				['rgba(226, 58, 245, 1)', 'rgba(226, 58, 245, 0)'],
				['rgba(8, 255, 51, 1)', 'rgba(8, 255, 51, 0)'],
			],
			smooth: false,
		})
		defaultLineChart({
			domId: 'fire-charts-2',
			xData: beamXData.value,
			yDataList: beamYDataList2.value,
			legends: ['CO', 'C2H2', 'C2H4', 'C2H6'],
			units: '(ppm)',
			colors: [
				['rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 0)'],
				['rgba(189, 57, 233, 1)', 'rgba(189, 57, 233, 0)'],
				['rgba(255, 155, 65, 1)', 'rgba(255, 155, 65, 0)'],
				['rgba(8, 199, 241, 1)', 'rgba(8, 199, 241, 0)'],
			],
			isArea: false,
			showSymbol: true,
			showYSplitLine: true,
		})
	}

	const { showCharts: showLeftCharts } = useResetCharts(initChartLeft)

	//   光纤测温表单
	const dataForm2 = ref({
		areaData: '',
		statisticalDate: '1',
	})
	// 光纤测温监测数据
	const optFibTemMeaList = ref([
		{
			label: '最高温度',
			value: '35.6 ℃',
		},
		{
			label: '最低温度',
			value: '25.6 ℃',
		},
		{
			label: '平均温度',
			value: '32.6 ℃',
		},
	])

	const chooseForm2Date = (type) => {
		if (dataForm2.value.statisticalDate === type) return
		dataForm2.value.statisticalDate = type
	}

	// 光纤测温折线数据1
	const opticalXData1 = ref([])
	const opticalYDataList1 = ref([])
	const opticalXData2 = ref([])
	// 光纤测温折线数据2
	const opticalYDataList2 = ref([])
	const initChartRight = () => {
		opticalYDataList1.value = [[]]
		for (let i = 0; i < 12; i++) {
			opticalXData1.value.push(50 + i)
			opticalYDataList1.value[0].push(Math.random() * 10)
		}
		defaultLineChart({
			domId: 'fire-charts-3',
			xData: opticalXData1.value,
			yDataList: opticalYDataList1.value,
			legends: ['温度'],
			units: '℃',
			xUnits: 'm',
			colors: [['rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 0)']],
			showXSplitLine: true,
		})

		opticalXData2.value = [
			'10:30',
			'11:30',
			'12:30',
			'13:30',
			'14:30',
			'15:30',
			'16:30',
			'17:30',
			'18:30',
			'19:30',
			'20:30',
			'21:30',
		]
		opticalYDataList2.value = [[], [], []]
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 12; j++) {
				opticalYDataList2.value[i].push(Math.random() * 10)
			}
		}
		defaultLineChart({
			domId: 'fire-charts-4',
			xData: opticalXData2.value,
			yDataList: opticalYDataList2.value,
			legends: ['最高温度', '最低温度', '平均温度'],
			units: '(℃)',
			colors: [
				['rgba(255, 155, 0, 1)', 'rgba(0, 255, 0, 0)'],
				['rgba(0, 251, 255, 1)', 'rgba(189, 57, 233, 0)'],
				['rgba(0, 255, 0, 1)', 'rgba(255, 155, 65, 0)'],
			],
			smooth: false,
			isArea: false,
			showXSplitLine: true,
		})
	}
	const { showCharts: showRightCharts } = useResetCharts(initChartRight)
	return {
		dataForm1,
		dataForm2,
		beamTubeMonitoringData,
		chooseForm1Date,
		showLeftCharts,
		optFibTemMeaList,
		chooseForm2Date,
		showRightCharts,
	}
}
