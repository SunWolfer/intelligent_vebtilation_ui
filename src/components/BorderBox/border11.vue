<!--风窗参数设置弹窗1-->
<script setup lang="ts">
	import { getPath, useAutoResize } from '@/components/BorderBox/borderUtils'
	import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'
	import { getPolylineLength } from '@/utils/border-box/util'
	import { PropType } from 'vue'

	const { domRef, width, height } = useAutoResize()

	defineProps({
		color: {
			type: Array as PropType<any[]>,
			default: () => ['#0857a8', '#25d2f5'],
		},
		backgroundColor: {
			type: String,
			default: 'transparent',
		},
		dur: {
			type: Number,
			default: 3,
		},
	})

	// 	三角缺失大小
	const short = 15
	const freeW = dynamicWidth(385)
	const freeH = dynamicHeight(200)
	// 	边框点
	const point1 = computed(() => {
		const w = width.value
		const h = height.value

		return [
			[short, 0],
			[0, short],

			[0, h - short],
			[short, h],

			[w - short, h],
			[w, h - short],

			[w, freeH + 15],
			[w - short, freeH],

			[w - freeW + short, freeH],
			[w - freeW, freeH - short],

			[w - freeW, short],
			[w - freeW - 15, 0],
			[short, 0],
		]
	})

	const line1 = getPath(point1)

	const line1Length = computed(() => {
		return getPolylineLength(point1.value)
	})

	// 圆点装饰
	const getCircleList = ({ w = 0, lines = 2, startW = 10, startH = 10, startOp = true }) => {
		const r = 2
		const sp = 8
		// 	生成单行点个数
		const number = parseInt(String(w / (r + sp)))

		let points: any[] = []
		for (let i = 0; i < lines; i++) {
			for (let j = 0; j < number; j++) {
				points.push({
					cx: startW + r / 2 + j * sp + (r / 2) * j,
					cy: startH + r / 2 + i * sp + (r / 2) * i,
					cr: r,
					color: `rgba(8, 87, 168,${startOp ? 1 - (1 / number) * j : (1 / number) * j})`,
				})
			}
		}
		return points
	}
	const decoratorPoint1: any[] = getCircleList({
		w: dynamicWidth(100),
		startW: 15,
		startH: dynamicHeight(15),
	})
	const decoratorPoint2 = computed<any[]>(() => {
		return getCircleList({
			w: dynamicWidth(200),
			startW: width.value - freeW - dynamicWidth(200),
			startH: dynamicHeight(15),
			startOp: false,
		})
	})
</script>

<template>
	<div class="border-box-11" ref="domRef">
		<svg class="bv-border-svg-container" :width="width" :height="height">
			<path :stroke="color[0]" :d="line1" :fill="backgroundColor" stroke-width="2"></path>
			<path
				class="bv-bb2-line-1"
				:stroke="color[1]"
				:d="line1"
				fill="transparent"
				:stroke-dasharray="line1Length / 10"
			></path>
			<circle
				v-for="point in decoratorPoint1"
				:cx="point.cx"
				:cy="point.cy"
				:r="point.cr"
				stroke="transparent"
				stroke-width="1"
				:fill="point.color"
			/>
			<circle
				v-for="point in decoratorPoint2"
				:cx="point.cx"
				:cy="point.cy"
				:r="point.cr"
				stroke="transparent"
				stroke-width="1"
				:fill="point.color"
			/>
		</svg>
		<div class="border-box-content">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/border-box';
	.border-box-11 {
		.bv-bb2-line-1 {
			stroke-width: 3px;
			animation: bb10-dash 15s linear infinite;
		}

		@keyframes bb10-dash {
			0% {
				stroke-dashoffset: v-bind(line1Length);
			}
			100% {
				stroke-dashoffset: 0;
			}
		}
	}
</style>
