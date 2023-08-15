import { getCrosswiseBarChart } from '@/api/request/intelFaultDiagnosis/chartsUtils'
import useResetCharts from '@/hooks/useResetCharts'

export const fauDiaOfVentFacilities = () => {
	// 风门预警类型
	const doorWarnTypeList = ref([
		{
			name: '漏风量超限',
			value: '1',
		},
		{
			name: '气源动力损失',
			value: '1',
		},
		{
			name: '漏风量超限',
			value: '2',
		},
		{
			name: '过风量超限',
			value: '1',
		},
		{
			name: '过风量不足',
			value: '1',
		},
	])
	// 风窗预警类型
	const windowWarnTypeList = ref([
		{
			name: '漏风量超限',
			value: '1',
		},
		{
			name: '气源动力损失',
			value: '1',
		},
		{
			name: '漏风量超限',
			value: '2',
		},
		{
			name: '过风量超限',
			value: '1',
		},
		{
			name: '过风量不足',
			value: '1',
		},
	])

	const initWarnTypeChart = () => {
		getCrosswiseBarChart('fau_fac_chart_1', doorWarnTypeList.value)
		getCrosswiseBarChart('fau_fac_chart_2', windowWarnTypeList.value)
	}

	return {
		doorWarnTypeList,
		windowWarnTypeList,
		initWarnTypeChart,
	}
}
