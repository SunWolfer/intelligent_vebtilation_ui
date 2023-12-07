//风窗列表
import useList from '@/hooks/useList'
import { listWindow } from '@/api/api/windWindowManagement'
import { removeVentrLine } from '@/api/api/windowWindResCurve'
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
	const chartOption1 = ref({})
	const initWindowChart = () => {
		const xData = lineData.value.kaidu
		const yData = [lineData.value.fengzu]
		const legends = ['通风阻力']

		chartOption1.value = defaultLineChart({
			xData: xData ?? [],
			yDataList: yData ?? [],
			legends: legends,
			units: '',
			colors: [['rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0)']],
			smooth: false,
			isArea: false,
		})
	}

	const handleQuery = () => {
		queryDataList?.(initWindowChart)
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
		watchFormId?.(initWindowChart)
	})

	return {
		windowList,
		queryParams,
		handleQuery,
		dataList,
		chooseRow,
		addOrUpdateVisible,
		handleAdd,
		handleUpdate,
		handleDelete,
		chartOption1,
	}
}
