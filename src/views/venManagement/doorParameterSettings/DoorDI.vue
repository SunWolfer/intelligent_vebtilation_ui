<script setup>
	import { useDict } from '@/hooks/useDict'
	import { isNull } from '@/utils/ruoyi'

	const props = defineProps({
		dataFrom: {
			type: Object,
			default: () => {
				return {}
			},
		},
	})
	const emit = defineEmits(['update:dataFrom', 'setParam'])
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
			label1: 'DI1：',
			value1: 'diDeviceType1',
			label2: '传感器类型：',
			value2: 'diSensorType1',
			label3: '极性：',
			value3: 'diPalarity1',
			label4: '电平持续时间：',
			value4: 'diKeepTime1',
		},
		{
			id: 2,
			label1: 'DI2：',
			value1: 'diDeviceType2',
			label2: '传感器类型：',
			value2: 'diSensorType2',
			label3: '极性：',
			value3: 'diPalarity2',
			label4: '电平持续时间：',
			value4: 'diKeepTime2',
		},
		{
			id: 3,
			label1: 'DI3：',
			value1: 'diDeviceType3',
			label2: '传感器类型：',
			value2: 'diSensorType3',
			label3: '极性：',
			value3: 'diPalarity3',
			label4: '电平持续时间：',
			value4: 'diKeepTime3',
		},
		{
			id: 4,
			label1: 'DI4：',
			value1: 'diDeviceType4',
			label2: '传感器类型：',
			value2: 'diSensorType4',
			label3: '极性：',
			value3: 'diPalarity4',
			label4: '电平持续时间：',
			value4: 'diKeepTime4',
		},
		{
			id: 5,
			label1: 'DI5：',
			value1: 'diDeviceType5',
			label2: '传感器类型：',
			value2: 'diSensorType5',
			label3: '极性：',
			value3: 'diPalarity5',
			label4: '电平持续时间：',
			value4: 'diKeepTime5',
		},
		{
			id: 6,
			label1: 'DI6：',
			value1: 'diDeviceType6',
			label2: '传感器类型：',
			value2: 'diSensorType6',
			label3: '极性：',
			value3: 'diPalarity6',
			label4: '电平持续时间：',
			value4: 'diKeepTime6',
		},
		{
			id: 7,
			label1: 'DI7：',
			value1: 'diDeviceType7',
			label2: '传感器类型：',
			value2: 'diSensorType7',
			label3: '极性：',
			value3: 'diPalarity7',
			label4: '电平持续时间：',
			value4: 'diKeepTime7',
		},
		{
			id: 8,
			label1: 'DI8：',
			value1: 'diDeviceType8',
			label2: '传感器类型：',
			value2: 'diSensorType8',
			label3: '极性：',
			value3: 'diPalarity8',
			label4: '电平持续时间：',
			value4: 'diKeepTime8',
		},
		{
			id: 9,
			label1: 'DI9：',
			value1: 'diDeviceType9',
			label2: '传感器类型：',
			value2: 'diSensorType9',
			label3: '极性：',
			value3: 'diPalarity9',
			label4: '电平持续时间：',
			value4: 'diKeepTime9',
		},
		{
			id: 10,
			label1: 'DI10：',
			value1: 'diDeviceType10',
			label2: '传感器类型：',
			value2: 'diSensorType10',
			label3: '极性：',
			value3: 'diPalarity10',
			label4: '电平持续时间：',
			value4: 'diKeepTime10',
		},
		{
			id: 11,
			label1: 'DI11：',
			value1: 'diDeviceType11',
			label2: '传感器类型：',
			value2: 'diSensorType11',
			label3: '极性：',
			value3: 'diPalarity11',
			label4: '电平持续时间：',
			value4: 'diKeepTime11',
		},
		{
			id: 12,
			label1: 'DI12：',
			value1: 'diDeviceType12',
			label2: '传感器类型：',
			value2: 'diSensorType12',
			label3: '极性：',
			value3: 'diPalarity12',
			label4: '电平持续时间：',
			value4: 'diKeepTime12',
		},
	])

	const {
		di_type_door,
		di_dp_door,
		di_sensor_type_door,
		di_by_door,
		di_air_warn_door,
		di_switch_warn_door,
	} = useDict(
		'di_type_door',
		'di_dp_door',
		'di_sensor_type_door',
		'di_by_door',
		'di_air_warn_door',
		'di_switch_warn_door',
	)

	const changeValue1 = (val) => {
		controlForm.value[val.value2] = ''
		controlForm.value[val.value3] = ''
		controlForm.value[val.value4] = ''
	}

	// 传感器类型是否可选
	const disabledValue2 = (val) => {
		return !['1', '2', '3', '5'].includes(val)
	}

	// 极性是否可选
	const disabledValue3 = (val) => {
		return !['1', '2', '3', '4', '5'].includes(val)
	}

	// 	电气持续时间是否可选
	const disabledValue4 = (val) => {
		return !['1'].includes(val)
	}

	// 极性字典表
	const setValue3Options = (value) => {
		let value3Options = []
		if (controlForm.value[value] === '1') {
			value3Options = di_dp_door.value
		} else if (controlForm.value[value] === '3') {
			value3Options = di_by_door.value
		} else if (controlForm.value[value] === '4') {
			value3Options = di_air_warn_door.value
		} else if (controlForm.value[value] === '5') {
			value3Options = di_switch_warn_door.value
		}
		return value3Options
	}

	const { proxy } = getCurrentInstance()
	/**
	 * 验证非空
	 * @param param 参数
	 * @param text 提示字段
	 * @return {boolean}
	 */
	function verifyValue(param, text) {
		if (isNull(controlForm.value[param])) {
			proxy.$modal.msgWarning(text)
			return true
		}
		return false
	}

	/**
	 * 验证正则
	 * @param param 参数
	 * @param text 提示文字
	 * @param verify 正则
	 * @return {boolean}
	 */
	function verifyText(param, text, verify) {
		if (!verify.test(controlForm.value[param])) {
			proxy.$modal.msgWarning(text)
			return true
		}
		return false
	}
	// 	参数设置
	const setParams = (...paramName) => {
		if (verifyValue(paramName[0], '请选择AI')) return
		if (controlForm.value[paramName[0]] === '1') {
			if (
				verifyText(paramName[3], '电平持续时间范围为0-255', /^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/)
			)
				return
			if (verifyValue(paramName[1], '传感器类型不能为空')) return
			if (verifyValue(paramName[2], '极性不能为空')) return
		} else if (controlForm.value[paramName[0]] === '2') {
			if (verifyText(paramName[2], '脉冲个数范围为0-100', /^([1-9][0-9]{0,1}|100)$/)) return
			if (verifyValue(paramName[1], '传感器类型不能为空')) return
		} else if (controlForm.value[paramName[0]] === '3') {
			if (verifyValue(paramName[2], '极性不能为空')) return
			if (verifyValue(paramName[1], '传感器类型不能为空')) return
		} else if (controlForm.value[paramName[0]] === '4') {
			if (verifyValue(paramName[2], '极性不能为空')) return
		} else if (controlForm.value[paramName[0]] === '5') {
			if (verifyValue(paramName[2], '极性不能为空')) return
			if (verifyValue(paramName[1], '传感器类型不能为空')) return
		}
		emit('setParam', ...paramName)
	}
