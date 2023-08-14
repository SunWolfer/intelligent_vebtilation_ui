import useEquipmentParams from '@/hooks/useEquipmentParams'

export const homeAirDoor = () => {
	const dataForm = ref({})
	const equipmentParams = useEquipmentParams()
	onMounted(() => {
		dataForm.value = equipmentParams.dataParams
	})
	onBeforeUnmount(() => {
		equipmentParams.cleanParams()
	})

	// 模式选中样式
	const modelActiveMap = new Map([
		['1', 'item8_route_an_60'],
		['2', 'item8_route_60'],
		['3', 'reset_60_route'],
	])

	const modelActive = ref('')
	watch(
		() => dataForm.value.doorMode,
		(val, old) => {
			if (val) modelActive.value = modelActiveMap.get(val)
		},
	)
	// 改变模式
	const changeModel = (type) => {
		if (dataForm.value.doorMode === type) return
		dataForm.value.doorMode = type
	}

	// 显示更多
	const moreVisible = ref(false)

	const initMoreVisible = () => {
		moreVisible.value = true
	}

	return {
		dataForm,
		moreVisible,
		initMoreVisible,
		modelActive,
		changeModel,
	}
}
