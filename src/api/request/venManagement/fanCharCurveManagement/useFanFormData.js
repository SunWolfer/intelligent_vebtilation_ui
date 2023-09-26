import { useGainList } from '@/hooks/useGainList'
import { fanDict, fanLine, fanLineDict } from '@/api/api/fanCharCurveManagement'
import { isNull } from '@/utils/ruoyi'
export const useFanFormData = () => {
	// 查询参数
	const queryParams = ref({
		devId: '',
		// 	转速
		zhuansu: '',
		// 	角度
		jiaodu: '',
	})

	//   风机下拉
	const { dataList: fanList } = useGainList({
		apiFun: fanDict,
	})
	// 转速列表
	const rotationalSpeedList = ref([])
	// 角度列表
	const bladeAngleList = ref([])
	// 	改变选择风机
	const chooseFanData = async (val) => {
		const { data } = await fanLineDict({
			devId: val,
		})
		rotationalSpeedList.value = data
	}
	// 选择监听
	const handleMonitor = () => {
		// 监听选择风机
		watch(
			() => queryParams.value.devId,
			(value) => {
				queryParams.value.zhuansu = ''
				if (value) {
					chooseFanData(value)
				}
			},
		)
		// 监听选择转速
		watch(
			() => queryParams.value.zhuansu,
			(value) => {
				queryParams.value.jiaodu = ''
				bladeAngleList.value = []
				if (!value) return
				bladeAngleList.value = rotationalSpeedList.value.find((i) => {
					return i.zhuansu === value
				})?.children
			},
		)
	}

	// 表单是否有空值
	const single = computed(() => {
		let flag = true
		for (const key in queryParams.value) {
			if (isNull(queryParams.value[key])) {
				flag = false
			}
		}
		return flag
	})

	// 风机特性曲线和列表查询：
	const lineData = ref({})
	// 风机曲线列表
	const dataList = ref([])
	// 监听表单空值
	const handleSingle = (nextFun = () => {}) => {
		watch(
			() => single.value,
			(value) => {
				value && queryData(nextFun)
			},
		)
	}
	const queryData = async (nextFun = () => {}) => {
		if (!single.value) return
		const { data } = await fanLine(queryParams.value)
		const { line, list } = data
		lineData.value = line
		dataList.value = list
		nextFun()
	}

	return {
		queryParams,
		fanList,
		rotationalSpeedList,
		bladeAngleList,
		single,
		handleMonitor,
		lineData,
		dataList,
		handleSingle,
		queryData,
	}
}
