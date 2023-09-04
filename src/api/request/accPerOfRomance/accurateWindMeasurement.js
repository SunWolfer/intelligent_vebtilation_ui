import useInterceptList from '@/hooks/useInterceptList'
import useResetCharts from '@/hooks/useResetCharts'
import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
import { listView, windSensorLines } from '@/api/api/accurateWindMeasurement'
import { useGainList } from '@/hooks/useGainList'
import { addDateRange, getRandomColor } from '@/utils/ruoyi'
import { useSocket } from '@/hooks/useSocket'

export const accurateWindMeasurement = () => {
	//   精准测风列表
	const { dataList: windList } = useGainList({
		apiFun: listView,
	})

	const { inShowList, toLast, showLast, toNext, showNext } = useInterceptList(windList, 6)

	// 选中菜单
	const choose = ref(-1)
	const chooseItem = (index) => {
		if (choose.value === index) {
			choose.value = -1
			return
		}
		choose.value = index
	}
	watch(choose, () => {
		resetCharts?.()
	})

	// 获取图标样式
	const getStyle = (type) => {
		if (type === '0') {
			return 'item_icon_normal'
		} else {
			return 'acc_body_top_body_item_warn_icon'
		}
	}
	// 获取文字样式
	const getTextStyle = (type) => {
		if (type === '0') {
			return 'green_text'
		} else {
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
	const initChart = async () => {
		let query =
			choose.value === -1
				? {}
				: addDateRange(
						{
							id: inShowList.value[choose.value].id,
							name: inShowList.value[choose.value].name,
						},
						dateRange.value,
				  )

		const res = await windSensorLines(query)
		if (res && res.data) {
			let colors = []
			for (let i = 0; i < res.data.names.length; i++) {
				const color = '#' + getRandomColor()
				colors.push([color, color])
			}
			defaultLineChart({
				domId: 'acc_chart_line',
				xData: res.data.lineX,
				yDataList: res.data.value,
				legends: res.data.names,
				legendPosition: 'center',
				units: 'm³/s',
				colors: colors,
				smooth: false,
				isArea: false,
			})
		}
	}

	const { showCharts, resetCharts } = useResetCharts(initChart)

	// 记录选中数据
	const chooseData = ref({})
	// 历史记录弹窗
	const hisRecordVisible = ref(false)
	const hisRecordHandle = (data) => {
		chooseData.value = data
		hisRecordVisible.value = true
	}
	// 预警记录弹窗
	const warnRecordVisible = ref(false)
	const warnRecordHandle = (data) => {
		chooseData.value = data
		warnRecordVisible.value = true
	}

	// 连接socket
	const { clientSocket } = useSocket(`windsensor|adjustAll`, getSocketMsg)

	function getSocketMsg(data) {
		windList.value.forEach((i) => {
			if (i.id === data.id) {
				i = data
			}
		})
	}

	onMounted(() => {
		clientSocket?.()
	})

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
		resetCharts,
		hisRecordVisible,
		hisRecordHandle,
		warnRecordVisible,
		warnRecordHandle,
		chooseData,
	}
}
