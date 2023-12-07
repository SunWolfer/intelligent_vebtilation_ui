import { useGainList } from '@/hooks/useGainList'
import { decListInfo, getDetailType, getTriggerType } from '@/api/api/auxDecMakingRules'

export const auxDecMakingRules = () => {
	const { queryParams, dataList, queryDataList } = useGainList({
		automatic: false,
		apiFun: decListInfo,
		queryArgs: {
			triggerPoint: '',
			triggerType: '',
			state: '',
		},
	})

	// 查询触发点位类型列表
	const { dataList: triggerTypeList, queryDataList: queryTriggerTypeList } = useGainList({
		automatic: false,
		apiFun: getTriggerType,
	})
	// 触发点位对应点位
	const queryParamList = ref([])
	const changeQueryTriggerType = (val) => {
		queryParams.value.triggerPoint = ''
		queryParamList.value = triggerTypeList.value.find((i) => i.code === val)?.paramList ?? []
	}
	// 查询动作设备类型及其点位
	const { dataList: detailTypeList, queryDataList: queryDetailTypeList } = useGainList({
		automatic: false,
		apiFun: getDetailType,
	})

	const chooseRow = ref({
		id: undefined,
	})

	const addOrUpdateVisible = ref(false)

	const handleAdd = () => {
		chooseRow.value = {
			id: undefined,
		}
		addOrUpdateVisible.value = true
	}
	const handleUpdate = (row) => {
		chooseRow.value = row
		addOrUpdateVisible.value = true
	}
	const ruleList = ref([])
	const previewForm = (row) => {
		chooseRow.value = row
		ruleList.value = row.detailList ?? []
	}

	const refreshList = () => {
		chooseRow.value = {
			id: undefined,
		}
		ruleList.value = []
		queryDataList?.()
	}

	return {
		queryParams,
		dataList,
		queryDataList,
		triggerTypeList,
		queryTriggerTypeList,
		queryParamList,
		changeQueryTriggerType,
		detailTypeList,
		queryDetailTypeList,
		chooseRow,
		addOrUpdateVisible,
		handleAdd,
		handleUpdate,
		ruleList,
		previewForm,
		refreshList,
	}
}
