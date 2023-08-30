import useEquipmentData from '@/hooks/useEquipmentData'
import { roadAll, totalAirVolume } from '@/api/api/home'
import { useThreeModelData } from '@/hooks/useThreeModelData'

export const homeRightMess = () => {
	// 矿井总风量
	const airVolumeList = ref({})

	const infoAirVolumeList = async () => {
		const res = await totalAirVolume()
		if (res && res.data) {
			airVolumeList.value = res.data
		}
	}
	//  区域风量列表
	const regionalAirVolumeList = ref([])
	const { roadAllList } = useThreeModelData()

	// 查询巷道信息
	const getRoadAll = async () => {
		const res = await roadAll()
		if (res && res.data) {
			regionalAirVolumeList.value = res.data.roadAreaList
			roadAllList.value = res.data.roadAllList
		}
	}

	onMounted(() => {
		infoAirVolumeList()
		getRoadAll()
	})

	const { warnList } = useEquipmentData()
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
		for (var i = 0; i < total; i++) {
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
			}).label ?? ''
		)
	}
	const equipmentTypeList = useEquipmentData().equipmentTypeList
	const formatterEquipmentTypeList = (type) => {
		return equipmentTypeList.find((i) => {
			return i.value === type
		}).label
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
	}
}
