import { download } from '@/utils/request'
import { addDateRange, oldDownload } from '@/utils/ruoyi'
import type { FormInstance } from 'element-plus'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { Ref } from 'vue'

export interface FullParams {
	[key: string]: any
}

interface DeleteApiInstance {
	deleteKey?: string // 删除主键
	deleteRowName?: string //自定义删除显示字段
	deleteResetMes?: boolean //是否自定义删除显示
	deleteMes?: string //删除显示文字
}
interface ExportParams {
	api: string
	params: () => any
	title: string
}

export interface commonList<TData, Params> {
	automatic?: boolean
	apiFun: (params?: any) => Promise<ITableApiResponseData<TData>>
	params?: FullParams
	beforeReadyListFun?: () => boolean
	afterReadyListFun?: (data: ITableApiResponseData<TData>) => void
	initDateRange?: any
	resetReadyListFun?: (data: ITableApiResponseData<TData>) => void
	afterResetQuery?: () => void
	deleteFun?: (param: any) => Promise<any>
	deleteApi?: DeleteApiInstance
	resetDeleteParams?: (data: any) => any
	beforeDeleteFun?: (data: any) => boolean
	exportFun?: (param: any) => Promise<any>
	exportParams?: ExportParams
	resetExportParams?: (data: any) => any
}

export interface ListResult<TData, Params> {
	queryRef: Ref<FormInstance | undefined>
	queryParams: Ref<Params>
	dateRange: Ref<[any, any]>
	dataList: Ref<TData[]>
	loading: Ref<boolean>
	total: Ref<number>
	getList: () => Promise<void>
	handleQuery: () => Promise<void>
	resetQuery: () => Promise<void>
	ids: Ref<any[]>
	selections: Ref<TData[]>
	single: Ref<boolean>
	multiple: Ref<boolean>
	handleSelectionChange: (data?: TData[]) => void
	handleDelete: (data?: any) => void
	handleExport: (data?: any) => void
	downLoadFire: () => Promise<void>
}

/**
 * 普通列表
 * @param automatic 自动执行查询
 * @param apiFun 后端接口方法
 * @param params 查询参数
 * @param beforeReadyListFun 查询前执行
 * @param afterReadyListFun 查询完执行
 * @param initDateRange 初始化日期
 * @param resetReadyListFun 覆盖查询返回方法
 * @param afterResetQuery 重置完执行
 * @param deleteFun 删除接口
 * @param deleteApi 删除方法参数
 * @param resetDeleteParams 自定义传入接口参数
 * @param beforeDeleteFun 删除前调用
 * @param exportFun 导出接口
 * @param exportParams 新导出方法参数
 * @param resetExportParams 自定义导出接口参数
 * @returns {{handleQuery: ((function(): Promise<void>)|*), handleSelectionChange: handleSelectionChange, handleExport: handleExport, queryParams: *, dateRange: *, multiple: *, loading: *, handleDelete: handleDelete, single: *, total: *, selections: *, getList: ((function(): Promise<void>)|*), resetQuery: ((function(): Promise<void>)|*), dataList: *, ids: *}}
 */
const useList = <TData = any, Params = any>({
	automatic = true,
	apiFun,
	params = {},
	beforeReadyListFun,
	afterReadyListFun,
	initDateRange = '',
	resetReadyListFun,
	afterResetQuery,
	deleteFun,
	deleteApi = {
		deleteKey: 'id', // 删除主键
		deleteRowName: 'name', //自定义删除显示字段
		deleteResetMes: false, //是否自定义删除显示
		deleteMes: '编号为', //删除显示文字
	},
	resetDeleteParams,
	beforeDeleteFun,
	exportFun,
	exportParams,
	resetExportParams,
}: commonList<TData, Params>): ListResult<TData, Params> => {
	const { proxy } = useCurrentInstance()

	const dataList: Ref<TData[]> = ref([])
	const queryParams = ref<any>({ ...params })
	const dateRange = ref(initDateRange)
	const total = ref(0)
	const loading = ref(false)

	const getList = async () => {
		if (typeof beforeReadyListFun === 'function') {
			if (beforeReadyListFun()) return
		}

		dataList.value = []
		loading.value = true
		const res = await apiFun(addDateRange(queryParams.value, dateRange.value))
		if (!res) return
		loading.value = false
		if (typeof resetReadyListFun === 'function') {
			resetReadyListFun(res)
		} else {
			dataList.value = res.rows
			total.value = res.total
			if (typeof afterReadyListFun === 'function') afterReadyListFun(res)
		}
	}

	onMounted(async () => {
		if (automatic) {
			await handleQuery()
		}
	})

	//  搜索
	const handleQuery = async () => {
		queryParams.value.pageNum = 1
		await getList()
	}

	const queryRef = ref<FormInstance>()
	/** 重置按钮操作 */
	const resetQuery = async () => {
		queryParams.value = { ...params }
		queryRef.value?.resetFields()
		dateRange.value = initDateRange
		if (typeof afterResetQuery === 'function') afterResetQuery()
		await handleQuery()
	}

	//选择数据
	const selections = ref([])
	//选择数据id
	const ids = ref([])
	//多个禁用
	const single = ref(true)
	//非选中禁用
	const multiple = ref(true)

	const defaultApi = {
		deleteKey: 'id',
		deleteRowName: 'name',
		deleteResetMes: false,
		deleteMes: '编号为',
	}
	const deleteObj = { ...defaultApi, ...deleteApi }
	/** 多选框选中数据 */
	const handleSelectionChange = (selection: any) => {
		selections.value = selection
		ids.value = selection.map((item: any) => item[deleteObj.deleteKey])
		single.value = selection.length !== 1
		multiple.value = !selection.length
	}

	const handleDelete = (row: any) => {
		if (typeof beforeDeleteFun === 'function') {
			if (!beforeDeleteFun(row)) {
				return
			}
		}

		if (typeof deleteFun === 'function') {
			const id = row[deleteObj.deleteKey] || ids.value
			if (!id || id.length === 0) return
			const showMes = deleteObj.deleteResetMes
				? row[deleteObj.deleteRowName] || selections.value.map((item) => item[deleteObj.deleteKey])
				: deleteObj.deleteMes + id.toString()
			proxy.$modal
				.prompt({
					message: `是否确认删除 ${showMes} 的数据`,
				})
				.then(async () => {
					let params = id
					if (typeof resetDeleteParams === 'function') {
						params = resetDeleteParams(row)
					}
					await deleteFun(params)
					proxy.$modal.msgSuccess('删除成功')
					await getList()
				})
				.catch(() => {})
		}
	}
	// 原导出
	const handleExport = (row: any) => {
		if (typeof exportFun === 'function') {
			proxy.$modal
				.prompt({
					title: '系统提示',
					message: '是否确认导出数据',
				})
				.then(async () => {
					let params = queryParams.value
					if (typeof resetExportParams === 'function') {
						params = resetExportParams(row)
					}
					const res = await exportFun(params)
					oldDownload(res.msg)
				})
		}
	}
	// 新导出
	const downLoadFire = async () => {
		if (!exportParams) return
		const params = exportParams.params()
		await download(exportParams.api, params, exportParams.title)
	}

	return {
		queryRef,
		queryParams,
		dateRange,
		dataList,
		loading,
		total,
		getList,
		handleQuery,
		resetQuery,
		ids,
		selections,
		single,
		multiple,
		handleSelectionChange,
		handleDelete,
		handleExport,
		downLoadFire,
	}
}

export default useList
