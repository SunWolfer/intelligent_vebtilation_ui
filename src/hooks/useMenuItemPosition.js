import useHomeMenu from '@/hooks/useHomeMenu'
import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'

const useMenuItemPosition = (left, bottom = 90) => {

	const domStyle = computed(() => {
		return {
			bottom: dynamicHeight(bottom) + 'px',
			left: dynamicWidth(left) + 'px',
		}
	})

	return {
		domStyle,
	}
}

export default useMenuItemPosition
