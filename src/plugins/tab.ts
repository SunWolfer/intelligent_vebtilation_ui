import router from '@/router/index'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { unref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export default {
	// 刷新当前tab页签
	async refreshPage(obj: RouteLocationNormalizedLoaded) {
		const { path, query } = obj || unref(router.currentRoute)
		await nextTick()
		await router.replace({
			path: '/redirect' + path,
			query: query,
		})
	},
	// 关闭当前tab页签，打开新页签
	closeOpenPage(obj: RouteLocationNormalizedLoaded) {
		const viewStore = useTagsViewStore()
		viewStore.delView(obj || unref(router.currentRoute))
	},
	// 关闭指定tab页签
	async closePage(obj?: RouteLocationNormalizedLoaded) {
		if (obj === undefined) {
			// prettier-ignore
			const lastPath = await useTagsViewStore().delView(unref(router.currentRoute)) as any;
			return await router.push(lastPath || '/')
		}
		return useTagsViewStore().delView(obj)
	},
	// 关闭所有tab页签
	closeAllPage() {
		return useTagsViewStore().delAllViews()
	},
	// 关闭左侧tab页签
	closeLeftPage(obj: RouteLocationNormalizedLoaded) {
		// prettier-ignore
		return useTagsViewStore().delLeftTags(obj || unref(router.currentRoute));
	},
	// 关闭右侧tab页签
	closeRightPage(obj: RouteLocationNormalizedLoaded) {
		// prettier-ignore
		return useTagsViewStore().delRightTags( obj || unref(router.currentRoute));
	},
	// 关闭其他tab页签
	closeOtherPage(obj: RouteLocationNormalizedLoaded) {
		// prettier-ignore
		return useTagsViewStore().delOthersViews(obj || unref(router.currentRoute));
	},
	// 添加tab页签
	openPage(title: string, url: string) {
		const obj: any = { path: url, meta: { title: title } }
		useTagsViewStore().addView(obj)
		return router.push(url)
	},
	// 修改tab页签
	updatePage(obj: RouteLocationNormalizedLoaded) {
		return useTagsViewStore().updateVisitedView(obj)
	},
}
