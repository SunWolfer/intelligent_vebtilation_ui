import useInterceptList from '@/hooks/useInterceptList'
import { fanMsgInfo } from '@/api/request/venEqMonitoring/fanMsgInfo'
import {
	activeStartLocal,
	activeStopLocal,
	gasElectricBlockLocal,
	gasOutLocal,
	localFanList,
	standbyStartLocal,
	standbyStopLocal,
	switchAsLocal,
	windControlLocal,
	windElectricBlockLocal,
} from '@/api/api/mainFan'
import { useGainList } from '@/hooks/useGainList'
import { useCommitForm } from '@/hooks/useForm'
import useEquipmentParams from '@/hooks/useEquipmentParams'

export const localFan = () => {
	// 页面传参查询
	const equipmentParams = useEquipmentParams()
	// 选中局扇id
	const mainFanId = ref('')
	const { dataList: localFan } = useGainList({
		apiFun: localFanList,
		afterReadyDataFun: (data) => {
			const params = equipmentParams?.dataParams
			mainFanId.value = params?.id ? params?.id : data[0].id
			getMainFanInfo?.(mainFanId.value)
		},
	})

	const { inShowList, toLast, showLast, toNext, showNext } = useInterceptList(localFan, 8)

	const changeItem = (data) => {
		mainFanId.value = data
		getMainFanInfo?.(mainFanId.value)
	}

	// 获取显示功率
	const itemPower = (data) => {
		return data.workStatus2 === '1' ? data.ratedPower2 : data.ratedPower1
	}
	// 获取显示风量
	const itemAirQuantity = (data) => {
		return data.workStatus2 === '1' ? data.airVolume2 : data.airVolume1
	}
	// 获取显示风速
	const itemWindSpeed = (data) => {
		return data.workStatus2 === '1' ? data.windSpeed2 : data.windSpeed1
	}

	const {
		dataForm,
		oneCustomizedParameters1,
		oneCustomizedParameters2,
		twoCustomizedParameters1,
		twoCustomizedParameters2,
		fanStatus,
		activeOneAll,
		standbyOneAll,
		getMainFanInfo,
		fanThreeInfo,
		recordVisible,
		recordHandle,
		warnVisible,
		warnHandle,
		fanCharCurveVisible,
		showFanCharCurveVisible,
		monAndAnalysisVisible,
		showMonAndAnalysisVisible,
		theSpectrumVisible,
		showTheSpectrumVisible,
		videoVisible,
		videoHandle,
		customizedVisible,
		customizedHandle,
		customFanType,
	} = fanMsgInfo()

	const iconMap = new Map([
		['gas', 'local_fan_body_l3_l2_icon_1'],
		['co', 'local_fan_body_l3_l2_icon_2'],
		['co2', 'local_fan_body_l3_l2_icon_3'],
		['dust', 'local_fan_body_l3_l2_icon_4'],
	])
	// 局扇环境感知
	const environmentList = computed(() => {
		return fanStatus.value.map((i) => {
			return {
				...i,
				iconClass: iconMap.get(i.propertyCode),
			}
		})
	})
	// 频率定量调控
	const freReControlForm = ref({
		// 	一号电机频率
		frequency1: '',
		// 	二号电机频率
		frequency2: '',
	})
	// 初始化频率
	watchEffect(() => {
		if (activeOneAll.value.length && standbyOneAll.value.length) {
			freReControlForm.value.frequency1 = activeOneAll.value.find((i) => {
				return i.propertyCode === 'frequency'
			})?.propertyValue
			freReControlForm.value.frequency2 = standbyOneAll.value.find((i) => {
				return i.propertyCode === 'frequency'
			})?.propertyValue
		}
	})

	const volumeControlHandle1 = async () => {
		if (freReControlForm.value.frequency1) {
			await useCommitForm(windControlLocal, {
				queryParams: {
					controlType: '1',
					controlValue: freReControlForm.value.frequency1,
				},
			})
		}
	}
	const volumeControlHandle2 = async () => {
		if (freReControlForm.value.frequency2) {
			await useCommitForm(windControlLocal, {
				queryParams: {
					controlType: '2',
					controlValue: freReControlForm.value.frequency2,
				},
			})
		}
	}

	// 局扇一键倒机
	const switchAsLocalHandle = async () => {
		await useCommitForm(switchAsLocal, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 局扇一号风机一键停止
	const activeStopLocalHandle = async () => {
		await useCommitForm(activeStopLocal, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 局扇一号风机开启
	const activeStartLocalHandle = async () => {
		await useCommitForm(activeStartLocal, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 局扇二号风机停止
	const standbyStopLocalHandle = async () => {
		await useCommitForm(standbyStopLocal, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 局扇二号风机一键开启
	const standbyStartLocalHandle = async () => {
		await useCommitForm(standbyStartLocal, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 瓦斯自动排放
	const gasOutLocalHandle = async () => {
		await useCommitForm(gasOutLocal, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 局扇瓦斯电闭锁
	const gasElectricBlockLocalHandle = async () => {
		await useCommitForm(gasElectricBlockLocal, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 局扇风电闭锁
	const windElectricBlockLocalHandle = async () => {
		await useCommitForm(windElectricBlockLocal, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	return {
		inShowList,
		toLast,
		showLast,
		toNext,
		showNext,
		mainFanId,
		changeItem,
		dataForm,
		oneCustomizedParameters1,
		oneCustomizedParameters2,
		twoCustomizedParameters1,
		twoCustomizedParameters2,
		getMainFanInfo,
		fanThreeInfo,
		recordVisible,
		recordHandle,
		warnVisible,
		warnHandle,
		fanCharCurveVisible,
		showFanCharCurveVisible,
		monAndAnalysisVisible,
		showMonAndAnalysisVisible,
		theSpectrumVisible,
		showTheSpectrumVisible,
		videoVisible,
		videoHandle,
		customizedVisible,
		customizedHandle,
		customFanType,
		itemPower,
		itemAirQuantity,
		itemWindSpeed,
		environmentList,
		freReControlForm,
		volumeControlHandle1,
		volumeControlHandle2,
		switchAsLocalHandle,
		activeStartLocalHandle,
		activeStopLocalHandle,
		standbyStartLocalHandle,
		standbyStopLocalHandle,
		gasOutLocalHandle,
		gasElectricBlockLocalHandle,
		windElectricBlockLocalHandle,
	}
}
