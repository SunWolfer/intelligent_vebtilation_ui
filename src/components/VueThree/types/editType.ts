// 巷道编辑类型
export enum EditType {
	// 默认
	DEFAULT,
	//   新增
	ADD,
	// 连接
	CONNECT,
	// 删除(删除新增)
	DELETE,
	// 删除(删除所有类型)
	DELETEALL,
	// 	添加风门
	DOOR,
	// 	添加风窗
	WINDOW,
	// 添加密闭墙
	WALL,
	// 	添加测风站
	FULLWIND,
	// 	添加风速传感器
	WINDSENSOR,
	// 添加多参传感器
	MULTIPARAMETE,
	// 	主扇
	MAINFAN,
	// 	局扇
	LOCALFAN,
}
//巷道编辑按钮选中
export enum TunnelBtn {
	// 	新增
	ADD,
	// 	绑定设备
	SENSOR,
	// 	删除
	DELETE,
}
