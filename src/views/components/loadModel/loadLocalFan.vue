<script setup>
	import useThree from '@/hooks/useThree'

	const {
		homeModelVisible,
		indoorFileUrl,
		otherThreeMod,
		cameraPosition,
		removePosition,
		removeLookAt,
		lights,
		onClick,
		onModel,
		operateModel,
	} = useThree()

	indoorFileUrl.value = import.meta.env.BASE_URL + 'file/jushanfengji/main.FBX'
	otherThreeMod.value = [
		{
			type: 'FBX',
			src: import.meta.env.BASE_URL + 'file/jushanfengji/jushan01.FBX',
		},
		{
			type: 'FBX',
			src: import.meta.env.BASE_URL + 'file/jushanfengji/jushan02.FBX',
		},
		{
			type: 'FBX',
			src: import.meta.env.BASE_URL + 'file/jushanfengji/jushan03.FBX',
		},
		{
			type: 'FBX',
			src: import.meta.env.BASE_URL + 'file/jushanfengji/jushan04.FBX',
		},
	]

	cameraPosition.x = -2.863292668717596
	cameraPosition.y = 100.04253368503026
	cameraPosition.z = -129.9020548131148

	removePosition.x = -2.863292668717596
	removePosition.y = 100.04253368503026
	removePosition.z = -129.9020548131148

	removeLookAt.x = -5.796735191878143
	removeLookAt.y = 11.24925474939463
	removeLookAt.z = -0.4725695727124519

	const controlsOptions = reactive({
		enabled: false,
	})

	lights.value = [
		{
			type: 'Pointlight',
			color: '#ffffff',
			position: { x: 0, y: 2000, z: 400 },
			intensity: 1,
		},
		{
			type: 'Ambientlight',
			color: 0xffffff,
			intensity: 3,
		},
	]
	function onLoad() {
		homeModelVisible.value?.cameraReset(removePosition, removeLookAt, 1)
	}

	function readyCamera() {
		operateModel.value.initDefaultAnimation()
	}
</script>

<template>
	<div class="fullDom">
		<model-fbx
			ref="homeModelVisible"
			:src="indoorFileUrl"
			:other-three-mod="otherThreeMod"
			:cameraPosition="cameraPosition"
			:controls-options="controlsOptions"
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
