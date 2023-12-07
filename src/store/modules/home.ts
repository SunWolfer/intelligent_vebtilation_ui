import { defineStore } from 'pinia'

export interface HomeState {
	showMenus: number[]
	reverseWind: boolean
	roam: boolean
	avoidDisaster: boolean
	disaster: boolean
}

const useHome = defineStore('home', {
	state: (): HomeState => ({
		// 已显示功能
		showMenus: [],
		// 显示反风
		reverseWind: false,
		//	显示漫游
		roam: false,
		//	显示避灾路线
		avoidDisaster: false,
		//	显示灾害模拟
		disaster: false,
	}),
	actions: {
		updateShowMenus(views: number[]) {
			this.showMenus = views
		},
		//漫游
		updateRoam(data: boolean) {
			this.roam = data
		},
		// 反风
		updateReverseWind(data: boolean) {
			this.reverseWind = data
		},
		//避灾
		updateAvoidDisaster(data: boolean) {
			this.avoidDisaster = data
		},
		//灾害模拟
		updateDisaster(data: boolean) {
			this.disaster = data
		},
	},
})

export default useHome
