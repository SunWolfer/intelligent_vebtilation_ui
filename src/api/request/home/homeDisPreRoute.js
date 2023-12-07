import { DisasterTypes } from '@/types/menuType'
import useHomeMenu from '@/hooks/useHomeMenu'
import useEquipmentData from '@/hooks/useEquipmentData'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { escapeRoadData } from '@/api/api/home'

export const homeDisPreRoute = (emits) => {
	// 灾变类型
	const disasterType = ref(DisasterTypes.ONE)
	// 改变灾变类型
	const changeDisaster = (type) => {
		disasterType.value = type
		emits('changeDisasterType', disasterType.value)
	}
	// 点击生成灾变地点
	const setDisaster = () => {
		emits('setDisaster', disasterType.value)
	}
	// 点击生成人员位置
	const setPersonnel = () => {
		emits('setPersonnel')
	}
	const { avoidDisaster } = useHomeMenu()

	const { proxy } = useCurrentInstance()
	// 避灾路线相关
	const {
		disasterPreventionRoute,
		disasterLocation,
		disasterPosition,
		personLocation,
		personPosition,
	} = useEquipmentData()
	watch([disasterPosition, personPosition], async (value) => {
		await imitateRoute()
	})
	// 点击模拟生成避灾路线
	const imitateRoute = async () => {
		if (!disasterPosition.value) {
			proxy.$modal.msgWarning('请选择灾变地点')
			return
		}
		if (!personPosition.value) {
			proxy.$modal.msgWarning('请选择人员位置')
			return
		}
		// 生成起点
		const pointObj = personLocation.value.split('-')
		if (pointObj.length < 2) {
			proxy.$modal.msgWarning('人员地点请选择巷道')
			return
		}
		const res = await escapeRoadData({
			personLocation: personLocation.value,
			disasterLocation: disasterLocation.value,
			disasterType: disasterType.value,
			personX: personPosition.value.x,
			personY: personPosition.value.y,
			personZ: personPosition.value.z,
			disasterX: disasterPosition.value.x,
			disasterY: disasterPosition.value.y,
			disasterZ: disasterPosition.value.z,
		})
		if (res && res.data) {
			disasterPreventionRoute.value = [res.data.path]
			disasterRouteText.value = res.data.pathLanguage
			emits('imitateRoute')
		}
	}
	// 退出
	const quit = () => {
		avoidDisaster.value = false
	}
	// 人员避灾路线
	const disasterRouteText = ref([])

	onBeforeUnmount(() => {
		quit()
	})
	return {
		changeDisaster,
		setDisaster,
		setPersonnel,
		imitateRoute,
		quit,
		disasterRouteText,
	}
}
