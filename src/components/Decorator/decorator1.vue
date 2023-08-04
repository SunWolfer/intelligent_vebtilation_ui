<!--移动光点-->
<script setup>
	import { getPathNZ, getPoints, useAutoResize } from '@/components/BorderBox/borderUtils'
	import { generateId } from '@/utils/border-box/util'

	const props = defineProps({
		color: {
			type: Array,
			default() {
				return ['#00eaff']
			},
		},
	})

	const { domRef, width, height } = useAutoResize()

	const point1 = computed(() => {
		const w = width.value
		const h = height.value
		return [
			[-50, h / 2],
			[w + 50, h / 2],
		]
	})
	const path1 = getPathNZ(point1)
	const polygonH = 1
	const point2 = computed(() => {
		const w = width.value
		const h = height.value
		return [
			[0, h / 2 - polygonH],
			[0, h / 2 + polygonH],
			[w, h / 2 + polygonH],
			[w, h / 2 - polygonH],
		]
	})

	const points = getPoints(point2)
	const id = generateId()
	const path = `bv-decoration-6-path-${id}`
	const gradient = `bv-decoration-6-gradient-${id}`
	const mask1 = `bv-decoration-6-mask1-${id}`
</script>

<template>
	<div class="bv-decoration-6" ref="domRef">
		<svg :width="width" :height="height">
			<defs>
				<polygon
					:id="path"
					:points="`0,0, 0,${height} ${width},${height} ${width},0`"
					:fill="color[0]"
				/>
				<radialGradient :id="gradient" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stop-color="#fff" stop-opacity="1" />
					<stop offset="100%" stop-color="#fff" stop-opacity="0" />
				</radialGradient>
				<mask :id="mask1">
					<ellipse cx="0" cy="0" rx="70" ry="40" :fill="`url(#${gradient})`">
						<animateMotion :dur="`3s`" :path="path1" rotate="auto" repeatCount="indefinite" />
					</ellipse>
				</mask>
			</defs>
			<use :xlink:href="`#${path}`" :mask="`url(#${mask1})`" />

			<ellipse cx="0" cy="0" rx="10" ry="3" :fill="`url(#${gradient})`">
				<animateMotion :dur="`3s`" :path="path1" rotate="auto" repeatCount="indefinite" />
			</ellipse>
		</svg>
	</div>
</template>

<style lang="scss" scoped>
	.bv-decoration-6 {
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
