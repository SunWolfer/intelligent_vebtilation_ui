<script lang="ts">
	import { ITunnelMesh } from '@/components/VueThree/effect/ITunnelMesh'
	import { OperateModel } from '@/components/VueThree/IModelOperate'
	import threeModel from '@/store/modules/threeModel'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
	import mixin from './model-mixin.vue'
	import { Object3D, WebGLRenderer } from 'three'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
	import { defineComponent } from 'vue'

	export default defineComponent({
		name: 'model-generation',
		mixins: [mixin],
		data() {
			const tunnelMesh = new ITunnelMesh()
			const loader = new GLTFLoader()
			const modelData = threeModel()
			return {
				tunnelMesh,
				content: [] as unknown[][],
				loader,
				modelData,
			}
		},
		methods: {
			load() {
				this.reportProgress('start')

				this.object = new Object3D()
				this.tunnelMesh.config(this.object)
				let models: IModelNode[] = this.modelData.data

				this.tunnelMesh.add(...models)

				this.addObject()
				this.reportProgress('end')
				this.loadOtherLen++
			},
			addObject() {
				if (!this.object) return
				this.wrapper.add(this.object)
				this.windObject = new Object3D()
				this.wrapper.add(this.windObject)
				// this.object = this.wrapper
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
		},
	})
</script>
