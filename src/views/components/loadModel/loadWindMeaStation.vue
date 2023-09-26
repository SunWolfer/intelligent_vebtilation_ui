<!--测风站-->
<script setup>
	import useThree from '@/hooks/useThree'

	const { homeModelVisible, indoorFileUrl, lights, onClick, onModel, operateModel } = useThree()
	indoorFileUrl.value = import.meta.env.BASE_URL + 'file/winMeaStation.glb'
	const removePosition = reactive({
		x: -0.3192361490193977,
		y: 1.5587744945505717,
		z: 6.491832745183836,
	})

	const removeLookAt = reactive({
		x: -0.31923614901939906,
		y: 1.3486608490942618,
		z: -0.12739712089256194,
	})

	lights.value = [
		{
			type: 'HemisphereLight',
			position: { x: 0, y: 1, z: 0 },
			skyColor: 0xffffff,
			groundColor: 0xffffff,
			intensity: 1.5,
		},
		{
			type: 'DirectionalLight',
			position: { x: 1, y: 1, z: 1 },
			color: 0xffffff,
			intensity: 1.5,
		},
	]

	function onLoad() {
		homeModelVisible.value?.cameraReset(removePosition, removeLookAt, 2)
	}

	const props = defineProps({
		playMod: {
			type: Boolean,
			default: false,
		},
	})

	function readyCamera() {
		operateModel.value.initDefaultAnimation()
	}

	watch(
		() => props.playMod,
		(val) => {
			if (val) {
				operateModel.value.defaultAnimation._playCartoon()
			} else {
				operateModel.value.defaultAnimation._disposeMod(-1)
			}
		},
	)
</script>

<template>
	<div class="fullDom">
		<model-gltf
			ref="homeModelVisible"
			:src="indoorFileUrl"
			:lights="lights"
			:camera-size="0.1"
			:backgroundAlpha="0"
			@load="onLoad"
			@onClick="onClick"
			@onModel="onModel"
			@readyCamera="readyCamera"
		></model-gltf>
	</div>
</template>

<style scoped lang="scss"></style>
