// 风网解算
import { useThreeModelData } from '@/hooks/useThreeModelData'

export interface windData {
	modelWindShow: string
	airVolume?: number
	ventR?: number
	airPressure?: number
	code: string
	personQ?: number
	personQTime?: string
	[key: string]: any
}

export const useWindNetCalculation = () => {
	// 巷道详情
	const { modelSize } = useThreeModelData()
	const fontList = ref<IRootFont[]>([])
	//   创建3D风网解算文字
	const splitText = (dataList: windData[]) => {
		const IFontList: IRootFont[] = []
		for (let i = 0; i < dataList.length; i++) {
			const wind: windData = dataList[i]
			if (wind.modelWindShow === '0') continue
			const airQuantity = `解算风量：${wind.airVolume ?? '-'}m³/min`
			const windage = `风阻：${wind.ventR ?? '-'}m/s`
			const windPressure = `风压：${wind.airPressure ?? '-'}Kpa`
			const text = `${airQuantity} ${windage} ${windPressure}`
			IFontList.push({
				parent: wind.code,
				text: text,
				color: '#000',
				size: 1 * modelSize.value,
				height: 7 * modelSize.value,
				planeColor: '#00ff00',
			})
			//   添加人工实测风量
			const text2 = wind.personQ
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
			const text3 = wind.personQTime ? `人工测量时间：${wind.personQTime}` : ''
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
