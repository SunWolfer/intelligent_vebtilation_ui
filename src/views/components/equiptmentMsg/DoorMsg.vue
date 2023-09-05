<script setup>
	import useEquipmentData from '@/hooks/useEquipmentData'
	import { homeMsg } from '@/api/request/home/homeMsg'
	import { selectDictLabel } from '@/utils/ruoyi'
	import { DoorStatus } from '@/api/request/home/doorParams'

	const props = defineProps({
		data: {
			type: Object,
			default: {},
		},
		index: {
			type: Number,
			default: 0,
		},
	})
	const { tEquipmentIndex, formatterEquipmentType } = useEquipmentData()
	const { dataForm, door_status, door_work_model, online_status, modelClass, onlineStatusClass } =
		homeMsg(props.data, props.index)

	// 风门A状态样式
	const doorStatusAClass = computed(() => {
		let IClass = ''
		if ([DoorStatus.ZERO].includes(dataForm.value.doorStatusA)) {
			IClass = 'lamp_grey'
		}
		if (
			[DoorStatus.ONE, DoorStatus.TWO, DoorStatus.FIVE, DoorStatus.SIX].includes(
				dataForm.value.doorStatusA,
			)
		) {
			IClass = 'lamp_green'
		}
		if ([DoorStatus.THREE, DoorStatus.SEVEN].includes(dataForm.value.doorStatusA)) {
			IClass = 'lamp_orange'
		}
		if ([DoorStatus.FOUR, DoorStatus.EIGHT].includes(dataForm.value.doorStatusA)) {
			IClass = 'lamp_red'
		}
		return IClass
	})
	// 风门B状态样式

	const doorStatusBClass = computed(() => {
		let IClass = ''
		if ([DoorStatus.ZERO].includes(dataForm.value.doorStatusB)) {
			IClass = 'lamp_grey'
		}
		if (
			[DoorStatus.ONE, DoorStatus.TWO, DoorStatus.FIVE, DoorStatus.SIX].includes(
				dataForm.value.doorStatusB,
			)
		) {
			IClass = 'lamp_green'
		}
		if ([DoorStatus.THREE, DoorStatus.SEVEN].includes(dataForm.value.doorStatusB)) {
			IClass = 'lamp_orange'
		}
		if ([DoorStatus.FOUR, DoorStatus.EIGHT].includes(dataForm.value.doorStatusB)) {
			IClass = 'lamp_red'
		}
		return IClass
	})
</script>

<template>
	<div class="equipment_msg">
		<div
			class="equipment_msg_top"
			:class="tEquipmentIndex === index ? '' : 'equipment_msg_top_opacity'"
		>
			<div class="equipment_msg_top_item_1">
				<div class="equipment_msg_top_item_1_text">
					<span>[设备类型]</span>
					{{ formatterEquipmentType(data.devType) }}
				</div>
				<div :class="data.warnStatus !== '0' ? 'equipment_warn' : 'equipment_normal'" />
			</div>
			<div class="equipment_msg_top_item_2">{{ dataForm.name }}</div>
			<div class="equipment_msg_top_item_3 equipment_msg_top_item_3_door">
				<div class="equipment_msg_top_item_3_body">
					<span>A门状态</span>
					<div :class="doorStatusAClass">
						{{ selectDictLabel(door_status, dataForm.doorStatusA) }}
					</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>B门状态</span>
					<div :class="doorStatusBClass">
						{{ selectDictLabel(door_status, dataForm.doorStatusB) }}
					</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>当前模式</span>
					<div :class="modelClass">{{ selectDictLabel(door_work_model, dataForm.workModel) }}</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>通讯</span>
					<div :class="onlineStatusClass">
						{{ selectDictLabel(online_status, dataForm.onlineStatus) }}
					</div>
				</div>
			</div>
			<div class="equipment_msg_top_item_4 equipment_msg_top_item_4_door">
				<span class="equipment_msg_top_item_3_text_left">风门位置：</span>
				<span class="overText" :title="dataForm.location">{{ dataForm.location }}</span>
				<span class="equipment_msg_top_item_3_text_left">通讯IP：</span>
				<span>{{ dataForm.ip }}</span>
			</div>
		</div>
		<div class="equipment_msg_center">监测点{{ index + 1 }}</div>
		<div class="equipment_msg_footer"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/home/equiptment_msg.scss';
</style>
