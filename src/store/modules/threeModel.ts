import { defineStore } from 'pinia'

export interface ModelState {
	data: IModelNode[]
	maxNode: number
	roadAllList: any[]
	modelType: string
	modelSize: number
}

export const threeModel = defineStore('three-model', {
	state: (): ModelState => ({
		// 巷道信息
		data: [],
		// 最大节点
		maxNode: 0,
		// 巷道详情
		roadAllList: [],
		// 	模型样式 '1'科技模式 ‘2‘经典模型
		modelType: '2',
		// 	模型大小
		modelSize: 2,
	}),
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
