import { useTunnelData } from '@/hooks/useTunnelData'
import { setFixedOk } from '@/api/api/onDemandAirDisNetSolution'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { useWindNetCalculation } from '@/hooks/useWindNetCalculation'

export const onDemandAirDisNetSolution = () => {
	const { proxy } = useCurrentInstance()
	// 显示设备列表
	const tunnelListVisible = ref(true)
	// 巷道表单
	const defaultData = {
		name: '',
		code: '',
		label: '',
		circumference: '',
		surface: '',
		length: '',
		ventShape: '',
		shoreType: '',
		fixedQ: '',
		hasSet: false,
	}
	//   巷道设置列表
	const tunnelList = ref([])
	// 查询巷道信息
	const { showTunnelData, showParam } = useTunnelData()
	// 选中巷道
	const chooseTunnel = async (val) => {
		const dataIndex = tunnelList.value.findIndex((i) => i.code === val.name)
		if (dataIndex === -1) {
			await showParam?.(val.name)
			if (showTunnelData.value) {
				tunnelList.value.push(showTunnelData.value)
			}
		}
	}

	// 确认添加
	const controlTunnelData = async (index) => {
		// 查询是否允许设置固定风量
		const { data } = await setFixedOk({
			code: tunnelList.value[index].code,
		})
		if (data) {
			tunnelList.value[index].hasSet = true
		} else {
			proxy.$modal.msg('该巷道不允许设置固定风量')
		}
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
				code: data.code,
				label: '供风量设置' + data.fixedQ,
				value: data.fixedQ,
			})
		}

		imitateVisible.value = true
	}
	const { fontList, splitText } = useWindNetCalculation()
	// 解算模拟显示后
	const showAfterCalVisible = (dataList) => {
		splitText?.(dataList)
		tunnelListVisible.value = false
	}
	// 解算模拟隐藏后
	const cancelAirDisNetwork = () => {
		tunnelListVisible.value = true
		fontList.value = []
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
		fontList,
	}
}
