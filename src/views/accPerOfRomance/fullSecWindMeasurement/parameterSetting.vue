<script setup>
	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
	})

	const emits = defineEmits(['update:modelValue', 'submit', 'cancel'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})
	function closeDia() {
		showDiaLog.value = false
		emits('cancel')
	}
	function submitForms() {
		emits('submit')
	}

	const radio1 = ref('1')
	//   定时测风时间
	const timingWindMeasure = ref()
	//   周期测风
	const cycleForm = reactive({
		cycle: 1,
		unit: '1',
	})
	//   周期测风单位
	const cycleUnits = ref([
		{
			label: '时',
			value: '1',
		},
		{
			label: '天',
			value: '2',
		},
	])
</script>

<template>
	<dia-log
		v-model="showDiaLog"
		:width="800"
		:height="430"
		title="参数设置"
		@submit="submitForms"
		@cancel="closeDia"
		:has-bottom-btn="true"
		:btn-list="['保存', '取消']"
	>
		<div class="setting_body">
			<el-radio-group v-model="radio1" class="setting_radio">
				<el-radio label="1" size="large">定时测风</el-radio>
				<el-radio label="2" size="large">周期测风</el-radio>
			</el-radio-group>
			<div v-show="radio1 === '1'" class="setting_input_type_1">
				<div class="setting_input_label">每日定时测风</div>
				<el-time-picker
					style="width: 140px"
					v-model="timingWindMeasure"
					placeholder="选择测风时间"
					value-format="hh:mm"
				/>
			</div>
			<div v-show="radio1 === '2'" class="setting_input_type_2">
				<div class="setting_input_label">测风周期</div>
				<el-input v-model="cycleForm.cycle"></el-input>
				<el-select v-model="cycleForm.unit" placeholder="周期单位" clearable>
					<el-option
						v-for="dict in cycleUnits"
						:key="dict.value"
						:label="dict.label"
						:value="dict.value"
					/>
				</el-select>
			</div>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	@mixin SettingSpan {
		font-size: vh(26);
		font-family: YouSheBiaoTiHei, serif;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.78);

		background: linear-gradient(0deg, #4691f7 0%, #2bc9ea 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.setting_body {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		place-items: center center;
	}
	.setting_radio {
		:deep(.el-radio__label) {
			@include SettingSpan;
		}
	}
	.setting_input_type_1 {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.setting_input_label {
			@include SettingSpan;
			padding-right: vw(21);
		}
	}
	.setting_input_type_2 {
		justify-content: center;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, vw(140));
		grid-column-gap: vw(10);
		justify-items: center;
		.setting_input_label {
			@include SettingSpan;
			padding-right: vw(21);
		}
	}
</style>
