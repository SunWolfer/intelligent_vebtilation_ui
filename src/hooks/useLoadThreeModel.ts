import { getRoadwayModel } from '@/api/api/home'
import { useLoading } from '@/hooks/useLoading'
import { useThreeModelData } from '@/hooks/useThreeModelData'

export const useLoadThreeModel = () => {
	const { modelType, threeModelData, maxNodeNum, multiple } = useThreeModelData()

	// 获取模型信息
	const setThreeData = async () => {
		const { loading } = useLoading('正在加载数据，请稍候')
		await getRoadwayModel({
			type: modelType.value,
		})
			.then((res) => {
				threeModelData.value = res.data.model
				maxNodeNum.value = parseInt(res.data.maxCode)
				multiple.value = parseInt(res.data.multiple)
				loading.close()
			})
			.catch(() => {
				loading.close()
			})
	}
	watch(
		() => modelType.value,
		async () => {
			await setThreeData()
		},
	)
	return {
		setThreeData,
	}
}
