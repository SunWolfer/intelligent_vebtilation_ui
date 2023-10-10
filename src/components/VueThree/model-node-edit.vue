<script lang="ts">
	import { ITunnelMesh } from '@/components/VueThree/effect/ITunnelMesh'
	import useEditModel, { IMoveTexture } from '@/components/VueThree/hooks/useEditModel'
	import { OperateModel } from '@/components/VueThree/IModelOperate'
	import mixin from '@/components/VueThree/model-mixin.vue'
	import { EditType } from '@/components/VueThree/types/editType'
	import { getCenter, setMovePosition } from '@/components/VueThree/utils'
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
				this.$emit('planeHeight', val)
			},
		},
		computed: {
			modelData() {
				return this.customize ? this.customizeData : threeModel().data
			},
			maxNodeNum() {
				return this.customize ? this.customizeMaxNodeNum : threeModel().maxNode
			},
		},
		data() {
			const tunnelMesh = new ITunnelMesh()
			const loader = new GLTFLoader()
			return {
				tunnelMesh,
				content: [] as unknown[][],
				loader,
				//   初始化相机移动位置
				initCameraPosition: new Vector3(),
				//   平面高度
				planeHei: 0,
			}
		},
		methods: {
			load() {
				this.object = new Object3D()
				if (!this.modelData.length) return
				this.reportProgress('start')

				this.tunnelMesh.config(this.object, this.modelData, this.maxNodeNum)

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

				const center = getCenter(this.object)

				this.cameraAniPosition.removeLookAt = center
				this.cameraAniPosition.removePosition = setMovePosition(this.camera.position, center)
				this.cameraReset(
					this.cameraAniPosition.removePosition,
					this.cameraAniPosition.removeLookAt,
					3,
				)

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
				let models: IModelNode[] = this.modelData
				let meshList = []
				for (let i = 0; i < models.length; i++) {
					let modelNode = models[i]
					if (modelNode.showWind && modelNode.windMesh) {
						modelNode.windMesh.direction = direction
						if (!modelNode.nodePosition && !modelNode.nextNodePosition) return
						const moveModel = this.tunnelMesh.addWindMesh(modelNode)
						const startNode = {
							...modelNode.nodePosition,
							y: modelNode.nodePosition!.y + (modelNode.windMesh.windPosition ?? 0),
						}
						const endNode = {
							...modelNode.nextNodePosition,
							y: modelNode.nextNodePosition!.y + (modelNode.windMesh.windPosition ?? 0),
						}
						const coordinates: any[] = [startNode, endNode]
						let { curve } = useEditModel().createMotionTrack(coordinates)
						const speed = modelNode.speed ? (modelNode.speed > 0 ? modelNode.speed : 0) : 0.01
						let moveTexture: IMoveTexture = {
							obj: moveModel,
							curve: curve,
							counter: 0,
							speed: speed,
							isCirculate: true,
						}
						let time = this.windClock.getDelta()
						if (this.windMixer) {
							this.windMixer.update(time)
						}
						this.windMeshAnimation.push(() => {
							this.windMixer?.update(this.windClock.getDelta())
							useEditModel().texturesUpdate(moveTexture)
						})

						meshList.push(moveModel)
					}
				}
				this.windMeshList = meshList
				if (this.windMeshList && this.windMeshList.length > 0) {
					this.windObject?.add(...this.windMeshList)
				}
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
					} else {
						this.$emit('addPosition', this.tunnelMesh.newNodes)
					}
				}
				// 连接
				if (this.editType === EditType.CONNECT) {
					const connectModel: IModelNode | undefined = this.tunnelMesh.judgeNode(intersected)

					if (connectModel) {
						this.tunnelMesh.resetConnectNode()
						//   返回连接完成
						this.$emit('readyConnect', connectModel.nodeName + '-' + connectModel.nextNode)
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
