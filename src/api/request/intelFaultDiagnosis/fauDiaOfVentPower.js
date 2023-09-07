import { colors, getCrosswiseBarChart } from '@/api/request/intelFaultDiagnosis/chartsUtils'
import { useGainList } from '@/hooks/useGainList'
import {
	delWarn,
	findDevTypeDict,
	findYjlxDict,
	findYjlxTopFive,
	powerListView,
} from '@/api/api/intelFaultDiagnosis'
import useResetCharts from '@/hooks/useResetCharts'
import useList from '@/hooks/useList'
export const fauDiaOfVentPower = () => {
	// 主扇预警类型Top5
	const mainFanDataList = ref([])

	useGainList({
		apiFun: findYjlxTopFive,
		queryArgs: {
			devType: 'mainfan',
		},
		afterReadyDataFun: (data) => {
			mainFanDataList.value = data.map((i) => {
				return {
					value: i.zs,
					name: i.yjmc,
				}
			})
			resetCharts1?.()
		},
	})
	const initMainFanChart = () => {
		getCrosswiseBarChart('fan_chart_1', mainFanDataList.value)
	}
	const { showCharts: showCharts1, resetCharts: resetCharts1 } = useResetCharts(
		initMainFanChart,
		false,
	)

	// 局扇预警类型Top5
	const localFanDataList = ref([])
	useGainList({
		apiFun: findYjlxTopFive,
		queryArgs: {
			devType: 'localfan',
		},
		afterReadyDataFun: (data) => {
			localFanDataList.value = data.map((i) => {
				return {
					value: i.zs,
					name: i.yjmc,
				}
			})
			resetCharts2?.()
		},
	})
	const initLocalFanChart = () => {
		getCrosswiseBarChart('fan_chart_2', localFanDataList.value)
	}
	const { showCharts: showCharts2, resetCharts: resetCharts2 } = useResetCharts(
		initLocalFanChart,
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
		apiFun: powerListView,
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
			mainType: '1',
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
