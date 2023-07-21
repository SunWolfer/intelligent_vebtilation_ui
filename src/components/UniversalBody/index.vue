<script setup lang="ts">
	defineProps({
		bodyClass: {
			type: String,
			default: '',
		},
	})
</script>

<template>
	<div class="app-item-content">
		<div class="app-item-container" :class="bodyClass">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
