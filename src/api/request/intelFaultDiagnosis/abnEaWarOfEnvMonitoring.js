import {
	colors,
	getCrosswiseBarChart,
	getType2PieChart,
} from '@/api/request/intelFaultDiagnosis/chartsUtils'
import { defaultBarChart } from '@/utils/echarts/defaultBarCharts'
import { dynamicWidth } from '@/utils/ruoyi'
import useList from '@/hooks/useList'
import {
	delWarn,
	envListView,
	findDevTypeDict,
	findYjdwTopFive,
	findYjlxDict,
	findYjsbPieChart,
	monthTrend,
} from '@/api/api/intelFaultDiagnosis'
import { useGainList } from '@/hooks/useGainList'

export const abnEaWarOfEnvMonitoring = () => {
	//   预警点位
	const warnPointList = ref([])

	const chartOption1 = ref({})

	const initWarnPointList = async () => {
		const { data } = await findYjdwTopFive({
			mainType: '4',
		})
		warnPointList.value = data.map((i) => {
			return {
				name: i.devName,
				value: i.zs,
			}
		})
		chartOption1.value = getCrosswiseBarChart(warnPointList.value)
	}

	const chartOption2 = ref({})
	const initWarnTrendList = async () => {
		const { data } = await monthTrend({
			mainType: '4',
		})
		const xData = data.lineX
		const yDataList = data.value
		chartOption2.value = defaultBarChart({
			xData: xData,
			yDataList: [yDataList],
			colors: [['rgba(23, 242, 208, 1)', 'rgba(23, 242, 208, 0)']],
			barWidth: dynamicWidth(37),
			showSplitArea: true,
		})
	}

	//   预警设备类型
	const warnEquipList = ref([])
	const chartOption3 = ref({})
	const initWarnEquipList = async () => {
		const { data } = await findYjsbPieChart({
			mainType: '4',
		})
		warnEquipList.value = data
		chartOption3.value = getType2PieChart(warnEquipList.value)
	}

	const warnLevelList = new Map([
		[1, [colors[0], '1级']],
		[2, [colors[1], '2级']],
		[3, [colors[2], '3级']],
		[4, [colors[3], '4级']],
		[5, [colors[4], '5级']],
	])

	const { dateRange, dataList, queryParams, total, handleQuery, getList, handleDelete } = useList({
		apiFun: envListView,
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
			mainType: '4',
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
		initWarnPointList,
		initWarnTrendList,
		initWarnEquipList,
		chartOption1,
		chartOption2,
		chartOption3,
	}
}
