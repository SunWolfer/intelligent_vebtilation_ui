<script setup>
	import { settingFormRules } from '@/api/request/doorParameterSettings/settingFormRules'

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
	const { checkNum_0, checkNum_1, positiveInteger } = settingFormRules()
	const rules = ref({
		heatBeatPeriod: [
			{
				required: true,
				message: '心跳周期不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		reportPeriod: [
			{
				required: true,
				message: '上报周期不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		oilDelayCloseTime: [
			{
				required: true,
				message: '油泵延时关闭时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		screenVoiceKeepTime: [
			{
				required: true,
				message: '条屏语音信息保持时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		closeTimeOutA: [
			{
				required: true,
				message: 'A门关门超时时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_1, trigger: 'blur' },
		],
		openTimeOutA: [
			{
				required: true,
				message: 'A门开门超时时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_1, trigger: 'blur' },
		],
		closeTimeOutB: [
			{
				required: true,
				message: 'B门关门超时时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_1, trigger: 'blur' },
		],
		openTimeOutB: [
			{
				required: true,
				message: 'B门开门超时时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		closeKeepTimeA: [
			{
				required: true,
				message: 'A门关位保持时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		openedDelayTimeA: [
			{
				required: true,
				message: 'A门开位保持时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		closeKeepTimeB: [
			{
				required: true,
				message: 'B门关位保持时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		openedDelayTimeB: [
			{
				required: true,
				message: 'B门开位保持时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		closeDelayLinkageTimeA: [
			{
				required: true,
				message: 'A门关门后联动时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		openedDelayCloseTimeA: [
			{
				required: true,
				message: 'A门开门后等待时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		closeDelayLinkageTimeB: [
			{
				required: true,
				message: 'B门关门后联动时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
		],
		openedDelayCloseTimeB: [
			{
				required: true,
				message: 'B门开门后等待时间不能为空',
				trigger: 'blur',
			},
			{ validator: positiveInteger, trigger: 'blur' },
			{ validator: checkNum_0, trigger: 'blur' },
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
</script>

<template>
	<el-form
		class="setting_regulation fullDom"
		ref="controlFormRef"
		:model="controlForm"
		:rules="rules"
		label-width="auto"
	>
		<el-form-item label="心跳周期：" prop="heatBeatPeriod">
			<el-input v-model="controlForm.heatBeatPeriod" />
			<el-button class="add-btn" icon="Setting" @click="setParams('heatBeatPeriod')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="上报周期(s)：" prop="reportPeriod">
			<el-input v-model="controlForm.reportPeriod" />
			<el-button class="add-btn" icon="Setting" @click="setParams('reportPeriod')">设置</el-button>
		</el-form-item>
		<el-form-item label="油泵延时关闭时间(s)：" prop="oilDelayCloseTime">
			<el-input v-model="controlForm.oilDelayCloseTime" />
			<el-button class="add-btn" icon="Setting" @click="setParams('oilDelayCloseTime')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="条屏语音信息保持时间(s)：" prop="screenVoiceKeepTime">
			<el-input v-model="controlForm.screenVoiceKeepTime" />
			<el-button class="add-btn" icon="Setting" @click="setParams('screenVoiceKeepTime')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="A门关门超时时间(s)：" prop="closeTimeOutA">
			<el-input v-model="controlForm.closeTimeOutA" />
			<el-button class="add-btn" icon="Setting" @click="setParams('closeTimeOutA')">设置</el-button>
		</el-form-item>
		<el-form-item label="A门开门超时时间(s)：" prop="openTimeOutA">
			<el-input v-model="controlForm.openTimeOutA" />
			<el-button class="add-btn" icon="Setting" @click="setParams('openTimeOutA')">设置</el-button>
		</el-form-item>
		<el-form-item label="B门关门超时时间(s)：" prop="closeTimeOutB">
			<el-input v-model="controlForm.closeTimeOutB" />
			<el-button class="add-btn" icon="Setting" @click="setParams('closeTimeOutB')">设置</el-button>
		</el-form-item>
		<el-form-item label="B门开门超时时间(s)：" prop="openTimeOutB">
			<el-input v-model="controlForm.openTimeOutB" />
			<el-button class="add-btn" icon="Setting" @click="setParams('openTimeOutB')">设置</el-button>
		</el-form-item>
		<el-form-item label="A门关位保持时间(s)：" prop="closeKeepTimeA">
			<el-input v-model="controlForm.closeKeepTimeA" />
			<el-button class="add-btn" icon="Setting" @click="setParams('closeKeepTimeA')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="A门开位保持时间(s)：" prop="openedDelayTimeA">
			<el-input v-model="controlForm.openedDelayTimeA" />
			<el-button class="add-btn" icon="Setting" @click="setParams('openedDelayTimeA')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="B门关位保持时间(s)：" prop="closeKeepTimeB">
			<el-input v-model="controlForm.closeKeepTimeB" />
			<el-button class="add-btn" icon="Setting" @click="setParams('closeKeepTimeB')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="B门开位保持时间(s)：" prop="openedDelayTimeB">
			<el-input v-model="controlForm.openedDelayTimeB" />
			<el-button class="add-btn" icon="Setting" @click="setParams('openedDelayTimeB')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="A门关门后联动时间(s)：" prop="closeDelayLinkageTimeA">
			<el-input v-model="controlForm.closeDelayLinkageTimeA" />
			<el-button class="add-btn" icon="Setting" @click="setParams('closeDelayLinkageTimeA')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="A门开门后等待时间(s)：" prop="openedDelayCloseTimeA">
			<el-input v-model="controlForm.openedDelayCloseTimeA" />
			<el-button class="add-btn" icon="Setting" @click="setParams('openedDelayCloseTimeA')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="B门关门后联动时间(s)：" prop="closeDelayLinkageTimeB">
			<el-input v-model="controlForm.closeDelayLinkageTimeB" />
			<el-button class="add-btn" icon="Setting" @click="setParams('closeDelayLinkageTimeB')"
				>设置</el-button
			>
		</el-form-item>
		<el-form-item label="B门开门后等待时间(s)：" prop="openedDelayCloseTimeB">
			<el-input v-model="controlForm.openedDelayCloseTimeB" />
			<el-button class="add-btn" icon="Setting" @click="setParams('openedDelayCloseTimeB')"
				>设置</el-button
			>
		</el-form-item>
	</el-form>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/door/doorParameterSettings';
</style>
