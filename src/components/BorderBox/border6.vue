<!--实时监测边框-->
<script setup>
	import { useAutoResize } from '@/components/BorderBox/borderUtils'
	import { generateId, getPolylineLength } from '@/utils/border-box/util'

	const props = defineProps({
		color: {
			type: Array,
			default: () => ['rgba(1, 191, 255, 1)'],
		},
		backgroundColor: {
			type: String,
			default: 'transparent',
		},
		title: {
			type: String,
			default: '',
		},
	})

	const { domRef, width, height } = useAutoResize()

	const id = generateId()
	const filterId = `border-box-12-filterId-${id}`
	const mergedColor = ['rgba(1, 223, 244, 0.3)', 'rgba(1, 223, 244, 1)']

	// 	四角边
	const frame = 15
	const space = 5
	// 初始高度
	const initialH = 21

	const quad = 210

	// 点组合
	const points = computed(() => {
		const w = width.value
		const h = height.value
		return [
			`${(w - quad) / 2} ${initialH}`,

			`${frame} ${initialH}`,
			`${space} ${initialH}`,
			`${space} ${initialH + frame}`,

			`${space} ${h - frame}`,
			`${space} ${h - space}`,
			`${frame} ${h - space}`,

			`${w - frame} ${h - space}`,
			`${w - space} ${h - space}`,
			`${w - space} ${h - frame}`,

			`${w - space} ${frame + initialH}`,
			`${w - space} ${initialH}`,
			`${w - frame} ${initialH}`,

			`${w / 2 + quad / 2} ${initialH}`,
		]
	})

	// 	边框1
	const point1 = computed(() => {
		const point = points.value
		return `M${point[0]} L${point[1]} Q${point[2]} ${point[3]} L${point[4]} Q${point[5]} ${point[6]} L${point[7]} Q${point[8]} ${point[9]} L${point[10]} Q${point[11]} ${point[12]} L${point[13]}`
	})

	// 四角点
	const corners = computed(() => {
		const w = width.value
		const h = height.value
		return [
			`${frame + space} ${initialH}`,
			`${frame} ${initialH}`,
			`${space} ${initialH}`,
			`${space} ${initialH + frame}`,

			`${space} ${h - frame - space}`,
			`${space} ${h - frame}`,
			`${space} ${h - space}`,
			`${frame + space} ${h - space}`,

			`${w - frame - space} ${h - space}`,
			`${w - frame} ${h - space}`,
			`${w - space} ${h - space}`,
			`${w - space} ${h - frame - space}`,

			`${w - space} ${frame + initialH + space}`,
			`${w - space} ${frame + initialH}`,
			`${w - space} ${initialH}`,
			`${w - frame - space} ${initialH}`,
		]
	})
	// 	角1
	const corner1 = computed(() => {
		const corner = corners.value
		return `M ${corner[0]} L ${corner[1]} Q${corner[2]} ${corner[3]} L${corner[3]}`
	})

	// 	角2
	const corner2 = computed(() => {
		const corner = corners.value
		return `M ${corner[4]} L ${corner[5]} Q${corner[6]} ${corner[7]} L${corner[7]}`
	})
	// 	角3
	const corner3 = computed(() => {
		const corner = corners.value
		return `M ${corner[8]} L ${corner[9]} Q${corner[10]} ${corner[11]} L${corner[11]}`
	})
	// 	角4
	const corner4 = computed(() => {
		const corner = corners.value
		return `M ${corner[12]} L ${corner[13]} Q${corner[14]} ${corner[15]} L${corner[15]}`
	})

	const quadH = 42

	// 	四边形
	const quadrilateral = computed(() => {
		const w = width.value
		const h = height.value
		const half = (w - quad) / 2
		return `M${half - space} 0 L${half + space} ${quadH} L${w - half + space} ${quadH} L${
			w - half - space
		} 0 Z`
	})

	// 	流动线1
	const linePoint1 = computed(() => {
		const w = width.value
		return [
			[(w - quad) / 2 - frame, initialH],
			[(w - quad) / 4, initialH],
		]
	})

	const getLinePointLength = (points) => {
		return computed(() => {
			return getPolylineLength(points.value)
		})
	}

	const linePoint1Length = getLinePointLength(linePoint1)

	const linePoint2 = computed(() => {
		const w = width.value
		return [
			[w / 2 + quad / 2 + frame, initialH],
			[(w - quad) / 2 + (w - quad) / 4 + quad, initialH],
		]
	})
	const linePoint2Length = getLinePointLength(linePoint2)
</script>

<template>
	<div class="border-box-6" ref="domRef">
		<svg v-if="width" class="bv-border-svg-container" :width="width" :height="height">
			<defs>
				<filter :id="filterId" height="150%" width="150%" x="-25%" y="-25%">
					<feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
					<feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
					<feFlood :flood-color="mergedColor[1]" result="glowColor">
						<animate
							attributeName="flood-color"
							:values="`
                ${mergedColor[1]};
                ${mergedColor[0]};
                ${mergedColor[1]};
              `"
							dur="3s"
							begin="0s"
							repeatCount="indefinite"
						/>
					</feFlood>
					<feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
					<feMerge>
						<feMergeNode in="softGlowColored" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>
			<path :fill="backgroundColor" stroke-width="1" :stroke="mergedColor[0]" :d="point1" />
			<path :fill="color[0]" stroke-width="0" :d="quadrilateral" />
			<text class="border-6-text" :x="width / 2" :y="quadH - 13">{{ title }}</text>
			<path
				stroke-width="2"
				fill="transparent"
				stroke-linecap="round"
				:filter="`url(#${filterId})`"
				:stroke="mergedColor[1]"
				:d="corner1"
			/>

			<path
				stroke-width="2"
				fill="transparent"
				stroke-linecap="round"
				:filter="`url(#${filterId})`"
				:stroke="mergedColor[1]"
				:d="corner2"
			/>

			<path
				stroke-width="2"
				fill="transparent"
				stroke-linecap="round"
				:filter="`url(#${filterId})`"
				:stroke="mergedColor[1]"
				:d="corner3"
			/>

			<path
				stroke-width="2"
				fill="transparent"
				stroke-linecap="round"
				:filter="`url(#${filterId})`"
				:stroke="mergedColor[1]"
				:d="corner4"
			/>
			<polyline :stroke="mergedColor[1]" stroke-width="2" fill="transparent" :points="linePoint1">
				<animate
					attributeName="stroke-dasharray"
					attributeType="XML"
					:from="`0, 0, 0, ${linePoint1Length}`"
					:to="`0, 0, ${linePoint1Length}, 0`"
					:dur="`3s`"
					begin="0s"
					calcMode="spline"
					keyTimes="0;1"
					keySplines="1,1,1,1"
					repeatCount="indefinite"
				/>
			</polyline>
			<polyline :stroke="mergedColor[1]" stroke-width="2" fill="transparent" :points="linePoint2">
				<animate
					attributeName="stroke-dasharray"
					attributeType="XML"
					:from="`0, 0, 0, ${linePoint2Length}`"
					:to="`0, 0, ${linePoint2Length}, 0`"
					:dur="`3s`"
					begin="0s"
					calcMode="spline"
					keyTimes="0;1"
					keySplines="1,1,1,1"
					repeatCount="indefinite"
				/>
			</polyline>
		</svg>

		<div class="border-box-content">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/border-box';
	.border-6-text {
		font-size: 26px;

		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: 400;
		text-anchor: middle;
		letter-spacing: 4px;
		fill: #000000;
	}
</style>
