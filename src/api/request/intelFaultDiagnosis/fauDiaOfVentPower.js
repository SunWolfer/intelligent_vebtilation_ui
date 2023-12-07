import { colors, getCrosswiseBarChart } from '@/api/request/intelFaultDiagnosis/chartsUtils'
import { useGainList } from '@/hooks/useGainList'
import {
	delWarn,
	findDevTypeDict,
	findYjlxDict,
	findYjlxTopFive,
	powerListView,
} from '@/api/api/intelFaultDiagnosis'
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
			initMainFanChart?.()
		},
	})

	const chartOption1 = ref({})
	const initMainFanChart = () => {
		chartOption1.value = getCrosswiseBarChart(mainFanDataList.value)
	}

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
			initLocalFanChart?.()
		},
	})

	const chartOption2 = ref({})
	const initLocalFanChart = () => {
		chartOption2.value = getCrosswiseBarChart(localFanDataList.value)
	}

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
		chartOption2,
		chartOption1,
	}
}
