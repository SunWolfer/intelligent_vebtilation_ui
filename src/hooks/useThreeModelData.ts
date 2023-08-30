import threeModel from '@/store/modules/threeModel'

export const useThreeModelData = () => {
	const IThreeModel = threeModel()
	// 巷道信息
	const threeModelData = computed<IModelNode[]>({
		get() {
			return IThreeModel.data
		},
		set(data) {
			IThreeModel.updateModel(data)
		},
	})
	//   最大节点值
	const maxNodeNum = computed({
		get() {
			return Number(IThreeModel.maxNode)
		},
		set(val) {
			IThreeModel.updateMaxNode(val + '')
		},
	})

	// 巷道详情
	const roadAllList = computed({
		get() {
			return IThreeModel.roadAllList
		},
		set(val) {
			IThreeModel.updateRoadAllList(val)
		},
	})

	return {
		threeModelData,
		maxNodeNum,
		roadAllList,
	}
}
