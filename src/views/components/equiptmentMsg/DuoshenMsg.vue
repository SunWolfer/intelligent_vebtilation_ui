<script setup>
	import useEquipmentData from '@/hooks/useEquipmentData'

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
				<div :class="data.warnType === '1' ? 'equipment_warn' : 'equipment_normal'" />
			</div>
			<div class="equipment_msg_top_item_2">{{ data.name }}</div>
			<div class="equipment_msg_top_item_3 equipment_msg_top_item_3_duo_shen">
				<div class="equipment_msg_top_item_3_body">
					<span>温度(°C)</span>
					<div class="equipment_text">12</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>湿度(%RH)</span>
					<div class="equipment_text">1</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>差压(Pa)</span>
					<div class="equipment_text">1</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>绝压(Pa)</span>
					<div class="equipment_text">1</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>通讯</span>
					<div class="lamp_orange">掉线</div>
				</div>
			</div>
			<div class="equipment_msg_top_item_4 equipment_msg_top_item_4_door">
				<span class="equipment_msg_top_item_3_text_left">多参传感器位胃：</span>
				<span class="overText">22123 回风顺槽瓦斯泵站 210 米</span>
				<span class="equipment_msg_top_item_3_text_left">通讯IP:</span>
				<span>19.</span>
			</div>
		</div>
		<div class="equipment_msg_center">监测点{{ index + 1 }}</div>
		<div class="equipment_msg_footer"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/home/equiptment_msg.scss';
</style>
