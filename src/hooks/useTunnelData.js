// 巷道参数
import tunnelData from '@/store/modules/tunnelData'

export const useTunnelData = () => {
	const tunnel = tunnelData()
	//   所有巷道参数列表
	const tunnelDataList = computed({
		get() {
			return tunnel.data
		},
		set(val) {
			tunnel.updateData(val)
		},
	})
	// 可显示巷道参数列表
	const showTunnelData = ref(undefined)
	// 显示某巷道参数
	const showParam = (name) => {
		showTunnelData.value =
			tunnelDataList.value.find((i) => {
				return i.name === name
			}) ?? undefined
	}

	return {
		tunnelDataList,
		showTunnelData,
		showParam,
	}
}
