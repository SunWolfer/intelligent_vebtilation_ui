import { defineStore } from 'pinia'

const useHome = defineStore('home', {
	state: () => ({
		// 已显示功能
		showMenus: [],
		// 	菜单点击位置
		clickMenuDom: null,
		//	漫游
		roam: false,
		//	避灾路线
		avoidDisaster: false,
		//	灾害模拟
		disaster: false,
	}),
	actions: {
		updateShowMenus(views) {
			this.showMenus = views
		},
		updateClickMenuDom(view) {
			this.clickMenuDom = view
		},
		//漫游
		updateRoam(data) {
			this.roam = data
		},
		//避灾
		updateAvoidDisaster(data) {
			this.avoidDisaster = data
		},
		//灾害模拟
		updateDisaster(data) {
			this.disaster = data
		},
	},
})

export default useHome
