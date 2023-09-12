import { calOfAirDemand } from '@/api/request/windControlAssMaking/calOfAirDemand/calOfAirDemand'

export const calOtherData = () => {
	const {
		dataFormInfo,
		dataList,
		wind_predict_type,
		windList,
		queryWindDataList,
		gasList,
		queryGasDataList,
		chooseWindList,
		chooseGasList,
		gasS,
		gasQs,
	} = calOfAirDemand('4')

	onMounted(() => {
		queryWindDataList?.()
		queryGasDataList?.()
	})

	const dataForm = ref({
		id: undefined,
		mainId: undefined,
		// 需风量 m3/min
		airVolume: '',
		// 风速预测风量
		speedQ: '',
		// 巷道有效断面积
		speedSurface: '',
		// 瓦斯预测风量
		gasQ: '',
		// 瓦斯预测类型 0人工输入 1智能实时
		gasPredictType: '0',
		// 采煤工作面回风瓦斯涌出量
		gasEmission: '',
		// 采煤工作面瓦斯涌出备用风量系数
		gasAirCoe: '',
		// 瓦斯传感器code
		gasSneosrCode: '',
		// 风速传感器code
		gasWindSensor: '',
		// 巷道截面积
		gasSurface: '',
		roadCode: '',
		roadName: '',
	})
	const resetForm = () => {
		dataForm.value = {
			...dataForm.value,
			id: undefined,
			mainId: undefined,
			speedSurface: '',
			gasPredictType: '0',
			gasEmission: '',
			gasAirCoe: '',
			gasSneosrCode: '',
			gasWindSensor: '',
			gasSurface: '',
		}
	}

	const changeRoad = async () => {
		const findData = dataList.value.find((i) => {
			return i.code === dataForm.value.roadCode
		})
		dataForm.value.roadName = findData.name
		const data = await dataFormInfo?.(findData.id)
		if (data) {
			dataForm.value = data
		} else {
			resetForm?.()
		}
	}

	//按瓦斯
	const checkPredictType = (data) => {
		if (data === dataForm.value.gasPredictType) return
		dataForm.value.gasPredictType = data
		dataForm.value.gasEmission = ''
		dataForm.value.gasAirCoe = ''
	}
	//按瓦斯所需风量
	const gasQ = computed(() => {
		return (dataForm.value.gasEmission * dataForm.value.gasAirCoe * 133).toFixed(2)
	})
	//瓦斯涌出量智能实时
	watchEffect(() => {
		// 智能实时
		if (dataForm.value.gasPredictType === '1') {
			dataForm.value.gasSurface = gasS.value
			dataForm.value.gasEmission = gasQs.value
		}
		dataForm.value.gasQ = gasQ.value
		dataForm.value.speedQ = (60 * 0.15 * dataForm.value.gasSurface).toFixed(2)
	})

	// 工作面所需风量
	const airVolume = computed(() => {
		let arr = [dataForm.value.speedQ, dataForm.value.gasQ]
		return arr.sort(function (a, b) {
			return b - a
		})[0]
	})
	watchEffect(() => {
		dataForm.value.airVolume = airVolume.value
	})

	return {
		dataFormInfo,
		dataList,
		wind_predict_type,
		dataForm,
		resetForm,
		checkPredictType,
		windList,
		gasList,
		chooseWindList,
		chooseGasList,
		gasS,
		changeRoad,
	}
}
