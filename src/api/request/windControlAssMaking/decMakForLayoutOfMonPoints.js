export const decMakForLayoutOfMonPoints = () => {
	// 条件查询
	const queryForm = ref({
		doorName: '',
		windowName: '',
		windName: '',
		windStation: '',
	})

	const chooseVersion = ref(0)

	// 版本列表
	const versionList = ref([
		{
			dateTime: '2023-07-01',
		},
		{
			dateTime: '2023-06-01',
		},
		{
			dateTime: '2023-05-01',
		},
		{
			dateTime: '2023-04-01',
		},
		{
			dateTime: '2023-03-01',
		},
		{
			dateTime: '2023-02-01',
		},
		{
			dateTime: '2023-01-01',
		},
		{
			dateTime: '2022-12-01',
		},
	])
	// 选择版本
	const setVersion = (index) => {
		chooseVersion.value = index
	}
	return {
		queryForm,
		chooseVersion,
		versionList,
		setVersion,
	}
}
