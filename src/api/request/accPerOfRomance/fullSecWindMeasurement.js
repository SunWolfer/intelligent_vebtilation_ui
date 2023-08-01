import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
import useResetCharts from '@/hooks/useResetCharts'

export const fullSecWindMeasurement = () => {
	// 当前选中
	const choose = ref(-1)
	const chooseItem = (index) => {
		choose.value = index
	}
	//   全断面测风列表
	const fullSecWindList = ref([
		{
			name: '10204上顺横掘',
			type: '1',
			airVolume: '853',
			windSpeed: '1.35',
			crossSection: '15',
		},
		{
			name: '10204上顺横掘',
			type: '1',
			airVolume: '853',
			windSpeed: '1.35',
			crossSection: '15',
		},
		{
			name: '10204上顺横掘',
			type: '1',
			airVolume: '853',
			windSpeed: '1.35',
			crossSection: '15',
		},
		{
			name: '10204上顺横掘',
			type: '1',
			airVolume: '853',
			windSpeed: '1.35',
			crossSection: '15',
		},
		{
			name: '10204上顺横掘',
			type: '1',
			airVolume: '853',
			windSpeed: '1.35',
			crossSection: '15',
		},
	])

	// 查询时间
	const dateRange = ref([])
	// 查询表单
	const queryForm = ref({
		beginTime: '',
		endTime: '',
	})

	// 生成折线图
	const initChart = () => {
		let xData = []
		let yData = [[], []]
		for (let i = 0; i < 15; i++) {
			xData.push('08:55:00')
			yData[0].push(Math.random() * 1000)
			yData[1].push(Math.random() * 1000)
		}

		defaultLineChart({
			domId: 'acc_chart_line',
			xData: xData,
			yDataList: yData,
			legends: ['6102胶运顺槽', '6103胶运顺槽'],
			legendPosition: 'right',
			units: 'm3/s',
			colors: [
				['rgba(178, 0, 237, 1)', 'rgba(178, 0, 237, 1)'],
				['rgba(49, 255, 111, 1)', 'rgba(49, 255, 111, 1)'],
			],
			smooth: false,
			isArea: false,
		})
	}

	const { showCharts } = useResetCharts(initChart)

	// 参数设置
	const paramSettingVisible = ref(false)

	const chooseParamSetting = (index) => {
		paramSettingVisible.value = true
		chooseItem(index)
	}

	return {
		choose,
		fullSecWindList,
		dateRange,
		queryForm,
		showCharts,
		paramSettingVisible,
		chooseParamSetting,
	}
}
