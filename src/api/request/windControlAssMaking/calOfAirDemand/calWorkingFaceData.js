import { calOfAirDemand } from '@/api/request/windControlAssMaking/calOfAirDemand/calOfAirDemand'

export const calWorkingFaceData = () => {
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
		co2List,
		queryCo2DataList,
		chooseCo2WindList,
		chooseCo2List,
		co2S,
		co2Qs,
		personList,
		queryPersonDataList,
		personNum,
		choosePersonList,
	} = calOfAirDemand('1')

	onMounted(() => {
		queryWindDataList?.()
		queryGasDataList?.()
		queryCo2DataList?.()
		queryPersonDataList?.()
	})

	const dataForm = ref({
		id: undefined,
		mainId: undefined,
		roadCode: '',
		roadName: '',
		// 需风量 m3/min
		airVolume: '',
		// 气象预测风量
		weatherQ: '',
		// 采煤工作面风速
		weatherWindSpeed: '',
		// 采煤工作面断面
		weatherSurface: '',
		// 采煤工作面高度风量系数
		weatherHeightCoe: '',
		// 采煤工作面长度风量系数
		weatherLengthCoe: '',
		// 风速预测风量
		speedQ: '',
		// 工作面最大控顶有效断面积
		speedMaxArea: '',
		// 工作面最小控顶有效断面积
		speedMinArea: '',
		// 工作面实际采高
		speedRealHeight: '',
		// 工作面高度最大控顶距离
		speedMaxHeight: '',
		// 工作面高度最小控顶距离
		speedMinHeight: '',
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
		// CO2预测风量
		co2Q: '',
		// CO2预测类型 0人工输入 1智能实时
		co2PredictType: '0',
		// 采煤工作面回风CO2涌出量
		co2Emission: '',
		// 采煤工作面CO2涌出备用风量系数
		co2AirCoe: '',
		// CO2传感器code
		co2SneosrCode: '',
		// 风速传感器code
		co2WindSensor: '',
		// 巷道截面积
		co2Surface: '',
		// 工作人员预测风量
		personQ: '',
		// 工作人员预测类型 0人工输入 1智能实时
		personPredictType: '0',
		// 采煤工作面同时工作最大人数
		personTotal: '',
		// 采煤工作面对应的人员定位的位置
		personAre: '',
		// 炸药预测风量
		powderQ: '',
		// 采煤工作面一次爆破最大炸药量
		powderTotal: '',
	})
	const resetForm = () => {
		dataForm.value = {
			...dataForm.value,
			id: undefined,
			mainId: undefined,
			// 采煤工作面风速
			weatherWindSpeed: '',
			// 采煤工作面断面
			weatherSurface: '',
			// 采煤工作面高度风量系数
			weatherHeightCoe: '',
			// 采煤工作面长度风量系数
			weatherLengthCoe: '',
			// 工作面实际采高
			speedRealHeight: '',
			// 工作面高度最大控顶距离
			speedMaxHeight: '',
			// 工作面高度最小控顶距离
			speedMinHeight: '',
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
			// CO2预测类型 0人工输入 1智能实时
			co2PredictType: '0',
			// 采煤工作面回风CO2涌出量
			co2Emission: '',
			// 采煤工作面CO2涌出备用风量系数
			co2AirCoe: '',
			// CO2传感器code
			co2SneosrCode: '',
			// 风速传感器code
			co2WindSensor: '',
			// 巷道截面积
			co2Surface: '',
			// 工作人员预测类型 0人工输入 1智能实时
			personPredictType: '0',
			// 采煤工作面同时工作最大人数
			personTotal: '',
			// 采煤工作面对应的人员定位的位置
			personAre: '',
			// 采煤工作面一次爆破最大炸药量
			powderTotal: '',
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

	// 按气象条件预测风量
	const flowData1Cop1 = computed(() => {
		let hei = dataForm.value.weatherHeightCoe ?? 0
		return hei > 0 ? (hei < 2 ? 1 : hei > 2.5 ? 1.2 : 1.1) : 0
	})
	const flowDataCop2 = computed(() => {
		let wid = dataForm.value.weatherLengthCoe ?? 0
		let coe = 0
		if (wid < 15 && wid > 0) coe = 0.8
		if (wid >= 18 && wid < 80) coe = 0.85
		if (wid >= 80 && wid < 120) coe = 1
		if (wid >= 120 && wid < 150) coe = 1.1
		if (wid >= 150 && wid <= 180) coe = 1.2
		if (wid > 180) coe = 1.35
		return coe
	})
	const weatherQ = computed(() => {
		let Scf = dataForm.value.weatherSurface ?? 0
		let Kch = flowData1Cop1.value ?? 0
		let Kcl = flowDataCop2.value ?? 0
		let Vcf = dataForm.value.weatherWindSpeed ?? 0
		return (60 * 0.7 * Scf * Kch * Kcl * Vcf).toFixed(2)
	})
	watchEffect(() => {
		dataForm.value.weatherQ = weatherQ.value
	})

	// 按照风速进行验算
	// 工作面最小控顶有效断面积
	const speedMinArea = computed(() => {
		let h1 = dataForm.value.speedMinHeight ?? 0
		let h2 = dataForm.value.speedRealHeight ?? 0
		return (0.7 * h1 * h2).toFixed(2)
	})
	// 工作面最大控顶有效断面积
	const speedMaxArea = computed(() => {
		let h1 = dataForm.value.speedMaxHeight ?? 0
		let h2 = dataForm.value.speedRealHeight ?? 0
		return (0.7 * h1 * h2).toFixed(2)
	})

	const minBlow = computed(() => {
		return (60 * 0.25 * speedMinArea.value).toFixed(2)
	})
	watchEffect(() => {
		dataForm.value.speedMinArea = speedMinArea.value
		dataForm.value.speedMaxArea = speedMaxArea.value
		dataForm.value.speedQ = minBlow.value
	})

	//按瓦斯
	const checkPredictType = (data) => {
		if (data === dataForm.value.gasPredictType) return
		dataForm.value.gasPredictType = data
		dataForm.value.gasEmission = ''
		dataForm.value.gasAirCoe = ''
	}
	//按瓦斯所需风量
	const gasQ = computed(() => {
		return (dataForm.value.gasEmission * dataForm.value.gasAirCoe * 125).toFixed(2)
	})
	//瓦斯涌出量智能实时
	watchEffect(() => {
		// 智能实时
		if (dataForm.value.gasPredictType === '1') {
			dataForm.value.gasSurface = gasS.value
			dataForm.value.gasEmission = gasQs.value
		}
		dataForm.value.gasQ = gasQ.value
	})
	// 按二氧化碳
	const checkCo2PredictType = (data) => {
		if (data === dataForm.value.co2PredictType) return
		dataForm.value.co2PredictType = data
		dataForm.value.co2Emission = ''
		dataForm.value.co2AirCoe = ''
	}
	// 按二氧化碳计算所需风量
	const co2Q = computed(() => {
		return (dataForm.value.co2Emission * dataForm.value.co2AirCoe * 67).toFixed(2)
	})
	// 二氧化碳智能实时
	watchEffect(() => {
		// 	智能实时
		if (dataForm.value.co2PredictType === '1') {
			dataForm.value.co2Surface = co2S.value
			dataForm.value.co2Emission = co2Qs.value
		}
		dataForm.value.co2Q = co2Q.value
	})

	// 按照人员
	const checkPersonDictType = (data) => {
		if (data === dataForm.value.personPredictType) return
		dataForm.value.personPredictType = data
		dataForm.value.personTotal = ''
	}
	watchEffect(() => {
		if (dataForm.value.personPredictType === '1') {
			dataForm.value.personTotal = personNum.value
		}
		dataForm.value.personQ = (dataForm.value.personTotal * 4).toFixed(2)
	})
	// 按照炸药量
	watchEffect(() => {
		dataForm.value.powderQ = (dataForm.value.powderTotal * 10).toFixed(2)
	})
	// 工作面所需风量
	const airVolume = computed(() => {
		let arr = [
			dataForm.value.weatherQ,
			dataForm.value.speedQ,
			dataForm.value.gasQ,
			dataForm.value.co2Q,
			dataForm.value.personQ,
			dataForm.value.powderQ,
		]
		return arr.sort(function (a, b) {
			return b - a
		})[0]
	})
	watchEffect(() => {
		dataForm.value.airVolume = airVolume.value
	})

	return {
		dataList,
		wind_predict_type,
		dataForm,
		checkPredictType,
		windList,
		gasList,
		chooseWindList,
		chooseGasList,
		gasS,
		co2List,
		chooseCo2WindList,
		chooseCo2List,
		co2S,
		checkCo2PredictType,
		personList,
		choosePersonList,
		checkPersonDictType,
		dataFormInfo,
		resetForm,
		changeRoad,
	}
}
