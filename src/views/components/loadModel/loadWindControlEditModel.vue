<!--自然分风网络测算-->
<script setup>
	import useThree from '@/hooks/useThree'
	import useEquipmentData from '@/hooks/useEquipmentData'
	import TunnelMessage from '@/views/components/equiptmentMsg/TunnelMessage.vue'
	import { EditType } from '@/components/VueThree/types/editType'
	import { useModel } from '@/hooks/useModel'

	const props = defineProps({
		fontList: {
			type: Array,
			default: () => {
				return []
			},
		},
		//   编辑类型
		editType: {
			type: Number,
			default: 0,
		},
		//  确认添加风窗
		confirmAddWindow: {
			type: Boolean,
			default: true,
		},
		//   确认添加巷道
		confirmAddTunnel: {
			type: Boolean,
			default: true,
		},
	})

	watch(
		() => props.fontList,
		(val) => {
			operateModel.value.created3DFont(val)
		},
	)

	// 确认添加风窗
	watch(
		() => props.confirmAddWindow,
		(val) => {
			if (!val) {
				temporaryLabelList.value.pop()
			}
		},
	)
	// 确认添加巷道
	watch(
		() => props.confirmAddTunnel,
		(val) => {
			if (!val) {
				const tunnelList = homeModelVisible.value.tunnelMesh.newTunnel
				const lastTunnel = tunnelList[tunnelList.length - 1]
				const name = lastTunnel.nodeName + '-' + lastTunnel.nextNode
				const Iintersected = {
					object: {
						name: name,
					},
				}
				homeModelVisible.value.tunnelMesh.deleteTunnel(Iintersected)
			}
		},
	)

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

	const { isReady, allTypeList, loadAllTypeList, temReady, temporaryLabelList } =
		useModel(operateModel)

	function readyCamera() {
		//   添加风流
		homeModelVisible.value?.addWind()
		//   添加风网解算文字
		operateModel.value.created3DFont(props.fontList)
		//   添加图标
		loadAllTypeList?.()
	}
	const emits = defineEmits(['addWindow', 'readyConnect'])
	// 双击
	function dblclick(event, CIntersected) {
		if (!CIntersected) return
		// 添加风门
		if (props.editType === EditType.DOOR) {
			let obj = {
				id: 'door' + Math.random(),
				point: CIntersected.point,
				type: '1',
				name: CIntersected.object.name ?? '',
			}
			temporaryLabelList.value.push(obj)
		}
		//   添加风窗
		if (props.editType === EditType.WINDOW) {
			let obj = {
				id: 'window' + Math.random(),
				point: CIntersected.point,
				type: '2',
				name: CIntersected.object.name ?? '',
			}
			emits('addWindow', obj.name)
			temporaryLabelList.value.push(obj)
		}
		//   添加密闭墙
		if (props.editType === EditType.WALL) {
			let obj = {
				id: 'wall' + Math.random(),
				point: CIntersected.point,
				type: '3',
				name: CIntersected.object.name ?? '',
			}
			temporaryLabelList.value.push(obj)
		}
	}

	// 连接巷道完成
	function readyConnect(name) {
		emits('readyConnect', name)
	}

	// 删除设备
	const deleteDevice = (index) => {
		if (props.editType === EditType.DELETE) temporaryLabelList.value.splice(index, 1)
	}
	// 获取操作步骤
	function getOperating() {
		return {
			deviceList: temporaryLabelList.value,
			tunnelList: homeModelVisible.value.tunnelMesh.newTunnel,
		}
	}
	// 重置巷道
	function resetTunnel() {
		temporaryLabelList.value = []
		homeModelVisible.value.tunnelMesh.emptyNewTunnel()
	}

	defineExpose({
		operateModel,
		getOperating,
		resetTunnel,
	})
</script>

<template>
	<div class="fullDom">
		<model-node-edit
			ref="homeModelVisible"
			:other-three-mod="otherThreeMod"
			:cameraPosition="cameraPosition"
			:lights="lights"
			:camera-size="10"
			:backgroundAlpha="0"
			:controlsOptions="controlsOptions"
			:choose-group="true"
			:edit-type="editType"
			@load="onLoad"
			@onModel="onModel"
			@onClick="onClick"
			@onDblclick="dblclick"
			@ready-camera="readyCamera"
			@readyConnect="readyConnect"
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
			<template #default>
				<tunnel-message
					v-if="editType === EditType.DEFAULT"
					:intersected="intersected"
					:operate-model="operateModel"
				/>
				<template v-if="temReady">
					<div
						v-for="(i, index) in temporaryLabelList"
						class="wind_label_bg"
						:key="i.id"
						:id="i.id"
					>
						<div class="wind_three_label">
							<div class="three_label_header">
								<div @click="deleteDevice(index)" :class="'icon_map_' + i.type"></div>
							</div>
							<div class="three_label_footer"></div>
						</div>
					</div>
				</template>
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
	.icon_map_1 {
		@include homeMap;
		pointer-events: auto;
		cursor: pointer;
		background-image: url('@/assets/images/windControlAssMaking/icon_1.png');
	}
	.icon_map_2 {
		@include homeMap;
		pointer-events: auto;
		cursor: pointer;
		background-image: url('@/assets/images/windControlAssMaking/icon_2.png');
	}
	.icon_map_3 {
		@include homeMap;
		pointer-events: auto;
		cursor: pointer;
		background-image: url('@/assets/images/windControlAssMaking/icon_3.png');
	}
</style>
