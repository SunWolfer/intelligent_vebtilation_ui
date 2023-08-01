import useInterceptList from '@/hooks/useInterceptList'
import useResetCharts from '@/hooks/useResetCharts'
import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'

export const accurateWindMeasurement = () => {
	//   精准测风列表
	const windList = ref([
		{
			name: '10204上顺横据进面',
			type: '1',
			airVolume: '853.38',
			windSpeed: '111',
			temperature: '22',
			diffPressure: '11',
			crossSection: '11',
			humidity: '11',
			absolutePressure: '11',
		},
		{
			name: '10204上顺横据进面',
			type: '2',
			warnReason: '风量超限',
			airVolume: '853.38',
			windSpeed: '111',
			temperature: '22',
			diffPressure: '11',
			crossSection: '11',
			humidity: '11',
			absolutePressure: '11',
		},
		{
			name: '10204上顺横据进面',
			type: '1',
			airVolume: '853.38',
			windSpeed: '111',
			temperature: '22',
			diffPressure: '11',
			crossSection: '11',
			humidity: '11',
			absolutePressure: '11',
		},
	])
	const { inShowList, toLast, showLast, toNext, showNext } = useInterceptList(windList.value, 6)

	// 选中菜单
	const choose = ref(-1)
	const chooseItem = (index) => {
		choose.value = index
	}

	// 获取图标样式
	const getStyle = (type) => {
		if (type === '1') {
			return 'item_icon_normal'
		} else if (type === '2') {
			return 'acc_body_top_body_item_warn_icon'
		}
	}
	// 获取文字样式
	const getTextStyle = (type) => {
		if (type === '1') {
			return 'green_text'
		} else if (type === '2') {
			return 'red_text'
		}
	}
	// 边框样式
	// 默认
	const default_color = ['#b4b4bf', 'rgba(6, 134, 216, 0.5)', 'rgba(6, 134, 216, 1)']
	// 选中
	const choose_color = ['#b4b4bf', 'rgba(200, 151, 0,0.5)', 'rgba(200, 151, 0,1)']
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
			legendPosition: 'center',
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

	return {
		inShowList,
		toLast,
		showLast,
		toNext,
		showNext,
		getStyle,
		getTextStyle,
		dateRange,
		queryForm,
		showCharts,
		choose,
		chooseItem,
		default_color,
		choose_color,
	}
}
