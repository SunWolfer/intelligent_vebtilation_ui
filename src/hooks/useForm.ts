import useCurrentInstance from '@/hooks/useCurrentInstance'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { Ref } from 'vue'

export interface IForm<TData> {
	formParams?: any
	formId?: string
	titleMes?: string
	isResetTitle?: boolean
	resetTitle?: string
	afterAddInitFun?: (data?: any) => any
	initApi?: (params?: any) => Promise<IApiResponseData<TData>>
	afterExamineFun?: (data: IApiResponseData<TData>) => any
	updateApi?: (params: TData) => Promise<IApiResponseData>
	addApi?: (params: TData) => Promise<IApiResponseData>
	afterInitFun?: (data: IApiResponseData<TData>) => void
	resetAfterAdd?: (data: IApiResponseData<TData>) => void
	afterAddFun?: () => void
	resetAfterUpdate?: (data: IApiResponseData<TData>) => void
	afterUpdateFun?: (data: IApiResponseData<TData>) => void
}

export interface useFormResult<TData> {
	formRef: Ref<FormInstance | undefined>
	form: Ref<TData>
	open: Ref<boolean>
	examine: Ref<boolean>
	title: Ref<string>
	handleExamine: (data: any) => Promise<any>
	handleAdd: (data?: any) => void
	handleUpdate: (data: any) => Promise<any>
	reset: () => void
	submitForm: () => Promise<any>
	cancel: () => void
}

/**
 * 新增修改弹窗表单
 * @param formParams 表单参数
 * @param formId 表单主键
 * @param titleMes 弹窗标题
 * @param isResetTitle 是否重写标题
 * @param resetTitle 重置标题
 * @param afterAddInitFun 新增进入后执行
 * @param initApi 表单初始化接口
 * @param afterExamineFun 查看表单后执行
 * @param updateApi 修改表单接口
 * @param addApi 添加表单接口
 * @param afterInitFun 初始化完成后执行
 * @param resetAfterAdd 完全重置添加完成后方法
 * @param afterAddFun 表单添加完成后执行
 * @param resetAfterUpdate 完全重置表单修改后方法
 * @param afterUpdateFun 表单修改完成后执行
 * @returns {{cancel: (function(): void), submitForm: (function(): void), form: *, handleUpdate: (function(*): Promise<void>), reset: (function(): void), handleExamine: (function(*): Promise<void>), handleAdd: (function(*): void), title: *, open: *}}
 */
export function useForm<TData = any>({
	formParams = {},
	formId = 'id',
	titleMes = '',
	isResetTitle = false,
	resetTitle = '',
	afterAddInitFun,
	initApi,
	afterExamineFun,
	updateApi,
	addApi,
	afterInitFun,
	resetAfterAdd,
	afterAddFun,
	resetAfterUpdate,
	afterUpdateFun,
}: IForm<TData>): useFormResult<TData> {
	const formRef = ref<FormInstance>()
	const { proxy } = useCurrentInstance()

	// 表单
	const form = ref({ ...formParams })
	// 弹窗
	const open = ref(false)
	// 查看弹窗
	const examine = ref(false)
	// 弹窗标题
	const title = ref('')

	//查看
	const handleExamine = async (row: any) => {
		if (typeof initApi === 'function') {
			reset()
			const id = row[formId]
			const res = await initApi(id)
			form.value = res.data
			examine.value = true
			title.value = `查看${titleMes}`
			if (typeof afterExamineFun === 'function') afterExamineFun(res)
		}
	}

	/** 新增 */
	const handleAdd = (row?: any) => {
		reset()
		if (typeof afterAddInitFun === 'function') afterAddInitFun(row)
		open.value = true
		title.value = isResetTitle ? resetTitle : `新增${titleMes}`
	}

	// 修改
	const handleUpdate = async (row: any) => {
		if (typeof initApi === 'function') {
			reset()
			const id = row[formId]
			const res = await initApi(id)

			form.value = res.data
			open.value = true
			title.value = `修改${titleMes}`
			if (typeof afterInitFun === 'function') afterInitFun(res)
		}
	}

	// 重置
	const reset = () => {
		form.value = { ...formParams }
		formRef.value?.resetFields()
	}

	// 提交
	const submitForm = async () => {
		console.log(111)
		console.log(formRef.value)
		await formRef.value?.validate(async (valid: boolean) => {
			if (valid) {
				if (form.value[formId] !== undefined) {
					if (typeof updateApi !== 'function') return
					//修改
					const res = await updateApi(form.value)

					if (typeof resetAfterUpdate === 'function') {
						resetAfterUpdate(res)
					} else {
						proxy.$modal.msgSuccess('修改成功')
						open.value = false
						if (typeof afterUpdateFun === 'function') afterUpdateFun(res)
					}
				} else {
					if (typeof addApi !== 'function') return
					const res = await addApi(form.value)

					if (typeof resetAfterAdd === 'function') {
						resetAfterAdd(res)
					} else {
						proxy.$modal.msgSuccess('新增成功')
						open.value = false
						if (typeof afterAddFun === 'function') afterAddFun()
					}
				}
			}
		})
	}

	/** 取消 */
	const cancel = () => {
		open.value = false
		reset()
	}
	return {
		formRef,
		form,
		open,
		examine,
		title,
		handleExamine,
		handleAdd,
		handleUpdate,
		reset,
		submitForm,
		cancel,
	}
}

/**
 * apiFun查询接口
 * params 查询参数
 */
export type gainForm<TData, TParams> = {
	apiFun: (param?: TParams) => Promise<IApiResponseData<TData>>
	dataArgs?: { [key: string]: TData }
	queryArgs?: { [key: string]: any }
	afterReadyDataFun?: (data: TData) => void
}

interface GainFormResult<TData> {
	dataFrom: Ref<TData>
	getDataForm: () => Promise<void>
}

/**
 *
 * @param apiFun
 * @param dataArgs
 * @param queryArgs
 * @param afterReadyDataFun
 */
export function useGainForm<TData = any, TParams = any>({
	apiFun,
	dataArgs,
	queryArgs = {},
	afterReadyDataFun,
}: gainForm<TData, TParams>): GainFormResult<TData> {
	const dataFrom = ref(Object.assign({ ...dataArgs }))
	const queryParams = ref<any>({ ...queryArgs })
	const getDataForm = async () => {
		const res = await apiFun(queryParams.value)
		dataFrom.value = res.data
		if (typeof afterReadyDataFun === 'function') afterReadyDataFun(res.data)
	}

	onMounted(() => {
		getDataForm()
	})

	return {
		dataFrom,
		getDataForm,
	}
}
interface comForm<TData> {
	queryParams?: any
	afterReadyDataFun?: (data: TData) => void
}
export async function useCommitForm<TData = any>(
	apiFun: (param?: any) => Promise<IApiResponseData<TData>>,
	{ queryParams = {}, afterReadyDataFun }: comForm<TData>,
) {
	const res = await apiFun(queryParams)
	if (res.code === 200) {
		ElMessage.success(res.msg)
		if (typeof afterReadyDataFun === 'function') afterReadyDataFun(res.data)
	} else {
		ElMessage.error(res.msg)
	}
}
