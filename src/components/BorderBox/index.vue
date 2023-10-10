<script lang="ts">
	import { defineComponent } from 'vue'
	import Border1 from './border1.vue'
	import Border2 from './border2.vue'
	import Border3 from './border3.vue'
	import Border4 from './border4.vue'
	import Border5 from './border5.vue'
	import Border6 from './border6.vue'
	import Border7 from './border7.vue'
	import Border8 from './border8.vue'
	import Border9 from './border9.vue'

	export default defineComponent({
		name: 'BorderBox',
		components: {
			Border1,
			Border2,
			Border3,
			Border4,
			Border5,
			Border6,
			Border7,
			Border8,
			Border9,
		},
		props: {
			name: {
				type: String,
				required: true,
			},
			color: {
				type: Array,
				default: () => ['#b4b4bf', 'rgba(6, 134, 216, 0.5)', 'rgba(6, 134, 216, 1)'],
			},
			backgroundColor: {
				type: String,
				default: 'rgba(24, 25, 49, 0.54)',
			},
			dur: {
				type: Number,
				default: 3,
			},
			title: {
				type: String,
				default: '',
			},
		},
	})
</script>

<template>
	<component
		:is="name"
		:color="color"
		:background-color="backgroundColor"
		:dur="dur"
		:title="title"
	>
		<slot></slot>
	</component>
</template>

<style scoped lang="scss"></style>
