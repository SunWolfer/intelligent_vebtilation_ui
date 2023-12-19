import { Mesh, Object3D } from 'three'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

export class IWindText {
	wrapper: Object3D
	// 风网解算文字层
	extraTextObject: Object3D
	meshList: Mesh[]
	constructor(zoneObj: Object3D) {
		this.meshList = []
		this.extraTextObject = new Object3D()
		this.wrapper = zoneObj
		this.wrapper.add(this.extraTextObject)
	}
	// 创建3DRenderer
	created3DRenderer(fontData: IFontType) {
		const element = document.createElement('div')
		element.className = 'element_renderer'
		element.style.backgroundColor = fontData.planeColor
		element.style.top = fontData.height + 'px'

		const number = document.createElement('div')

		number.className = 'element_text'
		number.style.fontSize = (fontData.size ?? 100) + 'px'
		number.textContent = fontData.text
		element.appendChild(number)
		const objectCSS: any = new CSS3DObject(element)
		objectCSS.position.copy(fontData.position)
		objectCSS.quaternion.copy(fontData.quaternion)

		objectCSS.rotateY(Math.PI / 2)
		objectCSS.scale.x = 0.3
		objectCSS.scale.y = 0.3

		this.extraTextObject.add(objectCSS)
		this.meshList.push(objectCSS)
	}
	// 	清除文字
	cleanText() {
		this.extraTextObject.remove(...this.meshList)
		this.meshList = []
	}
}
