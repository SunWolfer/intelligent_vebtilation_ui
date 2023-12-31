<!--文字下横线装饰-->
<script setup lang="ts">
	import { useAutoResize } from '@/components/BorderBox/borderUtils'
	import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'

	defineProps({
		dur: Number,
		title: String,
		hiddenGlimmer: Boolean,
	})
	const { domRef, width, height } = useAutoResize()

	//   折线点位
	const brokenLinePoints = computed(() => {
		const w = width.value
		const h = height.value
		return `0,${h} ${w - dynamicWidth(40)},${h} ${w - dynamicWidth(30)},${
			h - dynamicHeight(12)
		} ${w},${h - dynamicHeight(12)}`
	})
	//   文字位置
	const textPosition = computed(() => {
		return height.value - dynamicHeight(10)
	})
</script>

<template>
	<div class="border-box-2" ref="domRef">
		<svg v-if="width" class="bv-border-svg-container" :width="width" :height="height">
			<defs>
				<filter id="border-box-2-filterId" height="150%" width="150%" x="-25%" y="-25%">
					<feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
					<feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
					<feFlood flood-color="#2b4ab0" result="glowColor" />
					<feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
					<feMerge>
						<feMergeNode in="softGlowColored" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>
			<polyline
				:points="brokenLinePoints"
				stroke="rgba(39, 150, 243, 1)"
				stroke-width="1"
				fill="none"
				filter="url(#border-box-2-filterId)"
			/>
			<text class="border-box-2-title" x="0" :y="textPosition" fill="#ffffff">
				{{ title }}
			</text>
			<rect
				width="26"
				height="4"
				x="0"
				:y="height - 2"
				fill="#ffffff"
				filter="url(#border-box-2-filterId)"
			>
				<animate
					attributeName="opacity"
					values="1;0.4;1"
					:dur="dur"
					begin="0s"
					repeatCount="indefinite"
				/>
			</rect>
			<g v-if="!hiddenGlimmer">
				<rect
					:width="dynamicWidth(8)"
					height="4"
					:x="width - dynamicWidth(30)"
					:y="height - dynamicHeight(12)"
					fill="rgba(0, 255, 255, 1)"
					class="skewRect"
					filter="url(#border-box-2-filterId)"
				>
					<animate
						attributeName="opacity"
						values="1;0.2;1"
						:dur="dur"
						begin="0s"
						repeatCount="indefinite"
					/>
				</rect>
				<rect
					:width="dynamicWidth(8)"
					height="4"
					:x="width - dynamicWidth(40)"
					:y="height - dynamicHeight(12)"
					fill="rgba(44, 201, 235, 1)"
					class="skewRect"
					filter="url(#border-box-2-filterId)"
				>
					<animate
						attributeName="opacity"
						values="1;0.4;1"
						:dur="dur"
						begin="0s"
						repeatCount="indefinite"
					/>
				</rect>
				<rect
					:width="dynamicWidth(8)"
					height="4"
					:x="width - dynamicWidth(50)"
					:y="height - dynamicHeight(12)"
					fill="rgba(44, 202, 235, 0.4)"
					class="skewRect"
					filter="url(#border-box-2-filterId)"
				>
					<animate
						attributeName="opacity"
						values="1;0.7;1"
						:dur="dur"
						begin="0s"
						repeatCount="indefinite"
					/>
				</rect>
			</g>
		</svg>
		<div class="border-box-content">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/border-box';
	.border-box-2-title {
		font-size: vw(20);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
	}
</style>
