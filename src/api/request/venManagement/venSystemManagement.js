import { EditType, TunnelBtn } from '@/components/VueThree/types/editType'

export const venSystemManagement = () => {
	// 模型
	const modelRef = ref(null)
	// 巷道编辑按钮
	const editBtnType = ref(-1)
	//   巷道编辑类型
	const editType = ref(EditType.DEFAULT)
	//   新增巷道
	const addTunnel = () => {
		editBtnType.value = TunnelBtn.ADD
		editType.value = EditType.ADD
	}
	//   删除巷道
	const deleteTunnel = () => {
		editBtnType.value = TunnelBtn.DELETE
		editType.value = EditType.DELETEALL
	}
	//   绑定设备
	const bindSensorVisible = ref(false)
	// 监听点击按钮，控制绑定设备dom显示
	watch(
		() => editBtnType.value,
		(val) => {
			bindSensorVisible.value = editBtnType.value === TunnelBtn.SENSOR
		},
	)

	const bindSensorHandle = () => {
		editBtnType.value = TunnelBtn.SENSOR
		editType.value = EditType.DOOR
	}
	// 绑定设备类型
	const chooseSensorType = (type) => {
		editType.value = type
		// 重置选中设备
		dataForm.value.devId = ''
	}
	// 设备表单
	const dataForm = ref({
		devId: '',
	})
	const sensorMap = new Map([
		[EditType.DOOR, '风门'],
		[EditType.WINDOW, '风窗'],
		[EditType.FULLWIND, '全断面测风'],
		[EditType.WINDSENSOR, '风速传感器'],
		[EditType.MULTIPARAMETE, '多参传感器'],
		[EditType.MAINFAN, '主扇'],
		[EditType.LOCALFAN, '局扇'],
	])
	// 设备类型名称
	const sensorLabel = computed(() => {
		return sensorMap.get(editType.value) ?? ''
	})
	// 设备列表
	const sensorList = ref([
		{
			label: '10215',
			value: '1',
		},
	])
	//   取消编辑
	const cancelEdit = () => {
		editBtnType.value = -1
		editType.value = EditType.DEFAULT
	}
	// 保存
	const preserve = () => {}

	// 显示巷道信息弹窗
	const tunnelVisible = ref(false)

	return {
		modelRef,
		editType,
		addTunnel,
		deleteTunnel,
		bindSensorVisible,
		bindSensorHandle,
		chooseSensorType,
		cancelEdit,
		preserve,
		tunnelVisible,
		editBtnType,
		dataForm,
		sensorLabel,
		sensorList,
	}
}
