<!--大弹窗-->
<script setup lang="ts">
	import { getPoints, useAutoResize } from '@/components/BorderBox/borderUtils'
	import { getInputSize } from '@/utils/ruoyi'

	interface ReqBorderBox {
		// 动画时间
		dur?: number
		//   标题
		title?: string
	}
	const props = defineProps<ReqBorderBox>()

	const { domRef, width, height } = useAutoResize()
	// 宽度偏移量
	const exw = 10
	// 最小固定高度
	const minHeight = 150
	// 是否超出固定高度
	const outHei = computed(() => {
		return height.value - 260 < minHeight
	})
	const aPointH = computed(() => {
		return outHei.value ? minHeight : height.value - 260
	})
	//   弹窗标题一半长度
	const titleLength = computed(() => {
		return getInputSize(props.title) * 24
	})
	//  标题背景
	const titleBgPoints = computed(() => {
		const w = width.value
		const t = titleLength.value
		return `${w / 2 - t},38 ${w / 2 + t - 19},38 ${w / 2 + t},0 ${w / 2 - t + 19},0`
	})
	//   装饰线1
	const linePoint1 = computed(() => {
		const w = width.value
		const t = titleLength.value
		const startW = w / 2 - t - 10
		return `${startW},25 ${startW - 30},25 ${startW - 50},42 ${76 + exw},42`
	})
	//   装饰线2
	const linePoint2 = computed(() => {
		const w = width.value
		const t = titleLength.value
		const startW = w / 2 + t + 10
		return `${startW},25 ${startW + 30},25 ${startW + 50},42 ${w - 57 - exw},42 ${w - 5 - exw},90`
	})
	// 装饰线3
	const linePoint3Com = computed(() => {
		const w = width.value
		const h = height.value
		const t = titleLength.value
		const startW = w / 2 - t - 10
		const endW = w / 2 + t + 10

		return [
			[startW, 33],
			[startW - 25, 33],
			[startW - 47, 50],
			[76 + exw, 50],
			[10 + exw, 110],

			[10 + exw, aPointH.value],
			[34 + exw, aPointH.value + 20],

			[34 + exw, h - 124],
			[10 + exw, h - 104],
			[10 + exw, h - 50],
			[40 + exw, h - 17],
			[startW - 55, h - 17],
			[startW - 40, h],
			[endW + 40, h],

			[endW + 55, h - 17],
			[w - 40 - exw, h - 17],

			[w - 10 - exw, h - 50],
			[w - 10 - exw, h - 124],
			[w - 34 - exw, h - 144],

			[w - 34 - exw, aPointH.value + 20],
			[w - 10 - exw, aPointH.value],

			[w - 10 - exw, 100],
			[w - 66 - exw, 50],
			[endW + 47, 50],
			[endW + 25, 33],
			[endW, 33],
		]
	})
	const linePoint3 = getPoints(linePoint3Com)
	// 左下装饰线
	const linePoint4 = computed(() => {
		const w = width.value
		const h = height.value
		const t = titleLength.value
		return `${15 + exw},${h - 25} ${35 + exw}, ${h - 3} ${w / 2 - t - 10 - 60},${h - 3}`
	})
	//   关闭按钮位置
	const closePoints = computed(() => {
		const w = width.value
		return `${w - 52 - exw},39 ${w - 5 - exw},39 ${w - 5 - exw},80 ${w - 5 - 47 - exw},39`
	})
	//   装饰方块
	const squarePoints = computed(() => {
		const w = width.value
		const t = titleLength.value
		const startW = w / 2 - t - 35
		const endW = w / 2 + t + 35
		return `${startW},38 ${startW - 15},50 ${endW + 15},50 ${endW},38`
	})
	//   装饰方块2
	const squarePoints2 = computed(() => {
		const w = width.value
		const h = height.value
		const t = titleLength.value
		const startW = w / 2 - t - 10
		const endW = w / 2 + t + 10
		return `${startW - 40}, ${h} ${endW + 40}, ${h} ${endW + 25}, ${h - 12} ${startW - 25}, ${
			h - 12
		}`
	})
	//   左侧装饰方块
	const leftRects = computed(() => {
		const hei = outHei.value ? 80 : 120
		return parseInt(String(hei / 6))
	})
	//   右侧装饰方块
	const rightRects = computed(() => {
		const hei = outHei.value ? 20 : 50
		return parseInt(String(hei / 6))
	})
</script>

