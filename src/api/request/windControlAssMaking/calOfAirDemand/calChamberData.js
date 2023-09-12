import { calOfAirDemand } from '@/api/request/windControlAssMaking/calOfAirDemand/calOfAirDemand'

export const calChamberData = () => {
	const { dataFormInfo, dataList } = calOfAirDemand('3')

	const dataForm = ref({
		id: undefined,
		roadCode: '',
		roadName: '',
		// 需风量 m3/min
		airVolume: '',
		// 爆破材料库预测风量
		powderQ: '',
		// 井下爆炸材料库的体积
		powderVolume: '',
		// 充电硐室预测风量
		chargingQ: '',
		// 充电硐室充电时产生的氢气量
		chargingH2: '',
		// 机电硐室预测风量
		electrQ: '',
		// 机电硐室中运转的电动机总功率
		electrPower: '',
		// 机电硐室发热系数
		electrHeatCoe: '',
		// 空气密度
		electrDensity: '',
		// 空气定压比热
		electrAireHeat: '',
		// 机电硐室进、回风流的温度差
		electrTempDiff: '',
	})

	const resetForm = () => {
		dataForm.value = {
			...dataForm.value,
			id: undefined,
			mainId: undefined,
			// 井下爆炸材料库的体积
			powderVolume: '',
			// 充电硐室充电时产生的氢气量
			chargingH2: '',
			// 机电硐室中运转的电动机总功率
			electrPower: '',
			// 机电硐室发热系数
			electrHeatCoe: '',
			// 空气密度
			electrDensity: '',
			// 空气定压比热
			electrAireHeat: '',
			// 机电硐室进、回风流的温度差
			electrTempDiff: '',
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

	// 机电硐室预测风量
	const electrQ = computed(() => {
		return (
			(3600 * dataForm.value.electrPower * dataForm.value.electrHeatCoe) /
			(dataForm.value.electrDensity *
				dataForm.value.electrAireHeat *
				60 *
				dataForm.value.electrTempDiff)
		).toFixed(2)
	})

	watchEffect(() => {
		// 爆破材料库预测风量
		dataForm.value.powderQ = ((dataForm.value.powderVolume * 4) / 60).toFixed(2)
		// 充电硐室预测风量
		dataForm.value.chargingQ = (dataForm.value.powderVolume * 200).toFixed(2)
		// 机电硐室预测风量
		dataForm.value.electrQ = electrQ.value
	})

	// 工作面所需风量
	const airVolume = computed(() => {
		let arr = [dataForm.value.powderQ, dataForm.value.chargingQ, dataForm.value.electrQ]
		return arr.sort(function (a, b) {
			return b - a
		})[0]
	})
	watchEffect(() => {
		dataForm.value.airVolume = airVolume.value
	})

	return {
		dataList,
		dataForm,
		dataFormInfo,
		resetForm,
		changeRoad,
	}
}
