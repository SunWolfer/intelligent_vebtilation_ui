<script setup>
	const props = defineProps({
		data: {
			type: Object,
			default: {},
		},
		index: {
			type: Number,
			default: 0,
		},
	})
</script>

<template>
	<div class="equipment_msg">
		<div class="equipment_msg_top">
			<div class="equipment_msg_top_item_1">{{ data.name }}</div>
			<div class="equipment_msg_top_item_2"></div>
			<div class="equipment_msg_top_item_3"></div>
		</div>
		<div class="equipment_msg_center">监测点{{ index + 1 }}</div>
		<div class="equipment_msg_footer"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/home/equiptment_msg.scss';
</style>
