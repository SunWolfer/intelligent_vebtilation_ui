<script setup lang="ts">
	interface ReqBorderBox {
		// 线条颜色组
		color?: string[]
		// 动画时间
		dur?: number
		//   标题
		title?: string
	}
	import { useAutoResize } from '@/components/BorderBox/borderUtils'
	import { dynamicHeight } from '@/utils/ruoyi'

	const props = withDefaults(defineProps<ReqBorderBox>(), {
		color: () => ['#fbfcff', 'rgba(39, 150, 243, 1)', 'rgba(37, 163, 248, 1)'],
		dur: 3,
	})
	const { domRef, width, height } = useAutoResize()

	//   折线点位
	const brokenLinePoints = computed(() => {
		const w = width.value
		const h = height.value
		return `0,${h} ${w - 40},${h} ${w - 32},${h - 12} ${w},${h - 12}`
	})
	//   文字位置
	const textPosition = computed(() => {
		return height.value - dynamicHeight(8)
	})

	//   装饰点1
	const polygonPoint1 = computed(() => {
		const w = width.value
		const h = height.value
		return `${w - 59},${h - 4} ${w - 51},${h - 4} ${w - 47},${h - 9}, ${w - 55},${h - 9}`
	})
	const polygonPoint2 = computed(() => {
		const w = width.value
		const h = height.value
		return `${w - 66},${h - 4} ${w - 62},${h - 4} ${w - 58},${h - 9}, ${w - 62},${h - 9}`
	})
	const polygonPoint3 = computed(() => {
		const w = width.value
		const h = height.value
		return `${w - 73},${h - 4} ${w - 69},${h - 4} ${w - 65},${h - 9}, ${w - 69},${h - 9}`
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
				:stroke="color[1]"
				stroke-width="1"
				fill="none"
				filter="url(#border-box-2-filterId)"
			></polyline>
			<text class="border-box-2-title" x="0" :y="textPosition" fill="#ffffff">
				{{ title }}
			</text>
			<rect
				width="26"
				height="4"
				x="0"
				:y="height - 2"
				:fill="color[0]"
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
			<polygon :points="polygonPoint1" :fill="color[2]" filter="url(#border-box-2-filterId)">
				<animate
					attributeName="opacity"
					values="1;0.7;1"
					dur="2s"
					begin="0s"
					repeatCount="indefinite"
				/>
			</polygon>
			<polygon :points="polygonPoint2" :fill="color[2]" filter="url(#border-box-2-filterId)">
				<animate
					attributeName="opacity"
					values="0.7;0.4;0.7"
					dur="2s"
					begin="0s"
					repeatCount="indefinite"
				/>
			</polygon>
			<polygon :points="polygonPoint3" :fill="color[2]" filter="url(#border-box-2-filterId)">
				<animate
					attributeName="opacity"
					values="0.5;0.2;0.5"
					dur="2s"
					begin="0s"
					repeatCount="indefinite"
				/>
			</polygon>
		</svg>
		<div class="border-box-content">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/border-box';
	.border-box-2-title {
		font-size: vh(20);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
	}
</style>
