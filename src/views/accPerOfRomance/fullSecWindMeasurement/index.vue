<!--全断面测风-->
<script setup>
	import { fullSecWindMeasurement } from '@/api/request/accPerOfRomance/fullSecWindMeasurement'
	import ParameterSetting from '@/views/accPerOfRomance/fullSecWindMeasurement/parameterSetting.vue'
	import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

	const {
		choose,
		fullSecWindList,
		dateRange,
		queryForm,
		showCharts,
		paramSettingVisible,
		chooseParamSetting,
		aneTableData,
		realWindDataList,
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
									<div class="full_body_l1_bottom_item_left_top">
										<div class="full_body_l1_bottom_item_left_top_icon full_normal_icon"></div>
										<div class="full_text_normal">正常</div>
									</div>
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
		<div class="full_body_l2">
			<div class="full_body_l2_item">
				<div class="full_body_l2_item_bg full_body_l2_item_text_left">
					<span>实时测风数据</span>
					<span>1024上顺槽</span>
					<div class="full_body_l2_item_text_body">
						<vue3-seamless-scroll :list="realWindDataList" :step="0.5" :count="1">
							<div v-for="i in realWindDataList">
								<div>风速：{{ i.value }} m/s</div>
								<div>时间：{{ i.time }}</div>
							</div>
						</vue3-seamless-scroll>
					</div>
				</div>
				<div class="full_body_l2_item_bg full_body_l2_item_text_right">
					<span>自动测风站记录</span>
					<span>11:25:11</span>
					<div class="full_body_l2_item_text_table">
						<template v-for="item in aneTableData">
							<div class="full_body_l2_item_text_table_item">
								<span>{{ item.label + item.value }}</span>
								<span>{{ item.unit }}</span>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
		<div class="full_body_l3">
			<border-box name="border1">
				<div class="full_body_l3_top">
					<div class="full_body_l3_top_title"><span>102040503上顺横掘进面</span></div>
					<div class="full_body_l3_top_btn">自动测风策略</div>
					<div class="full_body_l3_top_text">
						定时测风：每日
						<span>16时20分</span>
						自动测风
					</div>
				</div>
			</border-box>
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
