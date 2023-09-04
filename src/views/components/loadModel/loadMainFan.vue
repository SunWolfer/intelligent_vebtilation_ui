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
		cameraPosition,
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

	cameraPosition.x = -39.770026669286786
	cameraPosition.y = 1189.1986313555587
	cameraPosition.z = -1795.8690888926885

	removePosition.x = -21.200001563245657
	removePosition.y = 1386.4079619393492
	removePosition.z = -2094.100714425375

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
				x: 412.40803742285925,
				y: 44.849545228117826,
				z: -542.038753217439,
			},
			type: '1',
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
				x: 402.99138345708127,
				y: 78.38347904005401,
				z: 320.56152044226974,
			},
			type: '2',
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
				x: 2060.2552644149055,
				y: 120.44420584070323,
				z: -317.726104194498,
			},
			type: '1',
		},
		{
			id: 'wind_fan_2',
			point: {
				x: 2029.5590822002057,
				y: 145.59708354335675,
				z: 562.5021115191154,
			},
			type: '2',
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
			:cameraPosition="cameraPosition"
			:controls-options="controlsOptions"
			:lights="lights"
			:camera-size="1"
			:backgroundAlpha="0"
			@load="onLoad"
			@onClick="onClick"
			@onModel="onModel"
			@readyCamera="readyCamera"
		>
			<template #label v-if="isReady">
				<div v-for="i in labelList" :id="i.id" class="model_label_1">
					<div class="model_label_1_body">
						<span>蝶阀开度：{{ i.aperture }}</span>
						<div class="label_text_value">
							<span>转速rpm：{{ i.rotationSpeed }}</span>
							<span>转速rpm：{{ i.rotationSpeed2 }}</span>
						</div>
					</div>
				</div>
			</template>
			<template v-if="isWindReady">
				<div v-for="i in windAnimationList" :id="i.id" class="model_wind_1"></div>
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
		font-size: vh(20);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #ffffff;
		.label_text_value {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: vh(16);
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
