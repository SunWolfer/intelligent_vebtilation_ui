import useEquipmentData from '@/hooks/useEquipmentData'
import { deviceWarnList, roadAll, totalAirVolume } from '@/api/api/home'
import { useThreeModelData } from '@/hooks/useThreeModelData'
import { useGainList } from '@/hooks/useGainList'
import { useGainForm } from '@/hooks/useForm'

export const homeRightMess = () => {
	// 矿井总风量
	const { dataList: airVolumeList } = useGainList({
		apiFun: totalAirVolume,
	})

	//  区域风量列表
	const regionalAirVolumeList = ref([])
	const { roadAllList } = useThreeModelData()

	// 查询巷道信息
	useGainForm({
		apiFun: roadAll,
		afterReadyDataFun: (data) => {
			regionalAirVolumeList.value = data.roadAreaList
			roadAllList.value = data.roadAllList
		},
	})

	const { warnList } = useEquipmentData()
	// 整体预警等级
	const maxWarnType = ref('0')

	const getWarnListData = async () => {
		const res = await deviceWarnList()
		if (!res) return
		warnList.value = res.data
		const warnLevelList = warnList.value.map((i) => {
			return i.warnLevel
		})
		maxWarnType.value = Math.min(...warnLevelList)
	}
	onMounted(() => {
		getWarnListData()
	})

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
	const equipmentTypeList = useEquipmentData().equipmentTypeList
	const formatterEquipmentTypeList = (type) => {
		return (
			equipmentTypeList.find((i) => {
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
		showWarnList,
		powerNum,
		theNetworkNum,
		facilitiesNum,
		fusionNum,
		formatterWarnType,
		formatterEquipmentTypeList,
		isWarn,
		manualControlWarnIcon,
		closeWarnIcon,
		maxWarnType,
	}
}
