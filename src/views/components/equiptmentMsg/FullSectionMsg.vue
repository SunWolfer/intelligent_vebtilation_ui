<script setup>
	const props = defineProps({
		data: {
			type: Object,
			default: {},
		},
		id: {
			type: String,
			default: '',
		},
	})
</script>

<template>
	<div class="equipment_msg" :id="id">
		<div class="equipment_msg_top"></div>
		<div class="equipment_msg_center"></div>
		<div class="equipment_msg_footer"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/home/equiptment_msg.scss';
</style>
