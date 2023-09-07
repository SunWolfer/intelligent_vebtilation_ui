import { Ref } from 'vue/dist/vue'

export type gainList<TData, TParams> = {
	automatic: boolean
	apiFun: (param?: TParams) => Promise<IApiResponseDataList<TData>>
	queryArgs?: { [key: string]: any }
	afterReadyDataFun?: (data: TData[]) => void
}

interface gainListResult<TData, Params> {
	dataList: Ref<TData[]>
	queryParams: Ref<Params>
	queryDataList: () => Promise<void>
}

export function useGainList<TData = any, TParams = any>({
	automatic = true,
	apiFun,
	queryArgs = {},
	afterReadyDataFun,
}: gainList<TData, TParams>): gainListResult<TData, TParams> {
	const dataList: Ref<TData[]> = ref([])
	const queryParams = ref<any>({ ...queryArgs })

	const queryDataList = async () => {
		const res = await apiFun(queryParams.value)
		if (res.code === 200 && res.data) {
			dataList.value = res.data
			if (typeof afterReadyDataFun === 'function') afterReadyDataFun(res.data)
		}
	}

	onMounted(async () => {
		if (automatic) {
			await queryDataList()
		}
	})

	return {
		queryParams,
		dataList,
		queryDataList,
	}
}
