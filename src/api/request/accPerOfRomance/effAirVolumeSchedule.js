import { listEffAirVolumeSchedule } from '@/api/api/effAirVolumeSchedule'
import { addDateRange } from '@/utils/ruoyi'
import { download } from '@/utils/request'

export const effAirVolumeSchedule = () => {
	// 查询日期
	const dateRange = ref([])
	//   查询表单
	const queryParams = ref({})
	// 表格数据
	// 表格数据
	const dataList = ref([])

	const getList = async () => {
		dataList.value = []

		const res = await listEffAirVolumeSchedule(addDateRange(queryParams.value, dateRange.value))
		if (!res) return
		dataList.value = res.data
	}

	onMounted(async () => {
		await getList()
	})

	// 导出
	const downLoadFire = async () => {
		await download(
			'/api/report/exportValid',
			addDateRange(queryParams.value, dateRange.value),
			`有效风量明细表${new Date().getTime()}.xlsx`,
		)
	}

	return {
		dateRange,
		queryParams,
		dataList,
		getList,
		downLoadFire,
	}
}
