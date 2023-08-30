import { ClickEventTypes } from '@/api/request/menuType'
import useEquipment from '@/store/modules/equipmentData'
import { deviceAll } from '@/api/api/home'

export const home = () => {
	const equipmentData = useEquipment()

	async function getDeviceAll() {
		const res = await deviceAll()
		if (res && res.data) {
			let dataList = res.data
			for (let i = 0; i < dataList.length; i++) {
				for (let j = 0; j < dataList[i].children.length; j++) {
					dataList[i].children[j] = {
						...dataList[i].children[j],
						point: {
							x: dataList[i].children[j].pointX,
							y: dataList[i].children[j].pointY,
							z: dataList[i].children[j].pointZ,
						},
					}
				}
			}
			equipmentData.updateData(dataList)
		}
	}

	onMounted(() => {
		getDeviceAll()
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
