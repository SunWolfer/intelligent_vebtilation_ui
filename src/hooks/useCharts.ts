import echarts from '@/utils/echarts/index'

export default (domId: string) => {
	const charEle = document.getElementById(domId) as HTMLElement
	let myChart = echarts.init(charEle)
	const option = ref({})

	watch(option, () => {
		myChart.setOption(option.value)
	})

	return {
		myChart,
		option,
	}
}
