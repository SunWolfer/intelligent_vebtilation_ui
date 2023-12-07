import useInterceptList from '@/hooks/useInterceptList'
import { addDateRange, getRandomColor } from '@/utils/ruoyi'
import useList from '@/hooks/useList'
import { listDuoshen } from '@/api/api/mulParSenManagement'
import { multiParameterLines } from '@/api/api/ventResistanceMonitoring'
import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'

export const ventResistanceMonitoring = () => {
	const { dataList } = useList({
		apiFun: listDuoshen,
		params: {
			pageNum: 1,
			pageSize: 999,
		},
		afterReadyListFun: () => {
			choose.value = 0
		},
	})

	const { inShowList, toLast, showLast, toNext, showNext } = useInterceptList(dataList, 6)

	// 获取左侧图标样式
	const getStyle = (type) => {
		if (type === '0') {
			return 'item_icon_normal'
		} else {
			return 'item_icon_warn'
		}
	}
	const valueStatusMap = new Map([
		['0', 'icon_normal'],
		['1', 'icon_up'],
		['2', 'icon_down'],
	])
	const setValueStatusClass = (value, lastVal) => {
		let t_class = ''
		let num = parseFloat(value) - parseFloat(lastVal)
		if (num > 0) {
			t_class = valueStatusMap.get('1')
		} else if (num < 0) {
			t_class = valueStatusMap.get('2')
		} else {
			t_class = valueStatusMap.get('0')
		}
		return t_class
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

	// 选中菜单
	const choose = ref(-1)
	const chooseItem = (index) => {
		if (choose.value === index) {
			choose.value = -1
			return
		}
		choose.value = index
	}
	watch(choose, async () => {
		await initChart?.()
	})
	const chartOption = ref({})

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
		const res = await multiParameterLines({
			id: inShowList.value[choose],
			...query,
		})
		let colors = [
			['#ff00ff', '#ff00ff'],
			['#00ff00', '#00ff00'],
			['#ffff00', '#ffff00'],
			['#ff0000', '#ff0000'],
		]
		for (let i = 0; i < res.data.names.length; i++) {
			const color = '#' + getRandomColor()
			colors.push([color, color])
		}
		chartOption.value = defaultLineChart({
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

	return {
		inShowList,
		toLast,
		showLast,
		toNext,
		showNext,
		getStyle,
		dateRange,
		queryForm,
		choose,
		chooseItem,
		default_color,
		choose_color,
		setValueStatusClass,
		chartOption,
		initChart,
	}
}
