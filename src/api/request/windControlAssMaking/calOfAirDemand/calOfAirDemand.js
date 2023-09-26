import {
	getCo2SensorDict,
	getGasSensorDict,
	getPersonCountByCode,
	getPersonPositionDict,
	getRealValueByCode,
	getRoadDict,
	getRoadPredictInfo,
	getWindSensorDict,
	getWindSpeedByCode,
} from '@/api/api/calOfAirDemand'
import { useGainList } from '@/hooks/useGainList'
import useDict from '@/hooks/useDict'
import { useGushingAmount } from '@/api/request/windControlAssMaking/calOfAirDemand/useGushingAmount'

export const calOfAirDemand = (needCalType) => {
	// 巷道下拉列表
	const { dataList } = useGainList({
		apiFun: getRoadDict,
		queryArgs: {
			needCalType: needCalType,
		},
	})
	// 巷道需风量预测的条件信息查询
	const dataFormInfo = async (id) => {
		const { data } = await getRoadPredictInfo({
			needCalType: needCalType,
			id: id,
		})
		return data
	}
	// 根据code查询
	const dataFormInfoByCode = async (code) => {
		const { data } = await getRoadPredictInfo({
			needCalType: needCalType,
			roadCode: code,
		})
		return data
	}
	// 预测类型
	const { wind_predict_type } = useDict('wind_predict_type')

	// 风速传感器
	const { dataList: windList, queryDataList: queryWindDataList } = useGainList({
		automatic: false,
		apiFun: getWindSensorDict,
	})
	// 风速传感器监测值查询
	const queryWindData = async (value) => {
		const { data } = await getWindSpeedByCode({
			code: value,
		})
		return data
	}

	// 瓦斯传感器
	const { dataList: gasList, queryDataList: queryGasDataList } = useGainList({
		automatic: false,
		apiFun: getGasSensorDict,
	})
	//CO2传感器
	const { dataList: co2List, queryDataList: queryCo2DataList } = useGainList({
		automatic: false,
		apiFun: getCo2SensorDict,
	})
	// 瓦斯和CO2传感器监测值查询
	const queryGasData = async (value) => {
		const { data } = await getRealValueByCode({
			code: value,
		})
		return data
	}

	// 根据瓦斯浓度测算
	const { Vs: gasVs, S: gasS, Cg: gasCg, Qs: gasQs } = useGushingAmount()
	// 选择风速传感器
	const chooseWindList = async (val) => {
		// 风速
		gasVs.value = await queryWindData(val)
	}
	// 选择瓦斯传感器
	const chooseGasList = async (val) => {
		// 瓦斯浓度
		gasCg.value = await queryGasData(val)
	}

	// 根据二氧化碳浓度测算
	const { Vs: co2Vs, S: co2S, Cg: co2Cg, Qs: co2Qs } = useGushingAmount()
	// 选择风速传感器
	const chooseCo2WindList = async (val) => {
		// 	风速
		co2Vs.value = await queryWindData(val)
	}
	// 选择二氧化碳传感器
	const chooseCo2List = async (val) => {
		// 二氧化碳浓度
		co2Cg.value = await queryGasData(val)
	}

	// 人员定位位置
	const { dataList: personList, queryDataList: queryPersonDataList } = useGainList({
		automatic: false,
		apiFun: getPersonPositionDict,
	})
	//人员定位人数统计查询
	const queryPersonData = async (value) => {
		const { data } = await getPersonCountByCode({
			code: value,
		})
		return data
	}
	const personNum = ref('')
	// 下拉选择人员
	const choosePersonList = async (val) => {
		personNum.value = await queryPersonData(val)
	}

	return {
		dataList,
		dataFormInfo,
		dataFormInfoByCode,
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
	}
}
