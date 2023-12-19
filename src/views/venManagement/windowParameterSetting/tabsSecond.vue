<!--开关量输入(DI)配置-->
<script setup>
	import useDict from '@/hooks/useDict'
	import { isNull } from '@/utils/ruoyi'

	const { proxy } = getCurrentInstance()
	const { di_type, di_oc_type, di_air_warn, di_switch_warn, di_pause_control } = useDict(
		'di_type',
		'di_oc_type',
		'di_air_warn',
		'di_switch_warn',
		'di_pause_control',
	)

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
		},
		{
			id: 2,
			label1: 'DI2：',
			value1: 'diDeviceType2',
			label2: '传感器类型：',
			value2: 'diSensorType2',
			label3: '极性：',
			value3: 'diPalarity2',
		},
		{
			id: 3,
			label1: 'DI3：',
			value1: 'diDeviceType3',
			label2: '传感器类型：',
			value2: 'diSensorType3',
			label3: '极性：',
			value3: 'diPalarity3',
		},
		{
			id: 4,
			label1: 'DI4：',
			value1: 'diDeviceType4',
			label2: '传感器类型：',
			value2: 'diSensorType4',
			label3: '极性：',
			value3: 'diPalarity4',
		},
		{
			id: 5,
			label1: 'DI5：',
			value1: 'diDeviceType5',
			label2: '传感器类型：',
			value2: 'diSensorType5',
			label3: '极性：',
			value3: 'diPalarity5',
		},
		{
			id: 6,
			label1: 'DI6：',
			value1: 'diDeviceType6',
			label2: '传感器类型：',
			value2: 'diSensorType6',
			label3: '极性：',
			value3: 'diPalarity6',
		},
		{
			id: 7,
			label1: 'DI7：',
			value1: 'diDeviceType7',
			label2: '传感器类型：',
			value2: 'diSensorType7',
			label3: '极性：',
			value3: 'diPalarity7',
		},
		{
			id: 8,
			label1: 'DI8：',
			value1: 'diDeviceType8',
			label2: '传感器类型：',
			value2: 'diSensorType8',
			label3: '极性：',
			value3: 'diPalarity8',
		},
		{
			id: 9,
			label1: 'DI9：',
			value1: 'diDeviceType9',
			label2: '传感器类型：',
			value2: 'diSensorType9',
			label3: '极性：',
			value3: 'diPalarity9',
		},
		{
			id: 10,
			label1: 'DI10：',
			value1: 'diDeviceType10',
			label2: '传感器类型：',
			value2: 'diSensorType10',
			label3: '极性：',
			value3: 'diPalarity10',
		},
		{
			id: 11,
			label1: 'DI11：',
			value1: 'diDeviceType11',
			label2: '传感器类型：',
			value2: 'diSensorType11',
			label3: '极性：',
			value3: 'diPalarity11',
		},
		{
			id: 12,
			label1: 'DI12：',
			value1: 'diDeviceType12',
			label2: '传感器类型：',
			value2: 'diSensorType12',
			label3: '极性：',
			value3: 'diPalarity12',
		},
	])

	const changeValue1 = (val) => {
		controlForm.value[val.value2] = ''
		controlForm.value[val.value3] = ''
	}
	const getSelectData = (val) => {
		let value3Selects = []
		if (controlForm.value[val.value1] === '9') {
			value3Selects = di_air_warn.value
		} else if (controlForm.value[val.value1] === '10') {
			value3Selects = di_switch_warn.value
		} else if (controlForm.value[val.value1] === '12') {
			value3Selects = di_pause_control.value
		}
		return value3Selects
	}
	const isDisable = (val) => {
		return !['9', '10', '12'].includes(val)
	}
	const value3Disable = (val) => {
		return !['10'].includes(val)
	}

	const setParams = (...paramName) => {
		if (isNull(controlForm.value[paramName[0]])) {
			proxy.$modal.msgWarning('请选择DI')
			return
		}
		if (!isDisable(controlForm.value[paramName[0]]) && isNull(controlForm.value[paramName[2]])) {
			proxy.$modal.msgWarning('请选择极性')
			return
		}
		if (
			!value3Disable(controlForm.value[paramName[0]]) &&
			isNull(controlForm.value[paramName[1]])
		) {
			proxy.$modal.msgWarning('请选择传感器类型')
			return
		}

		emit('setParam', ...paramName)
	}
</script>

<template>
	<div class="fullDom tab_second">
		<template v-for="i in dataList" :key="i.id">
			<el-form :model="i" label-width="auto" class="tab_second_item" label-position="right">
				<el-form-item :label="i.label1">
					<el-select filterable v-model="controlForm[i.value1]" clearable @change="changeValue1(i)">
						<el-option
							v-for="item in di_type"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item :label="i.label2">
					<el-select
						filterable
						v-model="controlForm[i.value2]"
						clearable
						:disabled="value3Disable(controlForm[i.value1])"
					>
						<el-option
							v-for="item in di_oc_type"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item :label="i.label3">
					<el-select
						filterable
						v-model="controlForm[i.value3]"
						clearable
						:disabled="isDisable(controlForm[i.value1])"
					>
						<el-option
							v-for="item in getSelectData(i)"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label=" ">
					<el-button
						class="reset-btn"
						icon="Setting"
						@click="setParams(i.value1, i.value2, i.value3)"
						>设置</el-button
					>
				</el-form-item>
			</el-form>
		</template>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/door/paramsSettingChild';
	.tab_second {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: vw(5);
		grid-template-rows: repeat(3, vh(120));
		align-content: space-evenly;
	}
	.tab_second_item {
		@include tabsBorder;
		display: grid;
		align-items: center;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-column-gap: vw(14);
		padding: 0 vw(15);
	}
</style>
