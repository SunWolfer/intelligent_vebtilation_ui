<script lang="ts">
	import gsap from 'gsap'
	import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
	import {
		AmbientLight,
		AnimationMixer,
		Clock,
		Color,
		DirectionalLight,
		HemisphereLight,
		Light,
		Loader,
		Mesh,
		Object3D,
		PerspectiveCamera,
		PointLight,
		Raycaster,
		Scene,
		SpotLight,
		SRGBColorSpace,
		Vector2,
		Vector3,
		WebGLRenderer,
		WebGLRendererParameters,
	} from 'three'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
	import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
	import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
	import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
	import { CSS3DRenderer } from 'three/examples/jsm/renderers//CSS3DRenderer'

	import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
	import { Intersection } from 'three/src/core/Raycaster'
	import { Group } from 'three/src/Three'
	import { defineComponent, PropType } from 'vue'
	import useEditModel from './hooks/useEditModel'
	import { OperateModel } from './IModelOperate'

	import { getCenter, getSize, modelLine, setMovePosition } from './utils'

	gsap.registerPlugin(CSSRulePlugin)

	const DEFAULT_GL_OPTIONS = {
		antialias: true,
		alpha: true,
	}

	export default defineComponent({
		props: {
			src: {
				type: String,
			},
			width: {
				type: Number,
				default: 0,
			},
			height: {
				type: Number,
				default: 0,
			},
			position: {
				type: Object,
				default: () => {
					return { x: 0, y: 0, z: 0 }
				},
			},
			rotation: {
				type: Object,
				default: () => {
					return { x: 0, y: 0, z: 0 }
				},
			},
			scale: {
				type: Object,
				default: () => {
					return { x: 1, y: 1, z: 1 }
				},
			},
			lights: {
				type: Array as PropType<
					{
						type: string
						[key: string]: any
					}[]
				>,
				default: () => {
					return []
				},
			},
			cameraPosition: {
				type: Object,
				default: () => {
					return { x: 0, y: 0, z: 0 }
				},
			},
			cameraRotation: {
				type: Object,
				default: () => {
					return { x: 0, y: 0, z: 0 }
				},
			},
			cameraUp: {
				type: Object,
			},
			cameraLookAt: {
				type: Object,
			},
			cameraSize: {
				type: Number,
				default: 1,
			},
			backgroundColor: {
				default: 0xffffff,
			},
			backgroundAlpha: {
				type: Number,
				default: 1,
			},
			controlsOptions: {
				type: Object,
			},
			crossOrigin: {
				type: String,
				default: 'anonymous',
			},
			requestHeader: {
				type: Object,
				default: () => {},
			},
			glOptions: {
				type: Object,
			},
			chooseGroup: {
				type: Boolean,
				default: false,
			},
			modelList: {
				type: Array as PropType<modelLine[]>,
				default: [],
			},
			otherThreeMod: {
				type: Array as PropType<IOtherThreeMod[]>,
				default: [],
			},
			//   自定义数据
			customize: {
				type: Boolean,
				default: false,
			},
			//   自定义数据
			customizeData: {
				type: Array as PropType<IModelNode[]>,
				default: [],
			},
			//   自定义数据最大值
			customizeMaxNodeNum: {
				type: Number,
				default: 0,
			},
		},
		data() {
			const result = {
				object: null as null | Object3D,
				rayCaster: new Raycaster(),
				mouse: new Vector2(),
				camera: new PerspectiveCamera(60, 1, this.cameraSize, 1000000),
				scene: new Scene(),
				wrapper: new Object3D(),
				renderer: null as null | WebGLRenderer,
				controls: null as null | OrbitControls,
				allLights: [] as Light[],
				clock: typeof performance === 'undefined' ? Date : performance,
				reqId: null as null | number, // requestAnimationFrame id,
				loader: null as any as Loader, // 会被具体实现的组件覆盖
				composer: null as null | EffectComposer,
				outlinePass: null as null | OutlinePass,
				effectFXAA: null as null | ShaderPass,
				labelRenderer: new CSS2DRenderer(),
				tRenderer: new CSS3DRenderer(),
				CartoonInterval: [] as Array<number>,
				mixer: '',
				domCenter: { x: 0, y: 0, z: 0 },
				operateModel: null as null | OperateModel,
				defaultAnimateList: [] as any[],
				transformControl: null as null | TransformControls,
				windObject: null as null | Object3D,
				// 风流模型列表
				windMeshList: [] as any[],
				// 风流动画
				windMeshAnimation: [] as any[],
				// 风流动画Mixer
				windMixer: null as null | AnimationMixer,
				// 风流动画时钟
				windClock: new Clock(),
				planeModel: null as null | Mesh,
				cameraAniPosition: {
					// 相机初始位置
					cameraPosition: null as null | Vector3,
					// 相机移动后位置
					removePosition: null as null | Vector3,
					// 相机朝向点
					removeLookAt: null as null | Vector3,
				},
				//   节点标签
				nodeLabelList: [] as Mesh[],
			}
			// 确保这些对象不被转为 vue reactive 对象，避免 three 渲染出错
			Object.assign(this, result)

			const reactiveState = {
				defaultAnimation: null,
				size: {
					width: this.width,
					height: this.height,
				},
				// 主体模型加载进度
				progress: {
					isComplete: false,
					lengthComputable: false,
					loaded: 0,
				} as {
					startedAt?: number
					endedAt?: number
					isComplete: boolean
					lengthComputable: boolean
					loaded: number
					total: number
				},
				// 	总模型加载进度
				loadOtherLen: 0,
				selectedObjects: [] as Object3D[], // 选中模型
			}

			// 为了保留类型信息，仍然返回 result 的 type
			return reactiveState as typeof result & typeof reactiveState
		},
		computed: {
			loadProgressPercentage() {
				if (this.progress.isComplete) return 100
				if (this.progress.lengthComputable) {
					// lengthComputable 为 false 时，total 无直接参考意义，但是这里仍然使用它 * 3来作为估计值
					// 因为 gzip 压缩后的长度大约为三分之一
					return Math.min(0.92, this.progress.loaded / (this.progress.total * 3)) * 100
				}
				return Math.min(1, this.progress.loaded / this.progress.total) * 100
			},
		},
		mounted() {
			if (this.width === 0 || this.height === 0) {
				this.size = {
					width: (this.$refs.canvas as HTMLDivElement).offsetWidth,
					height: (this.$refs.canvas as HTMLDivElement).offsetHeight,
				}
			}
			const options: WebGLRendererParameters = Object.assign(
				{},
				DEFAULT_GL_OPTIONS,
				this.glOptions,
				{
					canvas: this.$refs.canvas as HTMLCanvasElement,
				},
			)
			this.renderer = new WebGLRenderer(options)
			// this.renderer.toneMapping = ACESFilmicToneMapping
			// this.renderer.toneMappingExposure = 1

			this.tRenderer.domElement.style.position = 'absolute'
			this.tRenderer.domElement.style.top = '0'
			this.tRenderer.domElement.style.left = '0'
			this.labelRenderer.domElement.style.zIndex = '1'
			this.tRenderer.domElement.style.pointerEvents = 'none'
			this.tRenderer.setSize(this.size.width, this.size.height)

			this.labelRenderer.domElement.style.position = 'absolute'
			this.labelRenderer.domElement.style.top = '0'
			this.labelRenderer.domElement.style.zIndex = '0'
			this.labelRenderer.setSize(this.size.width, this.size.height)
			this.labelRenderer.domElement.style.pointerEvents = 'none'

			this.controls = new OrbitControls(this.camera, this.$refs.canvas as HTMLDivElement)

			this.scene.add(this.wrapper)

			this.windMixer = new AnimationMixer(this.wrapper)

			this.initEdit()

			this.load()
			this.lineLoad()
			this.loadOtherMods()
			this.update()

			const element = this.$refs.container as HTMLElement
			element.appendChild(this.tRenderer.domElement)
			element.appendChild(this.labelRenderer.domElement)

			element.addEventListener('mousedown', this.onMouseDown, false)
			element.addEventListener('mousemove', this.onMouseMove, false)
			element.addEventListener('mouseup', this.onMouseUp, false)
			element.addEventListener('click', this.onClick, false)
			element.addEventListener('dblclick', this.onDblclick, false)
			window.addEventListener('resize', this.onResize, false)

			this.animate()
		},
		beforeUnmount() {
			for (let i = 0; i < this.CartoonInterval.length; i++) {
				clearInterval(this.CartoonInterval[i])
			}
			cancelAnimationFrame(this.reqId!)
			this.operateModel?.unmountEditModel()

			this.renderer!.dispose()

			if (this.controls) {
				this.controls.dispose()
			}
			const element = this.$refs.container as HTMLDivElement
			element.removeEventListener('click', this.onClick, false)
			element.removeEventListener('dblclick', this.onDblclick, false)
			element.removeEventListener('mousedown', this.onMouseDown, false)
			element.removeEventListener('mousemove', this.onMouseMove, false)
			element.removeEventListener('mouseup', this.onMouseUp, false)

			window.removeEventListener('resize', this.onResize, false)
		},
		watch: {
			src() {
				this.load()
			},
			rotation: {
				deep: true,
				handler(val) {
					if (!this.object) return
					this.object.rotation.set(val.x, val.y, val.z)
				},
			},
			position: {
				deep: true,
				handler(val) {
					if (!this.object) return
					this.object.position.set(val.x, val.y, val.z)
				},
			},
			scale: {
				deep: true,
				handler(val) {
					if (!this.object) return
					this.object.scale.set(val.x, val.y, val.z)
				},
			},
			lights: {
				deep: true,
				handler() {
					this.updateLights()
				},
			},
			size: {
				deep: true,
				handler() {
					this.updateCamera()
					this.updateRenderer()
				},
			},
			controlsOptions: {
				deep: true,
				handler() {
					this.updateControls()
				},
			},
			backgroundAlpha() {
				this.updateRenderer()
			},
			backgroundColor() {
				this.updateRenderer()
			},
			otherThreeMod: {
				deep: true,
				handler() {
					this.loadOtherMods()
				},
			},
			loadOtherLen(val) {
				if (val === this.otherThreeMod?.length + 1) {
					this.$nextTick(() => {
						this.$emit('load')
					})
				} else {
					let event = {
						lengthComputable: false,
						loaded: val,
						total: this.otherThreeMod.length,
					}
					this.reportProgress('progress', event)
					this.$emit('progress', event)
				}
			},
			selectedObjects(val) {
				if (this.outlinePass) this.outlinePass.selectedObjects = val
			},
		},
		methods: {
			initEdit() {},
			onResize() {
				if (this.width === 0 || this.height === 0) {
					this.$nextTick(() => {
						this.size = {
							width: (this.$refs.canvas as HTMLDivElement).offsetWidth,
							height: (this.$refs.canvas as HTMLDivElement).offsetHeight,
						}
					})
				}
			},
			onMouseDown(event: MouseEvent) {
				if (!this.$attrs.onOnMousedown) return

				const intersected = this.pick(event.clientX, event.clientY)
				this.$emit('on-mousedown', event, intersected)
			},
			onMouseMove(event: MouseEvent) {
				if (!this.$attrs.onOnMousemove) return
				const intersected = this.pick(event.clientX, event.clientY)
				this.$emit('on-mousemove', event, intersected)
			},
			onMouseUp(event: MouseEvent) {
				if (!this.$attrs.onOnMouseup) return

				const intersected = this.pick(event.clientX, event.clientY)
				this.$emit('on-mouseup', event, intersected)
			},
			onClick(event: MouseEvent) {
				if (!this.$attrs.onOnClick) return
				this.selectedObjects = []

				const intersected: Intersection | null | undefined = this.pick(event.clientX, event.clientY)
				if (intersected) this.selectedObjects.push(intersected.object)
				this.$emit('on-click', event, intersected)
			},
			onDblclick(event: MouseEvent) {
				if (!this.$attrs.onOnDblclick) return

				const intersected = this.pick(event.clientX, event.clientY)
				this.$emit('on-dblclick', event, intersected)
			},
			pick(x: number, y: number) {
				if (!this.object) return null
				if (!this.$refs.canvas) return

				const rect = (this.$refs.canvas as HTMLDivElement).getBoundingClientRect()

				x -= rect.left
				y -= rect.top

				this.mouse.x = (x / this.size.width!) * 2 - 1
				this.mouse.y = -(y / this.size.height!) * 2 + 1

				this.rayCaster.setFromCamera(this.mouse, this.camera)

				const intersects: Intersection[] = this.rayCaster.intersectObject(this.wrapper, true)
				let rData: Intersection | null =
					(intersects && intersects.length) > 0 ? intersects[0] : null
				let rDataObject = rData
				if (this.chooseGroup && rData) {
					if (rData.object.parent) {
						rDataObject!.object = (<Group>rData.object.parent)?.isGroup
							? rData.object.parent
							: rData.object
					} else {
						rDataObject!.object = rData.object
					}
				}
				return rDataObject
			},
			update() {
				this.updateRenderer()
				this.updateCamera()
				this.updateLights()
				this.updateControls()
				this.updateClickDomColor()
			},
			updateModel() {
				const { object } = this

				if (!object) return

				const { position } = this
				const { rotation } = this
				const { scale } = this

				object.position.set(position.x, position.y, position.z)
				object.rotation.set(rotation.x, rotation.y, rotation.z)
				object.scale.set(scale.x, scale.y, scale.z)
			},
			updateRenderer() {
				const { renderer } = this

				renderer!.setSize(this.size.width!, this.size.height!)
				renderer!.setPixelRatio(window.devicePixelRatio || 1)
				renderer!.setClearColor(new Color(this.backgroundColor).getHex())
				renderer!.setClearAlpha(this.backgroundAlpha)
			},
			updateCamera() {
				const { camera } = this
				const { object } = this

				camera.aspect = this.size.width! / this.size.height!
				camera.updateProjectionMatrix()

				if (!this.cameraLookAt || !this.cameraUp) {
					if (!object) return

					const distance = getSize(object).length()

					camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z)
					camera.rotation.set(this.cameraRotation.x, this.cameraRotation.y, this.cameraRotation.z)

					if (
						this.cameraPosition.x === 0 &&
						this.cameraPosition.y === 0 &&
						this.cameraPosition.z === 0
					) {
						camera.position.y = distance
					}

					camera.lookAt(new Vector3())
				} else {
					camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z)
					camera.rotation.set(this.cameraRotation.x, this.cameraRotation.y, this.cameraRotation.z)
					camera.up.set(this.cameraUp.x, this.cameraUp.y, this.cameraUp.z)

					camera.lookAt(new Vector3(this.cameraLookAt.x, this.cameraLookAt.y, this.cameraLookAt.z))
				}
			},
			updateLights() {
				this.scene.remove(...this.allLights)

				this.allLights = []

				this.lights.forEach((item) => {
					if (!item.type) return

					const type = item.type.toLowerCase()
					let light: null | Light = null

					if (type === 'ambient' || type === 'ambientlight') {
						const color = item.color === 0x000000 ? item.color : item.color || 0x404040
						const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1

						light = new AmbientLight(color, intensity)
					} else if (type === 'point' || type === 'pointlight') {
						const color = item.color === 0x000000 ? item.color : item.color || 0xffffff
						const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1
						const distance = item.distance || 0
						const decay = item.decay === 0 ? item.decay : item.decay || 1

						light = new PointLight(color, intensity, distance, decay)

						if (item.position) {
							light.position.copy(item.position)
						}
					} else if (type === 'directional' || type === 'directionallight') {
						const color = item.color === 0x000000 ? item.color : item.color || 0xffffff
						const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1

						light = new DirectionalLight(color, intensity)

						if (item.position) {
							light.position.copy(item.position)
						}
						if (item.target) {
							;(light as DirectionalLight).target.copy(item.target)
						}
						// 光源辅助线
						// const helper = new DirectionalLightHelper(light)
						// this.scene.add(helper)
					} else if (type === 'hemisphere' || type === 'hemispherelight') {
						const skyColor = item.skyColor === 0x000000 ? item.skyColor : item.skyColor || 0xffffff
						const groundColor =
							item.groundColor === 0x000000 ? item.groundColor : item.groundColor || 0xffffff
						const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1

						light = new HemisphereLight(skyColor, groundColor, intensity)

						if (item.position) {
							light.position.copy(item.position)
						}
					} else if (type === 'spotlight') {
						//   聚光灯
						const color = item.color ?? 0xffffff
						const intensity = item.intensity ?? 1
						const distance = item.distance ?? 0
						const angle = item.angle ?? Math.PI / 3
						light = new SpotLight(color, intensity, distance, angle)
						if (item.position) {
							light.position.copy(item.position)
						}
					}

					if (light) {
						this.allLights.push(light)
						this.scene.add(light)
					}
				})
			},
			updateControls() {
				if (this.controlsOptions) {
					Object.assign(this.controls!, this.controlsOptions)
				}
			},
			updateClickDomColor() {
				const { renderer, scene, camera }: any = this
				this.composer = new EffectComposer(renderer)
				let renderPass = new RenderPass(scene, camera)
				this.composer.addPass(renderPass)
				this.outlinePass = new OutlinePass(
					new Vector2(window.innerWidth, window.innerHeight),
					scene,
					camera,
				)

				this.composer.addPass(this.outlinePass)

				let outlineParams = {
					renderToScreen: true,
					edgeStrength: 4, // 度 默认3
					edgeGlow: 1, // 度 默认1
					edgeThickness: 1.0, // 边缘浓度
					pulsePeriod: 0, // 闪烁频率 默认0 值越大频率越低
					usePatternTexture: false, // 使用纹理
					visibleEdgeColor: 0x00ffff, // 边缘可见部分发光颜色
					hiddenEdgeColor: 0x00ffff, // 边缘遮挡部分发光颜色
				}
				this.outlinePass.renderToScreen = outlineParams.renderToScreen
				this.outlinePass.edgeStrength = outlineParams.edgeStrength
				this.outlinePass.edgeGlow = outlineParams.edgeGlow
				this.outlinePass.edgeThickness = outlineParams.edgeThickness
				this.outlinePass.visibleEdgeColor.set(outlineParams.visibleEdgeColor)
				this.outlinePass.hiddenEdgeColor.set(outlineParams.hiddenEdgeColor)
				this.outlinePass.usePatternTexture = outlineParams.usePatternTexture
			},
			reportProgress(
				type: 'start' | 'end' | 'progress',
				data?: {
					lengthComputable: boolean
					loaded: number
					total: number
				},
			) {
				if (type === 'start') {
					this.progress.isComplete = false
					this.progress.startedAt = Date.now()
					this.progress.loaded = 0
					this.progress.total = 0
				} else if (type === 'end') {
					this.progress.isComplete = true
					this.progress.endedAt = Date.now()
				} else {
					this.progress.lengthComputable = data?.lengthComputable ?? false
					this.progress.loaded = data?.loaded ?? 0
					this.progress.total = data?.total ?? 0
				}
			},
			load() {
				if (!this.src) return

				if (this.object) {
					this.wrapper.remove(this.object)
				}

				this.loader.setRequestHeader(this.requestHeader)

				this.reportProgress('start')
				;(this.loader as any).load(
					this.src,
					(...args: any) => {
						this.reportProgress('end')

						const object = (this.getObject as any)(...args)

						this.process(object)
						this.addObject(object)
						this.loadOtherLen++
					},
					(event: ProgressEvent) => {
						this.reportProgress('progress', event)
						this.$emit('progress', event)
					},
					(event: ErrorEvent) => {
						this.reportProgress('end')
						this.$emit('error', event)
					},
				)
			},
			lineLoad() {
				if (this.modelList.length === 0) return
			},
			process(object: Object3D) {
				return object
			},
			getObject(object: Object3D) {
				return object
			},
			addObject(object: Object3D) {
				this.object = object
				this.wrapper.add(this.object)
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
				// 判断是否传入初始化相机位置
				if (!this.cameraPosition) {
					const center = getCenter(this.wrapper)
					const mPosition = setMovePosition(this.camera.position, center)
					this.camera.position.copy(mPosition)
					this.controls?.target.copy(center)
				}

				this.$emit('on-model', this.operateModel)
			},
			animate() {
				this.reqId = requestAnimationFrame(this.animate)
				this.controls?.update()

				this.render()
			},
			render() {
				useEditModel().customAnimation(this.defaultAnimateList)
				useEditModel().customAnimation(this.windMeshAnimation)

				this.renderer!.render(this.scene, this.camera)

				if (this.composer) {
					this.composer?.render()
				}
				this.labelRenderer.render(this.scene, this.camera)
				this.tRenderer.render(this.scene, this.camera)
			},
			//轨迹运动
			cameraReset(position: any, lookAt: any, time = 1) {
				let _self = this
				const { camera, controls }: any = this
				gsap.to(camera.position, {
					x: position.x,
					y: position.y,
					z: position.z,
					duration: time,
					ease: 'circ.out',
					//相机运动完成的回调
					onComplete: function () {
						_self.$emit('readyCamera')
					},
				})
				gsap.to(controls.target, {
					x: lookAt.x,
					y: lookAt.y,
					z: lookAt.z,
					duration: time,
					ease: 'circ.out',
				})
			},
			// 	加载其他模型
			loadOtherMods() {
				if (this.otherThreeMod.length === 0) return
				let _self = this
				this.reportProgress('start')
				for (let i = 0; i < this.otherThreeMod.length; i++) {
					let mod: any = this.otherThreeMod[i]
					if (mod.type === 'GLTF') {
						let loader = new GLTFLoader()
						loader.setCrossOrigin(this.crossOrigin)
						loader.setRequestHeader(this.requestHeader)
						loader.load(mod.src, (data) => {
							_self.wrapper.remove(data.scene)
							data.scene.traverse(function (object: any) {
								if (object.isMesh) {
									object.castShadow = true //阴影
									object.frustumCulled = false
									if (object.material.map?.colorSpace) {
										object.material.map.colorSpace = SRGBColorSpace
									}
								}
							})
							_self.wrapper.add(data.scene)
							this.loadOtherLen++
						})
					} else if (mod.type === 'FBX') {
						let loader = new FBXLoader()
						loader.load(mod.src, (...args) => {
							const object = _self.getObject(...args)
							_self.wrapper.remove(object)
							_self.wrapper.add(object)
							this.loadOtherLen++
						})
					}
				}
			},
			//   根据名称设置选中模型
			setSelectObject(name: string) {
				if (!this.object) return
				let obj: any = undefined
				this.object.traverse((child) => {
					if (child.name === name) obj = child
				})
				if (obj) this.selectedObjects = [obj]
			},
			// 根据名称组设置选中模型
			setSelectObjects(names: string[]) {
				if (!this.object) return
				let objs: Object3D[] = []
				this.object.traverse((child) => {
					const findNameIndex = names.findIndex((item) => item && item === child.name)
					if (findNameIndex !== -1) objs.push(child)
				})
				this.selectedObjects = objs
				this.createdNamesLabel()
			},
			// 根据名称组生成标签
			createdNamesLabel() {
				// 清除所有2D标签
				this.wrapper.remove(...this.nodeLabelList)

				this.nodeLabelList = []

				for (let i = 0; i < this.selectedObjects.length; i++) {
					let obj = this.selectedObjects[i]
					let element = document.createElement('div')
					element.className = 'node_label_bg'
					let e1 = document.createElement('div')
					e1.className = 'node_three_label'
					element.appendChild(e1)
					let e2 = document.createElement('div')
					e2.className = 'node_label_header'

					let e4 = document.createElement('span')
					e4.textContent = obj.name
					e2.appendChild(e4)
					e1.appendChild(e2)
					let e3 = document.createElement('div')
					e3.className = 'node_label_footer'

					e1.appendChild(e3)

					let objectCSS: any = new CSS2DObject(element)
					objectCSS.position.copy(obj.position)

					this.wrapper.add(objectCSS)
					this.nodeLabelList.push(objectCSS)
				}
			},
		},
	})
</script>

<template>
	<div class="i-model-mixin" ref="container">
		<slot name="progress-bar" :progress="progress" v-if="progress.isComplete === false">
			<div
				style="
					position: absolute;
					z-index: 2;
					height: 3px;
					width: 100%;
					background-color: rgba(0, 0, 0, 0.04);
				"
			>
				<div
					:style="{
						width: `${loadProgressPercentage}%`,
						height: '100%',
						backgroundColor: '#1890ff',
						transition: 'width .2s',
					}"
				/>
			</div>
		</slot>
		<div
			v-if="progress.isComplete === false"
			style="position: absolute; z-index: 1; width: 100%; height: 100%"
		>
			<slot name="poster" />
		</div>
		<canvas ref="canvas" style="width: 100%; height: 100%"></canvas>
		<slot name="label"></slot>
		<slot name="edit"></slot>
		<slot name="warn"></slot>
		<slot name="cssRenderer"></slot>
		<slot></slot>
	</div>
</template>
<style>
	.i-model-mixin {
		position: relative;
		width: 100%;
		height: 100%;
		margin: 0;
		border: 0;
		padding: 0;
		overflow-y: hidden;
	}
</style>
