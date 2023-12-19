// 菜单序号
export enum MenuTypes {
	ONE = 1,
	TWO,
	THREE,
	FOUR,
	FIVE,
	SIX,
	SEVEN,
}
//灾变类型
export enum DisasterTypes {
	ONE = '1',
	TWO = '2',
	THREE = '3',
	FOUR = '4',
}
//点击模型事件类型
export enum ClickEventTypes {
	// 正常点击
	NORMAL,
	// 灾变地点
	DISASTER,
	// 灾变人员位置
	PERSONNEL,
}
//设备类型
export enum deviceTypes {
	DOOR = 'door',
	WINDOW = 'window',
	WINDSENSOR = 'windsensor',
	MULTIPARAMETE = 'multiparameter',
	FULLWIND = 'fullwind',
	MAINFAN = 'mainfan',
	LOCALFAN = 'localfan',
	All = 'all',
}
//风门类型
export enum DoorTypes {
	// 无压风门
	nonPressureDamper = '1',
	// 调节风门
	adjustingTheAirDamper = '2',
}
//风门版本
export enum DoorVersion {
	oldVersion = 'V0.1',
	newVersion = 'V1.0',
}
//风门上风窗个数
export enum DoorWindowTypes {
	one = '1',
	two = '2',
}
