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
	indoorFileUrl.value = import.meta.env.BASE_URL + 'file/fengmen.fbx'

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
		playmod: {
			type: String,
			default: '',
		},
		doorOpenIndex: {
			// 风门默认开启状态
			type: String,
		},
		dataForm: {
			type: Object,
			default() {
				return null
			},
		},
	})

	watch(
		() => props.playmod,
		(val) => {
			setMod(val)
		},
	)

	const startOpenOne = ref(false) // 记录1门开
	const startOpenTwice = ref(false) // 记录2门开
	const startCloseTwice = ref(false) // 记录2门关
	const startOneId = ref(0) // 1门开事件
	const endOneId = ref(0) // 1门关事件
	const endTwiceId = ref(0) // 2门开事件
	const startTwiceId = ref(0) // 2门关事件
	const endNum = (Math.PI / 2).toFixed(6) // 规范化90度值
	const onceNum = Math.PI / 360 // 旋转2度
	const oneDoor = ref<number[]>([]) // 记录1门初始旋转值
	const twoDoor = ref<number[]>([]) // 记录2门初始旋转值

	// 模型编辑类
	const operateModel = ref<OperateModel>()
	// 模型编辑类加载
	function onModel(modelCLass: OperateModel) {
		operateModel.value = modelCLass

		let objs = operateModel.value.object
		objs.traverse((obj) => {
			// 递归遍历所有子对象
			if (obj.name === 'Men-01') {
				oneDoor.value[0] = obj.rotation.z
			} else if (obj.name === 'Men-02') {
				oneDoor.value[1] = obj.rotation.z
			} else if (obj.name === 'Men-03') {
				twoDoor.value[0] = obj.rotation.z
			} else if (obj.name === 'Men-04') {
				twoDoor.value[1] = obj.rotation.z
			}
		})
		setMod(props.dataForm.openDoorFlag1 === '1' ? 'men1kai' : 'men1guan')
		setMod(props.dataForm.openDoorFlag2 === '1' ? 'men2kai' : 'men2guan')
	}

	function rotateStartOne() {
		if (!operateModel.value?.object) return
		let sceneObj = operateModel.value.object
		let rObj: Object3D = new Object3D()
		sceneObj.traverse((obj) => {
			// 递归遍历所有子对象
			if (obj.name === 'Men-01') {
				obj.rotateZ(onceNum)
				rObj = obj
			}
			if (obj.name === 'Men-02') {
				obj.rotateZ(onceNum)
			}
		})
		startOneId.value = requestAnimationFrame(rotateStartOne)
		if (rObj.rotation.z.toFixed(6) === endNum) {
			cancelAnimationFrame(startOneId.value)
		}
	}
	function rotatEndOne() {
		if (!operateModel.value?.object) return
		let sceneObj = operateModel.value.object
		let rObj: Object3D = new Object3D()
		sceneObj.traverse((obj) => {
			// 递归遍历所有子对象
			if (obj.name === 'Men-01') {
				obj.rotateZ(-onceNum)
				rObj = obj
			}
			if (obj.name === 'Men-02') {
				obj.rotateZ(-onceNum)
			}
		})
		endOneId.value = requestAnimationFrame(rotatEndOne)
		let a = 0.02
		let b = 0.03
		let c = -0.01
		let d = -0.02
		let runa = rObj.rotation.z.toFixed(2) === a.toFixed(2)
		let runb = rObj.rotation.z.toFixed(2) === b.toFixed(2)
		let runc = rObj.rotation.z.toFixed(2) === c.toFixed(2)
		let rund = rObj.rotation.z.toFixed(2) === d.toFixed(2)
		if (runa || runb || runc || rund) {
			cancelAnimationFrame(endOneId.value)
			sceneObj.traverse((obj) => {
				// 递归遍历所有子对象
				if (obj.name === 'Men-01') {
					obj.rotation.z = oneDoor.value[0]
				} else if (obj.name === 'Men-02') {
					obj.rotation.z = oneDoor.value[1]
				}
			})
		}
	}
	function rotateStartTwice() {
		if (!operateModel.value?.object) return
		let sceneObj = operateModel.value.object
		let rObj: Object3D = new Object3D()
		sceneObj.traverse((obj) => {
			// 递归遍历所有子对象
			if (obj.name === 'Men-03') {
				obj.rotateZ(onceNum)
				rObj = obj
			}
			if (obj.name === 'Men-04') {
				obj.rotateZ(onceNum)
			}
		})
		startTwiceId.value = requestAnimationFrame(rotateStartTwice)
		if (rObj.rotation.z.toFixed(6) === endNum) {
			cancelAnimationFrame(startTwiceId.value)
		}
	}
	function rotatEndTwice() {
		if (!operateModel.value?.object) return
		let sceneObj = operateModel.value.object
		let rObj: Object3D = new Object3D()
		sceneObj.traverse((obj) => {
			// 递归遍历所有子对象
			if (obj.name === 'Men-03') {
				obj.rotateZ(-onceNum)
				rObj = obj
			}
			if (obj.name === 'Men-04') {
				obj.rotateZ(-onceNum)
			}
		})
		endTwiceId.value = requestAnimationFrame(rotatEndTwice)
		let a = 0.02
		let b = 0.03
		let c = -0.01
		let d = -0.02
		let runa = rObj.rotation.z.toFixed(2) === a.toFixed(2)
		let runb = rObj.rotation.z.toFixed(2) === b.toFixed(2)
		let runc = rObj.rotation.z.toFixed(2) === c.toFixed(2)
		let rund = rObj.rotation.z.toFixed(2) === d.toFixed(2)
		if (runa || runb || runc || rund) {
			cancelAnimationFrame(endTwiceId.value)
			sceneObj.traverse((obj) => {
				// 递归遍历所有子对象
				if (obj.name === 'Men-03') {
					obj.rotation.z = twoDoor.value[0]
				} else if (obj.name === 'Men-04') {
					obj.rotation.z = twoDoor.value[1]
				}
			})
		}
	}
	function setMod(val: string) {
		if (val === 'men1kai') {
			startOpenOne.value = true
			cancelAnimationFrame(endOneId.value)
			rotateStartOne()
		} else if (val === 'men1guan') {
			startCloseTwice.value = true
			cancelAnimationFrame(startOneId.value)
			rotatEndOne()
		} else if (val === 'men2kai') {
			startOpenTwice.value = true
			cancelAnimationFrame(endTwiceId.value)
			rotateStartTwice()
		} else if (val === 'men2guan') {
			startCloseTwice.value = true
			cancelAnimationFrame(startTwiceId.value)
			rotatEndTwice()
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
