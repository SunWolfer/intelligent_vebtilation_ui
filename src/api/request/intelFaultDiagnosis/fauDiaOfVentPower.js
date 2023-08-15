import { colors, getCrosswiseBarChart } from '@/api/request/intelFaultDiagnosis/chartsUtils'
export const fauDiaOfVentPower = () => {
	// 主扇预警类型Top5
	const mainFanDataList = ref([
		{
			name: '风压异常',
			value: '1',
		},
		{
			name: '温度异常',
			value: '1',
		},
		{
			name: '振动波形异常',
			value: '2',
		},
		{
			name: '振动波形异常',
			value: '1',
		},
		{
			name: '风量异常',
			value: '1',
		},
	])
	// 局扇预警类型Top5
	const localFanDataList = ref([
		{
			name: '风压异常',
			value: '1',
		},
		{
			name: '温度异常',
			value: '1',
		},
		{
			name: '振动波形异常',
			value: '2',
		},
		{
			name: '振动波形异常',
			value: '1',
		},
		{
			name: '风量异常',
			value: '1',
		},
	])

	const initFansCharts = () => {
		getCrosswiseBarChart('fan_chart_1', mainFanDataList.value)
		getCrosswiseBarChart('fan_chart_2', localFanDataList.value)
	}

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
			warnType: '',
			warnEquipment: '',
			eqType: '1',
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
		mainFanDataList,
		localFanDataList,
		dataForm,
		dateRange,
		dataList,
		warnLevelList,
	}
}
