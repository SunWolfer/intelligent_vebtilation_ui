import { isNull } from '@/utils/ruoyi'

export const paramsAISetting = (props, emit) => {
	const controlForm = computed({
		get() {
			return props.dataFrom
		},
		set(val) {
			emit('update:dataFrom', val)
		},
	})

	const resetForm = (...params) => {
		for (let i = 0; i < params.length; i++) {
			controlForm.value[params[i]] = null
		}
	}

	const dataList = ref([
		{
			id: 1,
			label1: 'AI1：',
			value1: 'aiDeviceType1',
			label2: '报警门限(mA)：',
			value2: 'aiAlarmLimit1',
			label3: '解除门限(mA)：',
			value3: 'aiCancelAlarmLimit1',
			label4: ' 滤波次数：',
			value4: 'aiFilterNumber1',
			label5: '传感器类型：',
			value5: 'aiSensorType1',
			label6: '传感器厂家：',
			value6: 'aiSensorFactory1',
			label7: '传感器型号：',
			value7: 'aiSensorModel1',
		},
		{
			id: 2,
			label1: 'AI2：',
			value1: 'aiDeviceType2',
			label2: '报警门限(mA)：',
			value2: 'aiAlarmLimit2',
			label3: '解除门限(mA)：',
			value3: 'aiCancelAlarmLimit2',
			label4: '滤波次数：',
			value4: 'aiFilterNumber2',
			label5: '传感器类型：',
			value5: 'aiSensorType2',
			label6: '传感器厂家：',
			value6: 'aiSensorFactory2',
			label7: '传感器型号：',
			value7: 'aiSensorModel2',
		},
	])
	const { proxy } = getCurrentInstance()
	const setParams = (...paramName) => {
		if (verifyValue(paramName[0], '请选择AI')) return
		if (controlForm.value[paramName[0]] === '1') {
			if (verifyValue(paramName[1], '请选择报警门限')) return
			if (verifyValue(paramName[2], '请选择解除门限')) return
			if (verifyValue(paramName[3], '请选择滤波次数')) return
			if (verifyValue(paramName[4], '请选择传感器类型')) return
			if (verifyValue(paramName[5], '请选择传感器厂家')) return
			if (verifyValue(paramName[6], '请选择传感器型号')) return
			if (
				verifyText(
					paramName[1],
					'报警门限范围为4-20',
					/^(([4-9]|1[0-9]|20)$)|^(([4-9]|1[0-9]|20)\.([0-9]))$/,
				)
			)
				return
			if (
				verifyText(
					paramName[2],
					'解除门限范围为4-20',
					/^(([4-9]|1[0-9]|20)$)|^(([4-9]|1[0-9]|20)\.([0-9]))$/,
				)
			)
				return
			if (verifyText(paramName[3], '滤波次数范围为1-10', /^([1-9]|10)$/)) return
		}
		emit('setParam', ...paramName)
	}
	function verifyValue(param, text) {
		if (isNull(controlForm.value[param])) {
			proxy.$modal.msgWarning(text)
			return true
		}
		return false
	}
	function verifyText(param, text, verify) {
		if (!verify.test(controlForm.value[param])) {
			proxy.$modal.msgWarning(text)
			return true
		}
		return false
	}
	const isDisable = (val) => {
		return val === '0'
	}

	return {
		dataList,
		resetForm,
		controlForm,
		isDisable,
		setParams,
	}
}
