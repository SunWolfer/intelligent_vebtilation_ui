import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
import { useGainList } from '@/hooks/useGainList'
import {
	getBoard,
	listView,
	startWindDev,
	startWindDevAll,
	windFullLines,
} from '@/api/api/fullSecWindMeasurement'
import { useCommitForm } from '@/hooks/useForm'
import { addDateRange, getRandomColor, parseTime, selectDictLabel } from '@/utils/ruoyi'
import useSocket from '@/hooks/useSocket'
import useEquipmentParams from '@/hooks/useEquipmentParams'

export const fullSecWindMeasurement = () => {
	// 一键测风
	const measuringWindVisible = ref(false)
	const oButtToMeasureTheWind = async () => {
		await useCommitForm(startWindDevAll, {})
		measuringWindVisible.value = true
	}
	// 页面传参查询
	const equipmentParams = useEquipmentParams()
	//   全断面测风列表
	const { dataList: fullSecWindList } = useGainList({
		apiFun: listView,
		afterReadyDataFun: () => {
			const params = equipmentParams?.dataParams
			const tDataIndex = fullSecWindList.value.findIndex((i) => i.id === params?.id)
			if (tDataIndex !== -1) {
				choose.value = tDataIndex
			} else {
				initChart()
			}
		},
	})
	// 测风站socket
	const { socketData: socketFullData, clientSocket: clientFullWindSocket, info } = useSocket('info')

	watch(info, (value) => {
		getFullSocketMsg(value)
	})

	function getFullSocketMsg(data) {
		// 测风站数据
		const fullData = data.info
		const tIndex = ref(-1)
		fullSecWindList.value.forEach((i, index) => {
			if (fullData.id === i.id) {
				tIndex.value = index
			}
		})
		if (tIndex.value !== -1) fullSecWindList.value[tIndex.value] = fullData
		//自动测风站记录
		const boardList = data.board

		const cData = fullSecWindList.value[choose.value]
		aneTableData.value = []
		const defaultData = [
			{
				label: '风量',
				value: cData?.airVolume,
				unit: 'm³/min',
			},
			{
				label: '风速',
				value: cData?.windSpeed,
				unit: 'm/s',
			},
			{
				label: '断面',
				value: cData?.surface,
				unit: '㎡',
			},
		]
		aneTableData.value.push(...defaultData)
		for (let i = 0; i < boardList.length; i++) {
			aneTableData.value.push({
				label: boardList[i]?.propertyName,
				value: boardList[i]?.propertyValue ?? '-',
				unit: boardList[i]?.propertyUnit,
			})
		}
	}

	onMounted(() => {
		clientFullWindSocket?.('|fullwind|adjustAll')
	})
	// 当前选中
	const choose = ref(-1)
	const chooseItem = (index) => {
		if (choose.value === index) {
			choose.value = -1
			return
		}
		choose.value = index
	}
	//   周期测风单位
	const cycleUnits = ref([
		{
			label: '小时',
			value: 'h',
		},
		{
			label: '分钟',
			value: 'm',
		},
		{
			label: '秒',
			value: 's',
		},
	])
	// 当前选择测风站
	const fullDataForm = computed(() => {
		const data = fullSecWindList.value[choose.value]
		return {
			name: data?.name ?? '',
			label: data?.autoCollectFlag === '1' ? '周期测风：' : '定时测风：每日',
			value:
				data?.autoCollectFlag === '1'
					? data.collectPeriod + selectDictLabel(cycleUnits.value, data.collectUnit)
					: data?.collectTime,
		}
	})

	// 左侧选中数据
	const chooseData = ref({})
	// 参数设置
	const paramSettingVisible = ref(false)
	const chooseParamSetting = (data) => {
		chooseData.value = data
		paramSettingVisible.value = true
	}

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

	// 测风动画
	const playMod = ref(false)
	const receiveTime = ref(0)
	// 开始测风定时
	const startWindInterval = ref(0)
	const timeout = () => {
		clearInterval(startWindInterval.value)
		startWindInterval.value = setInterval(() => {
			receiveTime.value++
			if (receiveTime.value > 20) {
				playMod.value = false
				receiveTime.value = 0
			}
		}, 1000)
	}
	// 单个测风socket
	const { clientSocket: clientOneWind, socketData, realTime } = useSocket('realTime')
	// 开始测风
	const startMeasuringTheWind = async (data, index) => {
		choose.value = index
		await useCommitForm(startWindDev, {
			queryParams: data.id,
		})

		clientOneWind?.(data.id + '|fullwind|adjust')
		timeout?.()
		playMod.value = true
	}
	// 实时测风数据
	const realWindDataList = ref([])
	// 单个测风
	function oneWindSocketDataNext(data) {
		receiveTime.value = 0
		timeout?.()
		realWindDataList.value.push({
			value: data.windSpeed,
			time: parseTime(new Date()),
		})
		if (data.status === '0') {
			cleanOneWindData()
		}
	}
	watch(realTime, (value) => {
		oneWindSocketDataNext(value)
	})
	// 清除单个测风相关逻辑
	const cleanOneWindData = () => {
		socketData.value?.close()
		realWindDataList.value = []
		clearInterval(startWindInterval.value)
		playMod.value = false
		receiveTime.value = 0
	}

	// 自动测风站记录表
	const aneTableData = ref([])

	// 视频路径
	const videoPath = ref('')
	const videoVisible = ref(true)
	watch(
		() => videoPath.value,
		() => {
			videoVisible.value = false
			nextTick().then(() => {
				videoVisible.value = true
			})
		},
	)

	// 电子看板信息
	const getAneTableDara = async () => {
		if (choose.value === -1) return
		const cData = fullSecWindList.value[choose.value]
		videoPath.value = cData.videoUrl
		const { data } = await getBoard(cData)
		if (data) {
			aneTableData.value = []
			const defaultData = [
				{
					label: '风量',
					value: cData.airVolume,
					unit: 'm³/min',
				},
				{
					label: '风速',
					value: cData.windSpeed,
					unit: 'm/s',
				},
				{
					label: '断面',
					value: cData.surface,
					unit: '㎡',
				},
			]
			aneTableData.value.push(...defaultData)
			for (let i = 0; i < data.length; i++) {
				aneTableData.value.push({
					label: data[i].propertyName,
					value: data[i].propertyValue ?? '-',
					unit: data[i].propertyUnit,
				})
			}
		}
	}

	// 查询时间
	const dateRange = ref([])
	// 查询表单
	const queryForm = ref({
		beginTime: '',
		endTime: '',
	})
	const chartOption = ref({})
	// 生成折线图
	const initChart = async () => {
		let query =
			choose.value === -1
				? {}
				: addDateRange(
						{
							id: fullSecWindList.value[choose.value].id,
							name: fullSecWindList.value[choose.value].name,
						},
						dateRange.value,
					)

		const res = await windFullLines(query)
		if (res && res.data) {
			let colors = []
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
	}

	watch(
		() => choose.value,
		async () => {
			cleanOneWindData?.()
			await initChart()
			await getAneTableDara()
		},
	)

	onBeforeUnmount(() => {
		cleanOneWindData?.()
		socketFullData.value.close()
	})
	return {
		choose,
		chooseItem,
		fullSecWindList,
		dateRange,
		queryForm,
		initChart,
		paramSettingVisible,
		chooseParamSetting,
		aneTableData,
		realWindDataList,
		chooseData,
		hisRecordVisible,
		hisRecordHandle,
		warnRecordVisible,
		warnRecordHandle,
		startMeasuringTheWind,
		oButtToMeasureTheWind,
		fullDataForm,
		measuringWindVisible,
		playMod,
		videoPath,
		videoVisible,
		chartOption,
	}
}
