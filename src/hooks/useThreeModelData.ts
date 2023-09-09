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
	// 是否显示巷道
	const readyData = computed(() => {
		return threeModelData.value.length > 0
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
		readyData,
		threeModelData,
		maxNodeNum,
		roadAllList,
	}
}
