import usePermissionStore from '@/store/modules/permission'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { deepCopy } from '@/utils/border-box/util'
import { validURL } from '@/utils/validate'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export const useRouterHelper = () => {
	const { currentRoute } = useRouter()

	const permissionStore = usePermissionStore()
	const routers = computed(() => permissionStore.sidebarRouters)
	const filterAffixTags = (routes: IRouteRecordRaw[], parentPath = '') => {
		let tags: RouteLocationNormalizedLoaded[] = []
		routes.forEach((route) => {
			const meta = route.meta ?? {}
			const tagPath = pathResolve(parentPath, route.path)
			if (meta?.isCache) {
				tags.push({ ...route, path: tagPath, fullPath: tagPath } as RouteLocationNormalizedLoaded)
			}
			if (route.children) {
				const tempTags: RouteLocationNormalizedLoaded[] = filterAffixTags(route.children, tagPath)
				if (tempTags.length >= 1) {
					tags = [...tags, ...tempTags]
				}
			}
		})
		return tags
	}
	const pathResolve = (parentPath: string, path: string) => {
		if (validURL(path)) return path
		const childPath = path.startsWith('/') || !path ? path : `/${path}`
		return `${parentPath}${childPath}`.replace(/\/\//g, '/').trim()
	}

	const affixTagArr = ref<RouteLocationNormalizedLoaded[]>([])
	const tagsViewStore = useTagsViewStore()
	const initTags = () => {
		affixTagArr.value = filterAffixTags(unref(routers))
		for (const tag of unref(affixTagArr)) {
			// Must have tag name
			if (tag.name) {
				tagsViewStore.addVisitedView(deepCopy(tag))
			}
		}
	}

	// 新增tag
	const addTags = () => {
		const { name } = unref(currentRoute)
		if (name) {
			tagsViewStore.addView(unref(currentRoute))
		}
	}

	watch(
		() => currentRoute.value,
		() => {
			addTags()
		},
	)

	return {
		initTags,
		addTags,
	}
}
