// 风网解算
import { useThreeModelData } from '@/hooks/useThreeModelData'

export const useWindNetCalculation = () => {
	// 巷道详情
	const { modelSize } = useThreeModelData()
	const fontList = ref([])
	//   创建3D风网解算文字
	const splitText = (dataList) => {
		let IFontList = []
		for (let i = 0; i < dataList.length; i++) {
			const wind = dataList[i]
			if (wind.modelWindShow === '0') continue
			let airQuantity = `解算风量：${wind.airVolume ?? '-'}m³/min`
			let windage = `风阻：${wind.ventR ?? '-'}m/s`
			let windPressure = `风压：${wind.airPressure ?? '-'}Kpa`
			let text = `${airQuantity} ${windage} ${windPressure}`
			IFontList.push({
				parent: wind.code,
				text: text,
				color: '#000',
				size: 1 * modelSize.value,
				height: 7 * modelSize.value,
				planeColor: '#00ff00',
			})
			//   添加人工实测风量
			let text2 = wind.personQ
				? `人工实测风量：${wind.personQ}m3/min   实时风量：${wind.airVolume}m3/min`
				: ''
			if (text2) {
				IFontList.push({
					parent: wind.code,
					text: text2,
					color: '#000',
					size: 1 * modelSize.value,
					height: 4 * modelSize.value,
					planeColor: '#00ffff',
				})
			}
			//  人工测量时间
			let text3 = wind.personQTime ? `人工测量时间：${wind.personQTime}` : ''
			if (text3) {
				IFontList.push({
					parent: wind.code,
					text: text3,
					color: '#000',
					size: 1 * modelSize.value,
					height: 1 * modelSize.value,
					planeColor: '#005aff',
				})
			}
		}
		fontList.value = IFontList
	}

	return {
		fontList,
		splitText,
	}
}
