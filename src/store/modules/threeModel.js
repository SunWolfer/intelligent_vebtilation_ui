import { defineStore } from 'pinia'
const threeModel = defineStore('three-model', {
	state: () => ({
		// 巷道信息
		data: [],
		// 最大节点
		maxNode: '0',
		// 巷道详情
		roadAllList: [],
	}),
	// 开启数据缓存
	persist: {
		enabled: true,
	},
	actions: {
		updateModel(data) {
			this.data = data
		},
		updateMaxNode(data) {
			this.maxNode = data
		},
		updateRoadAllList(data) {
			this.roadAllList = data
		},
	},
})

export default threeModel
