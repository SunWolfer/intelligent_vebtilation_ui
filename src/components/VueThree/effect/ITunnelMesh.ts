import usePoint from '@/components/VueThree/ModelEdit/IPoint'
import { useThreeModelData } from '@/hooks/useThreeModelData'
import {
	BoxGeometry,
	CylinderGeometry,
	DoubleSide,
	Material,
	Matrix4,
	Mesh,
	MeshBasicMaterial,
	MeshPhongMaterial,
	MeshStandardMaterial,
	Object3D,
	PlaneGeometry,
	Quaternion,
	RepeatWrapping,
	SphereGeometry,
	SRGBColorSpace,
	TextureLoader,
	Vector3,
} from 'three'
import { BackSide, FrontSide, Side } from 'three/src/constants'
import { BufferGeometry } from 'three/src/core/BufferGeometry'
import { Texture } from 'three/src/textures/Texture'
import { Group } from 'three/src/Three'

import { defaultNode, defaultMesh, loadDefaultMesh } from './IMaterial'

interface ITexture {
	name: string
	texture: Texture
}
// 新增节点
interface NewNode {
	// 	是否确定添加
	fixed: boolean
	// 节点名称
	name: string
	// 节点位置
	position: Vector3
	// 	拆分巷道名称
	splitTunnel?: IModelNode
}

// 清空当前操作返回编辑数组
interface IOverEdit {
	newTunnel: IModelNode[]
	deleteTunnel: IModelNode[]
}

// 获取最大节点
const { threeModelData, maxNodeNum } = useThreeModelData()

export class ITunnelMesh {
	object: Object3D | undefined
	iTexture: ITexture[]
	connectNode: IModelNode
	// 初始化巷道
	defaultModel: IModelNode[]
	// 新增巷道
	newTunnel: IModelNode[]
	// 改变巷道/删除巷道
	changeTunnel: IModelNode[]
	// 新增节点
	newNodes: NewNode[]
	// 新增时临时生成巷道
	cylinder: Mesh | undefined
	constructor() {
		this.iTexture = []
		this.defaultModel = []
		this.newTunnel = []
		this.changeTunnel = []
		this.connectNode = {
			meshes: defaultMesh,
			nextNode: '',
			nextNodePosition: undefined,
			nodeName: '',
			nodePosition: undefined,
			nodes: defaultNode,
			showMesh: true,
			showNode: true,
		}
		this.newNodes = []
	}

