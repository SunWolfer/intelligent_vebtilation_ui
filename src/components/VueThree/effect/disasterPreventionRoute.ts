// 避灾路线
import { DisasterTypes } from '@/api/request/home/menuType'
import {
	AnimationMixer,
	Clock,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	RepeatWrapping,
	Sprite,
	SpriteMaterial,
	SRGBColorSpace,
	TextureLoader,
} from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TubeGeometry } from 'three/src/geometries/TubeGeometry'
import { Texture } from 'three/src/textures/Texture'
import useEditModel, { IMoveTexture } from '../hooks/useEditModel'
import ___image_disaster_fire_gif from '../image/disaster/fire.gif'
import __assets_images_three_line_jpg from '../image/line.jpg'
import ___image_start_mark_png from '../image/start_mark.png'

interface disasterTexture {
	type: DisasterTypes
	texture: Texture
}

export class DisasterPreventionRoute {
	// 跑动模型
	runObject: GLTF | undefined
	// 避灾路线父级
	wrapper: Object3D
	// 避灾路线移动模型
	moveModelList: Object3D[]
	// 避灾路线集合
	extraObject: Object3D
	// 流动线（避灾路线）
	lineMeshList: Mesh[]
	// 动画列表
	animateList: any[]
	clock: Clock
	routeReqId: number | undefined
	// 流动线纹理
	lineTexture: Texture
	// 起点标识
	startMark: Sprite[]
	// 起点标识纹理
	markTexture: Texture
	// 灾变类型纹理列表
	disasterTextureList: disasterTexture[]
	// 灾变类型
	disasterType: DisasterTypes
	// 灾变模型列表
	disasterMeshList: Sprite[]
	constructor(zoneObj: Object3D) {
		// 灾变类型纹理列表
		this.disasterTextureList = []
		this.disasterType = DisasterTypes.ONE
		this.extraObject = new Object3D()
		this.wrapper = zoneObj
		// 重置移动动画
		this.moveModelList = []
		// 重置流动线
		this.lineMeshList = []
		// 重置起点标识列表
		this.startMark = []
		// 避灾路线动画
		this.animateList = []
		// 重置灾变地点
		this.disasterMeshList = []
		// 流动线纹理
		this.lineTexture = loadLineTexture(__assets_images_three_line_jpg)
		// 起点标识纹理
		this.markTexture = loadLineTexture(___image_start_mark_png)
		this.clock = new Clock()
		this.wrapper.add(this.extraObject)
		this.loadRunMesh()
		this.loadDisasterTexture()
		this.renderRoute()
	}
	// 初始化灾变类型纹理
	loadDisasterTexture() {
		this.disasterTextureList = [
			{
				type: DisasterTypes.ONE,
				texture: loadLineTexture(___image_disaster_fire_gif),
			},
			{
				type: DisasterTypes.TWO,
				texture: loadLineTexture(___image_disaster_fire_gif),
			},
			{
				type: DisasterTypes.THREE,
				texture: loadLineTexture(___image_disaster_fire_gif),
			},
			{
				type: DisasterTypes.FOUR,
				texture: loadLineTexture(___image_disaster_fire_gif),
			},
		]
	}
	// 加载跑动模型
	loadRunMesh() {
		let loader = new GLTFLoader()
		let src = import.meta.env.BASE_URL + 'file/pao-02.glb'
		loader.load(src, (data) => {
			data.scene.scale.x = 100
			data.scene.scale.y = 100
			data.scene.scale.z = 100

			data.scene.traverse(function (object: any) {
				if (object.isMesh) {
					object.castShadow = true //阴影
					object.frustumCulled = false
					object.material.emissive = object.material.color
					object.material.emissiveMap = object.material.map
				}
			})
			this.runObject = data
		})
	}
	// 创建起点标识
	createdMark(position: ICoordinates, xSize = 1, ySize = 1) {
		this.extraObject.remove(...this.startMark)
		this.startMark = []
		let texture = this.markTexture.clone()

		const sprite = this.createdSprite(position, xSize, ySize, texture)

		this.extraObject.add(sprite)
		this.startMark.push(sprite)
	}
	// 创建灾变起点
	createdDisaster(position: ICoordinates, xSize = 1, ySize = 1) {
		this.extraObject.remove(...this.disasterMeshList)
		this.disasterMeshList = []
		let texture = this.disasterTextureList
			.find((i) => {
				return i.type === this.disasterType
			})
			?.texture.clone()
		const sprite = this.createdSprite(position, xSize, ySize, texture!)
		this.extraObject.add(sprite)
		this.disasterMeshList.push(sprite)
	}
	// 改变灾变类型
	changeDisasterType(type: DisasterTypes) {
		this.disasterType = type
		if (this.disasterMeshList.length > 0) {
			let sprite = this.disasterMeshList[0]
			let position = sprite.position.clone()
			let scale = sprite.scale.clone()
			this.createdDisaster(position, scale.x, scale.y)
		}
	}
	// 创建精灵模型
	createdSprite(position: ICoordinates, xSize = 1, ySize = 1, texture: Texture) {
		const material = new SpriteMaterial({ map: texture })

		const sprite = new Sprite(material)
		sprite.center.set(0.5, 0)
		sprite.scale.set(xSize, ySize, 1)
		sprite.position.set(position.x, position.y, position.z)
		return sprite
	}
	// 创建避灾路线跑动路线
	initRoute(pointObj: DisPreRoute) {
		if (!this.runObject) return
		let { curve } = useEditModel().createMotionTrack(pointObj.points)

		let moveModel = this.runObject.scene.clone()
		this.extraObject.remove(moveModel)
		this.moveModelList.push(moveModel)
		this.extraObject.add(moveModel)
		let mixer1 = new AnimationMixer(moveModel)
		mixer1.clipAction(this.runObject.animations[0]).play()
		this.createdFlowLine(pointObj.points, pointObj.lineRadius ?? 4)

		let moveTexture: IMoveTexture = {
			obj: moveModel,
			curve: curve,
			counter: 0,
			speed: 0.001,
		}
		this.animateList.push(() => {
			mixer1.update(this.clock.getDelta())
			useEditModel().texturesUpdate(moveTexture)
		})
	}
	// 创建避灾路线流动线
	createdFlowLine(points: ICoordinates[], radius: number) {
		let texture = this.lineTexture.clone()
		let { mesh } = createdLine(points, radius, texture)
		this.animateList.push(() => {
			texture.offset.x -= 0.01
		})
		this.extraObject.add(mesh)
		this.lineMeshList.push(mesh)
	}
	// 清除避灾路线相关
	cleanMoveModel(index: number) {
		if (index === -1) {
			this.extraObject.remove(...this.startMark)
			this.extraObject.remove(...this.lineMeshList)
			this.extraObject.remove(...this.moveModelList)
			this.animateList = []
			this.startMark = []
			this.disasterMeshList = []
			this.lineMeshList = []
			this.moveModelList = []
		} else {
			const mesh = this.lineMeshList[index]
			const move = this.moveModelList[index]
			this.extraObject.remove(mesh)
			this.extraObject.remove(move)
			this.animateList.splice(index * 2, 2)
			this.lineMeshList.splice(index, 1)
			this.moveModelList.splice(index, 1)
		}
	}
	renderRoute() {
		this.routeReqId = requestAnimationFrame(this.renderRoute.bind(this))
		// 避灾路线
		useEditModel().customAnimation(this.animateList)
	}
	unMountClass() {
		cancelAnimationFrame(this.routeReqId!)
	}
}

//创建避灾路线流动线
function createdLine(points: ICoordinates[], radius: number, texture: Texture) {
	let material = new MeshBasicMaterial({
		map: texture,
		// side: DoubleSide,
		transparent: false,
	})

	// 创建一条平滑的三维样条曲线
	let { curve } = useEditModel().createMotionTrack(points)
	// 创建管道
	let tubeGeometry = new TubeGeometry(curve, 400, radius)
	let mesh = new Mesh(tubeGeometry, material)

	return {
		texture,
		mesh,
	}
}

function loadLineTexture(img: string) {
	// 	创建纹理和材质
	let texture = new TextureLoader().load(img)
	texture.colorSpace = SRGBColorSpace
	texture.wrapS = texture.wrapT = RepeatWrapping //每个都重复
	texture.repeat.set(1, 1)
	texture.needsUpdate = true

	return texture
}
