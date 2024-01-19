import { auxDecMakingRules } from '@/api/request/windControlAssMaking/auxDecMakingRules'
import { deepCopy } from '@/utils/border-box/util'
import { useGainList } from '@/hooks/useGainList'
import { assListInfo, removeAdviseDecision } from '@/api/api/auxDecMakingRules'
import { useCommitForm } from '@/hooks/useForm'
import useCurrentInstance from '@/hooks/useCurrentInstance'

export const useAssMakingChild = () => {
	const { triggerTypeList, queryTriggerTypeList, detailTypeList, queryDetailTypeList } =
		auxDecMakingRules()

	const { queryParams, dataList, queryDataList } = useGainList({
		automatic: false,
		apiFun: assListInfo,
		queryArgs: {
			triggerPoint: '',
			triggerType: '',
			state: '',
		},
	})

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
	const { proxy } = useCurrentInstance()
	// 决策规划删除
	const handleRemove = (row) => {
		proxy.$modal
			.prompt({
				message: `是否确认删除`,
			})
			.then(async () => {
				await useCommitForm(removeAdviseDecision, {
					queryParams: row,
					afterReadyDataFun: () => {
						queryDataList?.()
					},
				})
			})
			.catch(() => {})
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
		handleRemove,
	}
}
