<script lang="ts">
	import { ITunnelMesh } from '@/components/VueThree/effect/ITunnelMesh'
	import { OperateModel } from '@/components/VueThree/IModelOperate'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
	import mixin from './model-mixin.vue'
	import { Color, Mesh, Object3D, WebGLRenderer } from 'three'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
	import { defineComponent } from 'vue'
	import { IModels } from './models'

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
		methods: {
			load() {
				this.reportProgress('start')

				this.object = new Object3D()
				this.tunnelMesh.config(this.object)
				let models: IModelNode[] = IModels

				let nodes = {
					geometry: {
						radius: 300,
					},
					material: {
						mapUrl: 'file/material/80.png',
						transparent: true,
						opacity: 1,
					},
				}
				let tunnel: IMesh[] = [
					{
						geometry: {
							radiusTop: 600,
							radiusBottom: 600,
							height: 1,
							radialSegments: 4,
							openEnded: true,
							geometryType: 'Box',
						},
						material: {
							type: 'MeshStandardMaterial',
							mapUrl: 'file/material/011.png',
							transparent: true,
							opacity: 0.6,
							side: 2,
							roughness: 0,
							metalness: 0.5,
						},
					},
					{
						geometry: {
							radiusTop: 350,
							radiusBottom: 350,
							height: 1,
							radialSegments: 4,
							openEnded: true,
							geometryType: 'Box',
						},
						material: {
							type: 'MeshStandardMaterial',
							mapUrl: 'file/material/111.png',
							transparent: true,
							opacity: 0.8,
							side: 2,
							depthTest: false,
							depthWrite: false,
						},
					},
					{
						geometry: {
							radiusTop: 200,
							radiusBottom: 200,
							height: 1,
							radialSegments: 4,
							openEnded: false,
							geometryType: 'Box',
						},
						material: {
							type: 'MeshStandardMaterial',
							mapUrl: 'file/material/80.png',
							transparent: false,
							opacity: 0.8,
							side: 1,
							colorWrite: true,
							roughness: 0,
							metalness: 0,
						},
					},
				]
				models.forEach((i) => {
					i.nodes = nodes
					i.meshes = tunnel
					i.showNode = false
					i.showWind = Math.random() > 0.5
					i.windMesh = {
						windType: Math.random() > 0.5 ? 1 : 2,
						windPosition: 1200,
						size: 10,
						direction: true,
					}
				})
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
			addWind(direction = true) {
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
		},
	})
</script>
