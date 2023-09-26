import { listWindowResCurve } from '@/api/api/windowWindResCurve'

export const useWindowFormData = () => {
	// 风机特性曲线和列表查询：
	const lineData = ref({
		kaidu: [],
		fengzu: [],
	})
	// 风机曲线列表
	const dataList = ref([])

	const queryParams = ref({
		devId: '',
	})
	// 查询曲线和列表
	const queryDataList = async (nextFun = () => {}) => {
		const { data } = await listWindowResCurve({
			devId: queryParams.value.devId,
		})
		const { res } = data
		dataList.value = res
		lineData.value.kaidu = res.map((i) => {
			return i.kaidu
		})
		lineData.value.fengzu = res.map((i) => {
			return i.fengzu
		})
		nextFun()
	}

	const watchFormId = (nextFun = () => {}) => {
		watch(
			() => queryParams.value.devId,
			(value) => {
				value && queryDataList?.(nextFun)
			},
		)
	}

	return {
		lineData,
		dataList,
		queryParams,
		queryDataList,
		watchFormId,
	}
}
