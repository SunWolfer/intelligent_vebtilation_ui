import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface TagsViewState {
	visitedViews: RouteLocationNormalizedLoaded[]
	cachedViews: string[]
}

export const useTagsViewStore = defineStore('tags-view', {
	state: (): TagsViewState => ({
		visitedViews: [],
		cachedViews: [],
	}),
	actions: {
		addView(view: RouteLocationNormalizedLoaded) {
			this.addVisitedView(view)
			this.addCachedView(view)
		},
		addVisitedView(view: RouteLocationNormalizedLoaded) {
			if (this.visitedViews.some((v) => v.path === view.path)) return
			if (view.meta?.noTagsView) return
			this.visitedViews.push(
				Object.assign({}, view, {
					title: view.meta?.title || 'no-name',
				}),
			)
		},
		addCachedView(view: RouteLocationNormalizedLoaded) {
			if (!view.name) return
			if (this.cachedViews.includes(view.name as string)) return
			if (view.meta?.isCache) {
				this.cachedViews.push(view.name as string)
			}
		},
		delView(view: RouteLocationNormalizedLoaded) {
			return new Promise((resolve) => {
				this.delVisitedView(view)
				this.delCachedView(view)
				resolve({
					visitedViews: [...this.visitedViews],
					cachedViews: [...this.cachedViews],
				})
			})
		},
		delVisitedView(view: RouteLocationNormalizedLoaded) {
			return new Promise((resolve) => {
				for (const [i, v] of this.visitedViews.entries()) {
					if (v.path === view.path) {
						this.visitedViews.splice(i, 1)
						break
					}
				}
				resolve([...this.visitedViews])
			})
		},
		delCachedView(view: RouteLocationNormalizedLoaded) {
			return new Promise((resolve) => {
				if (!view.name) return
				const index = this.cachedViews.indexOf(view.name as string)
				index > -1 && this.cachedViews.splice(index, 1)
				resolve([...this.cachedViews])
			})
		},
		delOthersViews(view: RouteLocationNormalizedLoaded) {
			return new Promise((resolve) => {
				this.delOthersVisitedViews(view)
				this.delOthersCachedViews(view)
				resolve({
					visitedViews: [...this.visitedViews],
					cachedViews: [...this.cachedViews],
				})
			})
		},
		delOthersVisitedViews(view: RouteLocationNormalizedLoaded) {
			return new Promise((resolve) => {
				this.visitedViews = this.visitedViews.filter((v) => {
					return v.meta?.affix || v.path === view.path
				})
				resolve([...this.visitedViews])
			})
		},
		delOthersCachedViews(view: RouteLocationNormalizedLoaded) {
			return new Promise((resolve) => {
				if (!view.name) return
				const index = this.cachedViews.indexOf(view.name as string)
				if (index > -1) {
					this.cachedViews = this.cachedViews.slice(index, index + 1)
				} else {
					this.cachedViews = []
				}
				resolve([...this.cachedViews])
			})
		},
		delAllViews() {
			return new Promise((resolve) => {
				this.delAllVisitedViews()
				this.delAllCachedViews()
				resolve({
					visitedViews: [...this.visitedViews],
					cachedViews: [...this.cachedViews],
				})
			})
		},
		delAllVisitedViews() {
			return new Promise((resolve) => {
				this.visitedViews = this.visitedViews.filter((tag) => tag.meta?.affix)
				resolve([...this.visitedViews])
			})
		},
		delAllCachedViews() {
			return new Promise((resolve) => {
				this.cachedViews = []
				resolve([...this.cachedViews])
			})
		},
		updateVisitedView(view: RouteLocationNormalizedLoaded) {
			for (let v of this.visitedViews) {
				if (v.path === view.path) {
					v = Object.assign(v, view)
					break
				}
			}
		},
		delRightTags(view: RouteLocationNormalizedLoaded) {
			return new Promise((resolve) => {
				const index = this.visitedViews.findIndex((v) => v.path === view.path)
				if (index === -1) {
					return
				}
				this.visitedViews = this.visitedViews.filter((item, idx) => {
					if (idx <= index || (item.meta && item.meta.affix)) {
						return true
					}
					if (!item.name) return false
					const i = this.cachedViews.indexOf(item.name as string)
					if (i > -1) {
						this.cachedViews.splice(i, 1)
					}
					return false
				})
				resolve([...this.visitedViews])
			})
		},
		delLeftTags(view: RouteLocationNormalizedLoaded) {
			return new Promise((resolve) => {
				const index = this.visitedViews.findIndex((v) => v.path === view.path)
				if (index === -1) {
					return
				}
				this.visitedViews = this.visitedViews.filter((item, idx) => {
					if (idx >= index || (item.meta && item.meta.affix)) {
						return true
					}
					if (!item.name) return false
					const i = this.cachedViews.indexOf(item.name as string)
					if (i > -1) {
						this.cachedViews.splice(i, 1)
					}
					return false
				})
				resolve([...this.visitedViews])
			})
		},
	},
})
