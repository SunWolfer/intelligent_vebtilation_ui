import { auxDecMakingRules } from '@/api/request/windControlAssMaking/auxDecMakingRules'
import { deepCopy } from '@/utils/border-box/util'

export const useAssMakingChild = () => {
	const {
		queryParams,
		dataList,
		queryDataList,
		triggerTypeList,
		queryTriggerTypeList,
		detailTypeList,
		queryDetailTypeList,
	} = auxDecMakingRules()
	// 显示详情
	const detailsVisible = ref(false)
	const detailsData = ref(undefined)

	const detailsChildDataList = ref([])

	const handleDetails = (data) => {
		detailsData.value = deepCopy(data)
		detailsChildDataList.value = deepCopy(data.detailList)
		detailsVisible.value = true
	}
	const cancelDetails = () => {
		queryDataList?.()
		detailsVisible.value = false
	}
	return {
		queryParams,
		dataList,
		queryDataList,
		triggerTypeList,
		queryTriggerTypeList,
		detailTypeList,
		queryDetailTypeList,
		detailsVisible,
		detailsData,
		detailsChildDataList,
		handleDetails,
		cancelDetails,
	}
}
