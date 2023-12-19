import useEditModel from '@/components/VueThree/hooks/useEditModel'
import { Object3D, Vector3 } from 'three'
import { Group } from 'three/src/Three'
import { DataCircle, Heatmap, HeatmapConfiguration, HeatmapData } from 'types/heatmap'

export interface pointConfig {
	// 初始化热力图对象配置
	instanceConfig: HeatmapConfiguration
	// 点位数据
	pointData: HeatmapData<DataCircle>
	// 单条巷道热力图起点坐标
	startPosition: ICoordinates
	// 单条巷道热力图终点坐标
	endPosition: ICoordinates
	// 热力图长度
	heatmapWidth: number
	// 热力图宽度
	heatmapHeight: number
	// 巷道长度
	tunnelWidth: number
	// 巷道宽度
	tunnelHeight: number
}
const { createdImg } = useEditModel()
export class IHeatmap {
	// 热力图模型所在父类Object3D
	wrapper: Object3D
	// 热力图对象数组
	heatmapInstances: Heatmap<'value', 'x', 'y'>[]
	imgGroup: Group
	constructor(parentObject: Object3D) {
		this.wrapper = parentObject
		this.heatmapInstances = []
		this.imgGroup = new Group()
	}
	initHeatmap(pointDataList: pointConfig[]) {
		this.wrapper.remove(this.imgGroup)
		this.imgGroup = new Group()
		this.heatmapInstances = []
		if (!pointDataList) return
		const { getCenterPoint } = useEditModel()

		for (let i = 0; i < pointDataList.length; i++) {
			const pointData = pointDataList[i]
			pointData.instanceConfig.container = this.createdHeatmapDom(
				pointData.heatmapWidth,
				pointData.heatmapHeight,
			)
			const heatmapInstance = h337.create(pointData.instanceConfig)
			heatmapInstance.setData(pointData.pointData)
			this.heatmapInstances.push(heatmapInstance)
			const imgUrl = heatmapInstance.getDataURL()

			const position = getCenterPoint(pointData.startPosition, pointData.endPosition)

			const start = new Vector3(
				pointData.endPosition.x,
				pointData.endPosition.y,
				pointData.endPosition.z,
			)
			const end = new Vector3(
				pointData.startPosition.x,
				pointData.startPosition.y,
				pointData.startPosition.z,
			)
			const mesh = createdImg(
				pointData.tunnelWidth,
				pointData.tunnelHeight,
				imgUrl,
				position,
				start,
				end,
			)
			this.imgGroup.add(mesh)
		}

		this.wrapper.add(this.imgGroup)
	}
	createdHeatmapDom(width: number, height: number) {
		const element = document.createElement('div')
		element.style.width = width + 'px'
		element.style.height = height + 'px'
		element.style.display = 'none'
		document.body.appendChild(element)
		return element
	}
}
