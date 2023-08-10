import { IFires } from '@/components/VueThree/effect/IFires'
import { IWindText } from '@/components/VueThree/effect/IWindText'
import { ModelAnimation } from '@/components/VueThree/modelAnimation'
import { isNull } from '@/utils/ruoyi'
import gsap from 'gsap'
import {
	AnimationMixer,
	BufferAttribute,
	BufferGeometry,
	DoubleSide,
	LineBasicMaterial,
	Mesh,
	MeshBasicMaterial,
	MeshPhongMaterial,
	Object3D,
	PerspectiveCamera,
	PlaneGeometry,
	Scene,
	SphereGeometry,
	SRGBColorSpace,
	TextureLoader,
	Vector3,
	WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { DisasterPreventionRoute } from './effect/disasterPreventionRoute'
import useEditModel from './hooks/useEditModel'
import useThreeExport from './hooks/useThreeExport'
import wall1 from './image/0002.jpg'

import material1 from './image/01.jpg'

export class OperateModel {
	// 主体模型
	object: Object3D
	// 总模型
	wrapper: Object3D
	// 	相机
	camera: PerspectiveCamera
	// 	轨道控制器
	controls: OrbitControls
	renderer: WebGLRenderer
	size: ISize
	scene: Scene
	// 初始动画类
	defaultAnimation: ModelAnimation | undefined
	// 自定义动画方法列表
	customizeAnimateList: any[]
	// 自定义球体列表
	ballMeshList: IBallData[]
	// 避灾路线类
	myDisPreRoute: DisasterPreventionRoute | undefined
	muFire: IFires
	// 文字类
	myWindText: IWindText
	editId: number | undefined
	// label标签
	slotLabelList: CSS2DObject[]
	// 临时标签
	temporaryLabelList: CSS2DObject[]
	// 其他标签
	otherLabelList: CSS2DObject[]
	constructor(
		object: Object3D,
		wrapper: Object3D,
		camera: PerspectiveCamera,
		controls: OrbitControls,
		renderer: WebGLRenderer,
		size: ISize,
		scene: Scene,
	) {
		this.object = object
		this.wrapper = wrapper
		this.camera = camera
		this.controls = controls
		this.renderer = renderer
		this.size = size
		this.scene = scene

		this.ballMeshList = []
		// label标签
		this.slotLabelList = []
		// 临时标签
		this.temporaryLabelList = []
		// 其他标签
		this.otherLabelList = []
		// 初始化自定义动画
		this.customizeAnimateList = []
		// 加载避灾路线类
		this.initDisPreRoute()
		// 文字
		this.myWindText = new IWindText(this.scene)
		this.muFire = new IFires(this.size)
		this.resetFrame()
	}
	// 	模型添加/更新标签
	addLabelList(labelList: LabelAttribute[], IObj: Object3D) {
		IObj.remove(...this.slotLabelList)
		this.slotLabelList = []
		this.slotLabelList = []

		let Css2DomList = useEditModel().addCss2DomList(labelList)
		if (!Css2DomList?.length) return
		this.slotLabelList.push(...Css2DomList)
		IObj.add(...Css2DomList)
	}
	// 	总模型添加/更新标签
	addWrapperLabels(labelList: LabelAttribute[]) {
		this.addLabelList(labelList, this.wrapper)
	}
	// 添加其他标签
	addOtherLabelList(labelList: LabelAttribute[]) {
		this.wrapper.remove(...this.otherLabelList)
		this.otherLabelList = []
		if (!labelList?.length) return
		let Css2DomList = useEditModel().addCss2DomList(labelList)
		if (!Css2DomList?.length) return
		this.otherLabelList.push(...Css2DomList)
		this.wrapper.add(...Css2DomList)
	}
	// 添加临时标签
	addTemporaryLabelList(labelList: LabelAttribute[]) {
		this.wrapper.remove(...this.temporaryLabelList)
		this.temporaryLabelList = []
		if (!labelList.length) return
		let Css2DomList = useEditModel().addCss2DomList(labelList)
		if (!Css2DomList?.length) return
		this.temporaryLabelList.push(...Css2DomList)
		this.wrapper.add(...Css2DomList)
	}
	// 清空所有标签
	cleanWrapperLabels() {
		let removeList: any[] = []
		for (let i = 0; i < this.wrapper.children.length; i++) {
			const child: any = this.wrapper.children[i]
			if (child.isCSS2DObject) {
				removeList.push(child)
			}
		}
		this.wrapper.remove(...removeList)
	}
	// 	创建自定义平面
	addGeometry(points: Point[]) {
		createPlaneGeometry(points, this.wrapper)
	}
	// 初始化默认动画
	initDefaultAnimation() {
		if (this.defaultAnimation) return
		// 加载初始动画
		this.defaultAnimation = new ModelAnimation(this.wrapper)
		this.defaultAnimation._disposeMod(-1)
	}
	// 	添加自定义动画
	addAnimations(animateData: IAnimateData) {
		let animationObj: any = null
		this.wrapper?.traverse((child) => {
			if (child.name === animateData.objName) {
				animationObj = child
			}
		})
		if (!animationObj) return
		switch (animateData.animationType) {
			// 贴图位移
			case 1:
				//材质
				let material = animationObj?.material
				//材质贴图
				let texture = material.map
				texture.repeat.set(2, 2)
				let offset = 0
				this.customizeAnimateList.push(() => {
					if (!animateData.state) {
						offset += animateData.speed // 偏移的方向和速度
					} else {
						offset -= animateData.speed // 偏移的方向和速度
					}
					texture.offset.set(offset, 0)
				})
				break
			// 自身旋转
			case 2:
				this.customizeAnimateList.push(() => {
					if (animateData.rotationAxis === 'x') {
						animationObj.rotateX(animateData.speed)
					} else if (animateData.rotationAxis === 'y') {
						animationObj.rotateY(animateData.speed)
					} else if (animateData.rotationAxis === 'z') {
						animationObj.rotateZ(animateData.speed)
					}
				})
				break
		}
	}
	// 初始化避灾/避灾路线
	initDisPreRoute() {
		// 初始化避灾路线
		if (!this.myDisPreRoute) this.myDisPreRoute = new DisasterPreventionRoute(this.scene)
	}
	// 	创建避灾路线
	addDisPreRoute(pointObj: DisPreRoute) {
		if (!this.myDisPreRoute) return
		this.myDisPreRoute.initRoute(pointObj)
	}
	// 清除避灾路线相关
	cleanMoveModel(index: number) {
		if (!this.myDisPreRoute) return
		this.myDisPreRoute.cleanMoveModel(index)
	}

	// 	添加自定义球体
	addBall(ballList: IBall[]) {
		if (!this.object) return
		//设置球体的值
		const radius = 4,
			segemnt = 32,
			rings = 32
		const meshes = this.ballMeshList.map((i) => {
			return i.mesh
		})
		this.wrapper.remove(...meshes)
		for (let i = 0; i < ballList.length; i++) {
			const data = ballList[i]
			let sphereMaterial = new MeshPhongMaterial({
				color: data.color,
				specular: data.color,
				shininess: 1,
			})

			let sphere = new Mesh(new SphereGeometry(radius, segemnt, rings), sphereMaterial)

			this.wrapper.add(sphere)
			sphere.position.x = data.point.x
			sphere.position.y = data.point.y
			sphere.position.z = data.point.z
			this.ballMeshList.push({
				mesh: sphere,
				uuid: sphere.uuid,
				value: data,
			})
		}
	}
	// 	导出主体Object
	exportObjects() {
		useThreeExport().exportGLTF([this.object])
	}
	// 模型线框材质
	setLineBasicMaterial() {
		const lineMaterial = new LineBasicMaterial({ color: '#1E90FF' })
	}
	// 轨迹移动
	traMovement(
		position: ICoordinates | Vector3,
		lookAt: ICoordinates | Vector3,
		time = 1,
		nextTick = () => {},
	) {
		const { camera, controls }: any = this
		gsap.to(camera.position, {
			x: position.x,
			y: position.y,
			z: position.z,
			duration: time,
			ease: 'circ.out',
			//相机运动完成的回调
			onComplete: function () {
				nextTick()
			},
		})
		gsap.to(controls.target, {
			x: lookAt.x,
			y: lookAt.y,
			z: lookAt.z,
			duration: time,
			ease: 'circ.out',
		})
	}
	// 创建风网解算文字
	created3DFont(fontDataList: IRootFont[]) {
		this.myWindText.cleanText()
		for (let i = 0; i < fontDataList.length; i++) {
			const font = fontDataList[i]
			if (font.text.length === 2) return
			let fontData: IFontType = {
				text: font.text,
				size: font.size,
				color: font.color,
				position: new Vector3(0, 0, 0),
			}
			const length = font.text.length * font.size
			let plane = createdTextBg(font.height, length, font.planeColor)
			this.object.traverse((child: any) => {
				if (child.name === font.parent) {
					let chooseChild = child.isGroup ? child.children[0] : child
					const position = chooseChild.position
					fontData.position = position
					plane.position.set(position.x, position.y + font.height, position.z)
					plane.quaternion.copy(chooseChild.quaternion)
				}
			})
			this.myWindText.created3DFont(fontData, plane)
		}
	}
	resetFrame() {
		this.editId = requestAnimationFrame(this.resetFrame.bind(this))
		useEditModel().customAnimation(this.customizeAnimateList)
	}
	// 页面注销后操作
	unmountEditModel() {
		if (this.myDisPreRoute) this.myDisPreRoute.unMountClass()
		if (this.defaultAnimation) this.defaultAnimation.unMountClass()
		cancelAnimationFrame(this.editId!)
	}
}
// 生成文字背景
function createdTextBg(size: number, length: number, planeColor: string) {
	const geometry = new PlaneGeometry(length, size)
	geometry.rotateY(-Math.PI / 2)
	const material = new MeshBasicMaterial({ color: planeColor, side: DoubleSide })
	return new Mesh(geometry, material)
}
//生成平面
function createPlaneGeometry(points: Point[], scene: Object3D) {
	let IMeshes = []
	for (let i = 0; i < points.length; i++) {
		const c1 = points[i].points
		const color = points[i].color
		const material = points[i].type === 1 ? '' : 1
		// 生成两个三角形的顶点集合
		const p1 = [c1[0], c1[1], c1[2]]
		const p2 = [c1[0], c1[2], c1[3]]
		IMeshes.push(createdMesh(p1, color, material))
		IMeshes.push(createdMesh(p2, color, material))
	}
	scene.add(...IMeshes)
}

function createdMesh(points: number[][], color?: string, IMaterial?: any) {
	// 每一个三角形，需要三个顶点，每个顶点需要3个值
	const geometry = new BufferGeometry()
	const vertices = new Float32Array(9)
	for (let j = 0; j < 9; j++) {
		if (j < 3) {
			vertices[j] = points[0][j]
		} else if (j < 6) {
			vertices[j] = points[1][j - 3]
		} else if (j < 9) {
			vertices[j] = points[2][j - 6]
		}
	}

	geometry.setAttribute('position', new BufferAttribute(vertices, 3))

	let material, texture
	if (IMaterial) {
		texture = new TextureLoader().load(material1)
	} else {
		// material = new MeshBasicMaterial({ color: color, side: DoubleSide })
		texture = new TextureLoader().load(wall1)
	}
	if (texture) {
		texture.colorSpace = SRGBColorSpace
		material = new MeshBasicMaterial({ map: texture, side: DoubleSide })
	}

	//初始化存放颜色信息的序列化数组
	const colors = new Float32Array([0.5, 0.3, 0.6, 0.5, 0.3, 0.6, 0.5, 0.3, 0.6])
	geometry.setAttribute('color', new BufferAttribute(colors, 3))

	const indexS = new Uint16Array([0, 1, 2])
	geometry.index = new BufferAttribute(indexS, 1)
	const uvs = new Uint16Array([0, 1, 1, 1, 1, 0, 0, 0])
	geometry.setAttribute('uv', new BufferAttribute(uvs, 2))
	return new Mesh(geometry, material)
}
