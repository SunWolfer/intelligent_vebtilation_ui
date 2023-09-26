<script setup>
	import useThree from '@/hooks/useThree'
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	import threeModel from '@/store/modules/threeModel'

	const props = defineProps({
		labelList: {
			type: Array,
			default: [],
		},
		routeList: {
			type: Array,
			default: [],
		},
	})

	const {
		homeModelVisible,
		controlsOptions,
		lights,
		onLoad,
		onModel,
		dblclick,
		operateModel,
		intersected,
		intersectedPosition,
	} = useThree()

	const cameraLoad = ref(false)

	const isReady = ref(false)

	watch(
		() => props.labelList,
		() => {
			if (!cameraLoad.value) return
			isReady.value = false
			nextTick().then(() => {
				loadAllTypeList()
			})
		},
	)
	const loadAllTypeList = () => {
		isReady.value = true
		nextTick().then(() => {
			operateModel.value?.addWrapperLabels(props.labelList, 'id')
		})
	}
	watch(
		() => props.routeList,
		() => {
			if (!cameraLoad.value) return
			changeModelColor?.()
		},
	)
	const modelData = threeModel()
	const threeData = modelData.data
	// 创建避灾路线流动线
	const changeModelColor = () => {
		operateModel.value?.cleanMoveModel(-1)
		for (let i = 0; i < threeData.length; i++) {
			const model = threeData[i]
			for (let j = 0; j < props.routeList.length; j++) {
				let points = []
				const data = props.routeList[j]
				const names = data.node.split('-')
				if (names[0] === model.nodeName && names[1] === model.nextNode) {
					points.push(model.nodePosition)
					points.push(model.nextNodePosition)
					operateModel.value?.addFlowLine(points)
				}
			}
		}
	}

	function readyCamera() {
		cameraLoad.value = true
		isReady.value = false
		nextTick().then(() => {
			loadAllTypeList()
		})
		changeModelColor()
		// 添加巷道名字贴图
		operateModel.value?.createdImgPlane()
	}

	const emits = defineEmits(['addNode', 'removeNode', 'addTunnel', 'removeTunnel'])
	const { proxy } = useCurrentInstance()
	//   监听点击事件
	function onClick(event, CIntersected) {
		if (!CIntersected) {
			intersected.value = null
			return
		}
		intersected.value = CIntersected?.object
		intersectedPosition.value = CIntersected?.point
		const names = intersected.value.name.split('-')
		//   点击到节点
		if (names.length === 1) {
			clickNode?.(intersected.value.name)
		} else if (names.length === 2) {
			if (names[0] === 'line') return
			clickTunnel?.(intersected.value.name)
		}
	}

	//   点击到节点
	const clickNode = (name) => {
		const index = props.labelList.findIndex((i) => {
			return i.node === name
		})
		if (index === -1) {
			const { x, y, z } = intersected.value.position
			proxy.$modal
				.prompt({
					title: '提示',
					message: `是否确认添加${name}节点`,
				})
				.then(() => {
					emits('addNode', {
						node: name,
						pointX: x,
						pointY: y,
						pointZ: z,
					})
				})
				.catch(() => {})
		} else {
			proxy.$modal
				.prompt({
					title: '提示',
					message: `是否确认删除${name}节点`,
				})
				.then(() => {
					emits('removeNode', index)
				})
				.catch(() => {})
		}
	}
	//   点击到巷道
	const clickTunnel = (name) => {
		const index = props.routeList.findIndex((i) => {
			return i.node === name
		})
		if (index === -1) {
			emits('addTunnel', name)
		} else {
			proxy.$modal
				.prompt({
					title: '提示',
					message: `是否确认删除${name}巷道`,
				})
				.then(() => {
					emits('removeTunnel', index)
				})
				.catch(() => {})
		}
	}
</script>

<template>
	<div class="fullDom">
		<model-generation
			ref="homeModelVisible"
			:lights="lights"
			:camera-size="0.1"
			:backgroundAlpha="0"
			:controlsOptions="controlsOptions"
			:choose-group="true"
			@load="onLoad"
			@onModel="onModel"
			@onClick="onClick"
			@onDblclick="dblclick"
			@ready-camera="readyCamera"
		>
			<template #label v-if="isReady">
				<div v-for="i in labelList" :key="i.id" :id="i.id" class="dis_route_label">
					<div class="dis_route_label_content" @click="clickNode(i.node)"></div>
				</div>
			</template>
		</model-generation>
	</div>
</template>

<style scoped lang="scss">
	.dis_route_label {
		width: vw(136);
		height: vw(126);
		position: absolute;
		top: vw(-63);
		background-image: url('@/assets/images/venManagement/dis2.png');
		background-size: 100% 100%;
	}
	.dis_route_label_content {
		width: 100%;
		height: 50%;
		pointer-events: auto;
		cursor: pointer;
	}
</style>
