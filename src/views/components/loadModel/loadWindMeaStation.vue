<!--测风站-->
<script setup>
	import useThree from '@/hooks/useThree'

	const {
		homeModelVisible,
		indoorFileUrl,
		cameraPosition,
		removePosition,
		removeLookAt,
		lights,
		onClick,
		onModel,
		operateModel,
	} = useThree()
	indoorFileUrl.value = import.meta.env.BASE_URL + 'file/winMeaStation.FBX'

	cameraPosition.x = -68.53611578728999
	cameraPosition.y = 248.12348365073817
	cameraPosition.z = 789.3791784874053

	removePosition.x = -68.53611578728999
	removePosition.y = 243.44423965450903
	removePosition.z = 870.4011025507941

	removeLookAt.x = -10.415747037466112
	removeLookAt.y = 171.2771957760105
	removeLookAt.z = -120.25229204121588

	lights.value = [
		{
			type: 'Ambientlight',
			color: 0xffffff,
			intensity: 1,
		},
	]

	function onLoad() {
		homeModelVisible.value?.cameraReset(removePosition, removeLookAt, 1)
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
		<model-fbx
			ref="homeModelVisible"
			:src="indoorFileUrl"
			:cameraPosition="cameraPosition"
			:lights="lights"
			:camera-size="1"
			:backgroundAlpha="0"
			@load="onLoad"
			@onClick="onClick"
			@onModel="onModel"
			@readyCamera="readyCamera"
		></model-fbx>
	</div>
</template>

<style scoped lang="scss"></style>
