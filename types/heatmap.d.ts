export as namespace h337

/**
 * 创建热力图实例。可以使用configObject自定义热图。
 */
export function create<V extends string = 'value', X extends string = 'x', Y extends string = 'y'>(
	configObject: HeatmapConfiguration<V, X, Y>,
): Heatmap<V, X, Y>

export function register(pluginKey: string, plugin: any): void

/**
 * 热力图实例由h337.create返回。
 */
export class Heatmap<V extends string, X extends string, Y extends string> {
	/**
	 * 添加数据点，数据初始化使用setData
	 */
	addData(dataPoint: DataPoint<V, X, Y> | ReadonlyArray<DataPoint<V, X, Y>>): this

	/**
	 * 数据初始化。
	 */
	setData(data: HeatmapData<DataPoint<V, X, Y>>): this

	/**
	 * 更改数据集的max并重新绘制。
	 */
	setDataMax(number: number): this

	/**
	 * 更改数据集的min并重新绘制。
	 */
	setDataMin(number: number): this

	/**
	 * 重新初始化create
	 */
	configure<Vn extends string = V, Xn extends string = X, Yn extends string = Y>(
		configObject: HeatmapConfiguration<Vn, Xn, Yn>,
	): Heatmap<Vn, Xn, Yn>

	/**
	 * 返回数据点位置的值。
	 * 如果点不在存储中，则返回的值是基于渐变混合的插值。
	 */
	getValueAt(point: { x: number; y: number }): number

	/**
	 * 返回一个带有setData的JSON对象。
	 */
	getData(): HeatmapData<DataCircle>

	/**
	 * 返回dataURL
	 * data:image/png;base64...
	 */
	getDataURL(): string

	/**
	 * 重新绘制整个热力图画布。
	 */
	repaint(): this
}

export interface BaseHeatmapConfiguration<V extends string = 'value'> {
	/**
	 * 背景颜色字符串，格式为十六进制、颜色名或rgb(A)
	 */
	backgroundColor?: string | undefined

	/**
	 * 将应用于所有数据点的模糊因子。
	 * 模糊系数越高，渐变就越平滑
	 * 默认值:0.85
	 */
	blur?: number | undefined

	/**
	 * 表示渐变的对象。
	 * 语法:{[key: number in range [0,1]]: color}
	 */
	gradient?: { [key: string]: string } | undefined

	/**
	 * 热图中最高值将具有的最大不透明度。（如果设置了不透明度，将被覆盖）
	 * 默认值: 0.6
	 */
	maxOpacity?: number | undefined

	/**
	 * 热图中最低值的最小不透明度（如果设置了不透明度，则将被覆盖）
	 */
	minOpacity?: number | undefined

	/**
	 * 整个热图的全局不透明度。如果设置了，这将覆盖 maxOpacity 和 minOpacity！
	 * 默认值: 0.6
	 */
	opacity?: number | undefined

	/**
	 * 每个数据点的半径(如果没有在数据点本身上指定)
	 */
	radius?: number | undefined

	/**
	 * 缩放半径基于地图缩放。
	 */
	scaleRadius?: boolean | undefined

	/**
	 * 数据点中值/权重的属性名
	 * 默认值: 'value'
	 */
	valueField?: V | undefined

	/**
	 * 数据更新回调。
	 */
	onExtremaChange?: (() => void) | undefined

	/**
	 * 指示热图应该使用全局极值还是局部极值(当前显示的视口的最大值和最小值)
	 */
	useLocalExtrema?: boolean | undefined
}

/**
 * 热力图的配置对象
 */
export interface HeatmapConfiguration<
	V extends string = 'value',
	X extends string = 'x',
	Y extends string = 'y',
> extends BaseHeatmapConfiguration<V> {
	/**
	 * 热力图画布的DOM节点
	 */
	container: HTMLElement

	/**
	 * 数据点中 x 坐标的属性名称 默认值:'x'
	 */
	xField?: X | undefined

	/**
	 * 数据点中 y 坐标的属性名称 默认值:'y'
	 */
	yField?: Y | undefined
}

/**
 * 热力图上的单个数据点.
 */
export type DataPoint<
	V extends string = 'value',
	X extends string = 'x',
	Y extends string = 'y',
> = Record<V | X | Y, number>

/**
 * `Heatmap#hello`的返回值
 */
export interface DataCircle {
	x: number
	y: number
	value: number
	radius: number
}

/**
 * 表示热图上一组数据点的对象
 */
export interface HeatmapData<T> {
	/**
	 * 一组数据点
	 */
	data: readonly T[]

	/**
	 * valueField的最大值
	 */
	max: number

	/**
	 * valueField的最小值
	 */
	min: number
}
