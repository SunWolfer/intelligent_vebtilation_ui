<!--控风辅助决策3D组件-->
<script setup>
	import useThree from '@/hooks/useThree'

	const props = defineProps({
		fontList: {
			type: Array,
			default: () => {
				return []
			},
		},
	})

	watch(
		() => props.fontList,
		(val) => {
			operateModel.value.created3DFont(val)
		},
	)

	const {
		homeModelVisible,
		otherThreeMod,
		cameraPosition,
		controlsOptions,
		lights,
		onLoad,
		onModel,
		onClick,
		dblclick,
		createdLabelList,
		operateModel,
		intersected,
		intersectedPosition,
	} = useThree()

	const emits = defineEmits(['choose-tunnel'])

	watch(intersected, (val) => {
		val && emits('choose-tunnel', val)
	})

	function readyCamera() {
		//   添加风流
		homeModelVisible.value?.addWind()
		//   添加风网解算文字
		operateModel.value.created3DFont(props.fontList)
	}

	defineExpose({
		operateModel,
	})
</script>

<template>
	<div class="fullDom">
		<model-generation
			ref="homeModelVisible"
			:other-three-mod="otherThreeMod"
			:cameraPosition="cameraPosition"
			:lights="lights"
			:camera-size="1"
			:backgroundAlpha="0"
			:controlsOptions="controlsOptions"
			:choose-group="true"
			@load="onLoad"
			@onModel="onModel"
			@onClick="onClick"
			@onDblclick="dblclick"
			@ready-camera="readyCamera"
		></model-generation>
	</div>
</template>

<style scoped lang="scss"></style>
