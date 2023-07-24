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
			<div class="equipment_msg_top_item_2 equipment_msg_top_item_2_door">
				<div class="equipment_msg_top_item_2_body">
					<span>A门状态</span>
					<div class="lamp_op">开启</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>B门状态</span>
					<div class="lamp_close">关闭</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>当前模式</span>
					<div class="lamp_yc">远程模式</div>
				</div>
				<div class="equipment_msg_top_item_2_body">
					<span>通讯</span>
					<div class="lamp_dk">掉线</div>
				</div>
			</div>
			<div class="equipment_msg_top_item_3 equipment_msg_top_item_3_door">
				<span class="equipment_msg_top_item_3_text_left">风门位置：</span>
				<span>22123 回风顺槽瓦斯泵站 210 米</span>
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
