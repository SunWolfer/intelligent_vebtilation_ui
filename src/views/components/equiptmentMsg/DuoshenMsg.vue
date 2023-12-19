<script setup>
	import useEquipmentData from '@/hooks/useEquipmentData'
	import { selectDictLabel } from '@/utils/ruoyi'
	import { homeMsg } from '@/api/request/home/homeMsg'

	const props = defineProps({
		data: {
			type: Object,
			default() {
				return {}
			},
		},
		index: {
			type: Number,
			default: 0,
		},
	})

	const { tEquipmentIndex, formatterEquipmentType } = useEquipmentData()
	const { dataForm, online_status, onlineStatusClass } = homeMsg(props.data, props.index)
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
				<div :class="dataForm.warnStatus !== '0' ? 'equipment_warn' : 'equipment_normal'"></div>
			</div>
			<div class="equipment_msg_top_item_2">{{ dataForm.name }}</div>
			<div class="equipment_msg_top_item_3 equipment_msg_top_item_3_duo_shen">
				<div class="equipment_msg_top_item_3_body">
					<span>温度(°C)</span>
					<div class="equipment_text">{{ dataForm.pressureTemperature }}</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>湿度(%RH)</span>
					<div class="equipment_text">{{ dataForm.airHumidity }}</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>差压(Pa)</span>
					<div class="equipment_text">{{ dataForm.differentialPressure }}</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>绝压(kPa)</span>
					<div class="equipment_text">{{ dataForm.absolutePressure }}</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>通讯</span>
					<div class="lamp_orange">{{ selectDictLabel(online_status, dataForm.onlineStatus) }}</div>
				</div>
			</div>
			<div class="equipment_msg_top_item_4 equipment_msg_top_item_4_door">
				<span class="equipment_msg_top_item_3_text_left">多参传感器位胃：</span>
				<span class="overText" :title="dataForm.location">{{ dataForm.location }}</span>
				<span class="equipment_msg_top_item_3_text_left">通讯IP:</span>
				<span>{{ dataForm.ipAddress }}</span>
			</div>
		</div>
		<div class="equipment_msg_center">监测点{{ index + 1 }}</div>
		<div class="equipment_msg_footer"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/home/equiptment_msg.scss';
</style>
