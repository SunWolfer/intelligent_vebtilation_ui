import useList from '@/hooks/useList'
import { addTags, delTags, getTags, listTags, updateTags } from '@/api/api/doorItemManagement'
import { useDict } from '@/hooks/useDict'
import { useForm } from '@/hooks/useForm'
import { isNull } from '@/utils/ruoyi'

export const doorItemManagement = (type) => {
	const {
		queryParams,
		total,
		dataList,
		getList,
		handleQuery,
		handleDelete,
		multiple,
		handleSelectionChange,
	} = useList({
		apiFun: listTags,
		params: {
			sblx: type,
			name: '',
			code: '',
			pageNum: 1,
			pageSize: 10,
		},
		deleteFun: delTags,
	})
	const { ITEM_SJLX, CZLX, ITEM_YWLX } = useDict('ITEM_SJLX', 'CZLX', 'ITEM_YWLX')

	const { formRef, form, title, open, reset, cancel, submitForm, handleUpdate, handleAdd } =
		useForm({
			domRefName: 'formRef',
			formParams: {
				id: undefined,
				devId: 0,
				sbmc: '',
				czlx: '',
				sblx: type,
				sbbm: '',
				sjlx: '',
				remark: '',
				name: '',
				code: '',
				sbwz: '',
				relateCode: '',
				ywlx: '',
				warnIcon: '',
				operIcon: '',
				value: '',
				visible: true,
				addrType: '',
				addr: '',
				dataLen: '',
				vark: '',
				varb: '',
				analyzeType: '',
			},
			titleMes: '数据项',
			initApi: getTags,
			updateApi: updateTags,
			addApi: addTags,
			afterAddFun: handleQuery,
			afterUpdateFun: handleQuery,
		})

	const rules = reactive({
		sbmc: [{ required: true, message: '设备名称不能为空', trigger: 'blur' }],
		code: [{ required: true, message: '标签编码不能为空', trigger: 'blur' }],
		name: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }],
		sjlx: [{ required: true, message: '数据类型不能为空', trigger: 'blur' }],
		czlx: [{ required: true, message: '操作类型不能为空', trigger: 'blur' }],
		ywlx: [{ required: true, message: '业务类型不能为空', trigger: 'blur' }],
	})

	// 是否显示寄存器
	const disaddrType = computed(() => {
		return isNull(form.value?.sjlx)
	})
	const variateList = [
		{
			label: '0 (Coils Status)',
			value: '0',
		},
		{
			label: '1 (Input Status)',
			value: '1',
		},
		{
			label: '4 (Holding Registers)',
			value: '4',
		},
		{
			label: '3 (Input Registers)',
			value: '3',
		},
	]
	// 寄存器列表
	const CvariateList = computed(() => {
		let rdata = []
		if (parseInt(form.value?.sjlx) === 11) {
			rdata = variateList.slice(0, 2)
		} else {
			rdata = variateList.slice(2, 4)
		}
		return rdata
	})

	const analyzeTypeList = [
		{
			code: 'a',
			value: 'a',
		},
		{
			code: 'b',
			value: 'b',
		},
		{
			code: 'ab',
			value: 'ab',
		},
		{
			code: 'ba',
			value: 'ba',
		},
		{
			code: 'abcd',
			value: 'abcd',
		},
		{
			code: 'badc',
			value: 'badc',
		},
		{
			code: 'cdab',
			value: 'cdab',
		},
		{
			code: 'dcba',
			value: 'dcba',
		},
	]
	// 解析方式是否可选
	const disanalyzeType = computed(() => {
		return isNull(form.value?.sjlx) || parseInt(form.value?.sjlx) === 11
	})
	// 解析方式列表
	const CanalyzeTypeList = computed(() => {
		let rdata = []
		switch (parseInt(form.value?.sjlx)) {
			case 11:
				rdata = []
				break
			case 14:
				rdata = analyzeTypeList.slice(0, 2)
				break
			case 17:
				rdata = analyzeTypeList.slice(0, 2)
				break
			case 15:
				rdata = analyzeTypeList.slice(2, 4)
				break
			case 18:
				rdata = analyzeTypeList.slice(2, 4)
				break
			case 16:
				rdata = analyzeTypeList.slice(4, 8)
				break
			case 19:
				rdata = analyzeTypeList.slice(4, 8)
				break
			case 4:
				rdata = analyzeTypeList.slice(4, 8)
				break
		}
		return rdata
	})

	function clearDataform() {
		form.value.addrType = ''
		form.value.analyzeType = ''
	}

	return {
		queryParams,
		total,
		dataList,
		getList,
		handleQuery,
		handleDelete,
		multiple,
		handleSelectionChange,
		ITEM_SJLX,
		CZLX,
		formRef,
		form,
		rules,
		title,
		open,
		reset,
		cancel,
		submitForm,
		handleUpdate,
		handleAdd,
		ITEM_YWLX,
		disaddrType,
		CvariateList,
		clearDataform,
		disanalyzeType,
		CanalyzeTypeList,
	}
}
