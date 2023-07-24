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
			<div class="equipment_msg_top_item_2 equipment_msg_top_item_2_duo_shen">
				<div class="equipment_msg_top_item_2_body">
					<span>温度(“C)</span>
					<div class="lamp_close">12</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>湿度(%RH)</span>
					<div class="lamp_close">1</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>差压(Pa)</span>
					<div class="lamp_close">1</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>绝压(Pa)</span>
					<div class="lamp_close">1</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>通讯</span>
					<div class="lamp_dk">掉线</div>
				</div>
			</div>
			<div class="equipment_msg_top_item_3 equipment_msg_top_item_3_door">
				<span class="equipment_msg_top_item_3_text_left">多参传感器位胃：</span>
				<span>22123 回风顺槽瓦斯泵站 210 米</span>
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
