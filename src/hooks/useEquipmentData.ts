import useEquipment from '@/store/modules/equipmentData'
import useThree from '@/hooks/useThree'
import { deviceTypes } from '@/types/menuType'

const useEquipmentData = () => {
	const equipmentData = useEquipment()

	//   设备列表
	const equipmentList = computed(() => {
		return equipmentData.data
	})
	// 设备类型列表
	const equipmentTypeList = equipmentData.equipmentTypeList
	// 当前显示设备索引
	const tEquipmentIndex = computed({
		get() {
			return equipmentData.tEquipmentIndex
		},
		set(val) {
			equipmentData.updateTEquipmentIndex(val)
		},
	})
	// 可显示设备类型
	const equipTypeList = computed({
		get() {
			return equipmentData.showEquipTypeList
		},
		set(val) {
			equipmentData.updateShowEquipTypeList(val)
		},
	})
	// 添加全部设备类型
	const setAllType = (type = 'all') => {
		let typeList: deviceTypes[] = []
		if (type === 'all') {
			typeList = equipmentList.value.map((i) => {
				return i.type
			})
		} else {
			typeList = equipmentList.value
				.filter((i) => {
					return i.type === type
				})
				.map((i) => {
					return i.type
				})
		}
		equipTypeList.value = typeList
	}
	// 全部设备
	const allTypeList = computed(() => {
		let childes: LabelAttribute[] = []
		for (let i = 0; i < equipmentList.value.length; i++) {
			let child = equipmentList.value[i]
			childes = childes.concat(child.children)
		}
		return childes
	})
	// 可显示设备
	const optionalDataList = computed(() => {
		let childes = []
		for (let i = 0; i < equipmentList.value.length; i++) {
			let child = equipmentList.value[i]
			if (equipTypeList.value.indexOf(child.type) !== -1) {
				childes = childes.concat(child.children)
			}
		}
		return childes
	})
	// 跳转至点位
	// 相机移动固定参数
	const { cameraExcursion } = useThree()
	const toPosition = (item) => {
		return {
			x: item.point.x + cameraExcursion.value.x,
			y: item.point.y + cameraExcursion.value.y,
			z: item.point.z + cameraExcursion.value.z,
		}
	}
	// 全部列表数据
	const allDataList = computed(() => {
		const dataList: LabelAttribute[] = equipmentData.data
		let children: LabelAttribute[] = []
		for (let i = 0; i < dataList.length; i++) {
			if (dataList[i].children) children.push(...dataList[i].children)
		}
		return children
	})

	//显示避灾路线
	const disasterPreventionRoute = computed({
		get() {
			return equipmentData.disasterPreventionRoute
		},
		set(val) {
			equipmentData.updateRouteData(val)
		},
	})
	// 灾变位置
	const disasterPosition = computed({
		get() {
			return equipmentData.disasterPosition
		},
		set(val) {
			equipmentData.updateDisasterPosition(val)
		},
	})
	// 灾变位置名称
	const disasterLocation = computed({
		get() {
			return equipmentData.disasterLocation
		},
		set(val) {
			equipmentData.updateDisasterLocation(val)
		},
	})
	// 灾变人员位置
	const personPosition = computed({
		get() {
			return equipmentData.personPosition
		},
		set(val) {
			equipmentData.updatePersonPosition(val)
		},
	})
	// 灾变人员位置名称
	const personLocation = computed({
		get() {
			return equipmentData.personLocation
		},
		set(val) {
			equipmentData.updatePersonLocation(val)
		},
	})

	// 全部设备类型
	const equipmentTypeMap = new Map([
		[deviceTypes.DOOR, '风门'],
		[deviceTypes.WINDOW, '风窗'],
		[deviceTypes.WINDSENSOR, '风速传感器'],
		[deviceTypes.MULTIPARAMETE, '多参传感器'],
		[deviceTypes.FULLWIND, '全断面测风'],
		[deviceTypes.MAINFAN, '主通风机'],
		[deviceTypes.LOCALFAN, '局扇风机'],
	])

	// 格式化设备类型显示
	const formatterEquipmentType = (type) => {
		return equipmentTypeMap.get(type)
	}
	const typeClassMap = new Map([
		[deviceTypes.DOOR, '1'],
		[deviceTypes.WINDOW, '2'],
		[deviceTypes.WINDSENSOR, '3'],
		[deviceTypes.MULTIPARAMETE, '4'],
		[deviceTypes.FULLWIND, '5'],
		[deviceTypes.MAINFAN, '6'],
		[deviceTypes.LOCALFAN, '7'],
	])
	// 设备类型图片
	function equipTypeImgClass(type: deviceTypes) {
		return typeClassMap.get(type) ?? ''
	}
	// 设备巡检列表
	const equipmentPathList = computed({
		get() {
			return equipmentData.equipmentPath
		},
		set(val) {
			equipmentData.updateEquipmentPath(val)
		},
	})

	return {
		equipmentList,
		equipmentTypeList,
		tEquipmentIndex,
		equipTypeList,
		setAllType,
		allTypeList,
		optionalDataList,
		toPosition,
		allDataList,
		disasterPreventionRoute,
		formatterEquipmentType,
		equipTypeImgClass,
		equipmentPathList,
		personLocation,
		disasterPosition,
		disasterLocation,
		personPosition,
	}
}

export default useEquipmentData
