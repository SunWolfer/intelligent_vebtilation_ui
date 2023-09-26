//风窗列表
import useList from '@/hooks/useList'
import { listWindow } from '@/api/api/windWindowManagement'
import { removeVentrLine } from '@/api/api/windowWindResCurve'
import useResetCharts from '@/hooks/useResetCharts'
import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
import { useCommitForm } from '@/hooks/useForm'
import { useWindowFormData } from '@/api/request/venManagement/windowCurveManagement/useWindowFormData'
export const windowWindResCurve = () => {
	const { dataList: windowList } = useList({
		apiFun: listWindow,
		params: {
			pageNum: 1,
			pageSize: 999,
		},
	})
	const { lineData, dataList, queryParams, queryDataList, watchFormId } = useWindowFormData()
	// 风阻曲线
	const initWindowChart = () => {
		const xData = lineData.value.kaidu
		const yData = [lineData.value.fengzu]
		const legends = ['通风阻力']

		defaultLineChart({
			domId: 'window_curve_chart_1',
			xData: xData ?? [],
			yDataList: yData ?? [],
			legends: legends,
			units: '',
			colors: [['rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0)']],
			smooth: false,
			isArea: false,
		})
	}
	const { showCharts, resetCharts } = useResetCharts(initWindowChart, false)

	const handleQuery = () => {
		queryDataList?.(resetCharts)
	}

	const chooseRow = ref({
		devId: '',
		lines: [],
	})
	//   新增/修改风窗特性曲线
	const addOrUpdateVisible = ref(false)
	//   新增
	const handleAdd = () => {
		chooseRow.value = {
			devId: '',
			lines: [],
		}
		addOrUpdateVisible.value = true
	}
	// 修改
	const handleUpdate = () => {
		if (!queryParams.value.devId) return
		chooseRow.value = {
			devId: queryParams.value.devId,
			lines: dataList.value,
		}
		addOrUpdateVisible.value = true
	}
	// 删除
	const handleDelete = async () => {
		if (!queryParams.value.devId) return
		await useCommitForm(removeVentrLine, {
			queryParams: queryParams.value,
			afterReadyDataFun: () => {
				queryDataList?.()
			},
		})
	}

	onMounted(() => {
		watchFormId?.(resetCharts)
	})

	return {
		windowList,
		queryParams,
		handleQuery,
		dataList,
		showCharts,
		chooseRow,
		addOrUpdateVisible,
		handleAdd,
		handleUpdate,
		handleDelete,
	}
}
