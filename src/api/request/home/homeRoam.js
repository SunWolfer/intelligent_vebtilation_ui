import useEquipmentData from '@/hooks/useEquipmentData'
import { MenuTypes } from '@/api/request/home/menuType'
import useHomeMenu from '@/hooks/useHomeMenu'

export const homeRoam = (emits) => {
	//开始巡检序号
	const roamIndex = ref(0)
	//   全部设备
	const { allDataList, toPosition, setAllType } = useEquipmentData()
	// 设备巡检
	const toRoam = (time = 2, nextFun = () => {}, one = false) => {
		if (roamIndex.value === -1) return
		const item = allDataList.value[roamIndex.value]
		const position = toPosition?.(item)
		roamIndex.value =
			roamIndex.value >= allDataList.value.length - 1 ? (one ? -1 : 0) : roamIndex.value + 1
		emits('moveCamera', position, item.point, time, nextFun)
	}
	// 风窗开启巡检序号
	const windowRoamIndex = ref(0)
	//   风窗列表
	const windowList = computed(() => {
		return allDataList.value.filter((i) => {
			return i.type === '2'
		})
	})
	// 风窗巡检
	const windowToRoam = (time = 2, nextFun = () => {}, one = false) => {
		if (windowRoamIndex.value === -1) return
		const item = windowList.value[windowRoamIndex.value]
		const position = toPosition?.(item)
		windowRoamIndex.value =
			windowRoamIndex.value >= windowList.value.length - 1
				? one
					? -1
					: 0
				: windowRoamIndex.value + 1
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
		windowRoamIndex.value = 0
	}

	const chooseBtn = ref(0)

	const changeBtn = (val) => {
		if (val === chooseBtn.value) {
			chooseBtn.value = 0
			return
		}
		chooseBtn.value = val
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
					setAllType?.()
					startInterval(() => {
						if (roamIndex.value === -1) changeBtn(0)
						toRoam(2, () => {}, true)
					})
					break
				// 全部设备循环巡检
				case MenuTypes.TWO:
					setAllType?.()
					startInterval(toRoam)
					break
				case MenuTypes.THREE:
					setAllType?.('2')
					startInterval(() => {
						if (windowRoamIndex.value === -1) changeBtn(0)
						windowToRoam(2, () => {}, true)
					})
					break
				case MenuTypes.FOUR:
					setAllType?.('2')
					startInterval(windowToRoam)
					break
			}
		},
	)

	onBeforeUnmount(() => {
		changeBtn(0)
	})

	return {
		chooseBtn,
		changeBtn,
		cleanInterval,
	}
}
