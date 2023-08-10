export const realTimeDisNetSolution = () => {
	// 实时解算频率
	const frequency = ref(5)

	//实时解算列表
	const dataList = ref([
		{
			name: '11202掘进面',
			calTheAirVolume: '356.5',
			realTimeAirVolume: '356.3',
			artMeasuredAirVolume: '356.3',
			targetAirVolume: '356.3',
			equipmentErrorRate: '0.2',
			artificialErrorRate: '0.25',
			windSpeed: '25.5',
			windResistance: '21',
			windPressure: '1025',
			solvingTime: '2023-6-28  15:15:20',
			measuredTime: '2023-6-28  15:15:20',
		},
		{
			name: '11202掘进面',
			calTheAirVolume: '356.5',
			realTimeAirVolume: '356.3',
			artMeasuredAirVolume: '356.3',
			targetAirVolume: '356.3',
			equipmentErrorRate: '1',
			artificialErrorRate: '10',
			windSpeed: '25.5',
			windResistance: '21',
			windPressure: '1025',
			solvingTime: '2023-6-28  15:15:20',
			measuredTime: '2023-6-28  15:15:20',
		},
	])

	return {
		frequency,
		dataList,
	}
}
