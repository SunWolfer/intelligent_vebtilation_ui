import { removeFanLine } from '@/api/api/fanCharCurveManagement'
import { fanChart1 } from '@/api/request/venEqMonitoring/fansCharts'
import useResetCharts from '@/hooks/useResetCharts'
import { useCommitForm } from '@/hooks/useForm'
import { useFanFormData } from '@/api/request/venManagement/fanCharCurveManagement/useFanFormData'

export const fanCharCurveManagement = () => {
	const {
		queryParams,
		fanList,
		rotationalSpeedList,
		bladeAngleList,
		single,
		handleMonitor,
		lineData,
		dataList,
		handleSingle,
		queryData,
	} = useFanFormData()
	//  风机曲线
	const initFanChart = () => {
		const xData = lineData.value.fengliang
		const yData = [
			lineData.value.tongfengzuli,
			lineData.value.quanya,
			lineData.value.xiaolv,
			lineData.value.gonglv,
		]
		const legends = ['通风阻力', '全压', '效率', '功率']

		fanChart1({
			domId: 'fan_curve_chart_1',
			xData: xData,
			yData: yData,
			legends: legends,
		})
	}

	const { showCharts, resetCharts } = useResetCharts(initFanChart, false)

	const handleQuery = () => {
		queryData?.(resetCharts)
	}

	const chooseRow = ref({
		devId: '',
		// 	转速
		zhuansu: '',
		// 	角度
		jiaodu: '',
		lines: [],
	})
	//   新增风机特性曲线
	const addOrUpdateVisible = ref(false)

	// 新增
	const handleAdd = () => {
		chooseRow.value = {
			devId: '',
			// 	转速
			zhuansu: '',
			// 	角度
			jiaodu: '',
			lines: [],
		}
		addOrUpdateVisible.value = true
	}
	// 修改
	const handleUpdate = () => {
		if (!single.value) return
		chooseRow.value = {
			...queryParams.value,
			lines: dataList.value,
		}
		addOrUpdateVisible.value = true
	}
	// 删除
	const handleDelete = async () => {
		if (!single.value) return
		await useCommitForm(removeFanLine, {
			queryParams: queryParams.value,
			afterReadyDataFun: () => {
				queryParams.value.devId = ''
			},
		})
	}

	// 监听风机改变
	handleMonitor?.()
	// 监听查询表单
	handleSingle?.(resetCharts)

	return {
		queryParams,
		single,
		fanList,
		rotationalSpeedList,
		bladeAngleList,
		handleQuery,
		showCharts,
		dataList,
		chooseRow,
		addOrUpdateVisible,
		handleAdd,
		handleUpdate,
		handleDelete,
	}
}
