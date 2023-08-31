import useHomeMenu from '@/hooks/useHomeMenu'
import useEquipmentData from '@/hooks/useEquipmentData'
import useCurrentInstance from '@/hooks/useCurrentInstance'

export const homeDisaster = (emits) => {
	const { disaster } = useHomeMenu()
	const { proxy } = useCurrentInstance()
	const { disasterLocation } = useEquipmentData()

	// 点击模拟生成灾害模拟
	const generateDisaster = () => {
		if (!disasterLocation.value) {
			proxy.$modal.msgWarning('请选择灾变地点')
			return
		}
		// 生成起点
		const pointObj = disasterLocation.value.split('-')
		if (pointObj.length < 2) {
			proxy.$modal.msgWarning('灾变地点请选择巷道')
			return
		}

		emits('generateDisaster')
	}
	//   退出
	const quit = () => {
		disaster.value = false
	}
	onBeforeUnmount(() => {
		quit()
	})
	return {
		generateDisaster,
		quit,
	}
}