</script>

<template>
	<div class="fullDom di_dom">
		<template v-for="obj in dataList" :key="obj.id">
			<div class="di_dom_item">
				<div class="di_dom_item_line_1">
					<span>{{ obj.label1 }}</span>
					<el-select
						filterable
						v-model="controlForm[obj.value1]"
						clearable
						@change="changeValue1(obj)"
					>
						<el-option
							v-for="item in di_type_door"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</div>
				<div class="di_dom_item_line_2">
					<span>{{ obj.label4 }}</span>
					<el-input
						v-model="controlForm[obj.value4]"
						:disabled="disabledValue4(controlForm[obj.value1])"
						placeholder="0.1s"
					/>
				</div>
				<div class="c-center di_dom_item_full_row">
					<div
						class="form-setting-img"
						@click="setParams(obj.value1, obj.value2, obj.value3, obj.value4)"
					></div>
				</div>
				<div class="di_dom_item_line_1">
					<template v-if="controlForm[obj.value1] === '2'">
						<span>脉冲个数：</span>
						<el-input clearable v-model="controlForm[obj.value3]" />
					</template>
					<template v-else>
						<span>{{ obj.label3 }}</span>
						<el-select
							filterable
							v-model="controlForm[obj.value3]"
							clearable
							:disabled="disabledValue3(controlForm[obj.value1])"
						>
							<el-option
								v-for="item in setValue3Options(obj.value1)"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
					</template>
				</div>
				<div class="di_dom_item_line_2">
					<span>{{ obj.label2 }}</span>
					<el-select
						filterable
						v-model="controlForm[obj.value2]"
						clearable
						:disabled="disabledValue2(controlForm[obj.value1])"
					>
						<el-option
							v-for="item in di_sensor_type_door"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</div>
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/door/paramsSettingChild';
	.di_dom {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-column-gap: vw(8);
		grid-template-rows: repeat(3, 1fr);
		grid-row-gap: vh(6);
	}
	.di_dom_item {
		@include tabsBorder;
		display: grid;
		align-items: center;
		padding-left: vw(10);
		grid-template-columns: vw(198) 1fr vw(65);
		grid-column-gap: vw(5);
		grid-template-rows: repeat(2, 1fr);
	}
	.di_dom_item_full_row {
		grid-area: 1/3/3/4;
	}
	.di_dom_item_line_1 {
		display: grid;
		grid-template-columns: vw(70) 1fr;
		align-items: center;
		span {
			justify-self: end;
		}
	}
	.di_dom_item_line_2 {
		display: grid;
		grid-template-columns: vw(120) 1fr;
		align-items: center;
		span {
			justify-self: end;
		}
	}
</style>
