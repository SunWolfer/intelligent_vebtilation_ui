import {
	BufferAttribute,
	CatmullRomCurve3,
	DoubleSide,
	Euler,
	Matrix4,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	PlaneGeometry,
	Quaternion,
	SRGBColorSpace,
	TextureLoader,
	Vector3,
} from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { BufferGeometry } from 'three/src/core/BufferGeometry'
import wall1 from '@/components/VueThree/image/0002.jpg'

import material1 from '@/components/VueThree/image/01.jpg'

export interface IMoveTexture {
	// 运动模型
	obj: any
	// 运动路线
	curve: CatmullRomCurve3
	// 物体运动时在运动路径的初始位置，范围0~1
	counter: number
	// 影响运动速率的一个值，范围0~1，需要和渲染频率结合计算才能得到真正的速率
	speed: number
	// 是否循环
	isCirculate: boolean
}

const useEditModel = () => {
	// 自定义动画列表
	function customAnimation(funList: any[]) {
		for (let i = 0; i < funList.length; i++) {
			if (typeof funList[i] === 'function') {
				const animate = funList[i]
				animate()
			}
		}
	}

	// 物体沿路线移动
	function texturesUpdate(data: IMoveTexture) {
		if (data.counter <= 1 - data.speed) {
			const point = data.curve.getPointAt(data.counter) //获取样条曲线指定点坐标
			const pointBox = data.curve.getPointAt(data.counter + data.speed) //获取样条曲线指定点坐标

			if (point && pointBox) {
				data.obj.position.copy(point)
				const toRot = getQuaternion(data.obj.position, pointBox, data.obj.up)
				data.obj.quaternion.slerp(toRot, 0.2)
			}

			data.counter += data.speed
		} else {
			data.counter = data.isCirculate ? 0 : 1
		}
	}
	// 计算朝向
	function getQuaternion(startPosition: Vector3, endPosition: Vector3, Tup?: Vector3) {
		const up = Tup ?? new Vector3(0, 1, 0)
		const offsetAngle = 0 //目标移动时的朝向偏移
		//以下代码在多段路径时可重复执行
		const mtx = new Matrix4() //创建一个4维矩阵
		mtx.lookAt(startPosition, endPosition, up) //设置朝向
		mtx.multiply(new Matrix4().makeRotationFromEuler(new Euler(0, offsetAngle, 0)))
		//计算出需要进行旋转的四元数值
		return new Quaternion().setFromRotationMatrix(mtx)
	}

	// 创建运动轨迹(三维样条曲线)
	function createMotionTrack(
		curvePoints: ICoordinates[] | Vector3[],
		parameter = {
			curveType: 'catmullrom', //曲线类型
			closed: false, //设置是否闭环
			tension: 0, //设置线的张力，0为无弧度折线
		} as CatmullRomCurve3,
	) {
		const curveList: Vector3[] = []
		for (let i = 0; i < curvePoints.length; i++) {
			curveList.push(new Vector3(curvePoints[i].x, curvePoints[i].y, curvePoints[i].z))
		}
		const curve: CatmullRomCurve3 = new CatmullRomCurve3(
			curveList,
			parameter.closed,
			parameter.curveType,
			parameter.tension,
		)
		return { curve }
	}

	// 添加Css2Dom
	function addCss2DomList(labelList: LabelAttribute[], domKey = 'id') {
		const Css2DomList: CSS2DObject[] = []
		for (let i = 0; i < labelList.length; i++) {
			const obj = labelList[i]
			const dom: HTMLElement | null = document.getElementById(obj[domKey])
			if (!dom) return
			const Css2Dom = new CSS2DObject(dom)
			const { x, y, z } = obj.point
			Css2Dom.position.set(x, y, z)
			Css2DomList.push(Css2Dom)
		}
		return Css2DomList
	}

	/**
	 * 计算两点中点
	 * @param p1
	 * @param p2
	 */
	const getCenterPoint = (p1: ICoordinates, p2: ICoordinates) => {
		return new Vector3((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (p1.z + p2.z) / 2)
	}
	/**
	 * 计算两点距离
	 * @param p1
	 * @param p2
	 */
	const getPointDistance = (p1: ICoordinates, p2: ICoordinates) => {
		const dx = p1.x - p2.x
		const dy = p1.y - p2.y
		const dz = p1.z - p2.z
		return Math.sqrt(dx * dx + dy * dy + dz * dz)
	}

	// 创建图片贴图平面
	function createdImg(
		width: number,
		height: number,
		url: string,
		position: Vector3,
		startPosition: Vector3,
		endPosition: Vector3,
	) {
		const geometry = new PlaneGeometry(width, height)
		// 水平翻转
		geometry.rotateY(-Math.PI / 2)
		geometry.rotateZ(-Math.PI / 2)
		const texture = new TextureLoader().load(url)
		texture.colorSpace = SRGBColorSpace
		const material = new MeshBasicMaterial({ map: texture, side: DoubleSide, transparent: true })
		const mesh = new Mesh(geometry, material)
		mesh.position.copy(position)
		const quaternion = useEditModel().getQuaternion(startPosition, endPosition)
		mesh.quaternion.copy(quaternion)
		return mesh
	}

	//生成平面
	function createPlaneGeometry(points: Point[], scene: Object3D) {
		const IMeshes: Mesh[] = []
		for (let i = 0; i < points.length; i++) {
			const c1 = points[i].points
			const material = points[i].type === 1 ? '' : 1
			// 生成两个三角形的顶点集合
			const p1 = [c1[0], c1[1], c1[2]]
			const p2 = [c1[0], c1[2], c1[3]]
			IMeshes.push(createdMesh(p1, material))
			IMeshes.push(createdMesh(p2, material))
		}
		scene.add(...IMeshes)
	}

	function createdMesh(points: number[][], IMaterial?: any) {
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

	return {
		customAnimation,
		texturesUpdate,
		createMotionTrack,
		addCss2DomList,
		getQuaternion,
		getCenterPoint,
		getPointDistance,
		createdImg,
		createPlaneGeometry,
	}
}

export default useEditModel
