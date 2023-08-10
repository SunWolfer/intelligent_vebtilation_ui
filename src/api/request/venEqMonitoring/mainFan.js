export const mainFan = () => {
	//   定制化参数
	const customizedParametersList = ref([
		{
			label: 'Uab(V)',
			value: '11',
			unit: 'V',
		},
		{
			label: 'la(V):',
			value: '11',
			unit: 'V',
		},
		{
			label: 'Ubc(V)',
			value: '12',
			unit: 'V',
		},
		{
			label: 'lb(V):',
			value: '11',
			unit: 'V',
		},
		{
			label: 'Uca(V)',
			value: '12',
			unit: 'V',
		},
		{
			label: 'lc(V):',
			value: '11',
			unit: 'V',
		},
		{
			label: '有功(kw)',
			value: '2400',
			unit: '',
		},

		{
			label: '无功(kw)',
			value: '2400',
			unit: '',
		},
		{
			label: '视在(kw)',
			value: '2400',
			unit: '',
		},
		{
			label: 'cos(kw)',
			value: '111',
			unit: '',
		},
		{
			label: '定子A(°C)',
			value: '22',
			unit: '',
		},
		{
			label: '频率Hz)',
			value: '22',
			unit: '',
		},
	])

	// 风机参数
	const mainFanForm = ref({
		// 静压
		staticPressure: 12,
		// 	总功率
		totalPower: 2222,
		// 	风速
		windSpeed: 12,
		// 全压
		totalPressure: 123,
		// 风量
		airVolume: 123,
		// 动压
		dynamicPressure: 78,
	})
	// 右侧风机显示
	const mainFanMes = computed(() => {
		return [
			{
				label: '静压(KPa)',
				value: mainFanForm.value.staticPressure,
				icon: 'main_fan_body_l2_icon_1',
			},
			{
				label: '总功率(Kw)',
				value: mainFanForm.value.totalPower,
				icon: 'main_fan_body_l2_icon_2',
			},
			{
				label: '风速(m/s)',
				value: mainFanForm.value.windSpeed,
				icon: 'main_fan_body_l2_icon_3',
			},
			{
				label: '全压(KPa)',
				value: mainFanForm.value.totalPressure,
				icon: 'main_fan_body_l2_icon_4',
			},
			{
				label: '风量(m³/min)',
				value: mainFanForm.value.airVolume,
				icon: 'main_fan_body_l2_icon_5',
			},
			{
				label: '动压(KPa)',
				value: mainFanForm.value.dynamicPressure,
				icon: 'main_fan_body_l2_icon_1',
			},
		]
	})

	// 定制化弹窗
	const customizedVisible = ref(false)
	// 显示定制化弹窗
	const showCustomizedVisible = () => {
		customizedVisible.value = true
	}
	return {
		customizedParametersList,
		mainFanMes,
		customizedVisible,
		showCustomizedVisible,
	}
}
