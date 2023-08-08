import useInterceptList from '@/hooks/useInterceptList'

export const localFan = () => {
	const localFan = ref([
		{
			name: '1243局扇',
			fan1: 1,
			fan2: 0,
			power: 2400,
			airQuantity: 147,
			windSpeed: 111,
			type: 1,
		},
		{
			name: '1243局扇',
			fan1: 1,
			fan2: 0,
			power: 2400,
			airQuantity: 147,
			windSpeed: 111,
			type: 0,
		},
	])
	const { inShowList, toLast, showLast, toNext, showNext } = useInterceptList(localFan.value, 8)

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

	// 定制化弹窗
	const customizedVisible = ref(false)
	// 显示定制化弹窗
	const showCustomizedVisible = () => {
		customizedVisible.value = true
	}

	return {
		inShowList,
		toLast,
		showLast,
		toNext,
		showNext,
		customizedParametersList,
		customizedVisible,
		showCustomizedVisible,
	}
}
