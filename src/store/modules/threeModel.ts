import { defineStore } from 'pinia'

export interface ModelState {
	data: IModelNode[]
	maxNode: number
	roadAllList: any[]
	modelType: string
	multiple: number
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
		// 添加额外模型基准大小
		multiple: 1,
	}),
	actions: {
		updateModel(data) {
			this.data = data
		},
		updateMaxNode(data) {
			this.maxNode = data
		},
		updateMultiple(data) {
			this.multiple = data
		},
		updateRoadAllList(data) {
			this.roadAllList = data
		},
		updateModelType(data) {
			this.modelType = data
		},
	},
})
