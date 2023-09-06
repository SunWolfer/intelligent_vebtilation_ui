interface ICoordinates {
	x: number
	y: number
	z: number
}
// 标签对象
interface LabelAttribute {
	id: string
	point: ICoordinates
	[key: string]: any
}

// 自定义动画（贴图位移/旋转）
interface IAnimateData {
	modelName: string //父模型名称
	materialName: string //贴图名称
	objName: string //父对象名称
	animationType: number //动画类型（1 贴图位移 2轴旋转）
	rotationAxis: string //旋转轴
	state: number //方向
	speed: number //速度
}

// 避灾路线入参
interface DisPreRoute {
	points: ICoordinates[] //路线生成点位
	lineRadius?: number //路线粗细
}
// 自定义球体入参
interface IBall {
	color: string
	point: ICoordinates
	[key: string]: any
}
// 自定义球体列表
interface IBallData {
	mesh: any
	uuid: string
	value: IBall
}

type ISize = {
	width: number
	height: number
}

// 火焰位置列表
interface IFiresPosition extends ICoordinates {
	size: number // 大小
}

//平面点
interface Point {
	points: number[][]
	color?: string
	type: number
}
// 其他模型接口
interface IOtherThreeMod {
	type: string // 类型
	src: string // 文件路径
	initAnimation?: boolean // 初始化动画
}
//自生成巷道模型对象
interface IModelNode {
	// 开始节点名称
	nodeName: string
	// 开始节点位置
	nodePosition: ICoordinates | undefined
	// 下一连接节点名称
	nextNode: string
	// 下一连接节点位置
	nextNodePosition: ICoordinates | undefined
	// 节点模型&材质
	nodes: INodeMesh
	// 巷道模型&材质
	meshes: IMesh[]
	// 显示节点
	showNode: boolean
	// 显示巷道
	showMesh: boolean
	// 	显示风流
	showWind?: boolean
	// 	风流参数
	windMesh?: windMesh
}
// 风流参数配置
interface windMesh {
	// 	风流类型
	windType: number
	// 	风流位置
	windPosition: number
	// 	风流大小
	size: number
	// 	风流正向/反向
	direction: boolean
}
// 生成巷道节点模型参数配置
interface INodeMesh {
	geometry: INodeGeometry
	material: IMaterial
}
// 生成球体模型对象参数配置
interface INodeGeometry {
	// 	半径
	radius: number
	// 经度上的切片数，相当于经度被切成了几瓣
	widthSegments?: number
	// 纬度上的切片数，相当于纬度被切成了几层
	heightSegments?: number
	// 经度开始的弧度
	phiStart?: number
	// 经度跨过的弧度
	phiLength?: number
	// 纬度开始的弧度
	thetaStart?: number
	// 纬度跨过的弧度
	thetaLength?: number
}
// 生成巷道模型参数配置
interface IMesh {
	name?: string
	geometry: IGeometry
	material: IMaterial
}
// 生成巷道模型
interface IGeometry extends ICylinderGeometry, IBoxGeometry, IPlaneGeometry {
	geometryType?: string
	offsetY?: number
}
// 生成圆柱模型对象参数配置
interface ICylinderGeometry {
	// 顶部范围大小
	radiusTop?: number
	// 底部范围大小
	radiusBottom?: number
	// 高度
	height?: number
	// 几何体边数
	radialSegments?: number
	// 侧边片段数
	heightSegments?: number
	// 两端是否开口
	openEnded?: boolean
	// 角度
	thetaStart?: number
	// 周长
	thetaLength?: number
}
// 生成平面
interface IPlaneGeometry {
	width?: number
	height?: number
	widthSegments?: number
	heightSegments?: number
}
// 生成立方体
interface IBoxGeometry {
	width?: number
	height?: number
	depth?: number
	widthSegments?: number
	heightSegments?: number
	depthSegments?: number
}
//生成巷道材质参数配置
interface IMaterial {
	type?: string
	// 颜色
	color?: any | undefined
	//材质贴图
	mapUrl?: string | undefined
	transparent?: boolean | undefined
	opacity?: number | undefined
	side?: number | undefined
	depthWrite?: boolean | undefined
	depthTest?: boolean | undefined
	colorWrite?: boolean
	metalness?: number
	roughness?: number
}
// 传入三维字体
interface IRootFont {
	// 文字所在父模型名称
	parent: string
	// 文字
	text: string
	// 文字大小
	size: number
	// 文字颜色
	color: string
	// 文字高度偏移量
	height: number
	// 文字背景颜色
	planeColor: string
}
// 创建三维字体
interface IFontType extends IRootFont {
	// 文字位置
	position: any
	// 文字方向
	quaternion: any
}
//自定义平面
interface IPlane {
	// 点位置
	points: ICoordinates[]
	// 材质
	material: IMaterial
}
// 自定义文字
interface IText {
	// 文字所在父模型名称
	parent?: string
	// 	自定义文字旋转方向
	// 	起点
	startPoint?: ICoordinates
	// 终点
	endPoint?: ICoordinates
	// 文字
	text: string
	// 文字大小
	size: number
	// 文字颜色
	color: string
	// 文字高度偏移量
	height: number
}
