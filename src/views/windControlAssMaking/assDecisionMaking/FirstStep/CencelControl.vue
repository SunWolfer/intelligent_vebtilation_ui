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
	function submitForms() {
		showDiaLog.value = false
		emits('submit')
	}
	function closeDia() {
		showDiaLog.value = false
		emits('cancel')
	}
</script>

<template>
	<dia-log v-model="showDiaLog" title="取消" :width="800" :height="420">
		<div class="cancel_control fullDom">
			<div class="details_btn" @click="submitForms">调控模拟自学习</div>
			<div class="details_btn" @click="closeDia">确认取消</div>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/windControlAssMaking/assDecisionMaking/index';
	.cancel_control {
		display: flex;
		flex-direction: column;
		row-gap: vh(30);
		justify-content: center;
		align-items: center;
	}
	.details_btn {
		width: vw(170);
	}
</style>
