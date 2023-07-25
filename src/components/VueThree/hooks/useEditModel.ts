import axios from 'axios'
import { CatmullRomCurve3, Euler, Matrix4, Mesh, Object3D, Quaternion, Vector3 } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import * as XLSX from 'xlsx'

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
				let animate = funList[i]
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

				let targetPos = pointBox //目标位置点
				let offsetAngle = 0 //目标移动时的朝向偏移

				//以下代码在多段路径时可重复执行
				let mtx = new Matrix4() //创建一个4维矩阵
				// .lookAt ( eye : Vector3, target : Vector3, up : Vector3 ) : this,构造一个旋转矩阵，从eye 指向 target，由向量 up 定向。
				mtx.lookAt(data.obj.position, targetPos, data.obj.up) //设置朝向
				mtx.multiply(new Matrix4().makeRotationFromEuler(new Euler(0, offsetAngle, 0)))
				let toRot = new Quaternion().setFromRotationMatrix(mtx) //计算出需要进行旋转的四元数值
				data.obj.quaternion.slerp(toRot, 0.2)
			}

			data.counter += data.speed
		} else {
			data.counter = data.isCirculate ? 0 : 1
		}
	}

	// 创建运动轨迹(三维样条曲线)
	function createMotionTrack(
		curvePoints: ICoordinates[],
		parameter = {
			curveType: 'catmullrom', //曲线类型
			closed: false, //设置是否闭环
			tension: 0, //设置线的张力，0为无弧度折线
		} as CatmullRomCurve3,
	) {
		let curveList = []
		for (let i = 0; i < curvePoints.length; i++) {
			const point = curvePoints[i]
			curveList.push(new Vector3(point.x, point.y, point.z))
		}
		let curve: CatmullRomCurve3 = new CatmullRomCurve3(
			curveList,
			parameter.closed,
			parameter.curveType,
			parameter.tension,
		)
		return { curve }
	}
	// 读取Excel表格点位返回点位列表
	async function readExcelFile(url: string): Promise<string[]> {
		const res = await axios.get(url, { responseType: 'arraybuffer' })
		let data = new Uint8Array(res.data)
		let wb = XLSX.read(data, { type: 'array' })
		let sheets = wb.Sheets // 获取文档数据
		const content = transformSheets(sheets)
		let names: string[] = []
		for (let i = 0; i < content[0].length; i++) {
			let obj: any = content[0][i]
			for (const objElement in obj) {
				names.push(objElement.trim())
				names.push(obj[objElement].trim())
			}
		}
		return [...new Set(names)]
	}
	function transformSheets(sheets: any) {
		let content = []
		for (let key in sheets) {
			content.push(XLSX.utils.sheet_to_json(sheets[key]))
		}
		return content
	}
	async function loadModel(src: string, url: string) {
		const names = await readExcelFile(url)

		let nodes = {
			geometry: {
				radius: 600,
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
				},
				material: {
					mapUrl: 'file/material/01.png',
					transparent: true,
					opacity: 1,
				},
			},
			{
				geometry: {
					radiusTop: 300,
					radiusBottom: 300,
					height: 1,
					radialSegments: 4,
					openEnded: true,
				},
				material: {
					type: 'MeshStandardMaterial',
					mapUrl: 'file/material/02.png',
					transparent: true,
					opacity: 1,
				},
			},
			{
				geometry: {
					radiusTop: 250,
					radiusBottom: 250,
					height: 1,
					radialSegments: 4,
					openEnded: false,
				},
				material: {
					mapUrl: 'file/material/031.png',
					transparent: false,
					opacity: 0.8,
				},
			},
		]
		let models: IModelNode[] = []

		const loader = new FBXLoader()
		loader.load(src, (...args: any) => {
			const object = { ...args }

			for (let i = 0; i < names.length; i++) {
				let name = names[i].split('-')
				let model: IModelNode = {
					nodeName: '',
					nodePosition: new Vector3(),
					nextNode: '',
					nextNodePosition: new Vector3(),
					nodes: nodes,
					meshes: tunnel,
					showNode: true,
					showMesh: true,
				}
				object.traverse((child: any) => {
					if (child.isMesh) {
						if (child.name === name[0]) {
							model.nodeName = child.name
							model.nodePosition = child.position
						}
						if (child.name === name[1]) {
							model.nextNode = child.name
							model.nextNodePosition = child.position
						}
					}
				})
				models.push(model)
			}
		})
		return models
	}

	// 添加Css2Dom
	function addCss2DomList(labelList: LabelAttribute[]) {
		let Css2DomList = []
		for (let i = 0; i < labelList.length; i++) {
			let obj = labelList[i]
			let dom: HTMLElement | null = document.getElementById(obj.id)

			if (!dom) return
			const Css2Dom = new CSS2DObject(dom)
			const { x, y, z } = obj.point
			Css2Dom.position.set(x, y, z)
			Css2DomList.push(Css2Dom)
		}
		return Css2DomList
	}

	return {
		customAnimation,
		texturesUpdate,
		createMotionTrack,
		loadModel,
		addCss2DomList,
	}
}

export default useEditModel
