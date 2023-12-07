<!--公共边框/弹窗边框(带标题)-->
<script setup lang="ts">
	import { PropType, Ref } from 'vue'
	import { getPath, useAutoResize } from './borderUtils'
	import { getPolylineLength } from '@/utils/border-box/util'
	import { dynamicHeight, dynamicWidth, getInputSize } from '@/utils/ruoyi'

	const props = defineProps({
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
		title: {
			type: String,
			default: '',
		},
		titlePosition: {
			type: String,
			default: 'left',
		},
		hasCloseIcon: {
			type: Boolean,
			default: true,
		},
		titleWidth: {
			type: Number,
			default: 250,
		},
	})

	const status = useAutoResize(afterResizeFun)
	const { domRef, width, height } = status
	// 边框
	const linePoint1 = computed(() => {
		const w = width.value
		const h = height.value
		// 三角缺失大小
		const short = 15
		return [
			[0, short],
			[0, h - short],
			[short, h],
			[w - short, h],
			[w, h - short],
			[w, short],
			[w - short, 0],
			[short, 0],
		]
	})
	const line1 = getPath(linePoint1)

	const line1Length = computed(() => {
		return getPolylineLength(linePoint1.value)
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
	const decoratorPoint1 = getCircleList({
		w: dynamicWidth(100),
		startW: 15,
		startH: dynamicHeight(15),
	})
	const decoratorPoint2 = computed<any[]>(() => {
		return getCircleList({
			w: dynamicWidth(200),
			startW: width.value - (props.hasCloseIcon ? 250 : 180),
			startH: dynamicHeight(15),
			startOp: false,
		})
	})

	function afterResizeFun() {}

	// 起始位置
	const startPoint = dynamicWidth(85)
	// 三角宽度
	const trainLineH = dynamicHeight(50)
	// 	标题边框
	const titleBorderPoint = computed(() => {
		return [
			[startPoint, 0],
			[startPoint + trainLineH, trainLineH - 5],
			[startPoint + trainLineH + titleLength.value + 10, trainLineH - 5],
			[startPoint + trainLineH + titleLength.value + 10 + trainLineH, 0],
		]
	})

	//获取标题延长长度
	const titleLength = computed(() => {
		return getInputSize(props.title) * dynamicHeight(24) + 10 + 10
	})

	const getQPath = (points: Ref<number[][]>) => {
		return computed(() => {
			if (!points.value || points.value.length === 0) return
			let path = ''
			path += 'M' + points.value[0].join(' ')
			let startQ = [(points.value[0][0] + points.value[1][0]) / 2, points.value[1][1]]
			let endQ = [(points.value[2][0] + points.value[3][0]) / 2, points.value[2][1]]
			path += ' Q' + startQ.join(' ') + ' ' + points.value[1].join(' ')
			path += ' L' + points.value[2].join(' ')
			path += ' Q' + endQ.join(' ') + ' ' + points.value[3].join(' ')
			return path
		})
	}

	const line2 = getQPath(titleBorderPoint)
	// 	标题边框底部线
	const linePoint2: any = computed(() => {
		return [
			[startPoint + trainLineH + 5, trainLineH - 5],
			[startPoint + trainLineH + titleLength.value, trainLineH - 5],
		]
	})
	const linePoint2Length = computed(() => {
		return getPolylineLength(linePoint2.value)
	})
</script>

<template>
	<div class="border-box-10" ref="domRef">
		<svg class="bv-border-svg-container" :width="width" :height="height">
			<defs>
				<linearGradient id="border-box-2-grad2" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stop-color="#049ae9"></stop>
					<stop offset="50%" stop-color="#00e6fc"></stop>
					<stop offset="100%" stop-color="#049ae9"></stop>
					<animate attributeName="x2" from="0" to="5" :dur="dur" repeatCount="indefinite"></animate>
				</linearGradient>
				<linearGradient id="border3-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stop-color="rgb(58,98,202)"></stop>
					<stop offset="100%" stop-color="rgb(0,0,0)"></stop>
				</linearGradient>
			</defs>
			<path :stroke="color[0]" :d="line1" :fill="backgroundColor" stroke-width="2"></path>
			<path
				class="bv-bb2-line-1"
				:stroke="color[1]"
				:d="line1"
				fill="transparent"
				:stroke-dasharray="line1Length / 6"
			></path>

			<g v-if="titleWidth > -1">
				<template v-for="point in decoratorPoint1">
					<circle
						:cx="point.cx"
						:cy="point.cy"
						:r="point.cr"
						stroke="transparent"
						stroke-width="1"
						:fill="point.color"
					/>
				</template>
			</g>
			<!--			标题边框-->
			<g v-if="titleWidth > 5">
				<path :d="line2" :stroke="color[1]" fill="transparent"></path>
				<text
					class="bv-border-box-2-title1"
					:x="startPoint + trainLineH + 10"
					y="25"
					fill="url(#border-box-2-grad2)"
				>
					{{ title }}
				</text>
				<polyline :stroke="color[1]" stroke-width="2" fill="transparent" :points="linePoint2">
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
				<template v-for="point in decoratorPoint2">
					<circle
						:cx="point.cx"
						:cy="point.cy"
						:r="point.cr"
						stroke="transparent"
						stroke-width="1"
						:fill="point.color"
					/>
				</template>
			</g>
		</svg>

		<div class="border-box-content">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/border-box';
	.border-box-10 {
		.bv-bb2-line-1 {
			stroke-width: 3px;
			animation: bb10-dash 10s linear infinite;
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

	.border-box-dec1 {
		width: vw(100);
		height: vh(20);
		position: absolute;
		left: 5px;
		top: 5px;
	}

	.bv-border-box-2-title1 {
		color: #00eaff;
		font-size: vw(22);
		font-family:
			Microsoft YaHei,
			serif;
		font-weight: bold;
		line-height: 50px;

		background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
