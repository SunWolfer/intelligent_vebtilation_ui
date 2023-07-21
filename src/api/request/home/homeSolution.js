import useHomeMenu from '@/hooks/useHomeMenu'
import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'

export const homeSolution = () => {
	const { clickEvent } = useHomeMenu()
	// 点击位置
	const clickPosition = computed(() => {
		const dom = clickEvent.value
		const { clientX, offsetX } = dom
		const { clientWidth } = dom.target
		return {
			x: clientX - offsetX - (dynamicWidth(299) - clientWidth) / 2,
		}
	})
	const domStyle = computed(() => {
		const { x } = clickPosition.value
		return {
			bottom: dynamicHeight(90) + 'px',
			left: x + 'px',
		}
	})
	// 显示风量
	const checkedWind = ref(true)
	// 显示风阻
	const checkedWindAge = ref(true)
	// 显示风压
	const checkedWindPressure = ref(true)

	return {
		domStyle,
		checkedWind,
		checkedWindAge,
		checkedWindPressure,
	}
}
