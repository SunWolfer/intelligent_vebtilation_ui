import { DisasterTypes } from '@/api/request/home/menuType'

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
	// 点击模拟生成避灾路线
	const imitateRoute = () => {
		emits('imitateRoute')
	}
	// 退出
	const back = () => {
		emits('backDisasterRoute')
	}
	return {
		changeDisaster,
		setDisaster,
		setPersonnel,
		imitateRoute,
	}
}
