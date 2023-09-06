import { listRealTimeDisNetSolution, setCalculateRateTime } from '@/api/api/realTimeDisNetSolution'
import { useCommitForm } from '@/hooks/useForm'

export const realTimeDisNetSolution = () => {
	// 实时解算频率
	const frequency = ref(5)

	//实时解算列表
	const dataList = ref([])
	/**
	 * 选中标签
	 * 0 全部
	 * 1 设备测风
	 * 2 人工测风
	 */
	const chooseTabs = ref('0')
	const tabsHandle = (data) => {
		chooseTabs.value = data
		getList()
	}

	const getList = async () => {
		const res = await listRealTimeDisNetSolution({
			queryType: chooseTabs.value,
		})
		if (res.code === 200) {
			frequency.value = parseFloat(res.data.calculateRateTime)
			dataList.value = res.data.roadwayList
		}
	}

	// 设置实时解算频率
	const setFrequency = async () => {
		await useCommitForm(setCalculateRateTime, {
			queryParams: {
				calculateRateTime: frequency.value,
			},
		})
	}

	getList()

	return {
		chooseTabs,
		tabsHandle,
		frequency,
		dataList,
		setFrequency,
	}
}
