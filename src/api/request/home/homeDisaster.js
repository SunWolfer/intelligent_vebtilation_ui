import useHomeMenu from '@/hooks/useHomeMenu'

export const homeDisaster = (emits) => {
	const { disaster } = useHomeMenu()

	// 点击模拟生成灾害模拟
	const generateDisaster = () => {
		emits('generateDisaster')
	}
	//   退出
	const quit = () => {
		disaster.value = false
	}
	return {
		generateDisaster,
		quit,
	}
}
