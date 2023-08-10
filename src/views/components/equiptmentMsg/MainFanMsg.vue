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
					{{ formatterEquipmentType(data.type) }}
				</div>
				<div :class="data.warnType === '1' ? 'equipment_warn' : 'equipment_normal'" />
			</div>
			<div class="equipment_msg_top_item_2">{{ data.name }}</div>
			<div class="equipment_msg_top_item_3 equipment_msg_top_item_3_main_fan">
				<div class="equipment_msg_top_item_3_body">
					<span>1#风机</span>
					<div class="lamp_close">关闭</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>2#风机</span>
					<div class="lamp_close">关闭</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>1#蝶阀开度</span>
					<div class="equipment_text">1</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>2#媒阀开度</span>
					<div class="equipment_text">1</div>
				</div>
			</div>
			<div class="equipment_msg_top_item_3 equipment_msg_top_item_3_main_fan">
				<div class="equipment_msg_top_item_3_body">
					<span>静压(Kpa)</span>
					<div class="equipment_text">关闭</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>全压(KPa)</span>
					<div class="equipment_text">关闭</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>风,量(m³/min)</span>
					<div class="equipment_text">1</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>总功率(Kw)</span>
					<div class="equipment_text">1</div>
				</div>
			</div>
		</div>
		<div class="equipment_msg_center">监测点{{ index + 1 }}</div>
		<div class="equipment_msg_footer"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/styles/home/equiptment_msg.scss';
</style>
