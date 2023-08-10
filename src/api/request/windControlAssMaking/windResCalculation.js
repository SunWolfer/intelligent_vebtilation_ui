export const windResCalculation = () => {
	//   实测计算风阻列表
	const meaWindResDataList = ref([
		{
			name: '1',
		},
	])
	//   人工测定风阻
	const artWindResDataList = ref([])
	//   测算风阻
	const calOfWindResDataList = ref([])

	return {
		meaWindResDataList,
		artWindResDataList,
		calOfWindResDataList,
	}
}
