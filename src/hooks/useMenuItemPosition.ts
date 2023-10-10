import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'

const useMenuItemPosition = (left: number, bottom = 90) => {
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
