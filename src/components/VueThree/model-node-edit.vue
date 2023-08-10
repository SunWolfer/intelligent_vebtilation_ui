<script lang="ts">
	import { ITunnelMesh } from '@/components/VueThree/effect/ITunnelMesh'
	import { OperateModel } from '@/components/VueThree/IModelOperate'
	import mixin from '@/components/VueThree/model-mixin.vue'
	import { IModels } from '@/components/VueThree/models'
	import { EditType } from '@/components/VueThree/types/editType'
	import { Object3D, WebGLRenderer } from 'three'
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
		},
		watch: {
			editType(val) {
				if (val !== EditType.CONNECT) {
					this.tunnelMesh.resetConnectNode()
				}
			},
		},
		data() {
			const tunnelMesh = new ITunnelMesh()
			const loader = new GLTFLoader()
			return {
				tunnelMesh,
				content: [] as unknown[][],
				loader,
			}
		},
		methods: {
			load() {
				this.reportProgress('start')

				this.object = new Object3D()
				this.tunnelMesh.config(this.object)
				let models: IModelNode[] = IModels
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
			},
			//   添加风流
			addWind(direction = false) {
				if (!this.windObject) return
				this.windObject.remove(...this.windMeshList)
				let models: IModelNode[] = IModels
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
				// 连接
				if (this.editType === EditType.CONNECT) {
					const connectModel: IModelNode | undefined = this.tunnelMesh.judgeNode(intersected)

					if (connectModel) {
						this.tunnelMesh.resetConnectNode()
					}
				}
				// 删除
				if (this.editType === EditType.DELETE) this.tunnelMesh.deleteTunnel(intersected)
				this.$emit('on-dblclick', event, intersected)
			},
		},
	})
</script>
