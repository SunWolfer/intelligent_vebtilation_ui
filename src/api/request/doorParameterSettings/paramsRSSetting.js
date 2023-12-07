import { isNull } from '@/utils/ruoyi'

export const paramsRSSetting = (props, emit) => {
	const { proxy } = getCurrentInstance()
	const controlForm = computed({
		get() {
			return props.dataFrom
		},
		set(val) {
			emit('update:dataFrom', val)
		},
	})

	const dataList = ref([
		{
			id: 1,
			label1: 'RS485_1：',
			value1: 'rs485DeviceType1',
			label2: '波特率：',
			value2: 'rs485Baud1',
			label3: '校验位：',
			value3: 'rs485CheckBit1',
			label4: '传感器类型：',
			value4: 'rs485SensorType1',
		},
		{
			id: 2,
			label1: 'RS485_2：',
			value1: 'rs485DeviceType2',
			label2: '波特率：',
			value2: 'rs485Baud2',
			label3: '校验位：',
			value3: 'rs485CheckBit2',
			label4: '传感器类型：',
			value4: 'rs485SensorType2',
		},
		{
			id: 3,
			label1: 'RS485_3：',
			value1: 'rs485DeviceType3',
			label2: '波特率：',
			value2: 'rs485Baud3',
			label3: '校验位：',
			value3: 'rs485CheckBit3',
			label4: '传感器类型：',
			value4: 'rs485SensorType3',
		},
		{
			id: 4,
			label1: 'RS485_4：',
			value1: 'rs485DeviceType4',
			label2: '波特率：',
			value2: 'rs485Baud4',
			label3: '校验位：',
			value3: 'rs485CheckBit4',
			label4: '传感器类型：',
			value4: 'rs485SensorType4',
		},
	])
	const rules = ref({})
	const isDisable = (val) => {
		return ['0'].includes(val)
	}
	const isSensorDisable = (val) => {
		return ['0', '3', '4', '5'].includes(val)
	}
	function clearData(...params) {
		for (let i = 0; i < params.length; i++) {
			controlForm.value[params[i]] = ''
		}
	}

	const setParams = (...paramName) => {
		if (verifyValue(paramName[0], '请选择RS485')) return
		if (!isDisable(controlForm.value[paramName[0]])) {
			if (verifyValue(paramName[1], '请选择波特率')) return
			if (verifyValue(paramName[2], '请选择校验位')) return
			if (
				!isSensorDisable(controlForm.value[paramName[0]]) &&
				verifyValue(paramName[3], '请选择传感器类型')
			)
				return
		}

		emit('setParam', ...paramName)
	}

	function verifyValue(param, text) {
		if (!param) return false
		if (isNull(controlForm.value[param])) {
			proxy.$modal.msgWarning(text)
			return true
		}
		return false
	}
	return {
		controlForm,
		dataList,
		rules,
		clearData,
		setParams,
		isDisable,
		isSensorDisable,
	}
}
