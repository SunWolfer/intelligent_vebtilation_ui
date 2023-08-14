<script setup>
	import { useAutoResize } from '@/components/BorderBox/borderUtils'
	import { generateId } from '@/utils/border-box/util'

	const props = defineProps({
		color: {
			type: Array,
			default() {
				return ['#00eaff']
			},
		},
		title: {
			type: String,
			default: '',
		},
	})

	const { domRef, width, height } = useAutoResize()

	const id = generateId()
	const path = `bv-decoration-2-path-${id}`
</script>
<template>
	<div class="bv-decoration-2" ref="domRef">
		<svg :width="width" :height="height">
			<def>
				<path :id="path" :d="`M0 ${height} Q${width / 2} ${height / 2} ${width},${height}`" />
			</def>
			<text>
				<textPath xlink:href="`#${path}`" :style="{ fill: color[0] }">
					{{ title }}
				</textPath>
			</text>
		</svg>
	</div>
</template>

<style lang="scss" scoped>
	.bv-decoration-2 {
		position: relative;
		width: 100%;
		height: 100%;

		.bv-decoration-svg-container {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}
	}
</style>
