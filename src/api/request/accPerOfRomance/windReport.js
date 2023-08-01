export const windReport = () => {
	// 查询日期
	const dateRange = ref([])
	//   查询表单
	const queryParams = ref({})

	// 表格数据
	const tables = ref([
		{
			date: '2023年5月29日',
			dataList: [
				{
					position: '1',
				},
				{
					position: '1',
				},
				{
					position: '1',
				},
			],
		},
		{
			date: '2023年5月28日',
			dataList: [
				{
					position: '1',
				},
			],
		},
		{
			date: '2023年5月28日',
			dataList: [
				{
					position: '1',
				},
			],
		},
		{
			date: '2023年5月28日',
			dataList: [
				{
					position: '1',
				},
			],
		},
		{
			date: '2023年5月28日',
			dataList: [
				{
					position: '1',
				},
			],
		},
		{
			date: '2023年5月28日',
			dataList: [
				{
					position: '1',
				},
			],
		},
		{
			date: '2023年5月28日',
			dataList: [
				{
					position: '1',
				},
			],
		},
		{
			date: '2023年5月28日',
			dataList: [
				{
					position: '1',
				},
			],
		},
	])

	return {
		dateRange,
		queryParams,
		tables,
	}
}
