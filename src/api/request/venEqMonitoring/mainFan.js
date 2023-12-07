import {
	activeForwardStartMain,
	activeReverseStartMain,
	activeStopMain,
	backWindMain,
	intelligentWindControlMain,
	manFanList,
	standbyForwardStartMain,
	standbyReverseStartMain,
	standbyStopMain,
	switchAsMain,
	windControlMain,
} from '@/api/api/mainFan'
import { useGainList } from '@/hooks/useGainList'
import { useCommitForm } from '@/hooks/useForm'
import { fanMsgInfo } from '@/api/request/venEqMonitoring/fanMsgInfo'
import useEquipmentParams from '@/hooks/useEquipmentParams'

export const mainFan = () => {
	// 页面传参查询
	const equipmentParams = useEquipmentParams()
	// 选中主扇id
	const mainFanId = ref('')
	// 主扇列表
	const { dataList, queryDataList } = useGainList({
		apiFun: manFanList,
		afterReadyDataFun: (data) => {
			const params = equipmentParams?.dataParams
			mainFanId.value = params?.id ? params?.id : data[0].id
			getMainFanInfo?.(mainFanId.value)
		},
	})

	const changeItem = (data) => {
		mainFanId.value = data
		getMainFanInfo?.(mainFanId.value)
	}

	const {
		dataForm,
		oneCustomizedParameters1,
		oneCustomizedParameters2,
		twoCustomizedParameters1,
		twoCustomizedParameters2,
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

	// 右侧风机显示
	const mainFanMes = computed(() => {
		// 显示风机
		const data = dataForm.value.workStatus2 === '1'
		return [
			{
				label: '静压(KPa)',
				value: data ? dataForm.value.negativePressure2 : dataForm.value.negativePressure1,
				icon: 'main_fan_body_l2_icon_1',
			},
			{
				label: '总功率(Kw)',
				value: data ? dataForm.value.fullPressure2 : dataForm.value.fullPressure1,
				icon: 'main_fan_body_l2_icon_2',
			},
			{
				label: '风速(m/s)',
				value: data ? dataForm.value.windSpeed2 : dataForm.value.windSpeed1,
				icon: 'main_fan_body_l2_icon_3',
			},
			{
				label: '全压(KPa)',
				value: data ? dataForm.value.fullPressure2 : dataForm.value.fullPressure1,
				icon: 'main_fan_body_l2_icon_4',
			},
			{
				label: '风量(m³/min)',
				value: data ? dataForm.value.airVolume2 : dataForm.value.airVolume1,
				icon: 'main_fan_body_l2_icon_5',
			},
			{
				label: '动压(KPa)',
				value: data ? dataForm.value.dynamicPressure2 : dataForm.value.dynamicPressure1,
				icon: 'main_fan_body_l2_icon_1',
			},
		]
	})

	// 一键反风
	const backWindHandle = async () => {
		await useCommitForm(backWindMain, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 一键倒机
	const switchHandle = async () => {
		await useCommitForm(switchAsMain, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 一号风机正向启动
	const activeForwardStartMainHandle = async () => {
		await useCommitForm(activeForwardStartMain, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 一号风机停止
	const activeStopMainHandle = async () => {
		await useCommitForm(activeStopMain, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 一号风机反向启动
	const activeReverseStartMainHandle = async () => {
		await useCommitForm(activeReverseStartMain, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 二号风机正向启动
	const standbyForwardStartMainHandle = async () => {
		await useCommitForm(standbyForwardStartMain, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 二号风机停止
	const standbyStopMainHandle = async () => {
		await useCommitForm(standbyStopMain, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	// 二号风机反向启动
	const standbyReverseStartMainHandle = async () => {
		await useCommitForm(standbyReverseStartMain, {
			queryParams: {
				devId: dataForm.value.id,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}

	// 风量定量调控
	const quControlAirVolumeForm = ref({
		// 	一号电机动叶角度
		movingBladeAngle1: '',
		// 	一号电机频率
		frequency1: '',
		// 	二号电机动叶角度
		movingBladeAngle2: '',
		// 	二号电机频率
		frequency2: '',
	})
	// 初始化动叶角度和频率
	watchEffect(() => {
		if (activeOneAll.value.length && standbyOneAll.value.length) {
			quControlAirVolumeForm.value.movingBladeAngle1 = activeOneAll.value.find((i) => {
				return i.propertyCode === 'bladeAngel'
			})?.propertyValue
			quControlAirVolumeForm.value.frequency1 = activeOneAll.value.find((i) => {
				return i.propertyCode === 'frequency'
			})?.propertyValue
			quControlAirVolumeForm.value.movingBladeAngle2 = standbyOneAll.value.find((i) => {
				return i.propertyCode === 'bladeAngel'
			})?.propertyValue
			quControlAirVolumeForm.value.frequency2 = standbyOneAll.value.find((i) => {
				return i.propertyCode === 'frequency'
			})?.propertyValue
		}
	})
	// 设置风量定量调控
	const volumeControlHandle1 = async () => {
		if (quControlAirVolumeForm.value.movingBladeAngle1) {
			await useCommitForm(windControlMain, {
				queryParams: {
					controlType: '1',
					controlValue: quControlAirVolumeForm.value.movingBladeAngle1,
				},
			})
		}
		if (quControlAirVolumeForm.value.frequency1) {
			await useCommitForm(windControlMain, {
				queryParams: {
					controlType: '2',
					controlValue: quControlAirVolumeForm.value.frequency1,
				},
			})
		}
	}
	const volumeControlHandle2 = async () => {
		if (quControlAirVolumeForm.value.movingBladeAngle2) {
			await useCommitForm(windControlMain, {
				queryParams: {
					controlType: '3',
					controlValue: quControlAirVolumeForm.value.movingBladeAngle2,
				},
			})
		}
		if (quControlAirVolumeForm.value.frequency2) {
			await useCommitForm(windControlMain, {
				queryParams: {
					controlType: '4',
					controlValue: quControlAirVolumeForm.value.frequency2,
				},
			})
		}
	}
	// 主扇最优智能调风
	const intelligentWindControlMainHandle = async (data) => {
		await useCommitForm(intelligentWindControlMain, {
			queryParams: {
				controlType: '5',
				controlValue: data,
			},
			afterReadyDataFun: () => {
				getMainFanInfo?.(mainFanId.value)
			},
		})
	}
	//开启智能调风
	const openIntelWindControl = async () => {
		await intelligentWindControlMainHandle('1')
	}
	// 	关闭智能调风
	const closeIntelWindControl = async () => {
		await intelligentWindControlMainHandle('0')
	}

	return {
		dataList,
		mainFanId,
		changeItem,
		dataForm,
		mainFanMes,
		fanCharCurveVisible,
		showFanCharCurveVisible,
		monAndAnalysisVisible,
		showMonAndAnalysisVisible,
		theSpectrumVisible,
		showTheSpectrumVisible,
		backWindHandle,
		switchHandle,
		activeForwardStartMainHandle,
		activeStopMainHandle,
		activeReverseStartMainHandle,
		standbyForwardStartMainHandle,
		standbyStopMainHandle,
		standbyReverseStartMainHandle,
		videoVisible,
		videoHandle,
		openIntelWindControl,
		closeIntelWindControl,
		oneCustomizedParameters1,
		oneCustomizedParameters2,
		twoCustomizedParameters1,
		twoCustomizedParameters2,
		customizedVisible,
		customizedHandle,
		customFanType,
		getMainFanInfo,
		fanThreeInfo,
		recordVisible,
		recordHandle,
		warnVisible,
		warnHandle,
		quControlAirVolumeForm,
		volumeControlHandle1,
		volumeControlHandle2,
	}
}
