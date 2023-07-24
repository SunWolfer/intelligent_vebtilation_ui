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
	const { tEquipmentIndex } = useEquipmentData()
</script>

<template>
	<div class="equipment_msg">
		<div
			class="equipment_msg_top"
			:class="tEquipmentIndex === index ? '' : 'equipment_msg_top_opacity'"
		>
			<div class="equipment_msg_top_item_1">{{ data.name }}</div>
			<div class="equipment_msg_top_item_2 equipment_msg_top_item_2_local_fan">
				<div class="equipment_msg_top_item_2_body">
					<span>1#风机</span>
					<div class="lamp_close">关闭</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>2#风机</span>
					<div class="lamp_close">关闭</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>风量(m3/min)</span>
					<div class="lamp_close">1</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>总功率(Kw)</span>
					<div class="lamp_close">1</div>
				</div>
			</div>
			<div class="equipment_msg_top_item_3 equipment_msg_top_item_2_local_fan">
				<div class="equipment_msg_top_item_2_body">
					<span>瓦斯(%CH4)</span>
					<div class="lamp_close">1</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>CO(ppm)</span>
					<div class="lamp_close">1</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>CO2(%)</span>
					<div class="lamp_close">1</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>粉尘(mg/m3)</span>
					<div class="lamp_close">1</div>
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
