import { Mesh, MeshBasicMaterial, Object3D } from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader'

export class IWindText {
	wrapper: Object3D
	// 风网解算文字层
	extraTextObject: Object3D
	font: Font | undefined
	meshList: Mesh[]
	constructor(zoneObj: Object3D) {
		this.meshList = []
		this.extraTextObject = new Object3D()
		this.wrapper = zoneObj
		this.wrapper.add(this.extraTextObject)
		this.loadFont()
	}
	loadFont() {
		let self = this
		const loader = new FontLoader()
		loader.load(import.meta.env.BASE_URL + 'file/FangSong_Regular.json', function (font) {
			self.font = font
		})
	}
	// 创建风网解算文字
	created3DFont(fontData: IFontType, plane: Mesh) {
		if (!this.font) return
		let textGroup = new Mesh()
		// textGroup.position.copy(plane.position)
		let geometry = new TextGeometry(fontData.text, {
			font: this.font,
			size: fontData.size,
			height: 1,
			curveSegments: 12,
			bevelEnabled: false,
			bevelThickness: 1, //斜角的深度
			bevelSize: 8, // 斜角的大小
			bevelSegments: 5, //斜角段数
		})
		geometry.computeBoundingBox()
		geometry.rotateY(Math.PI / 2)
		geometry.center()
		//创建法向量材质
		let meshMaterial = new MeshBasicMaterial({
			color: fontData.color,
		})
		let mesh = new Mesh(geometry, meshMaterial)
		mesh.quaternion.copy(plane.quaternion)
		mesh.position.copy(plane.position)
		textGroup.add(mesh, plane)

		this.extraTextObject.add(textGroup)
		this.meshList.push(textGroup)
	}
	// 	清除文字
	cleanText() {
		this.extraTextObject.remove(...this.meshList)
		this.meshList = []
	}
}
