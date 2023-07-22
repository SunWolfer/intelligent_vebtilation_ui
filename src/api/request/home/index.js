import { ClickEventTypes } from '@/api/request/home/menuType'

export const home = () => {
	// 3D图Dom
	const threeRef = ref(null)
	// 移动镜头
	const moveCamera = (toPosition, toLookAt, time = 1, nextFun = () => {}) => {
		threeRef.value?.operateModel.traMovement(toPosition, toLookAt, time, nextFun)
	}
	// 创建风网解算文字
	const loadText = (fontList) => {
		threeRef.value?.operateModel.created3DFont(fontList)
	}
	// 重绘风流
	const redrawingWind = (direction) => {
		threeRef.value?.redrawingWind(direction)
	}

	// 创建灾变地点
	const setDisaster = (type) => {
		threeRef.value?.changeClickType(ClickEventTypes.DISASTER)
	}
	// 创建灾变人员位置
	const setPersonnel = () => {
		threeRef.value?.changeClickType(ClickEventTypes.PERSONNEL)
	}
	// 改变灾变类型
	const changeDisasterType = (type) => {
		threeRef.value?.changeDisaster(type)
	}
	// 创建避灾路线
	const imitateRoute = () => {}
	// 退出避灾路线事件
	const backDisasterRoute = () => {}

	return {
		threeRef,
		moveCamera,
		loadText,
		redrawingWind,
		setDisaster,
		setPersonnel,
		backDisasterRoute,
		imitateRoute,
		changeDisasterType,
	}
}
