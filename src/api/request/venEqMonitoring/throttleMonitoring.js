import useList from '@/hooks/useList'
import { useGainForm } from '@/hooks/useForm'
import { monitoring } from '@/api/request/venEqMonitoring/monitoring'
import useEquipmentParams from '@/hooks/useEquipmentParams'
import { doorHomeList, stateTotal } from '@/api/api/throttleMonitoring'

export const throttleMonitoring = () => {
	//   顶部预警表单
	const { dataFrom, getDataForm } = useGainForm({
		apiFun: stateTotal,
		dataArgs: {
			airWarn: 0,
			kglWarn: 0,
			mnlWarn: 0,
			offline: 0,
			online: 0,
			windowTotal: 0,
		},
	})
	const { doorColors } = monitoring()

	// 顶部默认列表
	const defaultStatusList = computed(() => {
		return [
			{
				label: '风门总量',
				value: dataFrom.value.windowTotal,
				class: 'monitoring-status-blue',
				pointColor: doorColors[0],
			},
			{
				label: '在线',
				value: dataFrom.value.online,
				class: 'monitoring-status-green',
				pointColor: doorColors[1],
			},
			{
				label: '离线',
				value: dataFrom.value.offline,
				class: 'monitoring-status-yellow',
				pointColor: doorColors[2],
			},
			{
				label: '气源动力不足',
				value: dataFrom.value.airWarn,
				class: 'monitoring-status-orange',
				pointColor: doorColors[3],
			},
			{
				label: '开关量报警',
				value: dataFrom.value.kglWarn,
				class: 'monitoring-status-pink',
				pointColor: doorColors[5],
			},
			{
				label: '模拟量报警',
				value: dataFrom.value.mnlWarn,
				class: 'monitoring-status-purple',
				pointColor: doorColors[6],
			},
		]
	})

	const { queryParams, dataList, total, getList } = useList({
		apiFun: doorHomeList,
		params: {
			pageNum: 1,
			pageSize: 10,
		},
	})
	// 跳转控制页面
	const router = useRouter()
	const toControlPage = (data) => {
		useEquipmentParams().setParams(data)
		router.push({
			path: '/homeChild/homeAirDoor',
		})
	}

	return {
		doorColors,
		defaultStatusList,
		queryParams,
		dataList,
		total,
		getList,
		toControlPage,
	}
}
