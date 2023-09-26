import { calOfAirDemand } from '@/api/request/windControlAssMaking/calOfAirDemand/calOfAirDemand'
import useDict from '@/hooks/useDict'

export const calHeadingFaceData = () => {
	const {
		dataFormInfo,
		dataFormInfoByCode,
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
	} = calOfAirDemand('2')
	const { num_yes_no } = useDict('num_yes_no')

	onMounted(() => {
		queryWindDataList?.()
		queryGasDataList?.()
		queryCo2DataList?.()
		queryPersonDataList?.()
	})

	const dataForm = ref({
		id: undefined,
		roadCode: '',
		roadName: '',
		// 需风量 m3/min
		airVolume: '',
		// 风速预测风量
		speedQ: '',
		// 掘进工作面有效断面积
		speedSurface: '',
		// 是否有瓦斯涌出 0否 1是
		speedGasEmission: '0',
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
		// 	按风速预测
		speedFlag: '0',
		// 	按瓦斯预测
		gasFlag: '0',
		// 	co2预测
		co2Flag: '0',
		// 	按人员预测
		personFlag: '0',
		// 	按炸药量
		powderFlag: '0',
	})

	const resetForm = () => {
		dataForm.value = {
			...dataForm.value,
			id: undefined,
			mainId: undefined,
			speedSurface: '',
			speedGasEmission: '0',
			gasPredictType: '0',
			gasEmission: '',
			gasAirCoe: '',
			gasSneosrCode: '',
			gasWindSensor: '',
			gasSurface: '',
			co2PredictType: '0',
			co2Emission: '',
			co2AirCoe: '',
			co2SneosrCode: '',
			co2WindSensor: '',
			co2Surface: '',
			personPredictType: '0',
			personTotal: '',
			personAre: '',
			powderTotal: '',
			// 	按风速预测
			speedFlag: '0',
			// 	按瓦斯预测
			gasFlag: '0',
			// 	co2预测
			co2Flag: '0',
			// 	按人员预测
			personFlag: '0',
			// 	按炸药量
			powderFlag: '0',
		}
	}
	const changeRoad = async () => {
		const findData = dataList.value.find((i) => {
			return i.code === dataForm.value.roadCode
		})
		dataForm.value.roadName = findData.name
		const data = await dataFormInfoByCode?.(findData.code)
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
		dataForm.value.gasFlag = dataForm.value.gasQ > 0 ? '1' : '0'
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
		dataForm.value.co2Flag = dataForm.value.co2Q > 0 ? '1' : '0'
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
		dataForm.value.personFlag = dataForm.value.personQ > 0 ? '1' : '0'
	})
	// 按照炸药量
	watchEffect(() => {
		dataForm.value.powderQ = (dataForm.value.powderTotal * 10).toFixed(2)
		dataForm.value.powderFlag = dataForm.value.powderQ > 0 ? '1' : '0'
	})
	// 按照风速进行验算
	const coalMinBlow = computed(() => {
		return (
			dataForm.value.speedSurface *
			60 *
			(dataForm.value.speedGasEmission === '1' ? 0.25 : 0.15)
		).toFixed(2)
	})
	watchEffect(() => {
		dataForm.value.speedQ = coalMinBlow.value
		dataForm.value.speedFlag = dataForm.value.speedQ > 0 ? '1' : '0'
	})

	// 工作面所需风量
	const airVolume = computed(() => {
		let arr = [
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
		num_yes_no,
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
