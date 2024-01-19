import { infoPathForm } from '@/api/api/home'
import useEquipmentData from '@/hooks/useEquipmentData'
import { useDict } from '@/hooks/useDict'

export const homeMsg = (data, index) => {
	const { tEquipmentIndex } = useEquipmentData()
	const dataForm = ref({})
	const initDataForm = async () => {
		const res = await infoPathForm({
			devId: data.devId,
			devType: data.devType,
		})
		if (res && res.data) dataForm.value = res.data
	}
	watch(
		() => tEquipmentIndex.value,
		(val) => {
			if (tEquipmentIndex.value === index) initDataForm()
		},
		{ immediate: true },
	)

	const { door_status, door_work_model, online_status, fan_work_status } = useDict(
		'door_status',
		'door_work_model',
		'online_status',
		'fan_work_status',
	)

	// 模式样式
	const modelClass = computed(() => {
		let IClass = ''
		if (dataForm.value.workModel === '0') IClass = 'lamp_green'
		if (dataForm.value.workModel === '1') IClass = 'lamp_blue'
		if (dataForm.value.workModel === '2') IClass = 'lamp_dark_blue'

		return IClass
	})
	// 通讯状态样式
	const onlineStatusClass = computed(() => {
		let IClass = ''
		if (dataForm.value.onlineStatus === '0') IClass = 'lamp_red'
		if (dataForm.value.onlineStatus === '1') IClass = 'lamp_green'
		return IClass
	})

	return {
		dataForm,
		door_status,
		door_work_model,
		online_status,
		fan_work_status,
		modelClass,
		onlineStatusClass,
	}
}
