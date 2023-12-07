<script setup>
	import useEquipmentData from '@/hooks/useEquipmentData'
	import { homeMsg } from '@/api/request/home/homeMsg'
	import { selectDictLabel } from '@/utils/ruoyi'

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
	const { dataForm, fan_work_status } = homeMsg(props.data, props.index)

	// 风机1开启
	const workStatus1 = computed(() => {
		return dataForm.value.workStatus1 === '1'
	})
	// 风机2开启
	const workStatus2 = computed(() => {
		return dataForm.value.workStatus2 === '1'
	})

	//   显示静压
	const negativePressure = computed(() => {
		return workStatus2.value ? dataForm.value.negativePressure2 : dataForm.value.negativePressure1
	})
	//   显示全压
	const fullPressure = computed(() => {
		return workStatus2.value ? dataForm.value.fullPressure2 : dataForm.value.fullPressure1
	})
	//   显示风量
	const airVolume = computed(() => {
		return workStatus2.value ? dataForm.value.airVolume2 : dataForm.value.airVolume1
	})
	//   显示功率
	const ratedPower = computed(() => {
		return workStatus2.value ? dataForm.value.ratedPower2 : dataForm.value.ratedPower1
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
				<div :class="dataForm.warnStatus !== '0' ? 'equipment_warn' : 'equipment_normal'" />
			</div>
			<div class="equipment_msg_top_item_2">{{ dataForm.name }}</div>
			<div class="equipment_msg_top_item_3 equipment_msg_top_item_3_main_fan">
				<div class="equipment_msg_top_item_3_body">
					<span>1#风机</span>
					<div :class="workStatus1 ? 'lamp_yc' : 'lamp_close'">
						{{ selectDictLabel(fan_work_status, dataForm.workStatus1) }}
					</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>2#风机</span>
					<div :class="workStatus2 ? 'lamp_yc' : 'lamp_close'">
						{{ selectDictLabel(fan_work_status, dataForm.workStatus2) }}
					</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>1#蝶阀开度</span>
					<div class="equipment_text">{{ dataForm.butterflyValveOpening1 }}</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>2#媒阀开度</span>
					<div class="equipment_text">{{ dataForm.butterflyValveOpening2 }}</div>
				</div>
			</div>
			<div class="equipment_msg_top_item_3 equipment_msg_top_item_3_main_fan">
				<div class="equipment_msg_top_item_3_body">
					<span>静压(Kpa)</span>
					<div class="equipment_text">{{ negativePressure }}</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>全压(KPa)</span>
					<div class="equipment_text">{{ fullPressure }}</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>风量(m³/min)</span>
					<div class="equipment_text">{{ airVolume }}</div>
				</div>
				<div class="equipment_msg_top_item_3_body">
					<span>总功率(Kw)</span>
					<div class="equipment_text">{{ ratedPower }}</div>
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
