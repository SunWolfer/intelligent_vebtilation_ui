import pageParameters from '@/store/modules/pageParameters'

const useEquipmentParams = () => {
	const equipmentParams = pageParameters()

	//   设备参数
	const dataParams = equipmentParams.equipmentParams
	//   退出页面清除设备参数
	const cleanParams = () => {
		equipmentParams.updateEquipmentParams(undefined)
	}
	// 设置参数
	const setParams = (data) => {
		equipmentParams.updateEquipmentParams(data)
	}

	return {
		dataParams,
		cleanParams,
		setParams,
	}
}

export default useEquipmentParams
