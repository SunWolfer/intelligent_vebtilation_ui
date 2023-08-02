import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
import useResetCharts from '@/hooks/useResetCharts'

export const fullSecWindMeasurement = () => {
	// 当前选中
	const choose = ref(-1)
	const chooseItem = (index) => {
		choose.value = index
	}
	//   全断面测风列表
	const fullSecWindList = ref([
		{
			name: '10204上顺横掘',
			type: '1',
			airVolume: '853',
			windSpeed: '1.35',
			crossSection: '15',
		},
		{
			name: '10204上顺横掘',
			type: '1',
			airVolume: '853',
			windSpeed: '1.35',
			crossSection: '15',
		},
		{
			name: '10204上顺横掘',
			type: '1',
			airVolume: '853',
			windSpeed: '1.35',
			crossSection: '15',
		},
		{
			name: '10204上顺横掘',
			type: '1',
			airVolume: '853',
			windSpeed: '1.35',
			crossSection: '15',
		},
		{
			name: '10204上顺横掘',
			type: '1',
			airVolume: '853',
			windSpeed: '1.35',
			crossSection: '15',
		},
	])

	// 查询时间
	const dateRange = ref([])
	// 查询表单
	const queryForm = ref({
		beginTime: '',
		endTime: '',
	})

	// 生成折线图
	const initChart = () => {
		let xData = []
		let yData = [[], []]
		for (let i = 0; i < 15; i++) {
			xData.push('08:55:00')
			yData[0].push(Math.random() * 1000)
			yData[1].push(Math.random() * 1000)
		}

		defaultLineChart({
			domId: 'acc_chart_line',
			xData: xData,
			yDataList: yData,
			legends: ['6102胶运顺槽', '6103胶运顺槽'],
			legendPosition: 'right',
			units: 'm3/s',
			colors: [
				['rgba(178, 0, 237, 1)', 'rgba(178, 0, 237, 1)'],
				['rgba(49, 255, 111, 1)', 'rgba(49, 255, 111, 1)'],
			],
			smooth: false,
			isArea: false,
		})
	}

	const { showCharts } = useResetCharts(initChart)

	// 参数设置
	const paramSettingVisible = ref(false)

	const chooseParamSetting = (index) => {
		paramSettingVisible.value = true
		chooseItem(index)
	}

	// 实时测风数据
	const realWindDataList = ref([
		{
			time: '2020-10-10 10:10:10',
			value: '1.35',
		},
		{
			time: '2020-10-10 10:10:10',
			value: '1.35',
		},
		{
			time: '2020-10-10 10:10:10',
			value: '1.35',
		},
		{
			time: '2020-10-10 10:10:10',
			value: '1.35',
		},
		{
			time: '2020-10-10 10:10:10',
			value: '1.35',
		},
		{
			time: '2020-10-10 10:10:10',
			value: '1.35',
		},
	])

	// 自动测风站记录
	const aneData = ref({
		windPressure: 2.5,
		windSpeed: 545.4,
		crossSection: 436.7,
		airVolume: 561.1,
		temperature: 36.4,
		humidity: 26.5,
		methane: 0.02,
		carbonDioxide: 0.02,
		oxygen: 0.02,
		hydrogenSulfide: 0.01,
	})

	// 自动测风站记录表
	const aneTableData = computed(() => {
		return [
			{
				label: '风压：',
				value: aneData.value.windPressure,
				unit: 'KPa',
			},
			{
				label: '风速：',
				value: aneData.value.windSpeed,
				unit: 'm/s',
			},
			{
				label: '断面：',
				value: aneData.value.crossSection,
				unit: 'm2',
			},
			{
				label: '风量：',
				value: aneData.value.airVolume,
				unit: 'm3/min',
			},
			{
				label: '温度：',
				value: aneData.value.temperature,
				unit: '°C',
			},
			{
				label: '湿度：',
				value: aneData.value.humidity,
				unit: '%',
			},
			{
				label: 'CH4：',
				value: aneData.value.methane,
				unit: '%',
			},
			{
				label: 'CO2：',
				value: aneData.value.carbonDioxide,
				unit: '%',
			},
			{
				label: 'O2：',
				value: aneData.value.oxygen,
				unit: '%',
			},
			{
				label: 'H2S：',
				value: aneData.value.hydrogenSulfide,
				unit: '%',
			},
		]
	})
	return {
		choose,
		fullSecWindList,
		dateRange,
		queryForm,
		showCharts,
		paramSettingVisible,
		chooseParamSetting,
		aneTableData,
		realWindDataList,
	}
}
