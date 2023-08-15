export const airShortCirControl = () => {
	const dataForm = ref({
		doorMode: '1',
	})
	// 模式选中样式
	const modelActiveMap = new Map([
		['1', 'item_route_an_60'],
		['2', 'item_route_60'],
		['3', 'reset_60_route'],
	])

	const modelActive = computed(() => {
		return modelActiveMap.get(dataForm.value.doorMode) ?? ''
	})

	// 改变模式
	const changeModel = (type) => {
		if (dataForm.value.doorMode === type) return
		dataForm.value.doorMode = type
	}

	return {
		dataForm,
		modelActive,
		changeModel,
	}
}
