import { defineStore } from 'pinia'

const useHome = defineStore('home', {
	state: () => ({
		// 已显示功能
		showMenus: [],
		// 	菜单点击位置
		clickMenuDom: null,
	// 	v-show控制首页除3D,预警提示外显示内容
		dislodgeDom: true,
	// 	v-show控制预警提示
		showWarn: true
	}),
	actions: {
		updateShowMenus(views) {
			this.showMenus = views
		},
		updateClickMenuDom(view) {
			this.clickMenuDom = view
		},
		updateDislodgeDom(view){
			this.dislodgeDom = view
		},
		updateShowWarn(view) {
			this.showWarn = view
		}
	},
})

export default useHome
