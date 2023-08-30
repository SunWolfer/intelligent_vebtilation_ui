<script lang="ts">
	import { ITunnelMesh } from '@/components/VueThree/effect/ITunnelMesh'
	import { OperateModel } from '@/components/VueThree/IModelOperate'
	import mixin from '@/components/VueThree/model-mixin.vue'
	import { EditType } from '@/components/VueThree/types/editType'
	import threeModel from '@/store/modules/threeModel'
	import {
		Box3,
		DoubleSide,
		Mesh,
		MeshBasicMaterial,
		Object3D,
		PlaneGeometry,
		Vector3,
		WebGLRenderer,
	} from 'three'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
	import { defineComponent } from 'vue'

	export default defineComponent({
		name: 'model-node-edit',
		mixins: [mixin],
		props: {
			//   编辑类型
			editType: {
				type: Number,
				default: 0 as EditType,
			},
			//   是否创建平面
			planeVisible: {
				type: Boolean,
				default: false,
			},
		},
		watch: {
			editType(val, old) {
				// 重置节点连接
				if (old === EditType.CONNECT) {
					this.tunnelMesh.resetConnectNode()
				}
				//   由新增改变
				if (old === EditType.ADD) {
					this.tunnelMesh.resetConnectNode()
					this.tunnelMesh.clearCylinder()
				}
			},
			// 	监听平面高度变化
			planeHei(val) {
				if (!this.planeModel) return
				this.planeModel.position.y = val ? val : 0
			},
		},
		data() {
			const tunnelMesh = new ITunnelMesh()
			const loader = new GLTFLoader()
			const modelData = threeModel()
			return {
				tunnelMesh,
				content: [] as unknown[][],
				loader,
				//   初始化相机移动位置
				initCameraPosition: new Vector3(),
				//   平面高度
				planeHei: 0,
				modelData,
			}
		},
		methods: {
			load() {
				this.reportProgress('start')

				this.object = new Object3D()
				this.tunnelMesh.config(this.object)
				let models: IModelNode[] = this.modelData.data
				this.tunnelMesh.initTunnel(...models)

				this.addObject()
				this.reportProgress('end')
				this.loadOtherLen++
			},
			addObject() {
				if (!this.object) return
				this.wrapper.add(this.object)
				this.windObject = new Object3D()
				this.wrapper.add(this.windObject)
				this.updateCamera()
				this.updateModel()
				this.operateModel = new OperateModel(
					this.object,
					this.wrapper,
					this.camera,
					this.controls as OrbitControls,
					this.renderer as WebGLRenderer,
					this.size,
					this.scene,
				)
				this.$emit('on-model', this.operateModel)
				this.addWind()
				if (this.planeVisible) this.setNewPlane()
			},
			// 创建平面
			setNewPlane() {
				if (!this.object) return
				let box = new Box3().setFromObject(this.object)
				const planeWidth = box.max.x - box.min.x
				const height = box.max.z - box.min.z
				const planeGeometry = new PlaneGeometry(planeWidth * 2, height * 2, 20, 20)
				planeGeometry.rotateX(-Math.PI / 2)
				const material = new MeshBasicMaterial({
					color: 0x49a8d7,
					side: DoubleSide,
					transparent: false,
					wireframe: true,
				})

				this.planeModel = new Mesh(planeGeometry, material)
				this.planeModel.position.set(0, box.min.y, 0)
				this.planeModel.name = 'planeModel'
				this.planeModel.receiveShadow = true
				this.wrapper.add(this.planeModel)
			},
			//   添加风流
			addWind(direction = false) {
				if (!this.windObject) return
				this.windObject.remove(...this.windMeshList)
				let models: IModelNode[] = this.modelData.data
				let meshList = []
				for (let i = 0; i < models.length; i++) {
					let modelNode = models[i]
					if (modelNode.showWind && modelNode.windMesh) {
						modelNode.windMesh.direction = direction
						meshList.push(this.tunnelMesh.addWindMesh(modelNode))
					}
				}
				this.windMeshList = meshList
				this.windObject.add(...this.windMeshList)
			},
			// 双击
			onDblclick(event: MouseEvent) {
				if (!this.$attrs.onOnDblclick) return
				// 判断编辑类型
				if (this.editType === EditType.DEFAULT) return
				const intersected = this.pick(event.clientX, event.clientY)
				// 新增巷道
				if (this.editType === EditType.ADD) {
					const connectModel: IModelNode | undefined = this.tunnelMesh.newOperation(intersected)

					if (connectModel) {
						this.tunnelMesh.resetConnectNode()
						// let redrawList = this.tunnelMesh.overEditHandle()
						// this.tunnelMesh.redrawModel(redrawList)
						//   返回连接完成
						this.$emit('readyAdd')
					}
				}
				// 连接
				if (this.editType === EditType.CONNECT) {
					const connectModel: IModelNode | undefined = this.tunnelMesh.judgeNode(intersected)

					if (connectModel) {
						this.tunnelMesh.resetConnectNode()
						//   返回连接完成
						this.$emit('readyConnect')
					}
				}
				// 删除连接模型
				if (this.editType === EditType.DELETE) this.tunnelMesh.deleteTunnel(intersected)
				// 删除全部类型模型
				if (this.editType === EditType.DELETEALL) this.tunnelMesh.deleteAllTunnel(intersected)
				this.$emit('on-dblclick', event, intersected)
			},
			onMouseDown(event: MouseEvent) {
				if (event.button === 2) {
					// 记录相机移动起点
					this.initCameraPosition = this.camera.position.clone()
				}
			},
			onMouseMove(event: MouseEvent) {
				// 新增 去除选中巷道
				if (this.editType === EditType.ADD) this.selectedObjects = []
				const intersected: any = this.pick(event.clientX, event.clientY)
				// 左键
				if (event.buttons === 0) {
					// 编辑
					if (
						intersected &&
						this.editType === EditType.ADD &&
						intersected.object.name !== 'textCylinder'
					) {
						this.selectedObjects.push(intersected.object)
						//   移动
						this.tunnelMesh.mouseMoveCylinder(intersected.point)
					}
				} else if (event.buttons === 2) {
					if (!this.planeModel) return
					let planeModel = this.planeModel
					// 右键
					let xChange = planeModel.position.x + this.camera.position.x - this.initCameraPosition.x
					let yChange = planeModel.position.y + this.camera.position.y - this.initCameraPosition.y
					let zChange = planeModel.position.z + this.camera.position.z - this.initCameraPosition.z
					planeModel.position.set(xChange, yChange, zChange)
					this.planeHei = yChange
					this.initCameraPosition = this.camera.position.clone()
				}
			},
		},
	})
</script>
