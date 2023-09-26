<script setup>
	import { homeRightMess } from '@/api/request/home/homeRightMess'
	import useEquipmentData from '@/hooks/useEquipmentData'
	import useHomeMenu from '@/hooks/useHomeMenu'
	import useDict from '@/hooks/useDict'
	import { dynamicHeight, selectDictLabel } from '@/utils/ruoyi'

	const emits = defineEmits(['moveCamera'])
	const {
		airVolumeList,
		regionalAirVolumeList,
		showWarnList,
		powerNum,
		theNetworkNum,
		facilitiesNum,
		fusionNum,
		formatterWarnType,
		formatterEquipmentTypeList,
		isWarn,
		manualControlWarnIcon,
		closeWarnIcon,
		maxWarnType,
    getWarnListData,
    queryAirVolumeList,
    queryRoadAllList
	} = homeRightMess()
	const { toPosition, equipTypeList } = useEquipmentData()
	const { fan_work_status } = useDict('fan_work_status')
	const setPosition = (item) => {
		if (!item.pointX) return
		// 判断是否存在
		const hasIn = equipTypeList.value.indexOf(item.devType) !== -1
		// 不存在则显示全部该类型数据
		if (!hasIn) equipTypeList.value.push(item.devType)
		item.point = {
			x: item.pointX,
			y: item.pointY,
			z: item.pointZ,
		}
		const position = toPosition?.(item)
		emits('moveCamera', position, item.point)
	}
	const { dislodgeDomStyle, warnStyle } = useHomeMenu()

  onActivated(() =>{
    queryAirVolumeList?.()
    getWarnListData?.()
    queryRoadAllList?.()
  })
</script>

<template>
	<div class="home_right_message" :style="dislodgeDomStyle">
		<div class="home_right_message_title">
			<border-box name="border2" title="矿井总风量"></border-box>
		</div>
		<div class="home_right_message_l2">
			<el-carousel indicator-position="none" :height="dynamicHeight(163) + 'px'">
				<el-carousel-item v-for="item in airVolumeList">
					<div class="home_right_message_body1">
						<div class="home_right_message_body1_left"></div>
						<div class="home_right_message_body1_right">
							<div class="home_right_message_body1_right_body">
								<div class="home_right_normal_text">
									总风量(m³/min)：
									<span class="home_right_blue_text">{{ item.totalAirVolume }}</span>
								</div>
								<div class="home_right_normal_text">
									一号风机：
									<span class="home_right_green_text">{{
										selectDictLabel(fan_work_status, item.workStatus1)
									}}</span>
								</div>
								<div class="home_right_normal_text">
									二号风机：
									<span class="home_right_yellow_text">{{
										selectDictLabel(fan_work_status, item.workStatus2)
									}}</span>
								</div>
							</div>
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>

		<!--    区域风量-->
		<div class="home_right_message_title">
			<border-box name="border2" title="区域风量"></border-box>
		</div>
		<div class="home_right_message_body2">
			<div class="fullDom">
				<template v-for="(item, index) in regionalAirVolumeList">
					<div class="home_right_message_body2_bg">
						<div class="home_body2_index">{{ index + 1 }}</div>
						<div class="home_body2_text">{{ item.name }}</div>
						<div class="home_body2_button">{{ item.airVolume + 'm³/min' }}</div>
						<div class="home_body2_text_bg"></div>
					</div>
				</template>
			</div>
		</div>
		<!--    预警总览-->
		<div class="home_right_message_title">
			<border-box name="border2" title="预警总览"></border-box>
		</div>
		<div class="home_right_message_body3">
			<div class="home_body3_top_left">
				<div class="home_body3_warn_right">
					<div class="home_body3_warn_text">{{ powerNum }}</div>
					<div class="home_body2_text">通风动力预警</div>
				</div>
			</div>
			<div class="home_body3_bottom_left">
				<div class="home_body3_warn_right">
					<div class="home_body3_warn_text">{{ facilitiesNum }}</div>
					<div class="home_body2_text">通风设施预警</div>
				</div>
			</div>
			<div class="home_body3_top_right">
				<div class="home_body3_warn_left">
					<div class="home_body3_warn_text">{{ theNetworkNum }}</div>
					<div class="home_body2_text">通风网络预警</div>
				</div>
			</div>

			<div class="home_body3_bottom_right">
				<div class="home_body3_warn_left">
					<div class="home_body3_warn_text">{{ fusionNum }}</div>
					<div class="home_body2_text">通风融合预警</div>
				</div>
			</div>
			<div class="home_body3_center"></div>
		</div>
		<!--    预警列表-->
		<div class="home_right_message_body4">
			<el-carousel indicator-position="none">
				<el-carousel-item v-for="item in showWarnList">
					<div class="home_body4_item">
						<template v-for="child in item">
							<div class="home_body4_item_body">
								<div class="home_body4_item_body_A" :class="'warn_level_bg_' + child.warnLevel">
									{{ child.warnName }}
								</div>
								<div class="home_body4_item_body_B">{{ formatterWarnType(child.mainType) }}</div>
								<div class="home_body4_item_body_C">
									设备类型：{{ formatterEquipmentTypeList(child.devType) }}
								</div>
								<div class="home_body4_item_body_D overText" :title="child.name">
									{{ child.name }}
								</div>
								<div class="home_body4_item_body_E">{{ child.warnTime }}</div>
								<div class="home_body4_item_body_F" @click="setPosition(child)">定位</div>
								<div class="home_body4_item_body_G"></div>
								<div class="home_body4_item_body_H" :class="'warn_level_' + child.warnLevel">
									预警级别：{{ child.warnLevel }}级
								</div>
							</div>
						</template>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
	<!--  预警提示-->
	<div class="warn_icon" v-if="isWarn && manualControlWarnIcon" :style="warnStyle">
		<div class="warn_icon_top_left" :class="'warn_level_bg_' + maxWarnType"></div>
		<div class="warn_icon_top_right" :class="'warn_level_bg_' + maxWarnType"></div>
		<div class="warn_icon_bottom_left" :class="'warn_level_bg_' + maxWarnType"></div>
		<div class="warn_icon_bottom_right" :class="'warn_level_bg_' + maxWarnType"></div>
		<div class="warn_icon_dom">
			<div class="warn_icon_bg" :class="'warn_level_bg_' + maxWarnType"></div>
			<div
				class="warn_icon_text"
				:class="'warn_level_bg_before_' + maxWarnType"
				@click="closeWarnIcon"
			>
				<span :class="'warn_level_' + maxWarnType">关闭预警提示</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_right_mess';
</style>