<template>
	<div class="border-box-4" ref="domRef">
		<svg v-if="width" class="bv-border-svg-container" :width="width" :height="height">
			<defs>
				<linearGradient id="border4-grad1" x1="0" y1="0" x2="0" y2="100%">
					<stop offset="0%" stop-color="rgba(8, 20, 120, 1)"></stop>
					<stop offset="50%" stop-color="rgba(19, 101, 237, 1)"></stop>
					<stop offset="100%" stop-color="rgba(8, 20, 120, 1)"></stop>
				</linearGradient>
				<linearGradient id="border4-grad2" x1="0" y1="0" x2="0" y2="100%">
					<stop offset="0%" stop-color="#c2f9fe"></stop>
					<stop offset="100%" stop-color="#3deafe"></stop>
				</linearGradient>
				<linearGradient id="border4-grad3" x1="0" y1="0" x2="100%" y2="100%">
					<stop offset="0%" stop-color="#1cd8fe"></stop>
					<stop offset="100%" stop-color="#2d6ee6"></stop>
				</linearGradient>
				<filter id="border4-grad4" height="150%" width="150%" x="0" y="0">
					<feMorphology operator="dilate" radius="7" in="SourceAlpha" result="thicken" />
					<feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />
					<feFlood flood-color="#1affff" result="glowColor"></feFlood>
					<feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
					<feMerge>
						<feMergeNode in="softGlowColored" />
						<!--						<feMergeNode in="SourceGraphic" />-->
					</feMerge>
				</filter>
			</defs>
			<polyline :points="titleBgPoints" fill="url(#border4-grad1)" style="opacity: 0.61"></polyline>
			<text class="border-4-text" :x="width / 2" y="25" fill="url(#border4-grad2)">
				{{ title }}
			</text>
			<polyline
				:points="closePoints"
				stroke-width="1px"
				stroke="#1D83F2"
				fill="rgba(23, 49, 76, 0.85)"
			></polyline>
			<g fill="url(#border4-grad3)" stroke="url(#border4-grad3)">
				<!--背景色-->
				<polyline :points="linePoint3" stroke-width="2px" fill="rgba(23, 49, 76, 0.85)"></polyline>
				<polyline :points="linePoint1" stroke-width="2px" fill="none"></polyline>
				<polyline :points="linePoint2" stroke-width="2px" fill="none"></polyline>
				<rect width="5" height="5" :x="width / 2 - titleLength - 10" y="22.5"></rect>
				<rect width="5" height="5" :x="width / 2 + titleLength + 10" y="22.5"></rect>
				<rect width="5" height="5" :x="width / 2 - titleLength - 10" y="31.5"></rect>
				<rect width="5" height="5" :x="width / 2 + titleLength + 10" y="31.5"></rect>
				<polyline :points="squarePoints"></polyline>
				<polyline :points="squarePoints2"></polyline>
				<polyline :points="linePoint4" fill="none" stroke-width="2px" />
				<rect
					:width="width / 2 - 105 - titleLength - exw"
					:height="2"
					:x="width / 2 + titleLength + 65"
					:y="height - 5"
					stroke-width="0"
				></rect>

				<g>
					<rect width="1" :height="outHei ? 100 : 140" :x="2 + exw" :y="aPointH"></rect>
					<rect width="3" :height="20" :x="1 + exw" :y="height - 140"></rect>
					<rect width="3" :height="20" :x="1 + exw" :y="aPointH"></rect>
					<rect
						v-for="i in leftRects"
						width="10"
						height="2"
						:x="10 + exw"
						:y="height - 120 - i * 6"
					></rect>
				</g>

				<g>
					<rect width="1" :height="outHei ? 100 : 140" :x="width - 3 - exw" :y="aPointH"></rect>
					<rect width="3" :height="20" :x="width - 4 - exw" :y="height - 140"></rect>
					<rect width="3" :height="20" :x="width - 4 - exw" :y="aPointH"></rect>
					<rect
						v-for="i in rightRects"
						width="10"
						height="2"
						:x="width - 20 - exw"
						:y="height - 140 - i * 6"
					></rect>
				</g>
				<g>
					<polyline
						:points="`${54 + exw},70 ${10 + exw},110 ${10 + exw},135`"
						stroke-width="8"
						fill="none"
					/>
					<polyline
						:points="`${10 + exw},${height - 90} ${10 + exw},${height - 50} ${30 + exw},${
							height - 28
						}`"
						stroke-width="8"
						fill="none"
					/>
					<polyline
						:points="`${width - 10 - exw},${height - 100} ${width - 10 - exw},${height - 50} ${
							width - 30 - exw
						},${height - 28}`"
						stroke-width="8"
						fill="none"
					/>
					<polyline
						:points="`${width - 54 - exw},60 ${width - 10 - exw},100 ${width - 10 - exw},135`"
						stroke-width="8"
						fill="none"
					/>
					<rect width="8" :height="outHei ? 30 : 40" :x="width - 38 - exw" :y="aPointH + 30"></rect>
				</g>
			</g>

			<g fill="#1affff" filter="url(#border4-grad4)">
				<rect width="2" height="2" x="0" y="110" fill="none"></rect>
				<circle :cx="15 + exw" cy="110" r="4" fill="#1affff"></circle>
				<ellipse :cx="width / 2" cy="46" rx="20" ry="1" fill="#1affff"></ellipse>
				<ellipse :cx="width / 2" :cy="height - 12" rx="20" ry="1" fill="#1affff"></ellipse>
				<circle :cx="width - 15 - exw" :cy="height - 50" r="4" fill="#1affff"></circle>
			</g>
		</svg>
		<div class="border-box-content">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/border-box';
	.border-4-text {
		font-size: vw(30);
		font-family: YouSheBiaoTiHei, serif;
		font-weight: 400;
		text-anchor: middle;
		letter-spacing: 4px;
	}
</style>
