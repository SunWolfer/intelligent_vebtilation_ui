<!--全断面测风-->
<script setup>
	import { fullSecWindMeasurement } from '@/api/request/accPerOfRomance/fullSecWindMeasurement'
	import ParameterSetting from '@/views/accPerOfRomance/fullSecWindMeasurement/parameterSetting.vue'

	const {
		choose,
		fullSecWindList,
		dateRange,
		queryForm,
		showCharts,
		paramSettingVisible,
		chooseParamSetting,
	} = fullSecWindMeasurement()
</script>

<template>
	<div class="full_body">
		<div class="full_body_l1">
			<border-box name="border3">
				<div class="full_body_l1_top">
					<div class="full_body_l1_top_text">全矿井</div>
					<div class="full_body_l1_top_btn">
						<span>一键测风</span>
					</div>
				</div>
			</border-box>
			<div class="full_body_l1_bottom">
				<template v-for="(i, index) in fullSecWindList">
					<border-box name="Border1" background-color="rgba(36, 38, 83, 0.54)">
						<div class="full_body_l1_bottom_item">
							<div
								class="full_body_top_body_item"
								:class="index === choose ? 'full_body_top_body_item_warn' : ''"
							>
								<div class="full_body_l1_bottom_item_left">
									<div class="full_body_l1_bottom_item_left_top"></div>
									<div class="full_body_l1_bottom_item_left_center">{{ i.name }}</div>
									<div class="full_body_l1_bottom_item_left_text">
										<span class="text_label">[ 风量(m3/min) ] </span>
										<span class="text_value">{{ i.airVolume }}</span>
									</div>
									<div class="full_body_l1_bottom_item_left_text">
										<span class="text_label">[ 风速(m/s) ] </span>
										<span class="text_value">{{ i.windSpeed }}</span>
									</div>
									<div class="full_body_l1_bottom_item_left_text">
										<span class="text_label">[ 断面(㎡)] </span>
										<span class="text_value">{{ i.crossSection }}</span>
									</div>
								</div>
								<div class="full_body_l1_bottom_item_right">
									<div class="normal_btn">历史记录</div>
									<div class="normal_btn" @click="chooseParamSetting(index)">参数设置</div>
									<div class="full_body_l1_bottom_item_btn">
										<div class="normal_2_btn">开始测风</div>
									</div>
								</div>
							</div>
						</div>
					</border-box>
				</template>
			</div>
		</div>
		<div class="full_body_l2"></div>
		<div class="full_body_l3">
			<border-box name="border1"></border-box>
			<border-box name="border1"></border-box>
		</div>
		<div class="full_body_l4">
			<border-box name="border2" title="风量趋势分析"></border-box>
			<el-form :model="queryForm" inline style="margin-left: 50px">
				<el-form-item label="时间区间：">
					<el-date-picker
						v-model="dateRange"
						style="width: 490px; height: 100%"
						value-format="YYYY-MM-DD hh:mm:ss"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						prefix-icon="Calendar"
					></el-date-picker>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn">查询</div>
				</el-form-item>
			</el-form>
			<div v-if="showCharts" id="acc_chart_line" class="fullDom"></div>
		</div>
		<!--    参数设置弹窗-->
		<parameter-setting v-model="paramSettingVisible" />
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/accPerOfRomance/fullSecWindMeasurement';
</style>
