<!--装饰器-->
<template>
	<component
		:is="name"
		:reverse="reverse"
		:dur="dur"
		:color="color"
		:scan-dur="scanDur"
		:halo-dur="haloDur"
	>
		<slot></slot>
	</component>
</template>

<script>
	import decorator1 from './decorator1'

	export default {
		name: 'Decorator',
		components: {
			decorator1,
		},
		props: {
			name: {
				type: String,
				required: true,
			},
			color: {
				type: Array,
				default() {
					return ['#098dd2', '#00eaff']
				},
			},
			reverse: {
				type: Boolean,
				default: false,
			},
			dur: {
				type: Number,
				default: 3,
			},
			scanDur: {
				type: Number,
				default: 3,
			},
			haloDur: {
				type: Number,
				default: 2,
			},
		},
	}
</script>

<style scoped lang="scss"></style>
