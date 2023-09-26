<script setup>
	import useThree from '@/hooks/useThree'

	const props = defineProps({
		fanThreeInfo: {
			type: Object,
		},
	})

	const {
		homeModelVisible,
		indoorFileUrl,
		otherThreeMod,
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

	removePosition.x = 9.601418612809333
	removePosition.y = 98.30063224918112
	removePosition.z = 196.0516539083154

	removeLookAt.x = 6.521724116704545
	removeLookAt.y = -33.78015461565363
	removeLookAt.z = 28.26200395806137

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

	// 模型相机到位
	const hasCamera = ref(false)
	function readyCamera() {
		operateModel.value.initDefaultAnimation()
		hasCamera.value = true
	}
	// 初始化信息标签
	const defaultLabelList = [
		{
			id: 'local_fan_msg_1',
			type: '1',
			animations: [
				{
					name: 'jushan03',
					isOnce: 0,
				},
				{
					name: 'jushan04',
					isOnce: 0,
				},
			],
		},
		{
			id: 'local_fan_msg_2',
			type: '2',
			animations: [
				{
					name: 'jushan01',
					isOnce: 0,
				},
				{
					name: 'jushan02',
					isOnce: 0,
				},
			],
		},
	]
	//   相机加载完成初始化显示信息
	const loadMessage = () => {
		//   加载标签
		const defaultData = defaultLabelList.find((i) => {
			return i.type === props.fanThreeInfo.type
		})
		operateModel.value.defaultAnimation._disposeMod(-1)
		for (let i = 0; i < defaultData.animations.length; i++) {
			const animation = defaultData.animations[i]
			operateModel.value.defaultAnimation._playCartoon(animation.name, animation.isOnce, false)
		}
	}
	watchEffect(() => {
		if (hasCamera.value && props.fanThreeInfo) {
			loadMessage()
		}
	})
</script>

<template>
	<div class="fullDom">
		<model-fbx
			ref="homeModelVisible"
			:src="indoorFileUrl"
			:other-three-mod="otherThreeMod"
			:controls-options="controlsOptions"
			:lights="lights"
			:camera-size="0.1"
			:backgroundAlpha="0"
			@load="onLoad"
			@onClick="onClick"
			@onModel="onModel"
			@readyCamera="readyCamera"
		></model-fbx>
	</div>
</template>

<style scoped lang="scss"></style>
