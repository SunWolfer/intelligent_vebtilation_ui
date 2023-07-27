import useInterceptList from '@/hooks/useInterceptList'

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
	const getBorderStyle = (type) => {
		let border = {
			color: ['#b4b4bf', 'rgba(6, 134, 216, 0.5)', 'rgba(6, 134, 216, 1)'],
			backgroundColor: 'rgba(24, 25, 49, 0.54)',
			borderClass: '',
		}
		if (type === '2') {
			border.color = ['#b4b4bf', 'rgba(200, 151, 0,0.5)', 'rgba(200, 151, 0,1)']
			border.borderClass = 'acc_body_top_body_item_warn'
		}
		return border
	}

	// 查询时间
	const dateRange = ref([])
	// 查询表单
	const queryForm = ref({
		beginTime: '',
		endTime: '',
	})
	return {
		inShowList,
		toLast,
		showLast,
		toNext,
		showNext,
		getStyle,
		getTextStyle,
		getBorderStyle,
		dateRange,
		queryForm,
	}
}
