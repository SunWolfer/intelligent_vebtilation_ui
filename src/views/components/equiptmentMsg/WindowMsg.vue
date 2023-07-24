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
			<div class="equipment_msg_top_item_2 equipment_msg_top_item_2_window">
				<div class="equipment_msg_top_item_2_body">
					<span>当前模式</span>
					<div class="lamp_yc">远程模式</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>当前开度</span>
					<div class="lamp_close">50</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>通讯</span>
					<div class="lamp_dk">掉线</div>
				</div>
			</div>
			<div class="equipment_msg_top_item_3 equipment_msg_top_item_3_door">
				<span class="equipment_msg_top_item_3_text_left">风窗位置：</span>
				<span>22123 回风顺槽瓦斯泵站210米</span>
				<span class="equipment_msg_top_item_3_text_left">通讯IP：</span>
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
