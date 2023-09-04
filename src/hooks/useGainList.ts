import { Ref } from 'vue/dist/vue'

export type gainList<TData, TParams> = {
	apiFun: (param?: TParams) => Promise<IApiResponseDataList<TData>>
	queryArgs?: { [key: string]: any }
	afterReadyDataFun?: (data: TData[]) => void
}

interface gainListResult<TData> {
	dataList: Ref<TData[]>
	queryDataList: () => Promise<void>
}

export function useGainList<TData = any, TParams = any>({
	apiFun,
	queryArgs = {},
	afterReadyDataFun,
}: gainList<TData, TParams>): gainListResult<TData> {
	const dataList: Ref<TData[]> = ref([])
	const queryParams = ref<any>({ ...queryArgs })

	const queryDataList = async () => {
		const res = await apiFun(queryParams.value)
		if (res.code === 200 && res.data) {
			dataList.value = res.data
			if (typeof afterReadyDataFun === 'function') afterReadyDataFun(res.data)
		}
	}

	onMounted(() => {
		queryDataList()
	})

	return {
		dataList,
		queryDataList,
	}
}