	config(obj: Object3D) {
		this.object = obj
	}
	// 初始化巷道
	initTunnel(...model: IModelNode[]) {
		this.defaultModel = [...model]
		this.add(...model)
	}
	// 添加
	add(...model: IModelNode[]) {
		if (!this.object) return
		let models = [...model]
		for (let i = 0; i < models.length; i++) {
			let modelNode = models[i]
			let geometryList = []
			if (modelNode.showNode) geometryList.push(...this.createdNodeMesh(modelNode))
			if (modelNode.showMesh) geometryList.push(...this.createdTunnelMesh(modelNode))
			this.object.add(...geometryList)
		}
	}
	// 生成球模型
	createdSphereGeometry(nodeMesh: INodeMesh) {
		let nodeGeometry = nodeMesh.geometry
		let geometry = new SphereGeometry(
			nodeGeometry.radius,
			nodeGeometry.widthSegments ?? undefined,
			nodeGeometry.heightSegments ?? undefined,
			nodeGeometry.phiStart ?? undefined,
			nodeGeometry.phiLength ?? undefined,
			nodeGeometry.thetaStart ?? undefined,
			nodeGeometry.thetaLength ?? undefined,
		)
		let material = this.setMaterial(nodeMesh.material)
		return new Mesh(geometry, material)
	}
	// 生成巷道模型
	createdGeometry(mesh: IMesh) {
		let meshGeometry = mesh.geometry
		let geometry: BufferGeometry
		if (meshGeometry.geometryType === 'Box') {
			geometry = new BoxGeometry(
				meshGeometry.radiusTop ?? undefined,
				meshGeometry.height ?? 1,
				meshGeometry.radiusBottom ?? undefined,
			)
		} else if (meshGeometry.geometryType === 'Plane') {
			geometry = new PlaneGeometry(meshGeometry.width, 1)
		} else {
			geometry = new CylinderGeometry(
				meshGeometry.radiusTop ?? undefined,
				meshGeometry.radiusBottom ?? undefined,
				meshGeometry.height ?? 1,
				meshGeometry.radialSegments ?? undefined,
				meshGeometry.heightSegments ?? undefined,
				meshGeometry.openEnded ?? false,
				meshGeometry.thetaStart ?? undefined,
				meshGeometry.thetaLength ?? undefined,
			)
		}
		geometry.rotateX(-Math.PI / 2)
		let material = this.setMaterial(mesh.material)
		let CyMesh = new Mesh(geometry, material)
		if (mesh.name) CyMesh.name = mesh.name
		return CyMesh
	}
	// 设置材质
	setMaterial(iMaterial: IMaterial) {
		let texture
		if (iMaterial.mapUrl) {
			texture = this.loadTexture(iMaterial)
		}

		let material: MeshStandardMaterial | MeshBasicMaterial | MeshPhongMaterial =
			new MeshBasicMaterial()
		// 标准网格材质(一种基于物理的标准材质，使用Metallic-Roughness工作流程。)
		if (iMaterial.type === 'MeshStandardMaterial') {
			material = new MeshStandardMaterial({
				colorWrite: true,
				metalness: iMaterial.metalness ?? 0, // 金属度属性
				roughness: iMaterial.roughness ?? 0, //粗糙度属性
			})
		}
		// Phong网格材质(一种用于具有镜面高光的光泽表面的材质。)
		if (iMaterial.type === 'MeshPhongMaterial') {
			material = new MeshPhongMaterial({
				shininess: 20, //高光部分的亮度，默认30
				specular: '#ffffff', //高光部分的颜色
			})
		}

		let side: Side = DoubleSide
		switch (iMaterial.side) {
			case 0:
				side = FrontSide
				break
			case 1:
				side = BackSide
				break
		}
		if (texture) {
			material.map = texture
		}
		material.transparent = iMaterial.transparent ?? false
		material.opacity = iMaterial.opacity ?? 1
		material.depthWrite = iMaterial.depthWrite ?? true
		material.depthTest = iMaterial.depthTest ?? true
		if (iMaterial.color) material.color = iMaterial.color
		material.side = side
		return material
	}
	// 	创建节点
	createdNodeMesh(modelNode: IModelNode) {
		if (!modelNode.nodePosition || !modelNode.nextNodePosition) return []
		if (!this.object) return []
		let hasStart = false
		let hasEnd = false
		let geometryList = []
		this.object.traverse((child) => {
			if (child.name === modelNode.nodeName) {
				hasStart = true
			}
			if (child.name === modelNode.nextNode) {
				hasEnd = true
			}
		})
		let sphereGeometry = this.createdSphereGeometry(modelNode.nodes)
		if (!hasStart) {
			let startSphereGeometry = sphereGeometry.clone()
			startSphereGeometry.name = modelNode.nodeName
			startSphereGeometry.position.set(
				modelNode.nodePosition.x,
				modelNode.nodePosition.y,
				modelNode.nodePosition.z,
			)
			geometryList.push(startSphereGeometry)
		}
		if (!hasEnd) {
			let endSphereGeometry = sphereGeometry.clone()
			endSphereGeometry.name = modelNode.nextNode
			endSphereGeometry.position.set(
				modelNode.nextNodePosition.x,
				modelNode.nextNodePosition.y,
				modelNode.nextNodePosition.z,
			)
			geometryList.push(endSphereGeometry)
		}
		return geometryList
	}
	// 	创建巷道
	createdTunnelMesh(modelNode: IModelNode) {
		if (!modelNode.nodePosition || !modelNode.nextNodePosition) return []
		let geometryList = []
		let meshGroup = new Group()
		for (let j = 0; j < modelNode.meshes.length; j++) {
			let obj = modelNode?.meshes[j]
			let cylinderGeometry = this.createdGeometry(obj)
			let p1 = new Vector3(
				modelNode.nodePosition.x,
				modelNode.nodePosition.y,
				modelNode.nodePosition.z,
			)
			let p2 = new Vector3(
				modelNode.nextNodePosition.x,
				modelNode.nextNodePosition.y,
				modelNode.nextNodePosition.z,
			)
			let len = usePoint().distance(p1, p2)
			len = modelNode.showNode
				? len - modelNode.nodes.geometry.radius
				: len + modelNode.nodes.geometry.radius
			cylinderGeometry.scale.set(1, 1, len)
			cylinderGeometry.position.set(
				p1.x + (p2.x - p1.x) / 2,
				p1.y + (p2.y - p1.y) / 2,
				p1.z + (p2.z - p1.z) / 2,
			)
			cylinderGeometry.position.y = cylinderGeometry.position.y + (obj?.geometry?.offsetY ?? 0)

			let mtx = new Matrix4() //创建一个4维矩阵
			mtx.lookAt(p2, p1, cylinderGeometry.up) //设置朝向
			let toRot = new Quaternion()
			toRot.setFromRotationMatrix(mtx) //计算出需要进行旋转的四元数值
			cylinderGeometry.quaternion.set(toRot.x, toRot.y, toRot.z, toRot.w)
			meshGroup.add(cylinderGeometry)
		}
		meshGroup.name = modelNode.nodeName + '-' + modelNode.nextNode
		geometryList.push(meshGroup)
		return geometryList
	}
	// 加载材质
	loadTexture(nodeMaterial: IMaterial) {
		let texture
		const hasTexture = this.iTexture.find((i) => {
			return i.name === nodeMaterial.mapUrl
		})
		if (!hasTexture) {
			texture = new TextureLoader().load(import.meta.env.BASE_URL + nodeMaterial.mapUrl)
			texture.colorSpace = SRGBColorSpace
			texture.wrapS = texture.wrapT = RepeatWrapping //每个都重复
			texture.repeat.set(1, 1)
			this.iTexture.push({
				name: nodeMaterial.mapUrl ?? '',
				texture: texture,
			})
		} else {
			texture = hasTexture.texture
		}
		return texture
	}
	// 	添加风流
	addWindMesh(modelNode: IModelNode) {
		if (!modelNode.nodePosition || !modelNode.nextNodePosition) return []
		if (!modelNode.windMesh) return []
		let iMaterial: IMaterial = {
			mapUrl:
				modelNode.windMesh.windType === 2
					? 'file/material/red_arrow.png'
					: 'file/material/blue_arrow.png',
			side: 2,
		}

		let texture = this.loadTexture(iMaterial)
		let material: MeshBasicMaterial = new MeshBasicMaterial({
			map: texture,
			side: DoubleSide,
			transparent: true,
		})
		const geometry = new PlaneGeometry(15 * modelNode.windMesh.size, 54 * modelNode.windMesh.size)
		geometry.rotateX(-Math.PI / 2)

		let mesh = new Mesh(geometry, material)

		let p1 = new Vector3(
			modelNode.nodePosition.x,
			modelNode.nodePosition.y,
			modelNode.nodePosition.z,
		)
		let p2 = new Vector3(
			modelNode.nextNodePosition.x,
			modelNode.nextNodePosition.y,
			modelNode.nextNodePosition.z,
		)

		mesh.position.set(
			p1.x + (p2.x - p1.x) / 2,
			p1.y + (p2.y - p1.y) / 2 + (modelNode.windMesh.windPosition ?? 0),
			p1.z + (p2.z - p1.z) / 2,
		)
		let mtx = new Matrix4() //创建一个4维矩阵
		if (!modelNode.windMesh.direction) {
			mtx.lookAt(p2, p1, mesh.up) //设置朝向
		} else {
			mtx.lookAt(p1, p2, mesh.up) //设置朝向
		}

		let toRot = new Quaternion()
		toRot.setFromRotationMatrix(mtx) //计算出需要进行旋转的四元数值
		mesh.quaternion.set(toRot.x, toRot.y, toRot.z, toRot.w)
		return mesh
	}
	// 重置初始连接节点
	resetConnectNode() {
		this.connectNode = {
			meshes: defaultMesh,
			nextNode: '',
			nextNodePosition: undefined,
			nodeName: '',
			nodePosition: undefined,
			nodes: defaultNode,
			showMesh: true,
			showNode: true,
		}
	}
	// 	判断节点并添加巷道(连接操作)
	judgeNode(intersected: any) {
		if (!intersected) return
		const name = intersected.object.name
		const names = name.split('-')
		if (names.length === 1 && names[0]) {
			const connectObj = this.editConnectNode(names[0], intersected.object.position)
			if (connectObj) {
				this.add(this.connectNode)

				this.newTunnel.push(this.connectNode)
				return this.connectNode
			}
			return
		}
	}
	// 	删除巷道
	deleteTunnel(intersected: any) {
		if (!intersected) return
		const name = intersected.object.name
		const names = name.split('-')
		if (names.length === 2) {
			const deleteIndex = this.newTunnel.findIndex((i) => {
				return i.nodeName === names[0] && i.nextNode === names[1]
			})
			if (deleteIndex !== -1) {
				this.deleteTunnelByName(name)
				this.newTunnel.splice(deleteIndex, 1)
			}
		}
	}
	// 根据名称删除巷道
	deleteTunnelByName(name: string) {
		let removeList: any[] = []
		this.object?.traverse((child: any) => {
			if (child.name === name) {
				removeList.push(child)
			}
		})
		this.object?.remove(...removeList)
		for (let i = 0; i < removeList.length; i++) {
			if (removeList[i].isGroup) {
				for (let j = 0; j < removeList[i].children.length; j++) {
					removeList[i].children[j]?.geometry.dispose()
					if (removeList[i].children[j].material instanceof Material) {
						removeList[i].children[j]?.material.dispose()
					}
				}
			}
		}
	}
	// 	清空新增巷道
	emptyNewTunnel() {
		for (let i = 0; i < this.newTunnel.length; i++) {
			const name = this.newTunnel[i].nodeName + '-' + this.newTunnel[i].nextNode
			this.deleteTunnelByName(name)
		}
		this.newTunnel = []
	}
	// 	新增操作
	newOperation(intersected: any) {
		if (!intersected) return
		const name = intersected.object.name
		if (!name) return
		const names = name.split('-')

		let readyModel = false
		// 	判断点击模型类型
		if (names.length === 2) {
			maxNodeNum.value++
			let cThreeModel = threeModelData.value.find((i) => {
				return i.nodeName === names[0] && i.nextNode === names[1]
			})
			if (!cThreeModel) return
			// 垂点
			let retVal = getFootPoint(
				intersected.point,
				cThreeModel?.nodePosition,
				cThreeModel?.nextNodePosition,
			)
			if (!retVal) return
			const nodeObj: NewNode = {
				fixed: false,
				name: maxNodeNum.value + '',
				position: retVal,
				splitTunnel: cThreeModel,
			}
			// 点击巷道
			this.newNodes.push(nodeObj)
			readyModel = this.editConnectNode(nodeObj.name, nodeObj.position)
		} else {
			// 	点击到平面
			if (name === 'planeModel') {
				maxNodeNum.value++
				const nodeObj: NewNode = {
					fixed: false,
					name: maxNodeNum.value + '',
					position: intersected.point,
				}
				this.newNodes.push(nodeObj)
				readyModel = this.editConnectNode(nodeObj.name, nodeObj.position)
			} else {
				// 	点击到节点
				readyModel = this.editConnectNode(name, intersected.point)
			}
		}
		// 如果连接完成
		if (readyModel) {
			this.clearCylinder()
			this.add(this.connectNode)
			this.newTunnel.push(this.connectNode)

			// 处理拆分巷道
			for (let i = 0; i < this.newNodes.length; i++) {
				const nodeObj = this.newNodes[i]
				if (nodeObj.fixed) continue
				nodeObj.fixed = true
				if (!nodeObj.splitTunnel) continue
				this.deleteTunnelByName(nodeObj.splitTunnel.nodeName + '-' + nodeObj.splitTunnel.nextNode)

				// 添加改变/删除巷道
				this.changeTunnel.push(nodeObj.splitTunnel)

				let model1: IModelNode = setDefaultModel(
					nodeObj.splitTunnel.nodeName,
					nodeObj.splitTunnel.nodePosition,
					nodeObj.name,
					nodeObj.position,
				)
				let model2: IModelNode = setDefaultModel(
					nodeObj.name,
					nodeObj.position,
					nodeObj.splitTunnel.nextNode,
					nodeObj.splitTunnel.nextNodePosition,
				)
				this.add(model1, model2)
				this.newTunnel.push(model1)
				this.newTunnel.push(model2)
			}

			return this.connectNode
		} else {
			// 	建立起点
			this.createdUnitCylinder(this.connectNode.nodePosition!)
		}

		return undefined
	}
	// 	添加节点对象
	editConnectNode(name: string, position: Vector3 | undefined) {
		// 	判断起点
		if (!this.connectNode.nodeName) {
			this.connectNode.nodeName = name
			this.connectNode.nodePosition = position
			return false
		}
		if (this.connectNode.nodeName === name) return false
		// 	判断下一个节点
		if (!this.connectNode.nextNode) {
			this.connectNode.nextNode = name
			this.connectNode.nextNodePosition = position

			return true
		}
		return false
	}
	// 	清空当前操作并返回已编辑数组
	overEditHandle() {
		let newTunnelList = this.newTunnel.map((item) => {
			return {
				...item,
				meshes: loadDefaultMesh,
			}
		})
		let deleteTunnelList = this.changeTunnel.map((item) => {
			return {
				...item,
				meshes: loadDefaultMesh,
			}
		})
		this.clearCylinder()
		return {
			newTunnel: newTunnelList,
			deleteTunnel: deleteTunnelList,
		} as IOverEdit
	}
	// 	保存并重绘巷道
	redrawModel(redrawList: IOverEdit) {
		// 	当前模型列表取差集
		threeModelData.value = threeModelData.value.filter((item) => {
			return (
				redrawList.deleteTunnel.findIndex((i) => {
					return i.nodeName === item.nodeName && i.nextNode === item.nextNode
				}) === -1
			)
		})
		// 	当前模型列表取并集
		threeModelData.value = threeModelData.value.concat(
			redrawList.newTunnel.filter((v) => {
				return !(threeModelData.value.indexOf(v) > -1)
			}),
		)
		// 	更新object
		for (let i = 0; i < redrawList.newTunnel.length; i++) {
			let obj = redrawList.newTunnel[i]
			this.deleteTunnelByName(obj.nodeName + '-' + obj.nextNode)
		}
		this.add(...redrawList.newTunnel)
	}
	// 创建初始模型
	createdUnitCylinder(position: ICoordinates) {
		let geometry = new CylinderGeometry(200, 200, 1, 4)
		geometry.rotateX(Math.PI * 0.5)
		let material = this.setMaterial(defaultMesh[1].material)
		let cylinder = new Mesh(geometry, material)
		cylinder.position.set(position.x, position.y, position.z)
		cylinder.name = 'textCylinder'
		this.cylinder = cylinder
		this.object?.add(this.cylinder)
	}
	// 	移动临时模型
	mouseMoveCylinder(position: Vector3) {
		if (!this.cylinder || !this.connectNode.nodePosition) return
		let p1 = this.connectNode.nodePosition
		let p2 = position
		let len = usePoint().distance(p1, p2)
		this.cylinder.scale.set(1, 1, len)
		this.cylinder.position.set(
			p1.x + (p2.x - p1.x) / 2,
			p1.y + (p2.y - p1.y) / 2,
			p1.z + (p2.z - p1.z) / 2,
		)

		let apos = p2.clone()
		let toRod = setModelSpin(this.cylinder, apos)
		this.cylinder.quaternion.set(toRod.x, toRod.y, toRod.z, toRod.w)
	}
	// 	删除初始新增巷道
	clearCylinder() {
		if (this.cylinder) {
			this.object?.remove(this.cylinder)
			this.cylinder.geometry.dispose()
			if (this.cylinder.material instanceof Material) {
				this.cylinder.material.dispose()
			}
		}
	}
	// 	删除全部类型巷道
	deleteAllTunnel(intersected: any) {
		if (!intersected) return
		const name = intersected.object.name
		const names = name.split('-')
		if (names.length === 2) {
			// 判断已有巷道
			const deleteIndex = threeModelData.value.findIndex((i) => {
				return i.nodeName === names[0] && i.nextNode === names[1]
			})
			if (deleteIndex !== -1) {
				this.changeTunnel.push(threeModelData.value[deleteIndex])
				this.deleteTunnelByName(name)
			}
			// 	判断新增巷道
			const deleteNewIndex = this.newTunnel.findIndex((i) => {
				return i.nodeName === names[0] && i.nextNode === names[1]
			})
			if (deleteNewIndex !== -1) {
				this.changeTunnel.push(this.newTunnel[deleteNewIndex])
				this.deleteTunnelByName(name)
				this.newTunnel.splice(deleteNewIndex, 1)
			}
		}
	}
}
interface IPointVector extends ICoordinates, Vector3 {}

