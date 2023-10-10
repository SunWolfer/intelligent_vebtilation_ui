<script lang="ts">
	import { ITunnelMesh } from '@/components/VueThree/effect/ITunnelMesh'
	import useEditModel, { IMoveTexture } from '@/components/VueThree/hooks/useEditModel'
	import { OperateModel } from '@/components/VueThree/IModelOperate'
	import { getCenter, setMovePosition } from '@/components/VueThree/utils'
	import threeModel from '@/store/modules/threeModel'
	import { Object3D, WebGLRenderer } from 'three'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
	import { defineComponent } from 'vue'
	import mixin from './model-mixin.vue'

	export default defineComponent({
		name: 'model-generation',
		mixins: [mixin],
		data() {
			const tunnelMesh = new ITunnelMesh()
			const loader = new GLTFLoader()
			return {
				tunnelMesh,
				content: [] as unknown[][],
				loader,
			}
		},
		computed: {
			modelData() {
				return this.customize ? this.customizeData : threeModel().data
			},
			maxNodeNum() {
				return this.customize ? this.customizeMaxNodeNum : threeModel().maxNode
			},
		},
		methods: {
			load() {
				if (!this.modelData.length) return
				this.object = new Object3D()
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
				// this.wrapper.position.copy(neCenter)
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
						const coordinates: any[] = direction ? [endNode, startNode] : [startNode, endNode]
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
		},
	})
</script>
