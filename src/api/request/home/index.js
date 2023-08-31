import { ClickEventTypes } from '@/api/request/menuType'
import useEquipment from '@/store/modules/equipmentData'
import { deviceAll } from '@/api/api/home'
import { useGainList } from '@/hooks/useGainList'

export const home = () => {
	const equipmentData = useEquipment()

	useGainList({
		apiFun: deviceAll,
		afterReadyDataFun: (data) => {
			for (let i = 0; i < data.length; i++) {
				for (let j = 0; j < data[i].children.length; j++) {
					data[i].children[j] = {
						...data[i].children[j],
						point: {
							x: data[i].children[j].pointX,
							y: data[i].children[j].pointY,
							z: data[i].children[j].pointZ,
						},
					}
				}
			}
			equipmentData.updateData(data)
		},
	})

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
	// 清除风网解算文字
	const cleanText = () => {
		threeRef.value?.operateModel.myWindText.cleanText()
	}

	// 创建灾变地点
	const setDisaster = () => {
		threeRef.value?.changeClickType(ClickEventTypes.DISASTER)
	}
	// 创建灾变人员位置
	const setPersonnel = () => {
		threeRef.value?.changeClickType(ClickEventTypes.PERSONNEL)
	}
	// 改变灾变类型
	const changeDisasterType = (type) => {
		threeRef.value?.changeDisasterType(type)
	}
	// 创建避灾路线
	const imitateRoute = () => {
		threeRef.value?.disasterRoute()
	}
	// 创建灾害模拟
	const generateDisaster = () => {
		threeRef.value?.createdDisasterSpread()
	}

	return {
		threeRef,
		moveCamera,
		loadText,
		cleanText,
		setDisaster,
		setPersonnel,
		imitateRoute,
		changeDisasterType,
		generateDisaster,
	}
}
