// 巡检设备
import { defineStore } from 'pinia'

export const useRoamData = defineStore('roam-data', {
	state: () => ({
		//   巡检设备列表
		data: [],
		//   当前显示巡检设备
		tEquipmentIndex: 0,
	}),
	actions: {
		// 更新巡检设备列表
		updateData(data) {
			this.data = data
		},
		// 更新显示设备索引
		updateTEquipmentIndex(data) {
			this.tEquipmentIndex = data
		},
	},
})
