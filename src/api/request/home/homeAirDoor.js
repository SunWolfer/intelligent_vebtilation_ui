import useEquipmentParams from '@/hooks/useEquipmentParams'

export const homeAirDoor = () => {
	const dataForm = ref({})
	const equipmentParams = useEquipmentParams()
	onMounted(() => {
		dataForm.value = equipmentParams.dataParams
	})
	onBeforeUnmount(() => {
		equipmentParams.cleanParams()
	})
	return {
		dataForm,
	}
}
