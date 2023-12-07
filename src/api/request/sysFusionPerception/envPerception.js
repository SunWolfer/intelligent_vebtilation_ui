import { getSensorAttribute, listEnvPerceptionCloud, sensorWarnList } from '@/api/api/envPerception'
import { bindDevice } from '@/api/api/venSystemManagement'
import { homeRightMess } from '@/api/request/home/homeRightMess'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { useCommitForm } from '@/hooks/useForm'
export const envPerception = () => {
	const threeModelRef = ref(null)
	const chooseTab = ref('1')
	const tabsList = ref([
		{
			label: '安监',
			value: '1',
		},
	])
	const chooseDataType = async (data) => {
		chooseTab.value = data
		if (chooseTab.value === '1') {
			await handleSafeDataListQuery()
		}
	}

	const { warnList, showWarnList, formatterWarnType } = homeRightMess()

	const safeDataList = ref([])

	const handleSafeDataListQuery = async () => {
		const res = await getSensorAttribute({})
		if (res.code === 200 && res.data) {
			safeDataList.value = res.data.map((i) => {
				return {
					...i,
					point: {
						x: i.pointX,
						y: i.pointY,
						z: i.pointZ,
					},
				}
			})
		}
	}

	const queryWarnList = async () => {
		const res = await sensorWarnList()
		if (res.code === 200 && res.data) {
			warnList.value = res.data.map((i) => {
				return {
					...i,
					point: {
						x: i.pointX,
						y: i.pointY,
						z: i.pointZ,
					},
				}
			})
		}
	}

	// 点位标注
	const pointDimensionVisible = ref(false)
	const handlePointDimension = () => {
		distributionCloudMapVisible.value = false
		pointDimensionVisible.value = !pointDimensionVisible.value
	}

	const sensorDataId = ref('')
	const sensorData = computed(() => {
		return safeDataList.value.find((i) => i.id === sensorDataId.value)
	})
	const labelList = computed(() => {
		return safeDataList.value.filter((i) => i.mapBind === '1')
	})

	const { proxy } = useCurrentInstance()
	// 点位标注确认
	const bindSensor = async () => {
		if (!sensorData.value.id) {
			proxy.$modal.msgWarning('请选择传感器')
			return
		}
		if (!threeModelRef.value?.intersectedPosition) {
			proxy.$modal.msgWarning('请选择传感器位置')
			return
		}
		const intersectedPosition = threeModelRef.value?.intersectedPosition
		await useCommitForm(bindDevice, {
			queryParams: {
				devId: sensorData.value.id,
				devType: sensorData.value.devType,
				mapModelCode: intersectedPosition.name,
				pointX: intersectedPosition.x,
				pointY: intersectedPosition.y,
				pointZ: intersectedPosition.z,
			},
			afterReadyDataFun: async () => {
				await handleSafeDataListQuery()
			},
		})
	}
	// 点位标注取消
	const cancelEdit = () => {
		handlePointDimension?.()
	}

	// 有毒有害气体分布云图
	const distributionCloudMapVisible = ref(false)
	const handleDistributionCloudMap = () => {
		pointDimensionVisible.value = false
		distributionCloudMapVisible.value = !distributionCloudMapVisible.value
	}

	const cloudList = ref([])
	// 查询云图
	const getCloud = async () => {
		const { data } = await listEnvPerceptionCloud()
		cloudList.value = data ?? []
	}

	// 分布云图显示
	const cloudVisible = ref(false)
	const showCloud = async () => {
		await getCloud()
		cloudVisible.value = true
	}
	const hideCloud = () => {
		cloudVisible.value = false
		handleDistributionCloudMap?.()
	}

	// 右侧实时监测信息
	const iconMap = new Map([
		// 二氧化碳
		['0013', ['', 'safe_icon_1']],
		// 粉尘
		['0014', ['mg/m3', 'safe_icon_2']],
		// 风速
		['0002', ['m/s', 'safe_icon_3']],
		// 瓦斯
		['0001', ['%CH4', 'safe_icon_4']],
		// 环境温度
		['0003', ['', 'safe_icon_5']],
		// 氧气
		['0012', ['', 'safe_icon_6']],
		// 烟雾
		['1008', ['', 'safe_icon_7']],
		// 一氧化碳
		['0004', ['ppm', 'safe_icon_8']],
	])

	return {
		threeModelRef,
		pointDimensionVisible,
		handlePointDimension,
		distributionCloudMapVisible,
		handleDistributionCloudMap,
		cloudList,
		iconMap,
		chooseTab,
		tabsList,
		chooseDataType,
		safeDataList,
		handleSafeDataListQuery,
		sensorDataId,
		sensorData,
		showWarnList,
		formatterWarnType,
		bindSensor,
		cancelEdit,
		cloudVisible,
		showCloud,
		hideCloud,
		labelList,
		queryWarnList,
	}
}
