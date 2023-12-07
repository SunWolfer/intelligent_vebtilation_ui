<!--测风站-->
<script setup>
	import useThree from '@/hooks/useThree'
	import { parseTime } from '@/utils/ruoyi'

	const {
		homeModelVisible,
		indoorFileUrl,
		lights,
		onClick,
		onModel,
		operateModel,
		createdLabelList,
	} = useThree()
	const controlsOptions = reactive({
		enabled: false,
	})
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
		choose: {
			type: Number,
			default: -1,
		},
		aneTableData: {
			type: Array,
			default: [],
		},
	})
	const hasReadyCamera = ref(false)
	function readyCamera() {
		hasReadyCamera.value = true
		operateModel.value.initDefaultAnimation()
		if (props.choose !== -1) {
			nextFun()
		}
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
	const isReady = ref(false)
	watch(
		() => props.choose,
		() => {
			hasReadyCamera.value && nextFun()
		},
	)
	const domId = ref('cfz' + Math.random())
	const nextFun = () => {
		isReady.value = false
		nextTick().then(() => {
			isReady.value = true
			nextTick().then(() => {
				const obj = {
					id: domId.value,
					point: {
						x: -0.3914063290604412,
						y: 3.859988922707604,
						z: -1.4659491660095814,
					},
				}
				createdLabelList?.(props.choose === -1 ? [] : [obj])
			})
		})
	}
	const dateTime = ref('')
	const timeInterval = ref(-1)
	timeInterval.value = setInterval(() => {
		dateTime.value = parseTime(new Date())
	}, 1000)

	onBeforeUnmount(() => {
		clearInterval(timeInterval.value)
	})
</script>

<template>
	<div class="fullDom">
		<model-gltf
			ref="homeModelVisible"
			:src="indoorFileUrl"
			:lights="lights"
			:camera-size="0.1"
			:backgroundAlpha="0"
			:controls-options="controlsOptions"
			@load="onLoad"
			@onClick="onClick"
			@onModel="onModel"
			@readyCamera="readyCamera"
		>
			<template #label v-if="isReady">
				<div class="full_body_model_full_bg" v-show="choose !== -1" :id="domId">
					<div class="full_body_model_item_bg full_body_model_text">
						<span>自动测风站记录</span>
						<span>{{ dateTime }}</span>
						<div class="full_body_l2_item_text_table">
							<template v-for="item in aneTableData">
								<div class="full_body_l2_item_text_table_item">
									<span>{{ item.label + '  ' + item.value }}</span>
									<span>{{ item.unit }}</span>
								</div>
							</template>
						</div>
					</div>
				</div>
			</template>
		</model-gltf>
	</div>
</template>

<style scoped lang="scss">
	.full_body_model_full_bg {
		position: absolute;
		width: vw(755);
		height: vw(228);
		display: grid;
		grid-template-columns: vw(350) 1fr;
		grid-template-rows: 1fr;
		background-image: url('@/assets/images/accPerOfRomance/cfz_bg.png');
		background-size: 100% 100%;
		left: vw(330);
	}
	.full_body_model_item_bg {
		grid-area: 1/2/2/3;
		width: vw(405);
		height: vh(228);
		padding: vh(20) vw(20) vh(10) vw(20);
	}
	.full_body_model_text {
		display: grid;
		grid-template-rows: vw(40) vw(26) vw(115);
		grid-template-columns: 1fr;
		align-items: center;
		span {
			font-family:
				Source Han Sans CN,
				serif;
			font-weight: bold;
			color: #ffffff;
			&:nth-child(1) {
				font-size: vw(30);
				justify-self: center;
			}
			&:nth-child(2) {
				font-size: vw(14);
				justify-self: end;
			}
		}
	}
	.full_body_l2_item_text_table {
		display: grid;
		height: 100%;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(auto-fill, vw(23));
		grid-auto-rows: vw(23);
		align-items: center;
		.full_body_l2_item_text_table_item {
			span {
				color: #ffff00;
				font-size: vw(14);
				font-family:
					Source Han Sans CN,
					serif;
				font-weight: bold;
				&:nth-child(1) {
					justify-self: start;
				}
				&:nth-child(2) {
					justify-self: center;
				}
				box-shadow: 0 0 10px 5px rgba(139, 31, 43, 0.8);
				background: radial-gradient(circle, rgba(139, 31, 43, 0.8) 80%, rgba(182, 36, 36, 0));
			}
			border: 1px solid #ffff00;
			display: grid;
			width: 100%;
			height: 100%;
			padding: 0 vw(10);
			grid-template-columns: 2fr 1fr;
			align-items: center;
		}
	}
</style>
