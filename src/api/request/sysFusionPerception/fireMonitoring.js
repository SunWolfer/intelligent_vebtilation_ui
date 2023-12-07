import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
import {
	temperatureDict,
	temperatureRealTime,
	temperatureTrend,
	tubeDict,
	tubeRealTime,
	tubeTrend,
} from '@/api/api/fireMonitoring'
import { useGainList } from '@/hooks/useGainList'

export const fireMonitoring = () => {
	//束管监测表单
	const dataForm1 = ref({
		code: '',
		timeType: '1',
	})
	// 束管监测列表
	const { dataList: tubeDataList } = useGainList({
		apiFun: tubeDict,
		afterReadyDataFun: (data) => {
			if (!data.length) return
			dataForm1.value.code = data[0].code
		},
	})

	watch(
		() => dataForm1.value.code,
		async () => {
			await getBeamTubeData()
			await initChartLeft?.()
		},
	)
	watch(
		() => dataForm1.value.timeType,
		async () => {
			await initChartLeft?.()
		},
	)
	// 束管监测列表数据
	const tubeRealTimeForm = ref({
		C2H2: '0',
		C2H4: '0',
		C2H6: '0',
		CH4: '0',
		CO: '0',
		CO2: '0',
		N2: '0',
		O2: '0',
	})
	// 束管监测列表数据
	const beamTubeMonitoringData = computed(() => {
		return [
			{
				label: 'CO2',
				value: tubeRealTimeForm.value?.CO2 ?? 0 + ' %',
			},
			{
				label: 'O2',
				value: tubeRealTimeForm.value?.O2 ?? 0 + ' %',
			},
			{
				label: 'N2',
				value: tubeRealTimeForm.value?.N2 ?? 0 + ' %',
			},
			{
				label: 'CH4',
				value: tubeRealTimeForm.value?.CH4 ?? 0 + ' %',
			},
			{
				label: 'CO',
				value: tubeRealTimeForm.value?.CO ?? 0 + ' ppm',
			},
			{
				label: 'C2H2',
				value: tubeRealTimeForm.value?.C2H2 ?? 0 + ' ppm',
			},
			{
				label: 'C2H4',
				value: tubeRealTimeForm.value?.C2H4 ?? 0 + ' ppm',
			},
			{
				label: 'C2H6',
				value: tubeRealTimeForm.value?.C2H6 ?? 0 + ' ppm',
			},
		]
	})
	const getBeamTubeData = async () => {
		const { data } = await tubeRealTime(dataForm1.value.code)
		tubeRealTimeForm.value = data
	}

	const chooseForm1Date = (type) => {
		if (dataForm1.value.timeType === type) return
		dataForm1.value.timeType = type
	}

	const chartOption1 = ref({})
	const chartOption2 = ref({})

	const initChartLeft = async () => {
		const { data } = await tubeTrend(dataForm1.value)
		const { one, two } = data
		chartOption1.value = defaultLineChart({
			xData: one.lineX ?? [],
			yDataList: one.value ?? [],
			legends: one.names ?? [],
			units: '%',
			colors: [
				['rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0)'],
				['rgba(255, 215, 29, 1)', 'rgba(255, 215, 29, 0)'],
				['rgba(226, 58, 245, 1)', 'rgba(226, 58, 245, 0)'],
				['rgba(8, 255, 51, 1)', 'rgba(8, 255, 51, 0)'],
			],
			smooth: false,
		})
		chartOption2.value = defaultLineChart({
			xData: two.lineX ?? [],
			yDataList: two.value ?? [],
			legends: two.names ?? [],
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
	//   光纤测温表单
	const dataForm2 = ref({
		channel: '',
		timeType: '1',
		min: 0,
		max: 0,
		avg: 0,
	})
	// 光纤测温列表
	const { dataList: optList } = useGainList({
		apiFun: temperatureDict,
		afterReadyDataFun: (data) => {
			if (!data.length) return
			dataForm2.value.channel = data[0].channel
		},
	})

	// 光纤测温监测数据
	const optFibTemMeaList = computed(() => {
		return [
			{
				label: '最高温度',
				value: `${dataForm2.value.max ?? 0} ℃`,
			},
			{
				label: '最低温度',
				value: `${dataForm2.value.min ?? 0} ℃`,
			},
			{
				label: '平均温度',
				value: `${dataForm2.value.avg ?? 0} ℃`,
			},
		]
	})

	const chooseForm2Date = (type) => {
		if (dataForm2.value.timeType === type) return
		dataForm2.value.timeType = type
	}
	// 光纤测温实时监测查询
	const chartOption3 = ref({})
	const initChartRight = async () => {
		const { data } = await temperatureRealTime(dataForm2.value.channel)
		dataForm2.value.min = data.min
		dataForm2.value.max = data.max
		dataForm2.value.avg = data.avg

		chartOption3.value = defaultLineChart({
			xData: data.lineX,
			yDataList: [data.value],
			legends: ['温度'],
			units: '℃',
			xUnits: 'm',
			colors: [['rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 0)']],
			showXSplitLine: true,
		})
	}

	// 光纤测温趋势监测查询
	const chartOption4 = ref({})
	const initChartRight2 = async () => {
		const { data } = await temperatureTrend({
			channel: dataForm2.value.channel,
			timeType: dataForm2.value.timeType,
		})
		chartOption4.value = defaultLineChart({
			xData: data.lineX,
			yDataList: data.value,
			legends: data.names,
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

	watch(
		() => dataForm2.value.channel,
		async () => {
			await initChartRight?.()
			await initChartRight2?.()
		},
	)
	watch(
		() => dataForm2.value.timeType,
		async () => {
			await initChartRight2?.()
		},
	)

	return {
		tubeDataList,
		optList,
		dataForm1,
		dataForm2,
		beamTubeMonitoringData,
		chooseForm1Date,
		optFibTemMeaList,
		chooseForm2Date,
		chartOption1,
		chartOption2,
		chartOption3,
		chartOption4,
	}
}
