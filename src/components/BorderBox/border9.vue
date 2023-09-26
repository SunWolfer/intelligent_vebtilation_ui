<script setup lang="ts">
	import { getPath, getPathNZ, useAutoResize } from '@/components/BorderBox/borderUtils'

	const props = defineProps({
		color: {
			type: Array as any[3],
			default: () => {
				return ['#1089ff', 'rgba(0,0,255,0.8)', 'none']
			},
		},
		backgroundColor: {
			type: String,
			default: 'rgb(8, 35, 87,0.6)',
		},
		contentBorderBGColor: {
			type: String,
			default: 'transparent',
		},
		dur: {
			type: Number,
			default: 3,
		},
		titleWidth: {
			type: Number,
			default: 250,
		},
		title: {
			type: String,
			default: '',
		},
	})

	const { domRef, width, height } = useAutoResize()

	const polygon1 = computed(() => {
		const w = width.value
		const h = height.value
		return [
			[20, 2],
			[2, 20],

			[2, 80],
			[10, 90],
			[10, h - 60],
			[2, h - 50],

			[2, h - 20],
			[20, h - 2],

			[w - 20, h - 2],
			[w - 2, h - 20],

			[w - 2, h - 50],
			[w - 10, h - 60],
			[w - 10, 90],
			[w - 2, 80],

			[w - 2, 20],
			[w - 20, 0],
		]
	})
	const polygon1Path = getPath(polygon1)

	const line1Point = computed(() => {
		return [
			[30, 2],
			[20, 2],
			[2, 20],
			[2, 30],
		]
	})
	const path1 = getPathNZ(line1Point)
	const lineList = ['left-top', 'right-top', 'left-bottom', 'right-bottom']

	const polygon2 = computed(() => {
		const h = height.value
		return [
			[2, 82],
			[8, 92],
			[8, h - 62],
			[2, h - 52],
		]
	})
	const polygon2Path = getPath(polygon2)
	const polygonList = ['left-top', 'right-top']

	const polygon3 = computed(() => {
		const w = width.value
		const h = height.value
		return [
			[2, h - 32],

			[2, h - 20],
			[20, h - 2],

			[w - 20, h - 2],
			[w - 2, h - 20],

			[w - 2, h - 32],
		]
	})
	const polygon3Path = getPath(polygon3)
</script>

<template>
	<div class="border-box-9" ref="domRef">
		<svg class="bv-border-svg-container" :width="width" :height="height">
			<defs></defs>
			<path :d="polygon1Path" :fill="backgroundColor" stroke-width="2" :stroke="color[0]"></path>
			<path :d="polygon3Path" :fill="color[2]"></path>
		</svg>
		<template v-for="i in lineList">
			<svg class="bv-border-svg-container" :class="[i, 'bv-border-svg-container']">
				<path :d="path1" stroke-width="3" fill="none" :stroke="color[1]"></path>
			</svg>
		</template>
		<template v-for="i in polygonList">
			<svg :class="[i, 'bv-border-svg-container']">
				<path :d="polygon2Path" stroke-width="0" :fill="color[1]"></path>
			</svg>
		</template>
		<div class="border-box-content">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/border-box';
</style>
