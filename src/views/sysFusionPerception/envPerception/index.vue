<script setup>
	import LoadDevPerModel from '@/views/components/loadModel/LoadDevPerModel.vue'
	import useEquipmentData from '@/hooks/useEquipmentData'
	import { envPerception } from '@/api/request/sysFusionPerception/envPerception'
	import { isNull } from '@/utils/ruoyi'

	const {
		threeModelRef,
		pointDimensionVisible,
		handlePointDimension,
		distributionCloudMapVisible,
		handleDistributionCloudMap,
		cloudList,
		iconMap,
		chooseTab,
		tabsList,
		chooseDataType,
		safeDataList,
		handleSafeDataListQuery,
		sensorDataId,
		showWarnList,
		formatterWarnType,
		bindSensor,
		cancelEdit,
		cloudVisible,
		showCloud,
		hideCloud,
		labelList,
		queryWarnList,
	} = envPerception()

	const { toPosition } = useEquipmentData()
	const setPosition = (item) => {
		if (isNull(item.pointX) || isNull(item.pointY) || isNull(item.pointZ)) return
		const position = toPosition?.(item)

		threeModelRef.value?.moveCameraPosition(position, item.point)
	}

	handleSafeDataListQuery?.()
	queryWarnList?.()
</script>
<template>
	<div class="fullDom">
		<div class="env_left_btn_line">
			<div class="normal_2_btn" @click="handlePointDimension">点位标注</div>
			<div class="normal_btn" @click="handleDistributionCloudMap">毒害气体分布云图</div>
		</div>
		<div class="home_right_message">
			<div class="home_right_message_title">
				<border-box name="border2" title="实时监测" />
			</div>
			<div class="dev_right_top_carousel">
				<el-carousel indicator-position="none">
					<el-carousel-item v-for="(item, safeIndex) in safeDataList" :key="safeIndex">
						<div class="dev_right_top">
							<div class="dev_right_top_left" :class="iconMap.get(item.type)?.[1]"></div>
							<border-box name="border5">
								<div class="safe_item_title overText" :title="item.name">{{ item.name }}</div>
							</border-box>
							<div class="safe_data_table_item_center c-center">
								<div class="safe_item_value">{{ item.value }}</div>
								<div class="safe_item_unit">{{ iconMap.get(item.type)?.[0] }}</div>
							</div>
							<div class="dev_right_top_line_1">
								<div class="safe_data_table_item_end">{{ item.updateTime }}</div>
								<div class="dev_right_top_line_1_position">
									<el-icon><Location /></el-icon>
									<span>定位</span>
								</div>
							</div>
						</div>
					</el-carousel-item>
				</el-carousel>
			</div>
			<!--    预警列表-->
			<div class="home_right_message_body4">
				<el-carousel indicator-position="none">
					<el-carousel-item v-for="(item, warnIndex) in showWarnList" :key="warnIndex">
						<div class="home_body4_item">
							<template v-for="(child, childIndex) in item" :key="'child' + childIndex">
								<div class="home_body4_item_body">
									<div class="home_body4_item_body_A" :class="'warn_level_bg_' + child.warnLevel">
										{{ child.warnName }}
									</div>
									<div class="home_body4_item_body_B">{{ formatterWarnType(child.mainType) }}</div>
									<div class="home_body4_item_body_C">设备类型：{{ child.devTypeName }}</div>
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
		<LoadDevPerModel
			ref="threeModelRef"
			:cloud-data-list="cloudList"
			:label-list="labelList"
			:show-cloud="cloudVisible"
		/>

		<!--    点位标注-->
		<div class="ven_sys_sensor" v-if="pointDimensionVisible">
			<border-box name="border3">
				<div class="ven_sys_sensor_body fullDom">
					<template v-for="(item, itemIndex) in tabsList" :key="'tab' + itemIndex">
						<div
							@click="chooseDataType(item.value)"
							class="c-center"
							:class="chooseTab === item.value ? 'ven_btn_active' : 'ven_btn'"
						>
							<span>{{ item.label }}</span>
						</div>
					</template>
					<div class="fullDom ven_btn_select c-center">
						<span>传感器</span>
						<el-select v-model="sensorDataId">
							<el-option
								v-for="data in safeDataList"
								:key="data.id"
								:label="data.name"
								:value="data.id"
							/>
						</el-select>
					</div>
					<div class="ven_btn_submit">
						<div class="normal_btn" @click="bindSensor">确认</div>
						<div class="normal_btn" @click="cancelEdit">关闭</div>
					</div>
				</div>
			</border-box>
		</div>
		<div class="dis_npt" v-if="distributionCloudMapVisible">
			<border-box name="border3">
				<div class="dis_npt_body">
					<div class="normal_2_btn" @click="showCloud">显示</div>
					<div class="normal_btn" @click="hideCloud">关闭</div>
				</div>
			</border-box>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	@import '@/assets/styles/home/home_right_mess';
	@import '@/assets/styles/sysFusionPerception/safeSupeData';
	@import '@/assets/styles/sysFusionPerception/envPerception';
</style>
