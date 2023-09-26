import { defineStore } from 'pinia'
const threeModel = defineStore('three-model', {
	state: () => ({
		// 巷道信息
		data: [],
		// 最大节点
		maxNode: 0,
		// 巷道详情
		roadAllList: [],
		// 	模型样式 '1'科技模式 ‘2‘经典模型
		modelType: '1',
		// 	模型大小
		modelSize: 2,
	}),
	// 开启数据缓存
	persist: {
		enabled: false,
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
		updateModelType(data) {
			this.modelType = data
		},
		updateModelSize(data) {
			this.modelSize = data
		},
	},
})

export default threeModel
