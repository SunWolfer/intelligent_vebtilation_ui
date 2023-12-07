import useDict from '@/hooks/useDict'
import { useDictionary } from '@/api/request/windControlAssMaking/auxDecMakingRules/useDictionary'
import { useCustomList } from '@/hooks/useCustomList'
import { deepCopy } from '@/utils/border-box/util'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { isNull } from '@/utils/ruoyi'
import { deviceTypes } from '@/types/menuType'
import { useCommitForm } from '@/hooks/useForm'
import { addDecision, updateDecision } from '@/api/api/auxDecMakingRules'

export const useAuxAddOrUpdate = (props, emits) => {
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})
	const { execute_role, trigger_conditions, after_lifting } = useDict(
		'execute_role',
		'trigger_conditions',
		'after_lifting',
	)

	//   标题
	const title = ref('')
	const formRef = ref(null)
	const dataForm = ref({
		executeRole: '',
		actionCount: '',
		afterLifting: '',
		triggerType: '',
		triggerTypeName: '',
		triggerPoint: '',
		triggerPointCode: '',
		triggerConditions: '',
		triggerValue: '',
		detailList: [],
	})

	const rules = reactive({
		executeRole: [{ required: true, message: '执行规则不能为空', trigger: 'blur' }],
		actionCount: [{ required: true, message: '动作次数不能为空', trigger: 'blur' }],
		afterLifting: [{ required: true, message: '解除触发后动作不能为空', trigger: 'blur' }],
		triggerType: [{ required: true, message: '触发点类型不能为空', trigger: 'blur' }],
		triggerPointCode: [{ required: true, message: '触发点位不能为空', trigger: 'blur' }],
		triggerConditions: [{ required: true, message: '触发条件不能为空', trigger: 'blur' }],
		triggerValue: [{ required: true, message: '触发值不能为空', trigger: 'blur' }],
	})

	// 触发点位对应点位
	const queryParamList = ref([])
	const changeQueryTriggerType = (val) => {
		dataForm.value.triggerPointCode = ''
		dataForm.value.triggerPoint = ''
		const data = props.triggerTypeList.find((i) => i.code === val)
		dataForm.value.triggerTypeName = data?.name ?? ''
		queryParamList.value = data?.paramList ?? []
	}
	const changeParam = (val) => {
		dataForm.value.triggerPoint = queryParamList.value.find((i) => i.code === val).name
	}

	const { devType, actionType, actionDirection, doorType } = useDictionary()
	const defaultListData = {
		devType: '',
		devId: '',
		devName: '',
		devList: [],
		actionType: '',
		actionTypeList: [],
		actionDirection: '',
		actionDirectionList: [],
		actionValue: '',
		orderNumber: '',
		doorName: '',
	}
	const { dataList, addTableRow, minusTableRow, downRow, upRow } = useCustomList(defaultListData)
	// 改变动作设备类型
	const changeDevType = (row) => {
		row = {
			...defaultListData,
			devType: row.devType,
			orderNum: row.orderNum,
		}
		row.actionTypeList = actionType?.(row.devType)
		row.actionDirectionList = actionDirection?.(row.devType)
		row.devList = props.detailTypeList.find((i) => i.code === row.devType)?.paramList
		dataList.value[row.orderNum - 1] = row
	}

	const initData = () => {
		if (props.chooseRow.id) {
			title.value = '修改规则'
			dataForm.value = deepCopy(props.chooseRow)

			const data = props.triggerTypeList.find((i) => i.code === dataForm.value.triggerType)
			dataForm.value.triggerTypeName = data?.name ?? ''
			queryParamList.value = data?.paramList ?? []

			dataList.value = dataForm.value.detailList
			initDataList()
		} else {
			title.value = '新增规则'
		}
	}
	const initDataList = () => {
		for (let i = 0; i < dataList.value.length; i++) {
			const row = dataList.value[i]
			row.orderNum = row.orderNumber
			row.actionTypeList = actionType?.(row.devType)
			row.actionDirectionList = actionDirection?.(row.devType)
			row.devList = props.detailTypeList.find((i) => i.code === row.devType)?.paramList

			dataList.value[i] = row
		}
	}
	const { proxy } = useCurrentInstance()
	const formatterDataList = () => {
		let paramList = []
		if (!dataList.value?.length) return []
		let hasNull = false
		for (let i = 0; i < dataList.value.length; i++) {
			let data = dataList.value[i]
			const devName = data.devList.find((row) => row.code === data.devId)?.name
			hasNull =
				isNull(data.actionDirection) ||
				isNull(data.actionType) ||
				isNull(data.actionValue) ||
				isNull(data.devId) ||
				isNull(devName) ||
				isNull(data.devType) ||
				(data.devType === deviceTypes.DOOR ? isNull(data.doorName) : false)
			paramList.push({
				actionDirection: data.actionDirection,
				actionType: data.actionType,
				actionValue: data.actionValue,
				devId: data.devId,
				devName: devName,
				devType: data.devType,
				doorName: data.doorName,
				orderNumber: data.orderNum,
			})
		}
		if (hasNull) {
			paramList = []
			proxy.$modal.msgWarning('决策规则列表内不能有空值')
		}
		return paramList
	}

	const submitForm = async () => {
		dataForm.value.detailList = formatterDataList()
		if (dataForm.value.detailList.length === 0) return

		formRef.value?.validate(async (valid) => {
			if (valid) {
				if (props.chooseRow.id) {
					await useCommitForm(updateDecision, {
						queryParams: dataForm.value,
						afterReadyDataFun: () => {
							emits('refresh')
							showDiaLog.value = false
						},
					})
				} else {
					await useCommitForm(addDecision, {
						queryParams: dataForm.value,
						afterReadyDataFun: () => {
							emits('refresh')
							showDiaLog.value = false
						},
					})
				}
			}
		})
	}

	return {
		showDiaLog,
		title,
		execute_role,
		trigger_conditions,
		after_lifting,
		formRef,
		dataForm,
		rules,
		queryParamList,
		changeQueryTriggerType,
		changeParam,
		devType,
		doorType,
		dataList,
		addTableRow,
		minusTableRow,
		downRow,
		upRow,
		changeDevType,
		initData,
		submitForm,
	}
}
