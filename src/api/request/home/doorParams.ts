// 风门状态
export enum DoorStatus {
	// 初始化
	ZERO = '0',
	// 关门中
	ONE = '1',
	// -关到位
	TWO = '2',
	// 自动关暂停
	THREE = '3',
	// 关门超时
	FOUR = '4',
	// 开门中
	FIVE = '5',
	// 开到位
	SIX = '6',
	// 自动开暂停
	SEVEN = '7',
	// 开门超时
	EIGHT = '8',
}
//工作状态
export enum WorkStatus {
	// 自动
	ZERO = '0',
	// 手动
	ONE = '1',
	// 远程
	TWO = '2',
}
//风门远程操作
export enum ControlKey {
	// 自动
	ZERO = '0',
	// 手动
	ONE = '1',
	// 远程
	TWO = '2',
	// A开门
	THREE = '3',
	// A关门
	FOUR = '4',
	// B开门
	FIVE = '5',
	// B关门
	SIX = '6',
	// 解除闭锁
	SEVEN = '7',
	// 闭锁
	EIGHT = '8',
}
//风窗状态
export enum WindowStatus {
	// 正在调风
	ZERO = '0',
	// 开到位
	ONE = '1',
	// 关到位
	TWO = '2',
	// 调风超时
	THREE = '3',
	// 静态中
	FOUR = '4',
}

// 风窗参数设置
export enum WindowParamType {
	// 	风速
	ZERO = '0',
	// 	风量
	ONE = '1',
	// 	风压
	TWO = '2',
	// 	开度
	TEN = '10',
	// 	面积
	ELEVEN = '11',
}
