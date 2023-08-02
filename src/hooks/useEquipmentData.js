import useEquipment from '@/store/modules/equipmentData'
import useThree from '@/hooks/useThree'
import { deviceTypes } from '@/api/request/home/menuType'

const useEquipmentData = () => {
	const equipmentData = useEquipment()

	//   设备列表
	const equipmentList = computed(() => {
		return equipmentData.data
	})
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
			return equipmentData.equipTypeList
		},
		set(val) {
			equipmentData.updateEquipTypeList(val)
		},
	})
	// 添加全部设备类型
	const setAllType = (type = '8') => {
		let typeList = []
		if (type === '8') {
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
	// 可显示设备
	const showTypeList = computed(() => {
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
		// 判断是否存在
		const hasIn = equipTypeList.value.indexOf(item.type) !== -1
		// 不存在则显示全部该类型数据
		if (!hasIn) equipTypeList.value.push(item.type)
		return {
			x: item.point.x + cameraExcursion.value.x,
			y: item.point.y + cameraExcursion.value.y,
			z: item.point.z + cameraExcursion.value.z,
		}
	}
	// 全部列表数据
	const allDataList = computed(() => {
		const dataList = equipmentData.data
		let children = []
		for (let i = 0; i < dataList.length; i++) {
			children.push(...dataList[i].children)
		}
		return children
	})
	//   总预警列表
	const warnList = computed(() => {
		return allDataList.value.filter((i) => i.warnType !== '0')
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

	// 全部设备类型
	const equipmentTypeMap = new Map([
		[deviceTypes.ONE, '风门'],
		[deviceTypes.TWO, '风窗'],
		[deviceTypes.THREE, '风速传感器'],
		[deviceTypes.FOUR, '多参传感器'],
		[deviceTypes.FIVE, '全断面测风'],
		[deviceTypes.SIX, '主通风机'],
		[deviceTypes.SEVEN, '局扇风机'],
	])

	// 格式化设备类型显示
	const formatterEquipmentType = (type) => {
		return equipmentTypeMap.get(type)
	}

	return {
		equipmentList,
		tEquipmentIndex,
		equipTypeList,
		setAllType,
		showTypeList,
		toPosition,
		allDataList,
		warnList,
		disasterPreventionRoute,
		formatterEquipmentType,
	}
}

export default useEquipmentData
