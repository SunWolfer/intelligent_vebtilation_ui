<!--精准测风-->
<script setup>
	import { accurateWindMeasurement } from '@/api/request/accPerOfRomance/accurateWindMeasurement'
	import HisRecord from '@/views/accPerOfRomance/accurateWindMeasurement/hisRecord.vue'
	import WarnTableRecord from '@/views/components/warnTableRecord'

	const {
		inShowList,
		toLast,
		showLast,
		toNext,
		showNext,
		getStyle,
		getTextStyle,
		dateRange,
		queryForm,
		showCharts,
		choose,
		chooseItem,
		default_color,
		choose_color,
		resetCharts,
		hisRecordVisible,
		hisRecordHandle,
		warnRecordVisible,
		warnRecordHandle,
		chooseData,
	} = accurateWindMeasurement()
</script>

<template>
	<div class="acc_body">
		<div class="acc_body_icon_1" v-show="showLast" @click="toLast"></div>
		<div class="acc_body_top">
			<template v-for="(i, index) in inShowList">
				<border-box
					name="border1"
					:color="choose === index ? choose_color : default_color"
					background-color="rgba(36, 38, 83, 0.54)"
				>
					<div class="acc_body_top_body">
						<div
							class="acc_body_top_body_item"
							:class="choose === index ? 'acc_body_top_body_item_warn' : ''"
						>
							<div class="acc_body_top_body_item_header pointer" @click="chooseItem(index)">
								{{ i.name }}
							</div>
							<div class="acc_body_top_body_item_l2_text" :class="getTextStyle(i.warnStatus)">
								<span class="acc_body_top_body_item_l2_text_1"> 风量(m³/min)：</span>
								<span class="acc_body_top_body_item_l2_text_2">{{ i.airVolume }}</span>
							</div>
							<div class="acc_body_top_body_item_icon" :class="getStyle(i.warnStatus)">
								<span v-if="i.warnStatus !== '0'">{{ i.yjmc }}</span>
							</div>
							<div class="acc_body_top_body_item_l4">
								<div>
									<span class="l_title">[ 风速(m/s) ] </span>
									<span class="l_content">{{ i.windSpeed }}</span>
								</div>
								<div>
									<span class="l_title">[ 温度(℃) ] </span>
									<span class="l_content">{{ i.pressureTemperature }}</span>
								</div>
								<div>
									<span class="l_title">[ 差压(Pa) ] </span>
									<span class="l_content">{{ i.pressure }}</span>
								</div>
							</div>
							<div class="acc_body_top_body_item_l5">
								<div>
									<span class="l_title">[ 断面(㎡) ] </span>
									<span class="l_content">{{ i.surface }}</span>
								</div>
								<div>
									<span class="l_title">[ 湿度(RH) ] </span>
									<span class="l_content">{{ i.airHumidity }}</span>
								</div>
								<div>
									<span class="l_title">[ 绝压(Pa) ] </span>
									<span class="l_content">{{ i.absolutePressure }}</span>
								</div>
							</div>
							<div class="acc_body_top_body_item_l6">
								<div class="c-center">
									<div class="his_icon"></div>
									<div class="icon_text" @click="hisRecordHandle(i)">历史记录</div>
								</div>
								<div class="c-center">
									<div class="warn_icon"></div>
									<div class="icon_text" @click="warnRecordHandle(i)">预警记录</div>
								</div>
							</div>
						</div>
					</div>
				</border-box>
			</template>
		</div>
		<div class="acc_body_icon_2" v-show="showNext" @click="toNext"></div>
		<div class="acc_body_bottom">
			<border-box name="border2" title="风量趋势分析"></border-box>
			<el-form v-show="choose !== -1" :model="queryForm" inline style="margin-left: 50px">
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
					<div class="normal_btn" @click="resetCharts">查询</div>
				</el-form-item>
			</el-form>
			<div v-if="showCharts" id="acc_chart_line" class="fullDom acc_body_bottom_chart"></div>
		</div>
		<!--    历史记录-->
		<his-record v-if="hisRecordVisible" v-model="hisRecordVisible" :data-form="chooseData" />
		<!--    预警记录-->
		<WarnTableRecord
			v-if="warnRecordVisible"
			v-model="warnRecordVisible"
			:data-form="chooseData"
			dev-type="windsensor"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/accPerOfRomance/accurateWindMeasurement';
</style>
