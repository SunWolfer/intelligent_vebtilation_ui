<script setup>
	// 	调控设置表单
	import { settingFormRules } from '@/api/request/doorParameterSettings/settingFormRules'

	const props = defineProps({
		dataFrom: {
			type: Object,
			default: {},
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

	const { checkNum_0, checkNum_1, checkNum_10, checkNum_1_30, checkNum_0_100 } = settingFormRules()

	const rules = ref({
		reportPeriod: [
			{
				required: true,
				message: '上报周期不能为空',
				trigger: 'blur',
			},
			{ validator: checkNum_0, trigger: 'blur' },
		],
		heatBeatPeriod: [
			{
				required: true,
				message: '心跳周期不能为空',
				trigger: 'blur',
			},
			{ validator: checkNum_0, trigger: 'blur' },
		],
		timeOut: [
			{
				required: true,
				message: '超时时间不能为空',
				trigger: 'blur',
			},
			{
				pattern: /^[+]{0,1}(\d+)$/,
				message: '超时时间为正整数',
				trigger: 'blur',
			},
			{ validator: checkNum_1, trigger: 'blur' },
		],
		controlTime: [
			{
				required: true,
				message: '总调节时间不能为空',
				trigger: 'blur',
			},
			{
				pattern: /^[+]{0,1}(\d+)$/,
				message: '总调节时间为正整数',
				trigger: 'blur',
			},
			{ validator: checkNum_10, trigger: 'blur' },
		],
		controlError: [
			{
				required: true,
				message: '调节误差不能为空',
				trigger: 'blur',
			},
			{
				pattern: /^[+]{0,1}(\d+)$/,
				message: '调节误差为正整数',
				trigger: 'blur',
			},
			{ validator: checkNum_1_30, trigger: 'blur' },
		],
		openDegreeTargetA: [
			{
				required: true,
				message: '开度不能为空',
				trigger: 'blur',
			},
			{
				pattern: /^[+]{0,1}(\d+)$/,
				message: '开度为正整数',
				trigger: 'blur',
			},
			{ validator: checkNum_0_100, trigger: 'blur' },
		],
		openDegreeTargetB: [
			{
				required: true,
				message: '开度不能为空',
				trigger: 'blur',
			},
			{
				pattern: /^[+]{0,1}(\d+)$/,
				message: '开度为正整数',
				trigger: 'blur',
			},
			{ validator: checkNum_0_100, trigger: 'blur' },
		],
		controlSpeedA: [
			{
				required: true,
				message: '风速不能为空',
				trigger: 'blur',
			},
		],
		controlPressureA: [
			{
				required: true,
				message: '风压不能为空',
				trigger: 'blur',
			},
		],
		controlVolumeA: [
			{
				required: true,
				message: '风量不能为空',
				trigger: 'blur',
			},
		],
		controlSpeedB: [
			{
				required: true,
				message: '风速不能为空',
				trigger: 'blur',
			},
		],
		controlPressureB: [
			{
				required: true,
				message: '风压不能为空',
				trigger: 'blur',
			},
		],
		controlVolumeB: [
			{
				required: true,
				message: '风量不能为空',
				trigger: 'blur',
			},
		],
	})
	const controlFormRef = ref(null)
	const setParams = (...paramName) => {
		controlFormRef.value.validateField(paramName, (fields) => {
			if (fields) {
				emit('setParam', ...paramName)
			}
		})
	}
	const setControlType = (val, ...paramName) => {
		controlForm.value[paramName[0]] = val
		setParams(...paramName)
	}
</script>

<template>
	<el-form
		class="setting_regulation fullDom"
		ref="controlFormRef"
		:model="controlForm"
		:rules="rules"
		label-width="auto"
	>
		<el-form-item label="心跳周期(s)：" prop="heatBeatPeriod">
			<el-input v-model="controlForm.heatBeatPeriod"></el-input>
			<el-button class="add-btn" icon="Setting" @click="setParams('heatBeatPeriod')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="上报周期(s)：" prop="reportPeriod">
			<el-input v-model="controlForm.reportPeriod"></el-input>
			<el-button class="add-btn" icon="Setting" @click="setParams('reportPeriod')">设置</el-button>
		</el-form-item>
		<el-form-item />
		<el-form-item />
		<el-form-item label="超时时间(s)：" prop="timeOut">
			<el-input v-model="controlForm.timeOut"></el-input>
			<el-button class="add-btn" icon="Setting" @click="setParams('timeOut')">设置</el-button>
		</el-form-item>
		<el-form-item label="总调节时间(s)：" prop="controlTime">
			<el-input v-model="controlForm.controlTime"></el-input>
			<el-button class="add-btn" icon="Setting" @click="setParams('controlTime')">设置</el-button>
		</el-form-item>
		<el-form-item label="调节误差(%)：" prop="controlError">
			<el-input v-model="controlForm.controlError"></el-input>
			<el-button class="add-btn" icon="Setting" @click="setParams('controlError')">设置</el-button>
		</el-form-item>
		<el-form-item label="A窗风速目标值(m/s)：" prop="controlSpeedA">
			<el-input v-model="controlForm.controlSpeedA"></el-input>
			<el-button
				class="add-btn"
				icon="Setting"
				@click="setControlType('0', 'controlTypeA', 'controlSpeedA')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="A窗风压目标值(Pa)：" prop="controlPressureA">
			<el-input v-model="controlForm.controlPressureA"></el-input>
			<el-button
				class="add-btn"
				icon="Setting"
				@click="setControlType('2', 'controlTypeA', 'controlPressureA')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="A窗风量目标值(m^3/min)：" prop="controlVolumeA">
			<el-input v-model="controlForm.controlVolumeA"></el-input>
			<el-button
				class="add-btn"
				icon="Setting"
				@click="setControlType('1', 'controlTypeA', 'controlVolumeA')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="A窗开度调节(%)：" prop="openDegreeTargetA">
			<el-input v-model="controlForm.openDegreeTargetA"></el-input>
			<el-button class="add-btn" icon="Setting" @click="setParams('openDegreeTargetA')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="B窗风速目标值(m/s)：" prop="controlSpeedB">
			<el-input v-model="controlForm.controlSpeedB"></el-input>
			<el-button
				class="add-btn"
				icon="Setting"
				@click="setControlType('0', 'controlTypeB', 'controlSpeedB')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="B窗风压目标值(Pa)：" prop="controlPressureB">
			<el-input v-model="controlForm.controlPressureB"></el-input>
			<el-button
				class="add-btn"
				icon="Setting"
				@click="setControlType('2', 'controlTypeB', 'controlPressureB')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="B窗风量目标值(m^3/min)：" prop="controlVolumeB">
			<el-input v-model="controlForm.controlVolumeB"></el-input>
			<el-button
				class="add-btn"
				icon="Setting"
				@click="setControlType('1', 'controlTypeB', 'controlVolumeB')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="B窗开度调节(%)：" prop="openDegreeTargetB">
			<el-input v-model="controlForm.openDegreeTargetB"></el-input>
			<el-button class="add-btn" icon="Setting" @click="setParams('openDegreeTargetB')"
				>设置</el-button
			>
		</el-form-item>
	</el-form>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/door/doorParameterSettings';
</style>
