import { IHeatmap, pointConfig } from '@/components/VueThree/effect/IHeatmap'
import { IWindText } from '@/components/VueThree/effect/IWindText'
import { ModelAnimation } from '@/components/VueThree/modelAnimation'
import { threeModel } from '@/store/modules/threeModel'
import gsap from 'gsap'
import { Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { Group } from 'three/src/Three'
import { DisasterPreventionRoute } from './effect/disasterPreventionRoute'
import useEditModel from './hooks/useEditModel'
import useThreeExport from './hooks/useThreeExport'

const { addCss2DomList, getCenterPoint, createdImg, createPlaneGeometry } = useEditModel()
const { exportGLTF } = useThreeExport()

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
	// 避灾路线类
	myDisPreRoute: DisasterPreventionRoute | undefined
	// 文字类
	myWindText: IWindText
	// label标签
	slotLabelList: CSS2DObject[]
	// 临时标签
	temporaryLabelList: CSS2DObject[]
	// 其他标签
	otherLabelList: CSS2DObject[]
	myHeatmap: IHeatmap
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

		// label标签
		this.slotLabelList = []
		// 临时标签
		this.temporaryLabelList = []
		// 其他标签
		this.otherLabelList = []
		// 加载避灾路线类
		this.initDisPreRoute()
		// 文字
		this.myWindText = new IWindText(this.scene)
		// 3D热力图
		this.myHeatmap = new IHeatmap(this.wrapper)
	}
	// 	模型添加/更新标签
	addLabelList(labelList: LabelAttribute[], IObj: Object3D, domKey = 'id') {
		IObj.remove(...this.slotLabelList)
		this.slotLabelList = []
		this.slotLabelList = []

		const Css2DomList = addCss2DomList(labelList, domKey)
		if (!Css2DomList?.length) return
		this.slotLabelList.push(...Css2DomList)
		IObj.add(...Css2DomList)
	}
	// 	总模型添加/更新标签
	addWrapperLabels(labelList: LabelAttribute[], domKey = 'id') {
		this.addLabelList(labelList, this.wrapper, domKey)
	}
	// 添加其他标签
	addOtherLabelList(labelList: LabelAttribute[]) {
		this.wrapper.remove(...this.otherLabelList)
		this.otherLabelList = []
		if (!labelList?.length) return
		const Css2DomList = addCss2DomList(labelList)
		if (!Css2DomList?.length) return
		this.otherLabelList.push(...Css2DomList)
		this.wrapper.add(...Css2DomList)
	}
	// 添加临时标签
	addTemporaryLabelList(labelList: LabelAttribute[]) {
		this.wrapper.remove(...this.temporaryLabelList)
		this.temporaryLabelList = []
		if (!labelList.length) return
		const Css2DomList = addCss2DomList(labelList)
		if (!Css2DomList?.length) return
		this.temporaryLabelList.push(...Css2DomList)
		this.wrapper.add(...Css2DomList)
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
	// 创建流动线
	addFlowLine(points: ICoordinates[]) {
		if (!this.myDisPreRoute) return

		this.myDisPreRoute.createdFlowLine(points, 6)
	}
	// 清除避灾路线相关
	cleanMoveModel(index: number) {
		if (!this.myDisPreRoute) return
		this.myDisPreRoute.cleanMoveModel(index)
	}

	// 	导出主体Object
	exportObjects() {
		exportGLTF([this.object])
	}
	// 相机轨迹移动
	traMovement(position: ICoordinates, lookAt: ICoordinates, time = 1, nextTick = () => {}) {
		gsap.to(this.camera.position, {
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
		gsap.to(this.controls.target, {
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
			const fontData: IFontType = {
				...font,
				position: new Vector3(0, 0, 0),
				quaternion: new Vector3(0, 0, 0),
			}
			this.object.traverse((child: any) => {
				if (child.name === font.parent) {
					const chooseChild = child.isGroup ? child.children[0] : child
					fontData.position = chooseChild.position
					fontData.quaternion = chooseChild.quaternion
				}
			})
			if (fontData.position.x || fontData.position.y || fontData.position.z) {
				this.myWindText.created3DRenderer(fontData)
			}
		}
	}
	// 创建图片贴图
	createdImgPlane() {
		const threeModelData: IModelNode[] = threeModel().data
		const imgGroup = new Group()
		for (let i = 0; i < threeModelData.length; i++) {
			const child = threeModelData[i]
			if (child.imgUrl && child.nodePosition && child.nextNodePosition && child.imgSize) {
				const size = child.meshes[0].geometry.radiusTop
				if (!size) return
				const position = getCenterPoint(child.nodePosition, child.nextNodePosition)
				position.y = position.y + size
				const start = new Vector3(child.nodePosition.x, child.nodePosition.y, child.nodePosition.z)
				const end = new Vector3(
					child.nextNodePosition.x,
					child.nextNodePosition.y,
					child.nextNodePosition.z,
				)
				const mesh = createdImg(size * child.imgSize, size * 2, child.imgUrl, position, start, end)
				imgGroup.add(mesh)
			}
		}
		this.wrapper.add(imgGroup)
	}
	createdHeatmap(pointDataList: pointConfig[]) {
		if (!this.myHeatmap) return
		this.myHeatmap.initHeatmap(pointDataList)
	}

	// 页面注销后操作
	unmountEditModel() {
		if (this.myDisPreRoute) this.myDisPreRoute.unMountClass()
		if (this.defaultAnimation) this.defaultAnimation.unMountClass()
	}
}
