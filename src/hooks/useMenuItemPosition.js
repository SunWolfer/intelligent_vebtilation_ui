import useHomeMenu from '@/hooks/useHomeMenu'
import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'

const useMenuItemPosition = (width, height = 90) => {
	const { clickEvent } = useHomeMenu()
	// 点击位置
	const clickPosition = computed(() => {
		const dom = clickEvent.value
		const { clientX, offsetX } = dom
		const { clientWidth } = dom.target
		return {
			x: clientX - offsetX - (dynamicWidth(width) - clientWidth) / 2,
		}
	})
	const domStyle = computed(() => {
		const { x } = clickPosition.value
		return {
			bottom: dynamicHeight(height) + 'px',
			left: x + 'px',
		}
	})

	return {
		domStyle,
	}
}

export default useMenuItemPosition
