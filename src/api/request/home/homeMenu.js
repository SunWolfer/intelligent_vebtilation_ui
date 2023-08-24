import { MenuTypes } from '@/api/request/menuType'
import useHomeMenu from '@/hooks/useHomeMenu'

export const homeMenu = () => {
	// 菜单Type
	// 首页底部菜单
	const menuList = ref([
		{
			name: '设备索引',
			type: MenuTypes.ONE,
		},
		{
			name: '巡检漫游',
			type: MenuTypes.TWO,
		},
		{
			name: '风网解算',
			type: MenuTypes.THREE,
		},
		{
			name: '多视角',
			type: MenuTypes.FOUR,
		},
		{
			name: '反风模拟',
			type: MenuTypes.FIVE,
		},
		{
			name: '避灾路线模拟',
			type: MenuTypes.SIX,
		},
		{
			name: '灾害模拟',
			type: MenuTypes.SEVEN,
		},
	])
	const { showMenus } = useHomeMenu()
	// 隐藏显示功能
	const setHomeFun = (type, event) => {
		const hasFun = showMenus.value.indexOf(type) !== -1
		if (hasFun) {
			showMenus.value = showMenus.value.filter((i) => i !== type)
		} else {
			if (type === MenuTypes.ONE) {
				showMenus.value = showMenus.value.concat([type])
			} else {
				const otherType = showMenus.value.filter((i) => {
					return i === MenuTypes.ONE
				})
				showMenus.value = otherType.concat([type])
			}
		}
	}
	// 设备索引
	const showEquipmentIndex = computed(() => {
		return hasType(MenuTypes.ONE)
	})
	// 巡检漫游
	const showInspectionRoaming = computed(() => {
		return hasType(MenuTypes.TWO)
	})
	// 风网解算
	const showWindNetworkCalculation = computed(() => {
		return hasType(MenuTypes.THREE)
	})
	// 多视角
	const showMultiplePerspectives = computed(() => {
		return hasType(MenuTypes.FOUR)
	})
	// 反风模拟
	const showReverseWindSimulation = computed(() => {
		return hasType(MenuTypes.FIVE)
	})
	// 避灾路线模拟
	const showDisasterPreventionRoute = computed(() => {
		return hasType(MenuTypes.SIX)
	})
	// 灾害模拟
	const showDisasterSimulation = computed(() => {
		return hasType(MenuTypes.SEVEN)
	})

	const hasType = (type) => {
		return showMenus.value.indexOf(type) !== -1
	}
	return {
		menuList,
		showMenus,
		setHomeFun,
		showEquipmentIndex,
		showInspectionRoaming,
		showWindNetworkCalculation,
		showMultiplePerspectives,
		showReverseWindSimulation,
		showDisasterPreventionRoute,
		showDisasterSimulation,
	}
}
