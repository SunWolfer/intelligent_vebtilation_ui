import { IRouteRecordRaw } from '@/router'
import usePermissionStore from '@/store/modules/permission'
import useSettingsStore from '@/store/modules/settings'
import { getNormalPath } from '@/utils/ruoyi'
import { isExternal } from '@/utils/validate'

export const layout = () => {
	const route = useRoute()
	const permissionStore = usePermissionStore()
	const settingsStore = useSettingsStore()

	// 	全部路由
	const sidebarRouters = computed(() => permissionStore.sidebarRouters)
	//可显示路由地址
	const availableAddressList = computed<IRouteRecordRaw[]>(() => {
		return sidebarRouters.value.filter((item: IRouteRecordRaw) => {
			return !item.hidden
		})
	})
	//可显示范围
	const indicationRange = computed(() => {
		return availableAddressList.value.length
	})
	//选中菜单
	const activeMenu = computed(() => {
		return route.meta.activeMenu ? (route.meta.activeMenu as string) : route.path
	})
	//获取选中的一级菜单
	const selectedFirstLevelMenu = computed(() => {
		return '/' + activeMenu.value.split('/')[1]
	})

	// 左侧路由地址
	const leftSidebarRouters = computed<IRouteRecordRaw[]>(() => {
		return availableAddressList.value.filter((i, index) => {
			return index < 5
		})
	})
	// 右侧路由地址
	const rightSidebarRouters = computed<IRouteRecordRaw[]>(() => {
		return availableAddressList.value.filter((i, index) => {
			return index > 4
		})
	})

	//  显示二级菜单
	const showSecondLevelMenu = computed({
		get() {
			return settingsStore.showNavigate
		},
		set(val) {
			settingsStore.updateNavigate(val)
		},
	})

	// 	二级菜单
	const secondLevelMenu = ref<IRouteRecordRaw[]>([])

	//获取选中的二级菜单
	const selectedSecondaryMenu = computed(() => {
		let strList = activeMenu.value.split('/')
		return strList[strList.length - 1]
	})
	const chooseBasePath = ref('/')

	// 点击一级菜单位置
	const clickPosition = ref<MouseEvent>()
	// 	点击一级菜单
	const clickTheFirstLevelMenu = (item: IRouteRecordRaw, event: MouseEvent) => {
		showSecondLevelMenu.value = false
		if (item.alwaysShow) {
			secondLevelMenu.value = item.children
				? item.children.filter((item: IRouteRecordRaw) => {
						return !item.hidden
				  })
				: []
			chooseBasePath.value = item.path
			nextTick().then(() => {
				clickPosition.value = event
				showSecondLevelMenu.value = true
			})
		}
	}

	const onlyOneChild = ref<IRouteRecordRaw>()
	function hasOneShowingChild(parent: IRouteRecordRaw) {
		if (!parent.children) {
			parent.children = []
		}
		const showingChildren = parent.children.filter((item: IRouteRecordRaw) => {
			if (item.hidden) {
				return false
			} else {
				// Temp set(will be used if only has one showing child)
				onlyOneChild.value = item
				return true
			}
		})
		// When there is only one child router, the child router is displayed by default
		return showingChildren.length === 1
	}
	//返回路由地址
	function resolvePath(basePath: string, routePath: string | undefined, routeQuery?: string) {
		if (routePath && isExternal(routePath)) {
			return routePath
		}
		if (isExternal(basePath)) {
			return basePath
		}
		return getNormalPath(basePath + '/' + routePath)
	}

	// 判断一级菜单是否选中
	const getMenuChoose = (item: IRouteRecordRaw) => {
		if (!item.path) {
			return selectedFirstLevelMenu.value === '/index'
		} else {
			return selectedFirstLevelMenu.value === item.path
		}
	}

	return {
		leftSidebarRouters,
		rightSidebarRouters,
		onlyOneChild,
		hasOneShowingChild,
		resolvePath,
		getMenuChoose,
		clickTheFirstLevelMenu,
		showSecondLevelMenu,
		secondLevelMenu,
		selectedSecondaryMenu,
		chooseBasePath,
		clickPosition,
	}
}
