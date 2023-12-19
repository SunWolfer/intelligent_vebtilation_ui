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
		createdLabelList,
	} = useThree()

	indoorFileUrl.value = import.meta.env.BASE_URL + 'file/zhufengji/main.FBX'
	otherThreeMod.value = [
		{
			type: 'FBX',
			src: import.meta.env.BASE_URL + 'file/zhufengji/fengye01.FBX',
		},
		{
			type: 'FBX',
			src: import.meta.env.BASE_URL + 'file/zhufengji/fengye02.FBX',
		},
		{
			type: 'FBX',
			src: import.meta.env.BASE_URL + 'file/zhufengji/fengye03.FBX',
		},
		{
			type: 'FBX',
			src: import.meta.env.BASE_URL + 'file/zhufengji/fengye04.FBX',
		},
		{
			type: 'FBX',
			src: import.meta.env.BASE_URL + 'file/zhufengji/dangban01.FBX',
		},
		{
			type: 'FBX',
			src: import.meta.env.BASE_URL + 'file/zhufengji/dangban02.FBX',
		},
	]

	removePosition.x = -18.47218781442094
	removePosition.y = 932.2284216506748
	removePosition.z = 2320.8286780011254

	removeLookAt.x = -0.000629
	removeLookAt.y = 3.695738
	removeLookAt.z = -5.531279

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
			id: 'main_fan_msg_1',
			point: {
				x: 377.6987584836212,
				y: 119.43110728628159,
				z: -362.51853621374977,
			},
			type: '2',
			animations: [
				{
					name: 'fengye01',
					isOnce: 0,
				},
				{
					name: 'fengye02',
					isOnce: 0,
				},
				{
					name: 'dangban01',
					isOnce: 1,
				},
			],
		},
		{
			id: 'main_fan_msg_2',
			point: {
				x: 460.9828127600347,
				y: 113.8452563163835,
				z: 469.47872615399854,
			},
			type: '1',
			animations: [
				{
					name: 'fengye03',
					isOnce: 0,
				},
				{
					name: 'fengye04',
					isOnce: 0,
				},
				{
					name: 'dangban02',
					isOnce: 1,
				},
			],
		},
	]
	//   显示标签
	const labelList = ref([])
	const isReady = ref(false)

	//   加载标签
	function loadLabel() {
		isReady.value = true
		nextTick(() => {
			createdLabelList?.(labelList.value)
		})
	}
	//   风流动画
	const isWindReady = ref(false)
	const defaultWindAnimationList = [
		{
			id: 'wind_fan_1',
			point: {
				x: 2040.1814870625774,
				y: 164.83654355213656,
				z: -562.5019697277836,
			},
			type: '2',
		},
		{
			id: 'wind_fan_2',
			point: {
				x: 2065.586912083174,
				y: 145.6074241736644,
				z: 291.2745161658929,
			},
			type: '1',
		},
	]
	// 风流动画
	const windAnimationList = ref([])
	function loadWind() {
		isWindReady.value = true
		nextTick(() => {
			operateModel.value.addOtherLabelList(windAnimationList.value)
		})
	}

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
		labelList.value = props.fanThreeInfo.showMsg
			? [
					{
						...defaultData,
						...props.fanThreeInfo,
					},
				]
			: []
		isReady.value = false
		nextTick(() => {
			loadLabel()
		})
		//   加载风流动画
		const defaultWind = defaultWindAnimationList.find((i) => {
			return i.type === props.fanThreeInfo.type
		})
		windAnimationList.value = props.fanThreeInfo.showMsg
			? [
					{
						...defaultWind,
					},
				]
			: []
		isWindReady.value = false
		nextTick(() => {
			loadWind()
		})
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
			@on-click="onClick"
			@on-model="onModel"
			@ready-camera="readyCamera"
		>
			<template #label v-if="isReady">
				<div v-for="i in labelList" :id="i.id" class="model_label_1" :key="i.id">
					<div class="model_label_1_body">
						<span>{{ i.type }}#蝶阀开度：{{ i.aperture }}</span>
						<div class="label_text_value">
							<span>转速rpm：{{ i.rotationSpeed }}</span>
							<span>转速rpm：{{ i.rotationSpeed2 }}</span>
						</div>
					</div>
				</div>
			</template>
			<template v-if="isWindReady">
				<div v-for="i in windAnimationList" :id="i.id" :key="i.id" class="model_wind_1"></div>
			</template>
		</model-fbx>
	</div>
</template>

<style scoped lang="scss">
	.model_label_1 {
		position: absolute;
		width: vw(367);
		height: vh(206);
		background-image: url('@/assets/images/venEqMonitoring/fans/model_label_1.png');
		background-size: 100% 100%;
		top: vh(-89);
		display: grid;
		grid-template-rows: vh(138) auto;
	}
	.model_label_1_body {
		align-items: center;
		width: 100%;
		height: 100%;
		padding: vh(40) vw(50);
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		font-size: vw(20);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #ffffff;
		.label_text_value {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: vw(16);
		}
	}
	.model_wind_1 {
		position: absolute;
		width: vw(128);
		height: vh(128);
		top: vh(-65);
		background-image: url('@/assets/images/venEqMonitoring/fans/wind.gif');
		background-size: 100% 100%;
	}
</style>
