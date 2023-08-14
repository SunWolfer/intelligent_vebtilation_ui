<script setup>
	import { useAutoResize } from '@/components/BorderBox/borderUtils'
	import { generateId } from '@/utils/border-box/util'

	const props = defineProps({
		color: {
			type: Array,
			default() {
				return ['#00eaff']
			},
		},
		title: {
			type: String,
			default: '',
		},
	})

	const { domRef, width, height } = useAutoResize()

	const id = generateId()
	const path = `bv-decoration-2-path-${id}`
</script>
<template>
	<div class="bv-decoration-2" ref="domRef">
		<svg :width="width" :height="height">
			<defs>
        <path :id="path"  :d="`M0 ${height} Q${width / 2} 5 ${width},${height}`" />
			</defs>
			<text class="bv-decoration-2_text" :x="width / 2">
				<textPath :xlink:href="`#${path}`" :style="{ fill: color[0] }">
					{{ title }}
				</textPath>
			</text>
		</svg>
    <div class="border-box-content">
      <slot></slot>
    </div>
	</div>
</template>

<style lang="scss" scoped>
	.bv-decoration-2 {
		position: relative;
		width: 100%;
		height: 100%;

		.bv-decoration-svg-container {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}
	}
  .bv-decoration-2_text{
    font-size: vh(19);
    font-family: Adobe Heiti Std,serif;
    font-weight: normal;
    text-anchor: middle;
    width: 100%;
  }

</style>
