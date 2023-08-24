import { defineStore } from 'pinia'
import { deviceTypes } from '@/api/request/menuType'
import { EditType } from '@/components/VueThree/types/editType'
const useEquipment = defineStore('equipment-data', {
	state: () => ({
		// 设备信息
		data: [
			{
				id: 1,
				name: '风门',
				type: 'door',
				total: 18,
				onLine: 5,
				children: [
					{
						id: 'c1',
						name: '一盘区输运大巷风门',
						type: 'door',
						warnType: '1',
						warnDateTime: '06/17 16:16:25',
						warnMes: '气源动力不足',
						point: { x: -10148.393558086434, y: 97294.98794581147, z: -28709.720973348452 },
						showDetails: false,
						onLine: true,
					},
					{
						id: 'c2',
						name: '二盘区输运大巷风门',
						type: 'door',
						warnType: '0',
						point: {
							x: -9369.889530323566,
							y: 97337.88543743957,
							z: -28982.618075120467,
						},
						showDetails: false,
					},
					{
						id: 'c3',
						name: '三盘区输运大巷风门',
						type: 'door',
						warnType: '0',
						point: { x: 11469.953571433081, y: 95239.95773129417, z: -31126.929878070492 },
						showDetails: false,
					},
					{
						id: 'c4',
						name: '四盘区输运大巷风门',
						type: 'door',
						warnType: '0',
						point: { x: -3520.265751031748, y: 93699.61548874268, z: -29624.514592279014 },
						showDetails: false,
					},
				],
			},
			{
				id: 2,
				name: '风窗',
				type: 'window',
				total: 18,
				onLine: 5,
				children: [
					{
						id: 'c21',
						name: '一盘区输运大巷风窗',
						type: 'window',
						warnType: '0',
						point: { x: -19330.20920418488, y: 93182.02272240575, z: -22382.22573964162 },
						showDetails: false,
					},
				],
			},
			{
				id: 3,
				name: '风速传感器',
				type: 'windsensor',
				total: 18,
				onLine: 5,
				children: [
					{
						id: 'c31',
						name: '一盘区输运大巷风速传感器',
						type: 'windsensor',
						warnType: '0',
						point: { x: -11877.787218305604, y: 93669.41131112858, z: -22463.64387861651 },
						showDetails: false,
					},
				],
			},
			{
				id: 4,
				name: '多参传感器',
				type: 'multiparamete',
				total: 18,
				onLine: 5,
				children: [
					{
						id: 'c41',
						name: '一盘区输运大巷多参传感器',
						type: 'multiparamete',
						warnType: '0',
						point: { x: -5158.713323475473, y: 94095.48677903187, z: -22673.809104096228 },
						showDetails: false,
					},
				],
			},
			{
				id: 5,
				name: '全断面测风',
				type: 'fullwind',
				total: 18,
				onLine: 5,
				children: [
					{
						id: 'c51',
						name: '一盘区输运大巷多参传感器',
						type: 'fullwind',
						warnType: '0',
						point: { x: 3065.066453847703, y: 94786.94657150222, z: -23023.1619794755 },
						showDetails: false,
					},
				],
			},
			{
				id: 6,
				name: '主扇',
				type: 'mainfan',
				total: 1,
				onLine: 1,
				children: [
					{
						id: 'c61',
						name: '主扇',
						type: 'mainfan',
						warnType: '0',
						point: { x: 86835.40949331324, y: 97643.32791645546, z: -36095.1240498868 },
						showDetails: false,
					},
				],
			},
			{
				id: 7,
				name: '局扇',
				type: 'localfan',
				total: 18,
				onLine: 5,
				children: [
					{
						id: 'c71',
						name: '局扇',
						type: 'localfan',
						warnType: '0',
						point: { x: -7384.812139458587, y: 93691.51163355907, z: -32988.283868571154 },
						showDetails: false,
					},
				],
			},
			{
				id: 8,
				name: '全部设备',
				type: 'all',
				total: 148,
				onLine: 50,
				children: [],
			},
		],
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
		// 避灾路线
		disasterPreventionRoute: [
			['118', '119', '129', '130', '131'],
			['142', '143', '144', '141'],
		],
	}),
	actions: {
		// 更新设备列表数据
		updateData(views) {
			this.data = views
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
		//   更新避灾路线
		updateRouteData(views) {
			this.disasterPreventionRoute = views
		},
	},
})

export default useEquipment
