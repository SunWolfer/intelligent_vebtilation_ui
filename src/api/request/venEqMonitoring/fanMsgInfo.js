import { mainFanInfo } from '@/api/api/mainFan'

export const fanMsgInfo = () => {
	// 主扇表单
	const dataForm = ref({})
	// 主扇一号风机一号电机显示参数
	const oneCustomizedParameters1 = ref([])
	// 主扇一号风机二号电机显示参数
	const oneCustomizedParameters2 = ref([])
	// 主扇二号风机一号电机显示参数
	const twoCustomizedParameters1 = ref([])
	// 主扇二号风机二号电机显示参数
	const twoCustomizedParameters2 = ref([])
	//主机一号电机所有参数
	const activeOneAll = ref([])
	// 主机二号电机所有参数
	const activeTwoAll = ref([])
	// 备机一号电机所有参数
	const standbyOneAll = ref([])
	// 备机二号电机所有参数
	const standbyTwoAll = ref([])
	// 主机状态
	const fanActiveStatus = ref([])
	// 备机状态
	const fanStandbyStatus = ref([])
	// 风机状态
	const fanStatus = ref([])
	// 查询主扇信息
	const getMainFanInfo = async (id) => {
		const res = await mainFanInfo({
			id: id,
		})
		if (res.code === 200 && res.data) {
			dataForm.value = res.data.fanInfo
			fanActiveStatus.value = res.data.fanActiveStatus
			fanStandbyStatus.value = res.data.fanStandbyStatus
			fanStatus.value = res.data.fanStatus
			activeOneAll.value = res.data.activeOneAll
			activeTwoAll.value = res.data.activeTwoAll
			standbyOneAll.value = res.data.standbyOneAll
			standbyTwoAll.value = res.data.standbyTwoAll
			oneCustomizedParameters1.value = res.data.activeOneShow
			oneCustomizedParameters2.value = res.data.activeTwoShow
			twoCustomizedParameters1.value = res.data.standbyOneShow
			twoCustomizedParameters2.value = res.data.standbyTwoShow
		}
	}

	// 3D图风机显示信息
	const fanThreeInfo = computed(() => {
		const showMsg = dataForm.value.workStatus1 === '1' || dataForm.value.workStatus2 === '1'
		const showForm = dataForm.value.workStatus1 === '1'
		// 蝶阀开度
		const aperture = fanActiveStatus.value.find((i) => {
			return i.propertyCode === 'butterflyValveOpening'
		})?.propertyValue
		// 1号风机1号电机转速
		const rotationSpeed = activeOneAll.value.find((i) => {
			return i.propertyCode === 'rpm'
		})?.propertyValue
		// 1号风机2号电机转速
		const rotationSpeed2 = activeTwoAll.value.find((i) => {
			return i.propertyCode === 'rpm'
		})?.propertyValue
		// 2号电机1号电机转速
		const standRotationSpeed = standbyOneAll.value.find((i) => {
			return i.propertyCode === 'rpm'
		})?.propertyValue
		// 2号电机2号电机转速
		const standRotationSpeed2 = standbyTwoAll.value.find((i) => {
			return i.propertyCode === 'rpm'
		})?.propertyValue
		return {
			showMsg: showMsg,
			aperture: aperture,
			rotationSpeed: showForm ? rotationSpeed : standRotationSpeed,
			rotationSpeed2: showForm ? rotationSpeed2 : standRotationSpeed2,
			type: showForm ? '1' : '2',
		}
	})

	// 显示视频
	const videoVisible = ref(false)
	const videoHandle = () => {
		videoVisible.value = true
	}

	// 风机特性曲线
	const fanCharCurveVisible = ref(false)
	const showFanCharCurveVisible = () => {
		fanCharCurveVisible.value = true
	}
	// 温振监测分析
	const monAndAnalysisVisible = ref(false)
	const showMonAndAnalysisVisible = () => {
		monAndAnalysisVisible.value = true
	}

	// 温振图谱分析
	const theSpectrumVisible = ref(false)
	const showTheSpectrumVisible = () => {
		theSpectrumVisible.value = true
	}

	// 操作记录
	const recordVisible = ref(false)
	const recordHandle = () => {
		recordVisible.value = true
	}
	// 预警记录
	const warnVisible = ref(false)
	const warnHandle = () => {
		warnVisible.value = true
	}

	// 定制化弹窗
	const customizedVisible = ref(false)
	// 选中定制化风机
	const customFanType = ref('')
	// 显示定制化弹窗
	const customizedHandle = async (data) => {
		customFanType.value = data
		customizedVisible.value = true
	}

	return {
		dataForm,
		oneCustomizedParameters1,
		oneCustomizedParameters2,
		twoCustomizedParameters1,
		twoCustomizedParameters2,
		fanStatus,
		activeOneAll,
		activeTwoAll,
		standbyOneAll,
		standbyTwoAll,
		fanActiveStatus,
		fanStandbyStatus,
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
		customFanType,
		customizedHandle,
	}
}
