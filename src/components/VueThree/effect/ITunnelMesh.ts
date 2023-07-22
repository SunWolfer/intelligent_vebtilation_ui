import usePoint from '@/components/VueThree/ModelEdit/IPoint'
import {
	BoxGeometry,
	CylinderGeometry,
	DoubleSide,
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
interface ITexture {
	name: string
	texture: Texture
}
export class ITunnelMesh {
	object: Object3D | undefined
	iTexture: ITexture[]
	constructor() {
		this.iTexture = []
	}

	config(obj: Object3D) {
		this.object = obj
	}
	// 添加
	add(...model: IModelNode[]) {
		if (!this.object) return
		let models = [...model]
		for (let i = 0; i < models.length; i++) {
			let modelNode = models[i]
			let geometryList = []
			if (modelNode.showNode) geometryList.push(...this.addNodeMesh(modelNode))
			if (modelNode.showMesh) geometryList.push(...this.addTunnelMesh(modelNode))
			this.object.add(...geometryList)
		}
	}
	// 生成球模型
	createdSphereGeometry(nodeMesh: INodeMesh) {
		let nodeGeometry = nodeMesh.geometry
		let geometry = new SphereGeometry(
			nodeGeometry.radius,
			nodeGeometry.widthSegments,
			nodeGeometry.heightSegments,
			nodeGeometry.phiStart,
			nodeGeometry.phiLength,
			nodeGeometry.thetaStart,
			nodeGeometry.thetaLength,
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
				meshGeometry.radiusTop,
				meshGeometry.height ?? 1,
				meshGeometry.radiusBottom,
			)
		} else {
			geometry = new CylinderGeometry(
				meshGeometry.radiusTop,
				meshGeometry.radiusBottom,
				meshGeometry.height ?? 1,
				meshGeometry.radialSegments,
				meshGeometry.heightSegments,
				meshGeometry.openEnded ?? false,
				meshGeometry.thetaStart,
				meshGeometry.thetaLength,
			)
		}
		geometry.rotateX(Math.PI / 2)

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
				colorWrite: iMaterial.colorWrite ?? true,
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
		// material.depthWrite = iMaterial.depthWrite ?? true
		// material.depthTest = iMaterial.depthTest ?? true
		if (iMaterial.color) material.color = iMaterial.color
		material.side = side
		return material
	}
	// 	添加节点
	addNodeMesh(modelNode: IModelNode) {
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
	// 	添加巷道
	addTunnelMesh(modelNode: IModelNode) {
		let geometryList = []
		let meshGroup = new Group()
		for (let j = 0; j < modelNode.meshes.length; j++) {
			let cylinderGeometry = this.createdGeometry(modelNode.meshes[j])
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
		if (!modelNode.windMesh) return []
		let iMaterial: IMaterial = {
			mapUrl:
				modelNode.windMesh.windType === 1
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
		if (modelNode.windMesh.direction) {
			mtx.lookAt(p2, p1, mesh.up) //设置朝向
		} else {
			mtx.lookAt(p1, p2, mesh.up) //设置朝向
		}

		let toRot = new Quaternion()
		toRot.setFromRotationMatrix(mtx) //计算出需要进行旋转的四元数值
		mesh.quaternion.set(toRot.x, toRot.y, toRot.z, toRot.w)
		return mesh
	}
}
