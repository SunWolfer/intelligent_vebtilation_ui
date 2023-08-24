<!--三维通风系统图编辑-->
<script setup>
	import useThree from '@/hooks/useThree'
	import { useModel } from '@/hooks/useModel'
	import useEquipmentData from '@/hooks/useEquipmentData'

	const props = defineProps({
		//   编辑类型
		editType: {
			type: Number,
			default: 0,
		},
	})

	const {
		homeModelVisible,
		otherThreeMod,
		cameraPosition,
		controlsOptions,
		lights,
		onLoad,
		onModel,
		onClick,
		operateModel,
		intersected,
	} = useThree()
	// 显示全部设备图标
	const { equipTypeImgClass } = useEquipmentData()

	const { isReady, allTypeList, loadAllTypeList } = useModel(operateModel)

	//   双击
	const dblclick = (event, CIntersected) => {}
	//   相机事件完成
	const readyCamera = () => {
		//   添加图标
		loadAllTypeList?.()
	}
</script>

<template>
	<div class="fullDom">
		<model-node-edit
			ref="homeModelVisible"
			:other-three-mod="otherThreeMod"
			:cameraPosition="cameraPosition"
			:lights="lights"
			:camera-size="1"
			:backgroundAlpha="0"
			:controlsOptions="controlsOptions"
			:choose-group="true"
			:edit-type="editType"
			plane-visible
			@load="onLoad"
			@onModel="onModel"
			@onClick="onClick"
			@onDblclick="dblclick"
			@ready-camera="readyCamera"
		>
			<!--			显示全部设备图标-->
			<template #label v-if="isReady">
				<div v-for="i in allTypeList" :key="i.id" :id="i.id" class="wind_label_bg">
					<div class="wind_three_label">
						<div class="three_label_header">
							<div :class="'home_map_' + equipTypeImgClass(i.type)"></div>
						</div>
						<div class="three_label_footer"></div>
					</div>
				</div>
			</template>
		</model-node-edit>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_map';
	.wind_label_bg {
		position: absolute;
		top: vh(-50);
	}
	.wind_three_label {
		display: grid;
		grid-template-columns: vh(50);
		grid-template-rows: vh(50) vh(45);
		grid-template-areas:
			'header'
			'footer';
		justify-items: center;
	}
</style>
