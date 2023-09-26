<!--实时分风网络解算、按需分风网络解算-->
<script setup>
	import useThree from '@/hooks/useThree'
	import { useThreeModelData } from '@/hooks/useThreeModelData'
	import HomeModelType from '@/views/components/home/HomeModelType.vue'

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
		controlsOptions,
		lights,
		onLoad,
		onModel,
		onClick,
		dblclick,
		operateModel,
		intersected,
	} = useThree()

	const emits = defineEmits(['chooseTunnel'])

	watch(
		() => intersected.value,
		(val) => {
			val && emits('chooseTunnel', val)
		},
	)

	function readyCamera() {
		//   添加风流
		homeModelVisible.value?.addWind()
		//   添加风网解算文字
		operateModel.value.created3DFont(props.fontList)
		// 添加巷道名字贴图
		operateModel.value?.createdImgPlane()
	}
	// 设置选中
	function setSelectModel(name) {
		homeModelVisible.value?.setSelectObject(name)
	}

	defineExpose({
		operateModel,
		setSelectModel,
	})
</script>

<template>
	<div class="fullDom">
		<model-generation
			ref="homeModelVisible"
			:other-three-mod="otherThreeMod"
			:lights="lights"
			:camera-size="0.1"
			:backgroundAlpha="0"
			:controlsOptions="controlsOptions"
			:choose-group="true"
			@load="onLoad"
			@onModel="onModel"
			@onClick="onClick"
			@onDblclick="dblclick"
			@ready-camera="readyCamera"
		>
		</model-generation>
		<!--    模式切换-->
		<HomeModelType :top="40" :right="40" />
	</div>
</template>

<style lang="scss"></style>
