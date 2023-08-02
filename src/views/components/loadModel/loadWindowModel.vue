<script setup lang="ts">
	import { OperateModel } from '@/components/VueThree/IModelOperate'
	import useThree from '@/hooks/useThree'
	import { Object3D } from 'three'

	const {
		homeModelVisible,
		indoorFileUrl,
		cameraPosition,
		removePosition,
		removeLookAt,
		lights,
		onClick,
	} = useThree()
	indoorFileUrl.value = import.meta.env.BASE_URL + 'file/fengchuang.FBX'

	cameraPosition.x = 1159.877256192039
	cameraPosition.y = 248.12348365073817
	cameraPosition.z = 789.3791784874053

	removePosition.x = 799.0917014199865
	removePosition.y = 249.50481701643704
	removePosition.z = 528.3355869681393

	removeLookAt.x = 94.71333168792881
	removeLookAt.y = 88.36218453484395
	removeLookAt.z = -155.67053278155916

	lights.value = [
		{
			type: 'Ambientlight',
			color: 0xffffff,
			intensity: 6,
		},
	]

	function onLoad() {
		homeModelVisible.value?.cameraReset(removePosition, removeLookAt, 1)
	}

	const props = defineProps({
		percentage: {
			type: Number,
			default: 0,
		},
	})

	let endNum = '1.00' // 规范化90度值

	watch(
		() => props.percentage,
		(val, oldV) => {
			endNum = ((1.5 * val) / 100).toFixed(2)
			if (val > oldV) {
				setMod('open')
			} else {
				setMod('close')
			}
		},
	)

	// 模型编辑类
	const operateModel = ref<OperateModel>()
	// 模型编辑类加载
	function onModel(modelCLass: OperateModel) {
		operateModel.value = modelCLass
		setMod('open')
	}

	const startOneId = ref(0)
	const endOneId = ref(0)
	let onceNum = Math.PI / 1800 // 旋转0.1度

	function rotateStartOne() {
		if (!operateModel.value?.object) return
		let sceneObj = operateModel.value.object
		let rObj = new Object3D()
		sceneObj.traverse((obj) => {
			// 递归遍历所有子对象
			if (obj.name === 'name-01') {
				obj.rotateY(onceNum)
				rObj = obj
			}
			if (
				obj.name === 'name-02' ||
				obj.name === 'name-03' ||
				obj.name === 'name-04' ||
				obj.name === 'name-05' ||
				obj.name === 'name-06' ||
				obj.name === 'name-07' ||
				obj.name === 'name-08' ||
				obj.name === 'name-09'
			) {
				obj.rotateY(onceNum)
			}
		})
		startOneId.value = requestAnimationFrame(rotateStartOne)
		if (
			rObj &&
			Number(rObj.rotation.y.toFixed(2)) > Number(endNum) - 0.01 &&
			Number(rObj.rotation.y.toFixed(2)) < Number(endNum) + 0.01
		) {
			cancelAnimationFrame(startOneId.value)
		}
	}
	function rotatEndOne() {
		if (!operateModel.value?.object) return
		let sceneObj = operateModel.value.object
		let rObj = new Object3D()
		sceneObj.traverse((obj) => {
			// 递归遍历所有子对象
			if (obj.name === 'name-01') {
				obj.rotateY(-onceNum)
				rObj = obj
			}
			if (
				obj.name === 'name-02' ||
				obj.name === 'name-03' ||
				obj.name === 'name-04' ||
				obj.name === 'name-05' ||
				obj.name === 'name-06' ||
				obj.name === 'name-07' ||
				obj.name === 'name-08' ||
				obj.name === 'name-09'
			) {
				obj.rotateY(-onceNum)
			}
		})
		endOneId.value = requestAnimationFrame(rotatEndOne)
		if (
			rObj &&
			(rObj.rotation.y.toFixed(2) === Number(endNum).toFixed(2) ||
				Number(rObj.rotation.y.toFixed(2)) === Number(endNum) - 0.01 ||
				Number(rObj.rotation.y.toFixed(2)) === Number(endNum) + 0.01)
		) {
			cancelAnimationFrame(endOneId.value)
		}
	}
	function setMod(val: string) {
		if (val === 'open') {
			cancelAnimationFrame(endOneId.value)
			rotateStartOne()
		} else if (val === 'close') {
			cancelAnimationFrame(startOneId.value)
			rotatEndOne()
		} else {
		}
	}
</script>

<template>
	<div class="fullDom">
		<model-fbx
			ref="homeModelVisible"
			:src="indoorFileUrl"
			:cameraPosition="cameraPosition"
			:lights="lights"
			:camera-size="1"
			:backgroundAlpha="0"
			@load="onLoad"
			@click="onClick"
			@onModel="onModel"
		></model-fbx>
	</div>
</template>

<style scoped lang="scss"></style>
