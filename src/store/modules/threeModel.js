import { defineStore } from 'pinia'
import { IModels } from '@/components/VueThree/models'
const threeModel = defineStore('three-model', {
	state: () => ({
		// 巷道信息
		data: IModels,
		// 最大节点
		maxNode: '192',
		// 巷道详情
		roadAllList: [],
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
	},
})

export default threeModel
