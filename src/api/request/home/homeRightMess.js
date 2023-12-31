import { deviceWarnList, roadAll, totalAirVolume } from '@/api/api/home'
import { useThreeModelData } from '@/hooks/useThreeModelData'
import { useGainList } from '@/hooks/useGainList'

export const homeRightMess = () => {
	// 矿井总风量
	const { dataList: airVolumeList, queryDataList: queryAirVolumeList } = useGainList({
		automatic: false,
		apiFun: totalAirVolume,
	})

	//  区域风量列表
	const regionalAirVolumeList = ref([])
	const { roadAllList } = useThreeModelData()

	// 查询巷道信息
	const queryRoadAllList = async () => {
		const { data } = await roadAll()
		regionalAirVolumeList.value = data.roadAreaList
		roadAllList.value = data.roadAllList
	}

	const warnList = ref([])
	// 整体预警等级
	const maxWarnType = ref('0')
	// 查询预警列表
	const getWarnListData = async () => {
		const res = await deviceWarnList()
		if (!res) return
		warnList.value = res.data
		const warnLevelList = warnList.value.map((i) => {
			return i.warnLevel
		})
		maxWarnType.value = Math.min(...warnLevelList)
	}

	// 是否显示预警
	const isWarn = computed(() => {
		return warnList.value.length > 0
	})
	// 手动控制预警图标
	const manualControlWarnIcon = ref(true)
	const closeWarnIcon = () => {
		manualControlWarnIcon.value = false
	}
	// 监听预警列表
	watch(
		() => warnList.value,
		() => {
			manualControlWarnIcon.value = true
		},
	)

	const showWarnList = computed(() => {
		const result = []
		const size = 3 //数组长度
		const total = Math.ceil(warnList.value.length / size)
		for (let i = 0; i < total; i++) {
			let start = i * size
			let end = start + size
			result.push(warnList.value.slice(start, end))
		}
		return result
	})

	const warnType = [
		{
			label: '通风动力预警',
			value: '1',
		},
		{
			label: '通风网络预警',
			value: '3',
		},
		{
			label: '通风设施预警',
			value: '2',
		},
		{
			label: '通风融合预警',
			value: '4',
		},
	]
	const formatterWarnType = (type) => {
		return (
			warnType.find((i) => {
				return i.value === type
			})?.label ?? ''
		)
	}
	// 通风动力预警
	const powerNum = computed(() => {
		return warnList.value.filter((i) => {
			return i.mainType === '1'
		}).length
	})
	// 通风网络预警
	const theNetworkNum = computed(() => {
		return warnList.value.filter((i) => {
			return i.mainType === '3'
		}).length
	})
	// 通风设施预警
	const facilitiesNum = computed(() => {
		return warnList.value.filter((i) => {
			return i.mainType === '2'
		}).length
	})
	// 通风融合预警
	const fusionNum = computed(() => {
		return warnList.value.filter((i) => {
			return i.mainType === '4'
		}).length
	})
	return {
		airVolumeList,
		regionalAirVolumeList,
		warnList,
		showWarnList,
		powerNum,
		theNetworkNum,
		facilitiesNum,
		fusionNum,
		formatterWarnType,
		isWarn,
		manualControlWarnIcon,
		closeWarnIcon,
		maxWarnType,
		getWarnListData,
		queryAirVolumeList,
		queryRoadAllList,
	}
}
