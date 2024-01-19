import { useGainList } from '@/hooks/useGainList'
import {
	decListInfo,
	getDetailType,
	getTriggerType,
	removeConfigDecision,
} from '@/api/api/auxDecMakingRules'
import { useCommitForm } from '@/hooks/useForm'
import useCurrentInstance from '@/hooks/useCurrentInstance'

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

	const { proxy } = useCurrentInstance()

	// 决策规划删除
	const handleRemove = (row) => {
		proxy.$modal
			.prompt({
				message: `是否确认删除`,
			})
			.then(async () => {
				await useCommitForm(removeConfigDecision, {
					queryParams: row,
					afterReadyDataFun: () => {
						queryTriggerTypeList?.()
						queryDetailTypeList?.()
						queryDataList?.()
					},
				})
			})
			.catch(() => {})
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
		handleRemove,
		ruleList,
		previewForm,
		refreshList,
	}
}
