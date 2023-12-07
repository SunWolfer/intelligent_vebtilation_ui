import { defineStore } from 'pinia'
import { deviceTypes } from '@/types/menuType'
import { EditType } from '@/components/VueThree/types/editType'
import { deviceAll } from '@/api/api/home'
import { Vector3 } from 'three'

// 设备类型
export interface equipmentTypeState {
	label: string
	value: deviceTypes
	modeType: EditType
}
// 巡检类型
export interface pathState {
	id: string
	point: ICoordinates
	uniqueCode: string
	[key: string]: any
}

export interface EquipmentState {
	data: LabelAttribute[]
	tEquipmentIndex: number
	equipmentTypeList: equipmentTypeState[]
	showEquipTypeList: deviceTypes[]
	equipmentPath: pathState[]
	disasterPosition: Vector3 | undefined
	disasterLocation: string | undefined
	personPosition: Vector3 | undefined
	personLocation: string | undefined
	disasterPreventionRoute: number[]
}

const useEquipment = defineStore('equipment-data', {
	state: (): EquipmentState => ({
		// 设备信息
		data: [],
		// 当前显示设备索引
		tEquipmentIndex: 0,
		// 设备类型
		equipmentTypeList: [
			{
				label: '风门',
				value: deviceTypes.DOOR,
				modeType: EditType.DOOR,
			},
			{
				label: '风窗',
				value: deviceTypes.WINDOW,
				modeType: EditType.WINDOW,
			},
			{
				label: '风速传感器',
				value: deviceTypes.WINDSENSOR,
				modeType: EditType.WINDSENSOR,
			},
			{
				label: '多参传感器',
				value: deviceTypes.MULTIPARAMETE,
				modeType: EditType.MULTIPARAMETE,
			},
			{
				label: '全断面测风',
				value: deviceTypes.FULLWIND,
				modeType: EditType.FULLWIND,
			},
			{
				label: '主扇',
				value: deviceTypes.MAINFAN,
				modeType: EditType.MAINFAN,
			},
			{
				label: '局扇',
				value: deviceTypes.LOCALFAN,
				modeType: EditType.LOCALFAN,
			},
		],
		// 显示设备类型
		showEquipTypeList: [],
		// 设备巡检列表
		equipmentPath: [],
		// 	灾变地点
		disasterPosition: undefined,
		// 灾变地点名称
		disasterLocation: undefined,
		// 	灾变人员位置
		personPosition: undefined,
		// 灾变人员位置名称
		personLocation: undefined,
		// 避灾路线
		disasterPreventionRoute: [],
	}),
	actions: {
		// 更新设备列表数据
		updateData() {
			deviceAll().then(({ data }) => {
				for (let i = 0; i < data.length; i++) {
					for (let j = 0; j < data[i].children.length; j++) {
						data[i].children[j] = {
							...data[i].children[j],
							point: {
								x: data[i].children[j].pointX,
								y: data[i].children[j].pointY,
								z: data[i].children[j].pointZ,
							},
						}
					}
				}
				this.data = data
			})
		},
		// 更新显示设备索引
		updateTEquipmentIndex(data: number) {
			this.tEquipmentIndex = data
		},
		// 更新设备类型
		updateEquipmentTypeList(views: equipmentTypeState[]) {
			this.equipmentTypeList = views
		},
		// 更新显示设备类型
		updateShowEquipTypeList(views: deviceTypes[]) {
			this.showEquipTypeList = views
		},
		// 更新设备巡检列表
		updateEquipmentPath(data: pathState[]) {
			this.equipmentPath = data
		},
		//   更新避灾路线
		updateRouteData(views: number[]) {
			this.disasterPreventionRoute = views
		},
		// 更新灾变地点位置
		updateDisasterPosition(data: Vector3 | undefined) {
			this.disasterPosition = data
		},
		// 更新灾变地点名称
		updateDisasterLocation(data: string | undefined) {
			this.disasterLocation = data
		},
		// 更新灾变人员位置
		updatePersonPosition(data: Vector3 | undefined) {
			this.personPosition = data
		}, // 更新灾变人员位置名称
		updatePersonLocation(data: string | undefined) {
			this.personLocation = data
		},
	},
})

export default useEquipment
