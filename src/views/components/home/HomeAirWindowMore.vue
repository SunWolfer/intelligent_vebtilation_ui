<script setup>
	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
	})

	const emits = defineEmits(['update:modelValue'])
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
	}
</script>

<template>
	<dia-log v-model="showDiaLog" :title="title" :width="1000" :height="430">
		<div class="air_more_body">
			<div class="air_more_body_title">DI</div>
			<div class="air_more_body_row">
				<div class="air_more_body_item">
					<div class="air_more_body_item_line">DL1:<span class="normal_text">正常</span></div>
					<div class="air_more_body_item_line">传感器：222</div>
				</div>
				<div class="air_more_body_item">
					<div class="air_more_body_item_line">DL2:<span class="normal_text">正常</span></div>
					<div class="air_more_body_item_line">传感器：222</div>
				</div>
				<div class="air_more_body_item">
					<div class="air_more_body_item_line">DL3:<span class="normal_text">正常</span></div>
					<div class="air_more_body_item_line">传感器：222</div>
				</div>
				<div class="air_more_body_item">
					<div class="air_more_body_item_line">DL4:<span class="normal_text">正常</span></div>
					<div class="air_more_body_item_line">传感器：222</div>
				</div>
			</div>

			<div class="air_more_body_title">AI</div>
			<div class="air_more_body_row">
				<div class="air_more_body_item">
					<div class="air_more_body_item_line">AL1:<span class="normal_text">正常</span></div>
					<div class="air_more_body_item_line">传感器：222</div>
				</div>
				<div class="air_more_body_item">
					<div class="air_more_body_item_line">AL2:<span class="normal_text">正常</span></div>
					<div class="air_more_body_item_line">传感器：222</div>
				</div>
			</div>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_air_more';
</style>
