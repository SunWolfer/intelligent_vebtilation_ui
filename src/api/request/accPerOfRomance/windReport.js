import { listWindReport } from '@/api/api/windReport'
import { addDateRange } from '@/utils/ruoyi'
import { download } from '@/utils/request'

export const windReport = () => {
	// 查询日期
	const dateRange = ref([])
	//   查询表单
	const queryParams = ref({})

	// 表格数据
	const dataList = ref([])

	const getList = async () => {
		dataList.value = []

		const res = await listWindReport(addDateRange(queryParams.value, dateRange.value))
		if (!res) return
		dataList.value = res.data
	}

	onMounted(async () => {
		await getList()
	})

	// 导出
	const downLoadFire = async () => {
		await download(
			'/api/report/export',
			addDateRange(queryParams.value, dateRange.value),
			`测风报表${new Date().getTime()}.xlsx`,
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
