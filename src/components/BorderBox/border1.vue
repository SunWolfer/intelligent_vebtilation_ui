<!--精准测风上方边框-->
<script setup lang="ts">
	interface ReqBorderBox {
		// 线条颜色组
		color?: string[]
		// 背景色
		backgroundColor?: string
		// 动画时间
		dur?: number
	}
	import { useAutoResize } from '@/components/BorderBox/borderUtils'

	const props = defineProps<ReqBorderBox>()
	const { domRef, width, height } = useAutoResize()
	// 内部缩减长度
	const reduce = 1
	//   四角位置
	const topLeftCornerPoints = `${7 + reduce},${reduce} ${reduce},${reduce} ${reduce},${7 + reduce}`
	const topRightCornerPoints = computed(() => {
		const w = width.value
		return `${w - 7 - reduce},${reduce} ${w - reduce},${reduce} ${w - reduce},${7 + reduce}`
	})
	const bottomLeftCornerPoints = computed(() => {
		const h = height.value
		return `${reduce}, ${h - 7 - reduce} ${reduce},${h - reduce} ${7 + reduce},${h - reduce}`
	})
	const bottomRightCornerPoints = computed(() => {
		const w = width.value
		const h = height.value
		return `${w - reduce}, ${h - 7 - reduce} ${w - reduce},${h - reduce} ${w - 7 - reduce},${
			h - reduce
		}`
	})
	//   四周边框
	const allRoundBorderPoints = computed(() => {
		const w = width.value
		const h = height.value
		return `${reduce},${reduce} ${reduce},${h - reduce} ${w - reduce},${h - reduce} ${
			w - reduce
		},${reduce} ${reduce},${reduce}`
	})
	//   内部边框
	const insideBorderPoints = computed(() => {
		const w = width.value
		const h = height.value
		return `${7 + reduce},${7 + reduce} ${7 + reduce},${14 + reduce} ${15 + reduce},${
			reduce + 18
		} ${15 + reduce},${43 + reduce} ${7 + reduce},39 ${7 + reduce},${h - 7 - reduce} ${
			w - 7 - reduce
		},${h - 7 - reduce} ${w - 7 - reduce},${7 + reduce} ${7 + reduce},${7 + reduce}`
	})
	//   多边形装饰
	const decoratePoints = computed(() => {
		const centerWidth = 7 + reduce
		const centerHeight = 15 + reduce
		return `${centerWidth - 2},${centerHeight - 2} ${centerWidth + 2}, ${centerHeight + 2} ${
			centerWidth + 2
		},${centerHeight + 8} ${centerWidth - 2}, ${centerHeight + 4}`
	})
	const decoratePoints2 = computed(() => {
		const centerWidth = 7 + reduce
		const centerHeight = 22 + reduce
		return `${centerWidth - 2},${centerHeight - 2} ${centerWidth + 2}, ${centerHeight + 2} ${
			centerWidth + 2
		},${centerHeight + 8} ${centerWidth - 2}, ${centerHeight + 4}`
	})
	const decoratePoints3 = computed(() => {
		const centerWidth = 7 + reduce
		const centerHeight = 29 + reduce
		return `${centerWidth - 2},${centerHeight - 2} ${centerWidth + 2}, ${centerHeight + 2} ${
			centerWidth + 2
		},${centerHeight + 8} ${centerWidth - 2}, ${centerHeight + 4}`
	})
</script>

