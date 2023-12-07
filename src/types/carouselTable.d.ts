declare interface CarouselTable {
	/**
	 * @description 表头数据
	 * @type {Array<String>}
	 * @default header = []
	 * @example header = ['column1', 'column2', 'column3']
	 */
	header?: string[]
	/**
	 * @description 表数据
	 * @type {Array<Array>}
	 * @default data = []
	 */
	data?: string[][]
	/**
	 * @description 表行数
	 * @type {Number}
	 * @default rowNum = 5
	 */
	rowNum?: number
	/**
	 * @description 表头背景色
	 * @type {String}
	 * @default headerBGC = '#00BAFF'
	 */
	headerBGC?: string
	/**
	 * @description 奇数行背景色
	 * @type {String}
	 * @default oddRowBGC = '#003B51'
	 */
	oddRowBGC?: string
	/**
	 * @description 偶数行背景色
	 * @type {String}
	 * @default evenRowBGC = '#003B51'
	 */
	evenRowBGC?: string
	/**
	 * @description 轮播时间间隔(ms)
	 * @type {Number}
	 * @default waitTime = 2000
	 */
	waitTime?: number
	/**
	 * @description 表头高度
	 * @type {Number}
	 * @default headerHeight = 35
	 */
	headerHeight?: number
	/**
	 * @description 列宽度 ，columnWidth可以配置每一列的宽度
	 * @type {Array<Number>}
	 * @default columnWidth = []
	 */
	columnWidth?: number[]
	/**
	 * @description 列对齐方式 ，align可以配置每一列的对齐方式，默认值为'center'，默认情况下每一列对齐均为center
	 * @type {Array<String>}
	 * @default align = []
	 * @example align = ['left', 'center', 'right']
	 */
	align?: string[]
	/**
	 * @description 显示行号
	 * @type {Boolean}
	 * @default index = false
	 */
	index?: boolean
	/**
	 * @description 行号表头
	 * @type {String}
	 * @default indexHeader = '#'
	 */
	indexHeader?: string
	/**
	 * @description 轮播方式
	 * @type {String}
	 * @default carousel = 'horizontal'
	 * @example carousel = 'horizontal' / 'vertical'
	 */
	carousel?: string
	/**
	 * @description 悬浮暂停轮播
	 * @type {Boolean}
	 * @default hoverPause = true
	 * @example hoverPause = true | false
	 */
	hoverPause?: boolean
}
