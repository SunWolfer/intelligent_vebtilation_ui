<!--三维通风系统图编辑-->
<script setup>
	import useThree from '@/hooks/useThree'
	import { useModel } from '@/hooks/useModel'
	import useEquipmentData from '@/hooks/useEquipmentData'
	import { EditType } from '@/components/VueThree/types/editType'
	import HomeModelType from '@/views/components/home/HomeModelType.vue'

	const props = defineProps({
		//   编辑类型
		editType: {
			type: Number,
			default: 0,
		},
		//   自定义数据
		customizeData: {
			type: Array,
			default: [],
		},
		//   自定义数据最大值
		customizeMaxNodeNum: {
			type: Number,
			default: 0,
		},
	})

	const emits = defineEmits(['tunnelHandle', 'chooseTunnel'])

	const {
		homeModelVisible,
		otherThreeMod,
		controlsOptions,
		lights,
		onLoad,
		onModel,
		onClick,
		operateModel,
		intersected,
		intersectedPosition,
	} = useThree()
	// 显示全部设备图标
	const { equipTypeImgClass } = useEquipmentData()

	const { isReady, allTypeList, loadAllTypeList } = useModel(operateModel)

	// 监听点击事件
	watch(
		() => intersected.value,
		(value) => {
			//   判断是否是巷道
			const name = value?.name
			if (!name) return
			const names = name.split('-')
			if (names.length === 2) {
				if (EditType.DEFAULT === props.editType) {
					emits('tunnelHandle', value, intersectedPosition.value)
				} else {
					emits('chooseTunnel', value, intersectedPosition.value)
				}
			} else {
				// 清空选中巷道
				emits('chooseTunnel', undefined, undefined)
			}
		},
	)

	//   双击
	const dblclick = (event, CIntersected) => {}
	//   相机事件完成
	const readyCamera = () => {
		//   添加图标
		loadAllTypeList?.()
    // 添加巷道名字贴图
    operateModel.value?.createdImgPlane()
	}
	//   获取改变巷道
	const changeHandle = () => {
		return homeModelVisible.value.tunnelMesh.overEditHandle()
	}
	// 保存并重绘巷道
	const redrawModel = (redrawList) => {
		return homeModelVisible.value.tunnelMesh.redrawModel(redrawList)
	}
	defineExpose({
		changeHandle,
		redrawModel,
	})
</script>

<template>
	<div class="fullDom">
		<model-node-edit
			ref="homeModelVisible"
			:customize="true"
			:customize-data="customizeData"
			:customize-max-node-num="customizeMaxNodeNum"
			:other-three-mod="otherThreeMod"
			:lights="lights"
			:camera-size="0.1"
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
				<div v-for="i in allTypeList" :key="i.uniqueCode" :id="i.uniqueCode" class="wind_label_bg">
					<div class="wind_three_label">
						<div class="three_label_header">
							<div :class="'home_map_' + equipTypeImgClass(i.devType)"></div>
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
