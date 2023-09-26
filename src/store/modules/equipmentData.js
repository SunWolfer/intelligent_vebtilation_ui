import { defineStore } from 'pinia'
import { deviceTypes } from '@/api/request/menuType'
import { EditType } from '@/components/VueThree/types/editType'
import { deviceAll } from '@/api/api/home'
const useEquipment = defineStore('equipment-data', {
	state: () => ({
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
		// 	预警列表
		warnList: [],
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
		updateTEquipmentIndex(data) {
			this.tEquipmentIndex = data
		},
		// 更新设备类型
		updateEquipmentTypeList(views) {
			this.equipmentTypeList = views
		},
		// 更新显示设备类型
		updateShowEquipTypeList(views) {
			this.showEquipTypeList = views
		},
		// 更新设备巡检列表
		updateEquipmentPath(data) {
			this.equipmentPath = data
		},
		//   更新避灾路线
		updateRouteData(views) {
			this.disasterPreventionRoute = views
		},
		// 更新灾变地点位置
		updateDisasterPosition(data) {
			this.disasterPosition = data
		},
		// 更新灾变地点名称
		updateDisasterLocation(data) {
			this.disasterLocation = data
		},
		// 更新灾变人员位置
		updatePersonPosition(data) {
			this.personPosition = data
		}, // 更新灾变人员位置名称
		updatePersonLocation(data) {
			this.personLocation = data
		},
		// 	更新预警列表
		updateWarnList(data) {
			this.warnList = data
		},
	},
})

export default useEquipment
