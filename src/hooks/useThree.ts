import type { OperateModel } from '@/components/VueThree/IModelOperate'
import ModelGltf from '@/components/VueThree/model-gltf.vue'
import { Object3D, Vector3 } from 'three'
import { Intersection } from 'three/src/core/Raycaster'

const useThree = () => {
	const homeModelVisible = ref<InstanceType<typeof ModelGltf>>()
	// 3D文件路径
	const indoorFileUrl = ref('')
	// 引用其他3D文件
	const otherThreeMod = ref<IOtherThreeMod[]>([])

	// 初始化相机位置
	const cameraPosition = reactive({
		x: 0,
		y: 10000,
		z: 0,
	})
	//初始化后相机位置
	const removePosition = reactive({
		x: 80.25202350933255,
		y: 717.8519898104702,
		z: 5.67857044598486,
	})
	// 初始化后相机朝向点
	const removeLookAt = reactive({
		x: 72.44309788343183,
		y: 113.24693261244929,
		z: -358.828878905651,
	})

	// 相机移动固定参数
	const cameraExcursion = ref({
		x: 100,
		y: 200,
		z: 100,
	})

	// 控制器默认参数
	const controlsOptions = reactive({
		zoomSpeed: 5,
	})
	// 默认灯光
	const lights = ref<any>([
		{
			type: 'DirectionalLight',
			position: { x: 1, y: 1, z: 1 },
			color: 0xffffff,
			intensity: 1.2,
		},
		{
			type: 'ambientlight',
			color: 0xffffff,
			intensity: 1.5,
		},
	])
	// 相机坐标
	const cameraWorldPosition = ref<Vector3>()
	// 相机朝向点
	const cameraLookAtPoint = ref<Vector3>()
	// 点击对象
	const intersected = ref<Object3D | null | undefined>()
	// 点击位置
	const intersectedPosition = ref<Vector3>()

	// 单击
	function onClick(_event: MouseEvent, CIntersected: Intersection) {
		if (!CIntersected) {
			intersected.value = null
			return
		}
		intersected.value = CIntersected?.object
		intersectedPosition.value = CIntersected?.point
		cameraWorldPosition.value = homeModelVisible.value?.camera.position
		cameraLookAtPoint.value = homeModelVisible.value?.controls?.target
		console.log('---------点击对象---------')
		console.log(intersected.value)
		console.log('---------点击位置---------')
		console.log(intersectedPosition.value)
		console.log('---------相机位置---------')
		console.log(cameraWorldPosition.value)
		console.log('---------相机朝向点---------')
		console.log(cameraLookAtPoint.value)
	}

	// 双击
	function dblclick(_event: MouseEvent, _CIntersected: any) {}

	// 全部模型加载完毕后执行
	function onLoad() {
		homeModelVisible.value?.cameraReset(removePosition, removeLookAt, 3)
	}
	// 模型编辑类
	const operateModel = ref<OperateModel>()
	// 模型编辑类加载
	function onModel(modelCLass: OperateModel) {
		operateModel.value = modelCLass
	}

	// 相机移动完成
	function readyCamera() {
		operateModel.value?.createdImgPlane()
	}

	//重置控制器
	function resetControls() {
		if (!homeModelVisible.value) return
		homeModelVisible.value.controls?.saveState()
		nextTick().then(() => {
			homeModelVisible.value!.controls?.reset()
		})
	}
	// 	创建自定义平面
	const createdGeometry = (planeGeometryList: Point[]) => {
		operateModel.value?.addGeometry(planeGeometryList)
	}
	// 改变相机位置、
	const changeCameraPosition = (toPosition: ICoordinates, toLookAt: ICoordinates, time = 3) => {
		homeModelVisible.value?.cameraReset(toPosition, toLookAt, time)
	}
	// 创建2D标签
	const createdLabelList = (list: LabelAttribute[], domKey = 'id') => {
		operateModel.value?.addWrapperLabels(list, domKey)
	}
	// 保存主模型
	const saveModel = () => {
		operateModel.value?.exportObjects()
	}

	return {
		ModelGltf,
		indoorFileUrl,
		otherThreeMod,
		cameraPosition,
		removePosition,
		removeLookAt,
		cameraExcursion,
		controlsOptions,
		lights,
		homeModelVisible,
		onLoad,
		onModel,
		onClick,
		dblclick,
		readyCamera,
		intersectedPosition,
		intersected,
		resetControls,
		createdGeometry,
		changeCameraPosition,
		cameraLookAtPoint,
		createdLabelList,
		operateModel,
		saveModel,
	}
}

export default useThree
