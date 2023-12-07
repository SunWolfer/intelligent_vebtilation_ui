import {
	colors,
	getCrosswiseBarChart,
	getType1PieChart,
} from '@/api/request/intelFaultDiagnosis/chartsUtils'
import { defaultBarChart } from '@/utils/echarts/defaultBarCharts'
import { dynamicWidth } from '@/utils/ruoyi'
import useList from '@/hooks/useList'
import {
	delWarn,
	findYjdwTopFive,
	findYjlxDict,
	findYjlxPieChart,
	monthTrend,
	roadListView,
} from '@/api/api/intelFaultDiagnosis'
import { useGainList } from '@/hooks/useGainList'

export const fauDiaOfVentNetwork = () => {
	//   预警巷道列表
	const warnTunnelList = ref([])
	const chartOption1 = ref({})
	const initTunnelChart = async () => {
		const { data } = await findYjdwTopFive({
			mainType: '3',
		})
		warnTunnelList.value = data.map((i) => {
			return {
				name: i.devName,
				value: i.zs,
			}
		})
		chartOption1.value = getCrosswiseBarChart(warnTunnelList.value)
	}
	// 预警趋势列表
	const chartOption2 = ref({})
	const initTrendChart = async () => {
		const { data } = await monthTrend({
			mainType: '3',
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

	// 预警类型
	const warnTypeList = ref([])
	const chartOption3 = ref({})
	const initTypeChart = async () => {
		const { data } = await findYjlxPieChart({
			mainType: '3',
		})
		warnTypeList.value = data
		chartOption3.value = getType1PieChart(warnTypeList.value)
	}

	const warnLevelList = new Map([
		[1, [colors[0], '1级']],
		[2, [colors[1], '2级']],
		[3, [colors[2], '3级']],
		[4, [colors[3], '4级']],
		[5, [colors[4], '5级']],
	])

	const { dateRange, dataList, queryParams, total, handleQuery, getList, handleDelete } = useList({
		apiFun: roadListView,
		params: {
			yjlx: '',
			devName: '',
			pageNum: 1,
			pageSize: 10,
		},
		deleteFun: delWarn,
	})

	// 预警类型
	const { dataList: YJLXList } = useGainList({
		apiFun: findYjlxDict,
		queryArgs: {
			devType: 'road',
		},
	})

	return {
		warnTunnelList,
		warnLevelList,
		dateRange,
		dataList,
		queryParams,
		total,
		handleQuery,
		getList,
		handleDelete,
		YJLXList,
		initTunnelChart,
		chartOption1,
		initTrendChart,
		chartOption2,
		initTypeChart,
		chartOption3,
	}
}
