import { colors, getCrosswiseBarChart } from '@/api/request/intelFaultDiagnosis/chartsUtils'
import useResetCharts from '@/hooks/useResetCharts'
import { useGainList } from '@/hooks/useGainList'
import {
	delWarn,
	deviceListView,
	findDevTypeDict,
	findYjlxDict,
	findYjlxTopFive,
} from '@/api/api/intelFaultDiagnosis'
import useList from '@/hooks/useList'

export const fauDiaOfVentFacilities = () => {
	// 风门预警类型
	const doorWarnTypeList = ref([])

	useGainList({
		apiFun: findYjlxTopFive,
		queryArgs: {
			devType: 'door',
		},
		afterReadyDataFun: (data) => {
			doorWarnTypeList.value = data.map((i) => {
				return {
					value: i.zs,
					name: i.yjmc,
				}
			})
			resetCharts1?.()
		},
	})
	const initDoorWarnChart = () => {
		getCrosswiseBarChart('fau_fac_chart_1', doorWarnTypeList.value)
	}
	const { showCharts: showCharts1, resetCharts: resetCharts1 } = useResetCharts(
		initDoorWarnChart,
		false,
	)

	// 风窗预警类型
	const windowWarnTypeList = ref([])
	useGainList({
		apiFun: findYjlxTopFive,
		queryArgs: {
			devType: 'window',
		},
		afterReadyDataFun: (data) => {
			windowWarnTypeList.value = data.map((i) => {
				return {
					value: i.zs,
					name: i.yjmc,
				}
			})
			resetCharts2?.()
		},
	})
	const initWindowWarnChart = () => {
		getCrosswiseBarChart('fau_fac_chart_2', windowWarnTypeList.value)
	}
	const { showCharts: showCharts2, resetCharts: resetCharts2 } = useResetCharts(
		initWindowWarnChart,
		false,
	)

	const warnLevelList = new Map([
		[1, [colors[0], '1级']],
		[2, [colors[1], '2级']],
		[3, [colors[2], '3级']],
		[4, [colors[3], '4级']],
		[5, [colors[4], '5级']],
	])

	const { dateRange, dataList, queryParams, total, handleQuery, getList, handleDelete } = useList({
		apiFun: deviceListView,
		params: {
			devType: '',
			yjlx: '',
			devName: '',
			pageNum: 1,
			pageSize: 10,
		},
		deleteFun: delWarn,
	})

	// 设备类型
	const { dataList: devTypeList } = useGainList({
		apiFun: findDevTypeDict,
		queryArgs: {
			mainType: '2',
		},
	})
	// 预警类型
	const {
		dataList: YJLXList,
		queryDataList: queryYJLXDataList,
		queryParams: queryYJLXParams,
	} = useGainList({
		automatic: false,
		apiFun: findYjlxDict,
		queryArgs: {
			devType: queryParams.value.devType,
		},
	})
	// 监听设备类型
	watch(
		() => queryParams.value.devType,
		(value) => {
			queryYJLXParams.value.devType = value
			queryYJLXDataList?.()
		},
	)

	// 格式化表格设备类型
	const formatterDevType = (row) => {
		return devTypeList.value.find((i) => {
			return i.dictValue === row.devType
		})?.dictLabel
	}

	return {
		showCharts1,
		showCharts2,
		warnLevelList,
		dateRange,
		dataList,
		queryParams,
		total,
		handleQuery,
		getList,
		handleDelete,
		devTypeList,
		YJLXList,
		formatterDevType,
	}
}
