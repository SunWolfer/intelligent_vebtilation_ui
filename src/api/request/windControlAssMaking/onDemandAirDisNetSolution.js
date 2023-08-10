export const onDemandAirDisNetSolution = () => {
	// 显示设备列表
	const tunnelListVisible = ref(true)
	// 巷道表单
	const defaultData = {
		name: '',
		code: '',
		label: '',
		girth: '',
		area: '',
		length: '',
		shape: '',
		supportType: '',
		airSupplyVolume: '',
		hasSet: false,
	}
	//   巷道设置列表
	const tunnelList = ref([])
	// 选中巷道
	const chooseTunnel = (val) => {
		const dataIndex = tunnelList.value.findIndex((i) => i.label === val.name)
		if (dataIndex === -1) {
			tunnelList.value.push({ ...defaultData, code: val.name })
		}
	}

	// 确认添加
	const controlTunnelData = (index) => {
		tunnelList.value[index].hasSet = true
	}
	// 删除
	const controlDelete = (index) => {
		tunnelList.value.splice(index, 1)
	}
	// 重置
	const resetTunnelData = () => {
		tunnelList.value = []
	}

	// 已设置列表
	const hasSetList = computed(() => {
		return tunnelList.value.filter((i) => {
			return i?.hasSet
		})
	})

	// 操作步骤
	const operationStepsList = ref([])
	// 解算模拟
	const imitateVisible = ref(false)
	// 解算模拟
	const showImitateVisible = () => {
		if (!hasSetList.value.length) return
		for (let i = 0; i < hasSetList.value.length; i++) {
			const data = hasSetList.value[i]
			operationStepsList.value.push({
				name: data.name,
				label: '供风量设置' + data.airSupplyVolume,
			})
		}

		imitateVisible.value = true
	}

	// 解算模拟显示后
	const showAfterCalVisible = () => {
		tunnelListVisible.value = false
	}
	// 解算模拟隐藏后
	const cancelAirDisNetwork = () => {
		tunnelListVisible.value = true
	}

	return {
		tunnelList,
		controlTunnelData,
		controlDelete,
		resetTunnelData,
		imitateVisible,
		operationStepsList,
		showImitateVisible,
		showAfterCalVisible,
		cancelAirDisNetwork,
		tunnelListVisible,
		chooseTunnel,
	}
}
