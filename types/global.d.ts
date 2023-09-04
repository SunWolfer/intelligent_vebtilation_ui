declare interface Fn<T = any> {
	(...arg: T[]): T
}

declare type Nullable<T> = T | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

declare type ComponentRef<T> = InstanceType<T>

declare type OptionValueType = string | number

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
//空间坐标格式
declare interface ICoordinates {
	x: number
	y: number
	z: number
}
