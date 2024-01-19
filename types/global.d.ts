declare module 'element-plus/dist/locale/zh-cn.mjs'

declare interface Fn<T = any> {
	(...arg: T[]): T
}
declare type Nullable<T> = T | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

declare type ComponentRef<T> = InstanceType<T>

declare type OptionValueType = string | number

declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>

/** Select 需要的数据格式 */
declare interface ISelectOption {
	label: string
	value: OptionValueType
	elTagType?: string
	elTagClass?: string
}

/** 所有 表单类 接口的响应数据都应该准守该格式 */
declare interface IApiResponseData<T = any> {
	code: number
	data: T
	msg: string
}
// 所有无条数列表
declare interface IApiResponseDataList<T = any> {
	code: number
	data: T[]
	msg: string
}
/** 所有普通列表查询接口的响应数据都应该准守该格式 */
declare interface ITableApiResponseData<T = any> {
	code: number
	total: number
	rows: T[]
	msg: string
}
declare var h337

interface siteConfig {
	// 地图服务
	mapUrl: string
	// socket
	socketip: string
	// 视频模式
	videoMode: string
	// webRtc地址
	webrtcServer: string
	// 免登陆用户名
	noValidUser: string
	// 免登陆密码
	noValidPass: string
	// 系统标题
	APP_TITLE: string
}

declare interface Window {
	SITE_CONFIG: siteConfig //全局变量名
}
