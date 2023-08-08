<!--四角边框-->
<script setup lang="ts">
	import { useAutoResize } from '@/components/BorderBox/borderUtils'

	const { domRef, width, height } = useAutoResize()
</script>

<template>
	<div class="border-box-5" ref="domRef">
		<svg v-if="width" class="bv-border-svg-container" :width="width" :height="height">
			<polyline points="8,0 0,0 0,8" class="border-box-5-line" />
			<polyline :points="`${width - 8},0 ${width},0 ${width},8`" class="border-box-5-line" />
			<polyline :points="`0,${height - 8} 0,${height} 8,${height}`" class="border-box-5-line" />
			<polyline
				:points="`${width - 8},${height} ${width},${height} ${width}, ${height - 8}`"
				class="border-box-5-line"
			/>
			<polyline
				:points="`5,5 5,${height - 5} ${width - 5},${height - 5} ${width - 5},5 5,5`"
				class="border-box-5-fill"
			/>
		</svg>
		<div class="border-box-content">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/border-box';
	.border-box-5-line {
		fill: none;
		stroke-width: 2px;
		stroke: rgba(38, 158, 245, 1);
	}
	.border-box-5-fill {
		fill: rgba(27, 68, 138, 0.51);
		stroke-width: 0;
	}
</style>
