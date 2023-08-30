import useEquipmentData from '@/hooks/useEquipmentData'
import { deviceTypes, MenuTypes } from '@/api/request/menuType'
import useHomeMenu from '@/hooks/useHomeMenu'
import { infoPath, infoPathList } from '@/api/api/home'

export const homeRoam = (emits) => {
	// 设备巡检列表
	const pathList = ref([])
	const getPathList = async () => {
		const res = await infoPathList()
		if (res && res.data) pathList.value = res.data
	}
	onMounted(() => {
		getPathList()
	})
	//开始巡检序号
	const roamIndex = ref(0)
	//   全部设备
	const { allDataList, equipmentPathList, toPosition, tEquipmentIndex } = useEquipmentData()

	// 设备巡检
	const toRoam = (time = 2, nextFun = () => {}, one = false) => {
		if (roamIndex.value === -1) return
		const item = equipmentPathList.value[roamIndex.value]
		tEquipmentIndex.value = roamIndex.value
		const position = toPosition?.(item)
		roamIndex.value =
			roamIndex.value >= equipmentPathList.value.length - 1 ? (one ? -1 : 0) : roamIndex.value + 1
		emits('moveCamera', position, item.point, time, nextFun)
	}
	// 巡检定时
	const roamInterval = ref()

	// 启动定时
	const startInterval = (startFun) => {
		startFun()
		roamInterval.value = setInterval(() => {
			startFun()
		}, 5000)
	}

	const { roam } = useHomeMenu()
	// 清除定时
	const cleanInterval = () => {
		roam.value = false
		clearInterval(roamInterval.value)
		roamIndex.value = 0
	}

	const chooseBtn = ref(0)

	const changeBtn = async (val, id = undefined) => {
		if (val === chooseBtn.value || id === undefined) {
			chooseBtn.value = 0
			return
		}

		const res = await infoPath(id)
		if (res && res.data) {
			equipmentPathList.value = []
			for (let i = 0; i < res.data.length; i++) {
				const point = allDataList.value.find((item) => {
					return item.id === res.data[i].devId && item.devType === res.data[i].devType
				})
				equipmentPathList.value.push({
					...res.data[i],
					uniqueCode: point.uniqueCode,
					point: { ...point.point },
				})
			}
			chooseBtn.value = val
		}
	}
	watch(
		() => chooseBtn.value,
		(value) => {
			roam.value = true
			switch (value) {
				case 0:
					cleanInterval()
					break
				// 设备巡检
				case MenuTypes.ONE:
					startInterval(() => {
						if (roamIndex.value === -1) changeBtn(0)
						toRoam(2, () => {}, true)
					})
					break
				// 全部设备循环巡检
				case MenuTypes.TWO:
					startInterval(toRoam)
					break
			}
		},
	)

	// 巡检内容最大显示条数
	const roamMaxTotal = ref(8)
	// 巡检列表定位最大可视索引
	const maxIndex = ref(4)
	// 巡检列表下移步数
	const downStep = computed(() => {
		return tEquipmentIndex.value - maxIndex.value > 0 ? tEquipmentIndex.value - maxIndex.value : 0
	})
	// 巡检列表可显示内容
	const roamList = computed(() => {
		let list = equipmentPathList.value.filter((i, index) => {
			return index >= downStep.value && index < roamMaxTotal.value + downStep.value
		})
		list.length = roamMaxTotal.value

		let temp = []
		for (let i = 0; i < list.length; i++) {
			temp[i] = list[list.length - 1 - i]
		}
		return temp
	})
	// 获取巡检列表样式
	const iconStyle = (index) => {
		const aIndex = roamMaxTotal.value - 1 + downStep.value - tEquipmentIndex.value
		if (index < aIndex) {
			return 'home_roam_equipment_bottom_icon_1'
		} else if (index === aIndex) {
			return 'home_roam_equipment_bottom_icon_2'
		} else if (index > aIndex) {
			return 'home_roam_equipment_bottom_icon_3'
		}
	}
	// 巡检状态
	const pathStatus = (index) => {
		const aIndex = roamMaxTotal.value - 1 + downStep.value - tEquipmentIndex.value
		if (index < aIndex) {
			return '待巡检'
		} else if (index === aIndex) {
			return '巡检中'
		} else if (index > aIndex) {
			return '已巡检'
		}
	}

	const textStyle = (index) => {
		const aIndex = roamMaxTotal.value - 1 + downStep.value - tEquipmentIndex.value
		if (index < aIndex) {
			return 'home_roam_route_text_bg_1'
		} else if (index === aIndex) {
			return 'home_roam_route_text_bg_2'
		} else if (index > aIndex) {
			return 'home_roam_route_text_bg_3'
		}
	}

	onBeforeUnmount(() => {
		changeBtn(0)
	})

	return {
		pathList,
		chooseBtn,
		changeBtn,
		cleanInterval,
		roamList,
		iconStyle,
		textStyle,
		pathStatus,
		roamMaxTotal,
	}
}
