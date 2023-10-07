import useEquipmentParams from '@/hooks/useEquipmentParams'
import { controlDoor, doorListAll, monitorInfo, paramInfo, setDoorParam } from '@/api/api/airDoor'
import { useGainList } from '@/hooks/useGainList'
import { WorkStatus } from '@/api/request/home/doorParams'
import { useCommitForm } from '@/hooks/useForm'
import { useSocket } from '@/hooks/useSocket'

export const homeAirDoor = () => {
	// 风门下拉列表
	const { dataList } = useGainList({
		apiFun: doorListAll,
	})
	// 风门视频链接
	const videoUrl1 = ref('')
	const videoUrl2 = ref('')
	// 风门信息
	const dataForm = ref({})
	// 查询风门信息
	const getDataForm = async (id) => {
		if (!id) return
		const res = await monitorInfo({
			devId: id,
		})
		if (res.code === 200) {
			dataForm.value = res.data
			let urls = dataForm.value.videoUrl ? dataForm.value.videoUrl.split(',') : []
			videoUrl1.value = urls[0] ?? ''
			videoUrl2.value = urls[1] ?? ''
		}
	}
	// socket监听风门信息
	const { clientSocket,socketData } = useSocket('|door|adjust', dealWithData)
	// 接收socket信息
	function dealWithData(data) {
		if (data.id === dataForm.value.id && data.ip === dataForm.value.ip) {
			dataForm.value = {
				...dataForm.value,
				...data,
			}
		}
	}

	// 风门参数
	const paramsData = ref({})
	// 查询风门参数信息
	const getParamInfo = async (id) => {
		if (!id) return
		const res = await paramInfo({
			devId: id,
		})
		if (res.code === 200) {
			paramsData.value = res.data
		}
	}
	// 页面传参查询
	const equipmentParams = useEquipmentParams()
	onMounted(async () => {
		const params = equipmentParams?.dataParams
		if (!params) return
		await getDataForm(params?.id)
		await getParamInfo(params?.id)
		clientSocket?.()
	})
	// 改变选中风门
	const changeDoor = (id) => {
		getDataForm(id)
		getParamInfo(id)
	}
	//风门A门状态灯
	const doorAStatusLight = (data) => {
		return dataForm.value.doorStatusA === data ? 'small_light_1' : 'small_light_2'
	}
	// 风门B门状态灯
	const doorBStatusLight = (data) => {
		return dataForm.value.doorStatusB === data ? 'small_light_1' : 'small_light_2'
	}

	// 模式选中样式
	const modelActiveMap = new Map([
		[WorkStatus.ONE, 'item_route_an_60'],
		[WorkStatus.ZERO, 'item_route_60'],
		[WorkStatus.TWO, 'reset_60_route'],
	])

	const modelActive = computed(() => {
		return modelActiveMap.get(dataForm.value.workModel) ?? ''
	})
	// 改变模式
	const changeModel = (type) => {
		if (dataForm.value.workModel === type) return
		dataForm.value.workModel = type
		controlDoorHandle(type)
	}
	// 风门远程操作
	const controlDoorHandle = async (type) => {
		await useCommitForm(controlDoor, {
			queryParams: {
				devId: dataForm.value.id,
				controlType: type,
			},
		})
	}
	// 设置风门参数
	const doorParamHandle = async (key) => {
		await useCommitForm(setDoorParam, {
			devId: dataForm.value.id,
			paramType: key,
			paramValue: paramsData.value[key],
		})
	}

	// 显示更多
	const moreVisible = ref(false)

	const initMoreVisible = () => {
		moreVisible.value = true
	}

	// 风门操作记录
	const hisRecordVisible = ref(false)
	const hisRecordHandle = () => {
		hisRecordVisible.value = true
	}

	onBeforeUnmount(() => {
		socketData.value?.close()
	})

	return {
		dataList,
		videoUrl1,
		videoUrl2,
		dataForm,
		paramsData,
		changeDoor,
		doorAStatusLight,
		doorBStatusLight,
		moreVisible,
		initMoreVisible,
		modelActive,
		changeModel,
		controlDoorHandle,
		doorParamHandle,
		hisRecordVisible,
		hisRecordHandle,
	}
}