<template>
	<div class="border-box-1" ref="domRef">
		<svg v-if="width" class="bv-border-svg-container" :width="width" :height="height">
			<defs>
				<linearGradient id="border1-grad1" x1="0" y1="0" x2="0" y2="100%">
					<stop offset="0%" stop-color="rgba(255,255,255,0)"></stop>
					<stop offset="100%" stop-color="rgba(255,255,255,1)"></stop>
				</linearGradient>
				<linearGradient id="border1-grad2" x1="0" y1="0" x2="0" y2="100%">
					<stop offset="0%" stop-color="rgba(255,255,255,1)"></stop>
					<stop offset="100%" stop-color="rgba(255,255,255,0)"></stop>
				</linearGradient>
				<linearGradient id="border1-grad3" x1="0" y1="0" x2="100%" y2="0">
					<stop offset="0%" stop-color="rgba(255,255,255,1)"></stop>
					<stop offset="100%" stop-color="rgba(255,255,255,0)"></stop>
				</linearGradient>
				<linearGradient id="border1-grad4" x1="0" y1="0" x2="100%" y2="0">
					<stop offset="0%" stop-color="rgba(255,255,255,0)"></stop>
					<stop offset="100%" stop-color="rgba(255,255,255,1)"></stop>
				</linearGradient>
				<linearGradient id="border1-grad5" x1="0" y1="0" x2="0" y2="100%">
					<stop offset="0%" stop-color="#1cffff"></stop>
					<stop offset="100%" stop-color="#1d738a"></stop>
					<stop offset="0%" stop-color="#1cffff"></stop>
					<animate
						attributeName="y2"
						from="-100%"
						to="200%"
						:dur="dur"
						repeatCount="indefinite"
					></animate>
				</linearGradient>
			</defs>
			<g>
				<rect
					width="1.5"
					:height="height / 2 - 2 * reduce"
					:x="reduce"
					:y="reduce"
					fill="url(#border1-grad1)"
				>
					<animate
						attributeName="y"
						:from="-height / 2"
						:to="height"
						:dur="dur"
						repeatCount="indefinite"
					></animate>
				</rect>
				<rect width="1.5" :height="height / 2" :x="width - reduce" y="0" fill="url(#border1-grad2)">
					<animate
						attributeName="y"
						:from="height"
						:to="-height / 2"
						:dur="dur"
						repeatCount="indefinite"
					></animate>
				</rect>
				<rect
					:width="width / 3"
					height="1.5"
					:x="width - reduce"
					:y="reduce"
					fill="url(#border1-grad3)"
				>
					<animate
						attributeName="x"
						:from="width"
						:to="-width / 3"
						:dur="dur"
						repeatCount="indefinite"
					></animate>
				</rect>
				<rect
					:width="width / 3"
					height="1.5"
					:x="reduce"
					:y="height - reduce"
					fill="url(#border1-grad4)"
				>
					<animate
						attributeName="x"
						:from="-width / 3"
						:to="width"
						:dur="dur"
						repeatCount="indefinite"
					></animate>
				</rect>
			</g>
			<g>
				<!-- 外部边框-->
				<polyline
					:points="allRoundBorderPoints"
					:stroke="color?.[1]"
					style="stroke-width: 1px; fill: none"
				/>
				<!--      内部边框-->
				<polyline
					:points="insideBorderPoints"
					:stroke="color?.[2]"
					:fill="backgroundColor"
					class="border-box-1_inside_border"
				/>
				<polyline
					:points="topLeftCornerPoints"
					:stroke="color?.[0]"
					class="border-box-1_border_1"
				/>
				<polyline
					:points="topRightCornerPoints"
					:stroke="color?.[0]"
					class="border-box-1_border_1"
				/>
				<polyline
					:points="bottomLeftCornerPoints"
					:stroke="color?.[0]"
					class="border-box-1_border_1"
				/>
				<polyline
					:points="bottomRightCornerPoints"
					:stroke="color?.[0]"
					class="border-box-1_border_1"
				/>
			</g>
			<g fill="url(#border1-grad5)">
				<polygon :points="decoratePoints"></polygon>
				<polygon :points="decoratePoints2"></polygon>
				<polygon :points="decoratePoints3"></polygon>
			</g>
		</svg>
		<div class="border-box-content">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/border-box';
	.border-box-1_inside_border {
		box-shadow: inset 0 0 40px #00eaff;
	}
	.border-box-1_border_1 {
		stroke-width: 2px;
		fill: none;
	}
</style>
