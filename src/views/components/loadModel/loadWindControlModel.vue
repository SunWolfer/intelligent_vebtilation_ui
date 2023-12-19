<!--实时分风网络解算、按需分风网络解算-->
<script setup>
	import useThree from '@/hooks/useThree'
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
		onModel,
		onClick,
		dblclick,
		operateModel,
		intersected,
		removePosition,
		removeLookAt,
	} = useThree()
	const onLoad = () => {
		operateModel.value.traMovement(removePosition, removeLookAt, 3, readyCamera)
	}

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
			@on-model="onModel"
			@on-click="onClick"
			@on-dblclick="dblclick"
			@ready-camera="readyCamera"
		/>
		<!--    模式切换-->
		<HomeModelType :top="40" :right="40" />
	</div>
</template>

<style lang="scss"></style>
