import { nextTick } from 'vue'

const useResetCharts = (initCharts: () => void, isOnLoad = true) => {
	// 是否加载
	const load = ref(false)
	// 图表
	const showCharts = ref(false)
	const resetCharts = () => {
		showCharts.value = false
		nextTick().then(() => {
			showCharts.value = true
			nextTick().then(async () => {
				await initCharts()
			})
		})
	}
	const hasOnload = ref(false)
	const resizeCharts = () => {
		resetCharts()
		load.value = true
		// 自适应
		if (hasOnload.value) return
		window.addEventListener('resize', resetCharts)
		hasOnload.value = true
	}
	onMounted(() => {
		if (!isOnLoad || load.value) return
		resizeCharts()
	})
	onBeforeUnmount(() => {
		window.removeEventListener('resize', resetCharts)
	})
	onActivated(() => {
		if (!isOnLoad || load.value) return
		resetCharts()
	})
	return {
		showCharts,
		resetCharts,
		hasOnload,
		resizeCharts,
	}
}
export default useResetCharts
