import { EditType } from '@/components/VueThree/types/editType'
import { useWindNetCalculation } from '@/hooks/useWindNetCalculation'

export const naturalDisNetSolution = () => {
	// 3D模型
	const modelRef = ref(null)

	// 显示分风网络解算
	const showAirDisNetwork = ref(true)

	//   选中菜单
	const chooseMenu = ref(EditType.DEFAULT)

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
	const showWindowVisibleVisible = (name) => {
		windowVisible.value = true
		windowForm.value.code = name
	}
	// 风窗信息
	const windowForm = ref({
		windage: 0,
		code: '',
	})
	// 添加风窗列表
	const addWindowForm = ref([])
	const windowConfirm = () => {
		if (!windowForm.value.windage) return
		windowVisible.value = false
		addWindowForm.value.push({
			...windowForm.value,
		})
	}

	// 确认添加风窗
	const confirmWindow = ref(true)
	const windowCancel = () => {
		confirmWindow.value = false
		nextTick(() => {
			confirmWindow.value = true
		})
	}

	// 巷道风阻弹窗
	const tunnelVisible = ref(false)
	const tunnelHandle = (name) => {
		tunnelVisible.value = true
		tunnelForm.value.code = name
	}
	// 巷道风阻表单
	const tunnelForm = ref({
		windage: 0,
		code: '',
	})
	// 巷道风阻列表
	const tunnelFormList = ref([])
	// 确认连接巷道
	const confirmTunnel = ref(true)
	const tunnelConfirm = () => {
		if (!tunnelForm.value.windage) return
		tunnelVisible.value = false
		tunnelFormList.value.push({
			...tunnelForm.value,
		})
	}
	// 取消连接巷道
	const tunnelCancel = () => {
		confirmTunnel.value = false
		nextTick(() => {
			confirmTunnel.value = true
		})
	}

	// 操作步骤
	const operationStepsList = ref([])
	// 解算模拟
	const imitateVisible = ref(false)
	const deviceLabelMap = new Map([
		['1', ['添加风门', 20, 'door']],
		['2', ['添加风窗', 0, 'window']],
		['3', ['添加密闭墙', 100000000, 'wall']],
	])
	const showImitateVisible = () => {
		// 获取添加信息
		const { deviceList, tunnelList } = modelRef.value?.getOperating()
		for (let i = 0; i < deviceList.length; i++) {
			const device = deviceList[i]
			const deviceData = deviceLabelMap.get(device.type)
			let ventR = deviceData[1]
			// 判断风窗
			if (!ventR) {
				ventR =
					addWindowForm.value.find((i) => {
						return i.code === device.name
					})?.windage ?? 0
			}

			operationStepsList.value.push({
				name: device.name,
				label: deviceData[0],
				value: ventR,
				commitType: deviceData[2],
			})
		}
		for (let i = 0; i < tunnelList.length; i++) {
			const tunnel = tunnelList[i]
			const ventR = tunnelFormList.value.find((i) => {
				return i.code === tunnel.nodeName + '-' + tunnel.nextNode
			})
			operationStepsList.value.push({
				name: tunnel.nodeName + '-' + tunnel.nextNode,
				label: '连接巷道',
				value: ventR?.windage,
				commitType: 'new',
				startNode: tunnel.nodeName,
				endNode: tunnel.nextNode,
			})
		}
		imitateVisible.value = true
	}
	const cancelImitateVisible = () => {
		operationStepsList.value = []
	}
	const { fontList, splitText } = useWindNetCalculation()
	// 显示解算后界面
	const showAfterCalVisible = (dataList) => {
		showAirDisNetwork.value = false
		splitText?.(dataList)
	}
	// 取消解算后界面
	const cancelAirDisNetwork = () => {
		showAirDisNetwork.value = true
		fontList.value = []
	}

	// 重置
	const resetModel = () => {
		chooseMenu.value = 0
		addWindowForm.value = []
		windowForm.value = {
			code: '',
			windage: 0,
		}
		tunnelFormList.value = []
		tunnelForm.value = {
			code: '',
			windage: 0,
		}
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
		tunnelVisible,
		tunnelHandle,
		tunnelForm,
		tunnelConfirm,
		tunnelCancel,
		confirmTunnel,
		fontList,
	}
}
