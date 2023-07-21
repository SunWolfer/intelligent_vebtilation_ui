import useEquipmentData from '@/hooks/useEquipmentData'
import { MenuTypes } from '@/api/request/home/menuType'
import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'
import useHomeMenu from '@/hooks/useHomeMenu'
import { homeMenu } from '@/api/request/home/homeMenu'

export const homeRoam = (emits) => {
	const { clickEvent } = useHomeMenu()
	// 点击位置
	const clickPosition = computed(() => {
		const dom = clickEvent.value
		const { clientX, offsetX } = dom
		const { clientWidth } = dom.target
		return {
			x: clientX - offsetX - (dynamicWidth(359) - clientWidth) / 2,
		}
	})
	const domStyle = computed(() => {
		const { x } = clickPosition.value
		return {
			bottom: dynamicHeight(90) + 'px',
			left: x + 'px',
		}
	})

	//开始巡检序号
	const roamIndex = ref(0)
	//   全部设备
	const { allDataList, toPosition, setAllType } = useEquipmentData()
	// 设备巡检
	const toRoam = (time = 2, nextFun = () => {}, one = false) => {
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
		clearInterval(roamInterval.value)
		roam.value = false
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
						toRoam(2, () => {}, true)
						if (roamIndex.value === -1) cleanInterval()
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
						windowToRoam(2, () => {}, true)
						if (windowRoamIndex.value === -1) cleanInterval()
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
		cleanInterval()
	})

	return {
		chooseBtn,
		changeBtn,
		domStyle,
	}
}
