import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'
import { onClickOutside } from '@vueuse/core'
import useThree from '@/hooks/useThree'
import useEquipmentData from '@/hooks/useEquipmentData'
import { deviceTypes } from '@/api/request/home/menuType'

export const homeIcon = (emits) => {
	const { equipmentList, equipTypeList, toPosition } = useEquipmentData()

	// 设备列表搜索
	const equipSearch = ref('')
	const queryEquipList = () => {}
	const equipmentIconMap = new Map([
		[deviceTypes.DOOR, 'home_icon_1'],
		[deviceTypes.WINDOW, 'home_icon_2'],
		[deviceTypes.WINDSENSOR, 'home_icon_3'],
		[deviceTypes.MULTIPARAMETE, 'home_icon_4'],
		[deviceTypes.FULLWIND, 'home_icon_5'],
		[deviceTypes.MAINFAN, 'home_icon_6'],
		[deviceTypes.LOCALFAN, 'home_icon_7'],
		[deviceTypes.All, 'home_icon_8'],
	])
	// 菜单移动起点
	const firstMenuStartingPoint = ref(0)
	// 菜单默认显示数量
	const defaultRouteNum = ref(8)
	//   设备样式
	const getEquipmentClass = (item) => {
		const IClass = equipmentIconMap.get(item.type)
		return equipTypeList.value.indexOf(item.type) !== -1 ? IClass + '_active' : IClass
	}
	//   图标偏移距离01 2345 67
	const iconStyle = (index) => {
		let num = [0, 1, 6, 7].indexOf(index) >= 0 ? (index > 1 ? 5 : 2) : index
		const distanceNum = Math.abs(num - index)
		return {
			marginLeft: distanceNum * dynamicWidth(30) + 'px',
		}
	}
	//   显示二级菜单
	const showSecondMenu = ref(false)
	// 二级菜单
	const secondMenuList = ref([])
	// 一级菜单点击位置
	const firstMenuClickPosition = ref({})
	// 选中一级菜单
	const chooseFirstMenu = ref(undefined)
	//   点击一级菜单
	const clickFirstMenu = (item, index, event) => {
		showSecondMenu.value = false

		nextTick().then((r) => {
			chooseFirstMenu.value = item
			secondMenuList.value = item.children
			firstMenuClickPosition.value = event
			showSecondMenu.value = true
		})
	}

	// 选中设备
	const chooseEquipment = ref({})

	// 选中子类
	const setChooseEquipment = (item) => {
		chooseEquipment.value = item
		showSecondMenu.value = false
		const position = toPosition?.(item)

		emits('moveCamera', position, item.point)
	}
	//   选中父类
	const setChooseFather = (type) => {
		let typeList = []
		// 判断是否存在
		const hasIn = equipTypeList.value.indexOf(type) !== -1
		// 已存在
		if (hasIn) {
			if (type === deviceTypes.All) {
				typeList = []
			} else {
				typeList = equipTypeList.value.filter((i) => {
					return i !== type && i !== deviceTypes.All
				})
			}
		} else {
			// 	不存在
			if (type === deviceTypes.All) {
				typeList = equipmentList.value.map((i) => {
					return i.type
				})
			} else {
				typeList = equipTypeList.value.concat([type])
			}
		}
		equipTypeList.value = typeList
	}

	// 选中二级菜单
	const getChooseMenu = (item) => {
		return item.id === chooseEquipment.value?.id ? 'home_icon_s_m_active' : 'home_icon_s_m_default'
	}
	// 	二级菜单个数
	const menuLength = computed(() => {
		return secondMenuList.value.length
	})

	// 	二级菜单区域位置
	const navigateStyle = computed(() => {
		const { clientX, clientY } = firstMenuClickPosition.value
		const domH = dynamicHeight(32 * menuLength.value)
		const downMoveAdd = clientY + domH / 2
		// 下移超出位置
		const downMoveNum = downMoveAdd - dynamicHeight(989)
		const downMoveMinus = clientY - domH / 2
		const top = downMoveNum > 0 ? downMoveMinus - downMoveNum : downMoveMinus
		const left = clientX + dynamicWidth(40)
		return {
			top: top - dynamicHeight(91) + 'px',
			left: left + 'px',
		}
	})

	// 二级菜单Dom
	const HomeIconSecondMenuRef = ref(null)
	// 点击外部隐藏
	onClickOutside(HomeIconSecondMenuRef, () => {
		showSecondMenu.value = false
	})

	return {
		equipmentList,
		equipTypeList,
		equipSearch,
		queryEquipList,
		iconStyle,
		getEquipmentClass,
		clickFirstMenu,
		chooseFirstMenu,
		HomeIconSecondMenuRef,
		showSecondMenu,
		secondMenuList,
		navigateStyle,
		getChooseMenu,
		chooseEquipment,
		setChooseFather,
		setChooseEquipment,
	}
}
