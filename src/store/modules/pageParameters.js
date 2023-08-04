import { defineStore } from 'pinia'

const pageParameters = defineStore('page-parameters', {
	state: () => ({
		//风门/风窗参数
		equipmentParams: {},
	}),
	actions: {
		updateEquipmentParams(data) {
			this.equipmentParams = data
		},
	},
})

export default pageParameters
