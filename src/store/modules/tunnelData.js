import { defineStore } from 'pinia'

const tunnelData = defineStore('tunnel-data', {
	state: () => ({
		// 巷道参数列表
		data: [
			{
				id: 'tunnel_01',
				label: '123',
				name: '142-143',
				point: {
					x: 206.2815281750802,
					y: 97320.10371219956,
					z: -14333.659767588375,
				},
			},
		],
	}),
	actions: {
		// 更新巷道参数列表
		updateData(data) {
			this.data = data
		},
	},
})

export default tunnelData
