<script setup>
	import { accurateWindMeasurement } from '@/api/request/accPerOfRomance/accurateWindMeasurement'

	const {
		inShowList,
		toLast,
		showLast,
		toNext,
		showNext,
		getStyle,
		getTextStyle,
		getBorderStyle,
		dateRange,
		queryForm,
	} = accurateWindMeasurement()
</script>

<template>
	<div class="acc_body">
		<div class="acc_body_icon_1" v-show="showLast" @click="toLast"></div>
		<div class="acc_body_top">
			<template v-for="i in inShowList">
				<border-box name="border1" :color="getBorderStyle(i.type).color">
					<div class="acc_body_top_body">
						<div class="acc_body_top_body_item" :class="getBorderStyle(i.type).borderClass">
							<div class="acc_body_top_body_item_header">{{ i.name }}</div>
							<div class="acc_body_top_body_item_l2_text" :class="getTextStyle(i.type)">
								<span class="acc_body_top_body_item_l2_text_1"> 风量(m3/min)：</span>
								<span class="acc_body_top_body_item_l2_text_2">{{ i.airVolume }}</span>
							</div>
							<div class="acc_body_top_body_item_icon" :class="getStyle(i.type)"></div>
							<div class="acc_body_top_body_item_l4">
								<div>
									<span class="l_title">[ 风速(m/s) ] </span>
									<span class="l_content">{{ i.windSpeed }}</span>
								</div>
								<div>
									<span class="l_title">[ 温度(℃) ] </span>
									<span class="l_content">{{ i.temperature }}</span>
								</div>
								<div>
									<span class="l_title">[ 差压(Pa) ] </span>
									<span class="l_content">{{ i.diffPressure }}</span>
								</div>
							</div>
							<div class="acc_body_top_body_item_l5">
								<div>
									<span class="l_title">[ 断面(㎡) ] </span>
									<span class="l_content">{{ i.crossSection }}</span>
								</div>
								<div>
									<span class="l_title">[ 湿度(RH) ] </span>
									<span class="l_content">{{ i.humidity }}</span>
								</div>
								<div>
									<span class="l_title">[ 绝压(Pa) ] </span>
									<span class="l_content">{{ i.absolutePressure }}</span>
								</div>
							</div>
							<div class="acc_body_top_body_item_l6">
								<div class="normal_btn">历史记录</div>
								<div class="normal_btn">预警记录</div>
							</div>
						</div>
					</div>
				</border-box>
			</template>
		</div>
		<div class="acc_body_icon_2" v-show="showNext" @click="toNext"></div>
		<div class="acc_body_bottom">
			<border-box name="border2" title="风量趋势分析"></border-box>
			<el-form :model="queryForm" inline style="margin-left: 50px">
				<el-form-item label="时间区间：">
					<el-date-picker
						v-model="dateRange"
						style="width: 490px"
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
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/accPerOfRomance/accurateWindMeasurement';
</style>
