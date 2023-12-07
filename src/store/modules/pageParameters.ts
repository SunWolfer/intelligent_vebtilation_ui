import { defineStore } from 'pinia'

const pageParameters = defineStore('page-parameters', {
	state: () => ({
		//风门/风窗/主扇/局扇/测风站参数
		equipmentParams: {},
	}),
	actions: {
		updateEquipmentParams(data: any) {
			this.equipmentParams = data
		},
	},
})

export default pageParameters
