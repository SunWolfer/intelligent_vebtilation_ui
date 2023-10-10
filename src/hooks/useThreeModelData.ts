import { homeMenu } from '@/api/request/home/homeMenu'
import threeModel from '@/store/modules/threeModel'

export const useThreeModelData = () => {
	const IThreeModel: any = threeModel()
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
	const maxNodeNum = computed<number>({
		get() {
			return Number(IThreeModel.maxNode)
		},
		set(val) {
			IThreeModel.updateMaxNode(val)
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
	// 是否刷新模型数据
	const refreshModel = ref(true)

	const { setHomeFun } = homeMenu()
	const refreshModelFun = () => {
		refreshModel.value = false
		// 清空首页导航菜单
		setHomeFun(-1)
		nextTick().then(() => {
			refreshModel.value = true
		})
	}
	watch(
		() => threeModelData.value,
		(val) => {
			if (val) {
				refreshModelFun?.()
			}
		},
	)
	// 模型类型
	const modelType = computed<string>({
		get() {
			return IThreeModel.modelType
		},
		set(val) {
			IThreeModel.updateModelType(val)
		},
	})
	// 切换类型
	const changeType = (data: string) => {
		if (data === modelType.value) return
		modelType.value = data
	}
	// 模型大小
	const modelSize = computed(() => {
		return IThreeModel.modelSize
	})

	return {
		readyData,
		threeModelData,
		maxNodeNum,
		roadAllList,
		refreshModel,
		modelType,
		changeType,
		modelSize,
		refreshModelFun,
	}
}
