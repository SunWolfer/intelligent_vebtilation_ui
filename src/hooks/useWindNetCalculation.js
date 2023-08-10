// 风网解算
export const useWindNetCalculation = () => {
	//   解算数据
	const windTextList = ref([
		{
			parent: '023-043',
			airQuantity: '1235',
			windage: '38.5',
			windPressure: '26.8',
		},
		{
			parent: '128-124',
			airQuantity: '1235',
			windage: '38.5',
			windPressure: '26.8',
		},
	])
	watch(
		() => windTextList.value,
		() => {
			splitText()
		},
	)
	//   3D风网解算文字
	const fontList = ref([])
	//   创建3D风网解算文字
	const splitText = () => {
		for (let i = 0; i < windTextList.value.length; i++) {
			const wind = windTextList.value[i]
			let airQuantity = `解算风量：${wind.airQuantity}m³/min`
			let windage = `风阻：${wind.windage}m/s`
			let windPressure = `风压：${wind.windPressure}Kpa`
			let text = `${airQuantity} ${windage} ${windPressure}`
			fontList.value.push({
				parent: wind.parent,
				text: text,
				color: '#000',
				size: 300,
				height: 600,
				planeColor: '#00ff00',
			})
		}
	}

	onMounted(() => {
		splitText()
	})

	return {
		fontList,
		windTextList,
		splitText,
	}
}
