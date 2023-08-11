<!--四缺角边框-->
<script setup lang="ts">
	import { useAutoResize } from '@/components/BorderBox/borderUtils'

	const { domRef, width, height } = useAutoResize()
</script>

<template>
	<div class="border-box-7" ref="domRef">
		<svg v-if="width" class="bv-border-svg-container" :width="width" :height="height">
			<polyline
				:points="`8,1 0,8 0,${height - 8} 8,${height - 1} ${width - 8},${height - 1} ${width},${
					height - 8
				} ${width},8 ${width - 8},1 8,1`"
				class="border-box-7-fill"
			/>
		</svg>
		<div class="border-box-content">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/border-box';
	.border-box-7-fill {
		fill: #273051;
		stroke-width: 1px;
		stroke: #1385e0;
	}
	.border-box-content {
		padding: 0;
	}
</style>
