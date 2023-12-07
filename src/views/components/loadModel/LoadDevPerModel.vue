<template>
	<div class="fullDom">
		<model-generation
			ref="homeModelVisible"
			v-if="customizeData.length"
			:lights="lights"
			:camera-size="0.1"
			:backgroundAlpha="0"
			:controlsOptions="controlsOptions"
			:choose-group="true"
			:customize="true"
			:customize-data="customizeData"
			:customize-max-node-num="maxNodeNum"
			@load="onLoad"
			@onModel="onModel"
			@onClick="onClick"
			@onDblclick="dblclick"
		>
			<template #label v-if="isReady">
				<div v-for="i in labelList" :id="i.id" class="label_bg">
					<EnvLabel :data="i" />
				</div>
			</template>
		</model-generation>
	</div>
</template>

<script setup lang="ts">
	import { pointConfig } from '@/components/VueThree/effect/IHeatmap'
	import useThree from '@/hooks/useThree'
	import { useLoading } from '@/hooks/useLoading'
	import { getRoadwayModel } from '@/api/api/home'
	import EnvLabel from '@/views/sysFusionPerception/envPerception/EnvLabel.vue'
	import { PropType } from 'vue'

	const props = defineProps({
		showCloud: {
			type: Boolean,
			default: false,
		},
		cloudDataList: {
			type: Array as PropType<pointConfig[]>,
			default: [],
		},
		labelList: {
			type: Array as PropType<LabelAttribute[]>,
			default: [],
		},
	})
	watch(
		() => props.showCloud,
		(value) => {
			if (!hasLoad.value || props.cloudDataList.length === 0) return
			if (value) {
				operateModel.value?.createdHeatmap(props.cloudDataList)
			} else {
				operateModel.value?.createdHeatmap([])
			}
		},
	)
	watch(
		() => props.labelList,
		(value) => {
			isReady.value && nextFun(value)
		},
	)

	const {
		homeModelVisible,
		controlsOptions,
		lights,
		onModel,
		onClick,
		dblclick,
		createdLabelList,
		operateModel,
		removePosition,
		removeLookAt,
		intersected,
		intersectedPosition,
	} = useThree()
	// 自定义数据
	const customizeData = ref([])
	// 最大节点
	const maxNodeNum = ref(0)
	/**
	 * 加载模型数据
	 * @return {Promise<void>}
	 */
	const getModelData = async (): Promise<void> => {
		const { loading } = useLoading('正在加载数据，请稍候')
		await getRoadwayModel({
			type: '2',
		})
			.then((res) => {
				customizeData.value = res.data.model
				maxNodeNum.value = parseInt(res.data.maxCode)
				loading.close()
			})
			.catch(() => {
				loading.close()
			})
	}
	const hasLoad = ref(false)
	const onLoad = () => {
		hasLoad.value = true
		operateModel.value?.traMovement(removePosition, removeLookAt, 3, readyCamera)
	}

	const isReady = ref(false)
	const readyCamera = () => {
		nextFun(props.labelList)
	}

	const nextFun = (list: LabelAttribute[]) => {
		if (!list?.length) return
		isReady.value = false
		nextTick().then(() => {
			isReady.value = true
			nextTick(() => {
				createdLabelList?.(list, 'id')
			})
		})
	}
	/**
	 * 相机移动
	 * @param toPosition 相机移动位置
	 * @param toLookAt 相机注视点
	 * @param time 相机移动时间
	 * @param nextFun 移动完成后执行
	 */
	const moveCameraPosition = (
		toPosition: ICoordinates,
		toLookAt: ICoordinates,
		time = 1,
		nextFun = () => {},
	) => {
		operateModel.value?.traMovement(toPosition, toLookAt, time, nextFun)
	}

	defineExpose({
		moveCameraPosition,
		intersected,
		intersectedPosition,
	})

	getModelData()
</script>

<style lang="scss" scoped>
	.label_bg {
		position: absolute;
		left: vh(77);
		top: vh(-50);
	}
</style>
