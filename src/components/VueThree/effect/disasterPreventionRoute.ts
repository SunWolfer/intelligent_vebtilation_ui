// 避灾路线
import { DisasterTypes } from '@/types/menuType'
import usePoint from './IPoint'
import {
	AnimationMixer,
	CatmullRomCurve3,
	Clock,
	DoubleSide,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	PlaneGeometry,
	RepeatWrapping,
	SRGBColorSpace,
	TextureLoader,
	Vector3,
} from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { TubeGeometry } from 'three/src/geometries/TubeGeometry'
import { Texture } from 'three/src/textures/Texture'
import useEditModel, { IMoveTexture } from '../hooks/useEditModel'

interface disasterTexture {
	type: DisasterTypes
	texture: Texture[]
	showIndex: number
	length: number
}

const { distance } = usePoint()

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
	startMark: CSS2DObject[]
	// 灾变模型列表
	disasterMeshList: CSS2DObject[]
	// 灾变类型纹理图片
	disasterTextureImg: disasterTexture[]
	// 灾害蔓延模型列表
	disasterObjList: IMoveTexture[]
	constructor(zoneObj: Object3D) {
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
		// 灾害蔓延模型
		this.disasterObjList = []
		// 灾变类型纹理
		this.disasterTextureImg = []
		this.loadDisasterTextureImg()
		// 流动线纹理
		this.lineTexture = loadLineTexture(import.meta.env.BASE_URL + 'file/material/route/line1.png')
		this.clock = new Clock()
		this.wrapper.add(this.extraObject)
		this.loadRunMesh()
		this.renderRoute()
	}
	// 加载跑动模型
	loadRunMesh() {
		const loader = new GLTFLoader()
		const src = import.meta.env.BASE_URL + 'file/pao-02.glb'
		loader.load(src, (data) => {
			data.scene.scale.x = 50
			data.scene.scale.y = 50
			data.scene.scale.z = 50

			data.scene.traverse(function (object: any) {
				if (object.isMesh) {
					object.material.emissive = object.material.color
					object.material.emissiveMap = object.material.map
				}
			})
			this.runObject = data
		})
	}
	// 加载灾害模拟纹理图片
	loadDisasterTextureImg() {
		const firesTexture: Texture[] = []
		// 	加载火焰图片资源
		for (let i = 0; i < 14; i++) {
			const texture = loadLineTexture(
				import.meta.env.BASE_URL + 'file/material/fires2/' + i + '.png',
			)
			firesTexture.push(texture)
		}
		const waterTexture: Texture[] = []
		//加载水灾图片资源
		for (let i = 0; i < 1; i++) {
			const texture = loadLineTexture(
				import.meta.env.BASE_URL + 'file/material/water/' + i + '.jpg',
			)
			waterTexture.push(texture)
		}
		// 瓦斯
		const gasTexture: Texture[] = []
		for (let i = 0; i < 13; i++) {
			const texture = loadLineTexture(
				import.meta.env.BASE_URL + 'file/material/smoke/' + i + '.png',
			)
			gasTexture.push(texture)
		}
		// 粉尘
		const dustTexture: Texture[] = []
		for (let i = 0; i < 13; i++) {
			const texture = loadLineTexture(import.meta.env.BASE_URL + 'file/material/dust/' + i + '.png')
			dustTexture.push(texture)
		}
		this.disasterTextureImg = [
			{ type: DisasterTypes.ONE, texture: firesTexture, showIndex: 0, length: 13 },
			{ type: DisasterTypes.TWO, texture: gasTexture, showIndex: 0, length: 11 },
			{ type: DisasterTypes.THREE, texture: dustTexture, showIndex: 0, length: 11 },
			{ type: DisasterTypes.FOUR, texture: waterTexture, showIndex: 0, length: 0 },
		]
	}
	// 创建灾害蔓延
	createdDisasterSpread(positions: Vector3[], _size = 20, type: DisasterTypes) {
		// 查找Texture
		const iTexture = this.disasterTextureImg.find((i) => {
			return i.type === type
		})
		if (!iTexture) return
		// 获取材质
		const material = new MeshBasicMaterial({
			map: iTexture.texture[0],
			side: DoubleSide,
			transparent: true,
			depthWrite: false,
			depthTest: false,
		})
		const { curve } = useEditModel().createMotionTrack(positions)

		// 火焰蔓延
		if (DisasterTypes.ONE === type) {
			this.createdFireSpread(material, curve, iTexture)
		}
		// 瓦斯
		if (DisasterTypes.TWO === type) {
			this.createdFireSpread(material, curve, iTexture)
		}
		// 粉尘
		if (DisasterTypes.THREE === type) {
			this.createdFireSpread(material, curve, iTexture)
		}

		// 	水灾蔓延
		if (DisasterTypes.FOUR === type) this.createdWaterSpread(material, curve, iTexture)
	}
	// 创建火焰蔓延
	createdFireSpread(
		material: MeshBasicMaterial,
		curve: CatmullRomCurve3,
		iTexture: disasterTexture,
	) {
		// 	创建平面
		const geometry = new PlaneGeometry(7, 8)
		const mesh = new Mesh(geometry, material)
		const cloneMesh = depthCloneMesh(mesh)
		cloneMesh.geometry.rotateY(Math.PI / (Math.random() * 10))

		this.disasterObjList.push({
			obj: cloneMesh,
			curve: curve,
			counter: 0,
			speed: 0.01,
			isCirculate: false,
		})

		this.animateList.push(() => {
			iTexture.showIndex = iTexture.showIndex + 1 > iTexture.length ? 0 : iTexture.showIndex + 1
			for (let i = 0; i < this.disasterObjList.length; i++) {
				const tMesh = this.disasterObjList[i]
				tMesh.obj.material.map = iTexture.texture[iTexture.showIndex]
				if (this.disasterObjList[0].counter < 1) useEditModel().texturesUpdate(tMesh)
			}
			if (this.disasterObjList[0].counter < 1) {
				const obj = depthCloneMesh(cloneMesh)
				obj.geometry.rotateY(Math.PI / (Math.random() * 10))
				this.disasterObjList.push({
					obj: obj,
					curve: curve,
					counter: 0,
					speed: 0.01,
					isCirculate: false,
				})
				this.extraObject.add(obj)
			}
		})
	}
	// 创建水灾
	createdWaterSpread(
		_material: MeshBasicMaterial,
		_curve: CatmullRomCurve3,
		_iTexture: disasterTexture,
	) {}
	// 创建起点标识
	createdMark(labelList: LabelAttribute[]) {
		this.extraObject.remove(...this.startMark)
		this.startMark = []
		const Css2DomList = useEditModel().addCss2DomList(labelList)
		if (!Css2DomList?.length) return
		this.extraObject.add(...Css2DomList)
		this.startMark.push(...Css2DomList)
	}
	// 创建灾变起点
	createdDisaster(labelList: LabelAttribute[]) {
		this.extraObject.remove(...this.disasterMeshList)
		this.disasterMeshList = []
		const Css2DomList = useEditModel().addCss2DomList(labelList)
		if (!Css2DomList?.length) return
		this.extraObject.add(...Css2DomList)
		this.disasterMeshList.push(...Css2DomList)
	}
	// 创建避灾路线跑动路线
	initRoute(pointObj: DisPreRoute) {
		if (!this.runObject) return
		const { curve } = useEditModel().createMotionTrack(pointObj.points)

		const moveModel = this.runObject.scene
		this.extraObject.remove(moveModel)
		this.moveModelList.push(moveModel)
		this.extraObject.add(moveModel)
		const mixer1 = new AnimationMixer(moveModel)
		mixer1.clipAction(this.runObject.animations[0]).play()
		this.createdFlowLine(pointObj.points, pointObj.lineRadius ?? 4)

		const moveTexture: IMoveTexture = {
			obj: moveModel,
			curve: curve,
			counter: 0,
			speed: 0.01,
			isCirculate: false,
		}
		this.animateList.push(() => {
			mixer1.update(this.clock.getDelta())
			useEditModel().texturesUpdate(moveTexture)
		})
	}
	// 创建避灾路线流动线
	createdFlowLine(points: ICoordinates[], radius: number) {
		const texture = this.lineTexture.clone()

		let len = 0
		for (let i = 0; i < points.length - 1; i++) {
			len += distance(points[i], points[i + 1])
		}
		// 设置x方向的重复数(沿着管道路径方向)
		texture.repeat.x = parseInt(String(len / 30))
		// 设置y方向的重复数(环绕管道方向)
		texture.repeat.y = 2

		const { mesh } = createdLine(points, radius, texture)
		this.animateList.push(() => {
			texture.offset.x -= 0.1
		})
		this.extraObject.add(mesh)
		this.lineMeshList.push(mesh)
	}
	// 清除避灾路线
	cleanMoveModel(index: number) {
		if (index === -1) {
			this.extraObject.remove(...this.lineMeshList)
			this.extraObject.remove(...this.moveModelList)
			this.animateList = []
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
	// 清除起点&灾变点
	cleanDisasterMesh() {
		this.extraObject.remove(...this.startMark)
		this.extraObject.remove(...this.disasterMeshList)
		this.startMark = []
		this.disasterMeshList = []
	}
	// 清除灾害蔓延
	cleanDisasterSpread() {
		const removeObj = this.disasterObjList.map((i) => {
			return i.obj
		})
		this.extraObject.remove(...removeObj)
		this.disasterObjList = []
		this.animateList = []
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
	const material = new MeshBasicMaterial({
		map: texture,
		// side: DoubleSide,
		transparent: false,
	})

	// 创建一条平滑的三维样条曲线
	const { curve } = useEditModel().createMotionTrack(points)
	// 创建管道
	const tubeGeometry = new TubeGeometry(curve, 400, radius)
	const mesh = new Mesh(tubeGeometry, material)
	mesh.name = 'line-' + mesh.uuid
	return {
		texture,
		mesh,
	}
}

function loadLineTexture(img: string) {
	// 	创建纹理和材质
	const texture = new TextureLoader().load(img)
	texture.colorSpace = SRGBColorSpace
	texture.wrapS = texture.wrapT = RepeatWrapping //每个都重复
	texture.repeat.set(1, 1)
	texture.needsUpdate = true

	return texture
}
//克隆对象
function depthCloneMesh(mesh: Mesh<PlaneGeometry, MeshBasicMaterial>) {
	const cloneMesh = mesh.clone()
	cloneMesh.material = mesh.material.clone()
	cloneMesh.geometry = mesh.geometry.clone()

	return cloneMesh
}
