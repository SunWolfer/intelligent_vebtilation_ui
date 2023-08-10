import { EditType } from '@/components/VueThree/types/editType'

export const naturalDisNetSolution = () => {
	// 3D模型
	const modelRef = ref(null)

	// 显示分风网络解算
	const showAirDisNetwork = ref(true)

	//   选中菜单
	const chooseMenu = ref(0)

	// 编辑
	const changeChooseMenu = (type) => {
		if (chooseMenu.value === type) {
			chooseMenu.value = EditType.DEFAULT
			return
		}
		chooseMenu.value = type
	}
	// 风窗弹窗
	const windowVisible = ref(false)
	const showWindowVisibleVisible = () => {
		windowVisible.value = true
	}
	// 风窗信息
	const windowForm = ref({
		windage: 0,
	})
	const windowConfirm = () => {
		if (!windowForm.value.windage) return
		windowVisible.value = false
	}

	// 确认添加风窗
	const confirmWindow = ref(true)
	const windowCancel = () => {
		confirmWindow.value = false
		nextTick(() => {
			confirmWindow.value = true
		})
	}

	// 操作步骤
	const operationStepsList = ref([])
	// 解算模拟
	const imitateVisible = ref(false)
	const deviceLabelMap = new Map([
		['1', '添加风门'],
		['2', '添加风窗'],
		['3', '添加传感器'],
	])
	const showImitateVisible = () => {
		// 获取添加信息
		const { deviceList, tunnelList } = modelRef.value?.getOperating()
		for (let i = 0; i < deviceList.length; i++) {
			const device = deviceList[i]
			operationStepsList.value.push({
				name: device.name,
				label: deviceLabelMap.get(device.type),
			})
		}
		for (let i = 0; i < tunnelList.length; i++) {
			const tunnel = tunnelList[i]
			operationStepsList.value.push({
				name: tunnel.nodeName + '-' + tunnel.nextNode,
				label: '连接巷道',
			})
		}
		imitateVisible.value = true
	}
	const cancelImitateVisible = () => {
		operationStepsList.value = []
	}

	const showAfterCalVisible = () => {
		showAirDisNetwork.value = false
	}
	// 取消解算后界面
	const cancelAirDisNetwork = () => {
		showAirDisNetwork.value = true
	}

	// 重置
	const resetModel = () => {
		chooseMenu.value = 0
		modelRef.value?.resetTunnel()
		cancelImitateVisible()
	}

	return {
		modelRef,
		showAirDisNetwork,
		chooseMenu,
		changeChooseMenu,
		windowVisible,
		showWindowVisibleVisible,
		confirmWindow,
		windowForm,
		windowConfirm,
		windowCancel,
		showImitateVisible,
		resetModel,
		imitateVisible,
		operationStepsList,
		showAfterCalVisible,
		cancelAirDisNetwork,
	}
}
