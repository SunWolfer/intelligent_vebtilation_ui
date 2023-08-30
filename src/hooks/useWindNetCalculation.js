// 风网解算
import { useThreeModelData } from '@/hooks/useThreeModelData'

export const useWindNetCalculation = () => {
	// 巷道详情
	const { roadAllList } = useThreeModelData()

	watch(
		() => roadAllList.value,
		() => {
			splitText()
		},
	)
	//   3D风网解算文字
	const fontList = ref([])
	//   创建3D风网解算文字
	const splitText = () => {
		for (let i = 0; i < roadAllList.value.length; i++) {
			const wind = roadAllList.value[i]
			let airQuantity = `解算风量：${wind.airVolume}m³/min`
			let windage = `风阻：${wind.ventR}m/s`
			let windPressure = `风压：${wind.airPressure}Kpa`
			let text = `${airQuantity} ${windage} ${windPressure}`
			fontList.value.push({
				parent: wind.code,
				text: text,
				color: '#000',
				size: 300,
				height: 800,
				planeColor: '#00ff00',
			})
			//   添加人工实测风量
			let text2 = wind.personQ
				? `人工实测风量：${wind.personQ}m3/min   实际风量：${wind.airVolume}m3/min`
				: ''
			if (text2) {
				fontList.push({
					parent: wind.code,
					text: text2,
					color: '#000',
					size: 100,
					height: 600,
					planeColor: '#00ffff',
				})
			}
			//  人工测量时间
			let text3 = wind.personQTime ? `人工测量时间：${wind.personQTime}` : ''
			if (text3) {
				fontList.push({
					parent: wind.code,
					text: text3,
					color: '#000',
					size: 100,
					height: 400,
					planeColor: '#005aff',
				})
			}
		}
	}

	onMounted(() => {
		splitText()
	})

	return {
		fontList,
		splitText,
	}
}
