import ModelGltf from '@/components/VueThree/model-gltf.vue'
import { Vector3 } from 'three'
import { OperateModel } from '@/components/VueThree/IModelOperate'
const useThree = () => {
	const homeModelVisible = ref<InstanceType<typeof ModelGltf>>()
	// 3D文件路径
	const indoorFileUrl = ref('')
	// 引用其他3D文件
	const otherThreeMod = ref<IOtherThreeMod[]>([])

	// 初始化相机位置
	const cameraPosition = reactive({
		x: 6569.731384271249,
		y: 319811.1603805003,
		z: 30857.947379695604,
	})
	//初始化后相机位置
	const removePosition = reactive({
		x: 2664.3369015526932,
		y: 129291.21757011325,
		z: 4664.617343535043,
	})
	// 初始化后相机朝向点
	const removeLookAt = reactive({
		x: 773.4890080180351,
		y: 21674.616827062124,
		z: -61220.03908038469,
	})

	// 相机移动固定参数
	const cameraExcursion = ref({
		x: 5000,
		y: 10078,
		z: 5000,
	})

	// 控制器默认参数
	const controlsOptions = reactive({})
	// 默认灯光
	const lights = ref<any>([
		{
			type: 'pointlight',
			position: { x: 6671, y: 300000, z: -23831 },
			color: 0xffffff,
			intensity: 0.2,
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
	const intersected = ref<any>(undefined)
	// 点击位置
	const intersectedPosition = ref({})

	// 单击
	function onClick(event: MouseEvent, CIntersected: any) {
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
	function dblclick(event: MouseEvent, CIntersected: any) {}

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
	function readyCamera() {}

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
	const createdLabelList = (list: LabelAttribute[]) => {
		operateModel.value?.addWrapperLabels(list)
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