/**
 * 计算空间点到直线垂足坐标
 * @param p1 直线外一点
 * @param begin 直线开始点
 * @param end 直线结束点
 */
function getFootPoint(
	p1: IPointVector,
	begin: ICoordinates | undefined,
	end: ICoordinates | undefined,
) {
	if (!begin || !end) return
	let dx = begin.x - end.x
	let dy = begin.y - end.y
	let dz = begin.z - end.z

	let u =
		(p1.x - begin.x) * (begin.x - end.x) +
		(p1.y - begin.y) * (begin.y - end.y) +
		(p1.z - begin.z) * (begin.z - end.z)
	u = u / (dx * dx + dy * dy + dz * dz)
	return new Vector3(begin.x + u * dx, begin.y + u * dy, begin.z + u * dz)
}

function setDefaultModel(
	nodeName: string,
	nextNodePosition: ICoordinates | undefined,
	nextNode: string,
	nodePosition: ICoordinates | undefined,
) {
	return {
		meshes: defaultMesh,
		nextNode: nodeName,
		nextNodePosition: nextNodePosition,
		nodeName: nextNode,
		nodePosition: nodePosition,
		nodes: defaultNode,
		showMesh: true,
		showNode: true,
	} as IModelNode
}

/**
 * 计算四元值
 * @param {Object} model 模型对象
 * @param {Object} lookPoint 目标点
 */
function setModelSpin(model: Object3D, lookPoint: Vector3) {
	//以下代码在多段路径时可重复执行
	let mtx = new Matrix4() //创建一个4维矩阵
	mtx.lookAt(lookPoint, model.position, model.up) //设置朝向
	let toRot = new Quaternion()
	toRot.setFromRotationMatrix(mtx) //计算出需要进行旋转的四元数值
	return toRot
}
