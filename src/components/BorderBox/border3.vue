<!--首页底部弹出菜单-->
<script setup lang="ts">
	interface ReqBorderBox {
		backgroundColor?: string
		// 动画时间
		dur?: number
	}
	import { useAutoResize } from '@/components/BorderBox/borderUtils'

	const props = withDefaults(defineProps<ReqBorderBox>(), {
		backgroundColor: 'rgba(15,46,81,0.78)',
		dur: 3,
	})
	const { domRef, width, height } = useAutoResize()
	//   折线偏转距离
	const r = 7
	//   折线点位
	const linePoints = computed(() => {
		const h = height.value
		return `44,7 37,0 7,0 0,7 0,${h - 7} 7,${h}`
	})
	//   边框点位
	const points = computed(() => {
		const w = width.value
		const h = height.value

		return `44,7 37,0 7,0 0,7 0,${h - 7} 7,${h} ${w},${h} ${w},7 44,7`
	})
	//   装饰点
</script>

<template>
	<div class="border-box-3" ref="domRef">
		<svg v-if="width" class="bv-border-svg-container" :width="width" :height="height">
			<defs>
				<filter id="border-box-3-filterId">
					<!-- 投影偏移 -->
					<feOffset dx="0" dy="0" />
					<!-- 投影模糊 -->
					<feGaussianBlur stdDeviation="12" result="offset-blur" />
					<!-- 反转投影使其变成内投影 -->
					<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
					<!-- 内投影附加颜色 -->
					<feFlood flood-color="rgba(6, 134, 216, 1)" flood-opacity=".65" result="color" />
					<feComposite operator="in" in="color" in2="inverse" result="shadow" />
					<!-- 把内投影显示在图像上 -->
					<feComposite operator="over" in="shadow" in2="SourceGraphic" />
				</filter>
			</defs>
			<polyline :points="points" fill="rgb(15, 46, 81)" class="polyline_1"></polyline>
			<polyline
				:points="linePoints"
				fill="none"
				stroke-width="2"
				stroke="rgba(6, 134, 216, 1)"
			></polyline>
			<rect width="8" height="4" x="13" y="3" fill="rgba(44, 202, 235, 0.4)" class="skewRect">
				<animate
					attributeName="opacity"
					values="1;0.2;1"
					:dur="dur"
					begin="0s"
					repeatCount="indefinite"
				/>
			</rect>
			<rect width="8" height="4" x="22" y="3" fill="rgba(44, 201, 235, 1)" class="skewRect">
				<animate
					attributeName="opacity"
					values="1;0.4;1"
					:dur="dur"
					begin="0s"
					repeatCount="indefinite"
				/>
			</rect>
			<rect width="8" height="4" x="31" y="3" fill="rgba(0, 255, 255, 1)" class="skewRect">
				<animate
					attributeName="opacity"
					values="1;0.7;1"
					:dur="dur"
					begin="0s"
					repeatCount="indefinite"
				/>
			</rect>
		</svg>
		<div class="border-box-content">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/border-box';
	.polyline_1 {
		filter: url(#border-box-3-filterId);
		opacity: 0.78;
	}
</style>
