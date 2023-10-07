import useEquipmentParams from '@/hooks/useEquipmentParams'
import { useGainList } from '@/hooks/useGainList'
import { havaAbId, monitorInfo, windowListAll } from '@/api/api/airWindow'
import NormalWindow from '@/views/components/home/windowPage/NormalWindow.vue'
import ABWindow from '@/views/components/home/windowPage/ABWindow.vue'
import { useSocket } from '@/hooks/useSocket'

export const homeAirWindow = () => {
	// 风窗下拉列表
	const { dataList } = useGainList({
		apiFun: windowListAll,
	})
	// 查询是否有两个窗
	const abTagId = ref('')
	const getAbTag = async (id) => {
		if (!id) return
		const res = await havaAbId({
			devId: id,
		})
		if (res.code === 200) {
			abTagId.value = res.msg
		}
	}
	// 风窗信息
	const dataForm = ref({})
	// 风窗B信息
	const dataFormB = ref({})
	// 查询风窗信息
	const getDataForm = async (id) => {
		if (!id) return
		// 查询风窗信息
		const res = await monitorInfo({
			devId: id,
		})
		if (res.code === 200) {
			dataForm.value = res.data
		}
	}
	// 查询风窗B信息
	const getDataFormB = async (id) => {
		if (!id) return
		const res = await monitorInfo({
			devId: id,
		})
		if (res.code === 200) {
			dataFormB.value = res.data
		}
	}

	// 监听socket信息
	// socket监听风窗信息
	const { clientSocket } = useSocket('|adjust', dealWithData)
	// 接收socket信息
	function dealWithData(data) {
		if (data.id === dataForm.value.id && data.ip === dataForm.value.ip) {
			dataForm.value = {
				...dataForm.value,
				...data,
			}
		}
		if (data.id === dataFormB.value.id && data.ip === dataFormB.value.ip) {
			dataFormB.value = {
				...dataFormB.value,
				...data,
			}
		}
	}

	// 页面传参查询
	const equipmentParams = useEquipmentParams()
	onMounted(async () => {
		const params = equipmentParams?.dataParams
		await changeWindow(params?.id)
		clientSocket?.()
	})
	onBeforeUnmount(() => {
		equipmentParams.cleanParams()
	})

	// 改变选中风窗
	const changeWindow = async (id) => {
		if (!id) return
		await getAbTag(id)
		await getDataForm(id)
		await getDataFormB(abTagId.value)
	}

	// 风窗显示
	const windowTabs = reactive([
		{
			name: '风窗默认显示',
			domName: markRaw(NormalWindow),
		},
		{
			name: 'AB窗',
			domName: markRaw(ABWindow),
		},
	])
	const chooseTabs = computed(() => {
		if (abTagId.value) {
			return windowTabs[1].domName
		} else {
			return windowTabs[0].domName
		}
	})

	// 显示更多
	const moreVisible = ref(false)

	const moreVisibleHandle = () => {
		moreVisible.value = true
	}
	// 显示操作记录
	const hisRecordVisible = ref(false)
	const hisRecordHandle = () => {
		hisRecordVisible.value = true
	}

	return {
		dataList,
		dataForm,
		dataFormB,
		changeWindow,
		moreVisible,
		moreVisibleHandle,
		chooseTabs,
		hisRecordHandle,
		hisRecordVisible,
	}
}
