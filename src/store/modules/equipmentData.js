import { defineStore } from 'pinia'
const useEquipment = defineStore('equipment-data', {
	state: () => ({
		// 设备信息
		data: [
			{
				id: 1,
				name: '风门 [18]',
				type: '1',
				children: [
					{
						id: 'c1',
						name: '一盘区输运大巷风门',
						type: '1',
						warnType: '1',
						warnDateTime: '06/17 16:16:25',
						warnMes: '气源动力不足',
						point: { x: -10148.393558086434, y: 97294.98794581147, z: -28709.720973348452 },
					},
					{
						id: 'c2',
						name: '二盘区输运大巷风门',
						type: '1',
						warnType: '0',
						point: {
							x: -9369.889530323566,
							y: 97337.88543743957,
							z: -28982.618075120467,
						},
					},
					{
						id: 'c3',
						name: '三盘区输运大巷风门',
						type: '1',
						warnType: '0',
						point: { x: 11469.953571433081, y: 95239.95773129417, z: -31126.929878070492 },
					},
					{
						id: 'c4',
						name: '四盘区输运大巷风门',
						type: '1',
						warnType: '0',
						point: { x: -3520.265751031748, y: 93699.61548874268, z: -29624.514592279014 },
					},
				],
			},
			{
				id: 2,
				name: '风窗 [42]',
				type: '2',
				children: [
					{
						id: 'c21',
						name: '一盘区输运大巷风窗',
						type: '2',
						warnType: '0',
						point: { x: -17955.484179557665, y: 93272.19969896683, z: -22400.79719500969 },
					},
				],
			},
			{
				id: 3,
				name: '风速传感器 [26]',
				type: '3',
				children: [
					{
						id: 'c31',
						name: '一盘区输运大巷风速传感器',
						type: '3',
						warnType: '0',
						point: { x: -11877.787218305604, y: 93669.41131112858, z: -22463.64387861651 },
					},
				],
			},
			{
				id: 4,
				name: '多参传感器 [13]',
				type: '4',
				children: [
					{
						id: 'c41',
						name: '一盘区输运大巷多参传感器',
						type: '4',
						warnType: '0',
						point: { x: -5158.713323475473, y: 94095.48677903187, z: -22673.809104096228 },
					},
				],
			},
			{
				id: 5,
				name: '全断面测风 [26]',
				type: '5',
				children: [
					{
						id: 'c51',
						name: '一盘区输运大巷多参传感器',
						type: '5',
						warnType: '0',
						point: { x: 3065.066453847703, y: 94786.94657150222, z: -23023.1619794755 },
					},
				],
			},
			{
				id: 6,
				name: '主扇 [1]',
				type: '6',
				children: [
					{
						id: 'c61',
						name: '主扇',
						type: '6',
						warnType: '0',
						point: { x: 86835.40949331324, y: 97643.32791645546, z: -36095.1240498868 },
					},
				],
			},
			{
				id: 7,
				name: '局扇 [18]',
				type: '7',
				children: [
					{
						id: 'c71',
						name: '局扇',
						type: '7',
						warnType: '0',
						point: { x: -7384.812139458587, y: 93691.51163355907, z: -32988.283868571154 },
					},
				],
			},
			{
				id: 8,
				name: '全部设备 [148]',
				type: '8',
				children: [],
			},
		],
		// 显示设备类型
		equipTypeList: [],
		// 避灾路线
		disasterPreventionRoute: [],
	}),
	actions: {
		// 更新设备列表数据
		updateData(views) {
			this.data = views
		},
		// 更新显示设备类型
		updateEquipTypeList(views) {
			this.equipTypeList = views
		},
		//   更新避灾路线
		updateRouteData(views) {
			this.disasterPreventionRoute = views
		},
	},
})

export default useEquipment
