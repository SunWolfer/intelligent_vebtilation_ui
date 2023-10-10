import echarts from '@/utils/echarts/index'

export default (domId: string) => {
	const myChart = ref<echarts.ECharts>()
	const option = ref({})
	const charEle = document.getElementById(domId) as HTMLElement
	myChart.value = markRaw(echarts.init(charEle))
	watch(
		() => option.value,
		() => {
			myChart.value?.setOption(option.value)
		},
	)

	return {
		option,
		myChart,
	}
}
