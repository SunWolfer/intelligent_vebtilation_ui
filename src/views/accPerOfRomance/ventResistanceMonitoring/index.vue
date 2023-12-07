<script setup>
	import { ventResistanceMonitoring } from '@/api/request/accPerOfRomance/ventResistanceMonitoring'

	const {
		inShowList,
		toLast,
		showLast,
		toNext,
		showNext,
		getStyle,
		dateRange,
		queryForm,
		choose,
		chooseItem,
		default_color,
		choose_color,
		setValueStatusClass,
		chartOption,
		initChart,
	} = ventResistanceMonitoring()
</script>

<template>
	<div class="vent_body">
		<div class="vent_body_icon_1" v-show="showLast" @click="toLast"></div>
		<div class="vent_body_top">
			<template v-for="(i, index) in inShowList">
				<border-box
					name="border1"
					:color="choose === index ? choose_color : default_color"
					background-color="rgba(36, 38, 83, 0.54)"
				>
					<div
						class="vent_body_top_body"
						:class="choose === index ? 'vent_body_top_body_warn_border' : ''"
					>
						<div class="vent_body_top_body_l1" :class="getStyle(i.warnStatus)">
							<span v-if="i.warnStatus !== '0'">{{ i.warnName }}</span>
						</div>
						<div class="vent_body_top_body_r1 pointer" @click="chooseItem(index)">
							{{ i.name }}
						</div>
						<div class="vent_body_top_body_r2">
							<div class="l_title">[温度(℃)]</div>
							<div class="l_content">{{ i.pressureTemperature }}</div>
							<div
								:class="setValueStatusClass(i.pressureTemperature, i.lastPressureTemperature)"
							></div>
						</div>
						<div class="vent_body_top_body_r2">
							<div class="l_title">[湿度(RH)]</div>
							<div class="l_content">{{ i.airHumidity }}</div>
							<div :class="setValueStatusClass(i.airHumidity, i.lastAirHumidity)"></div>
						</div>
						<div class="vent_body_top_body_r2">
							<div class="l_title">[差压(Pa)]</div>
							<div class="l_content">{{ i.differentialPressure }}</div>
							<div
								:class="setValueStatusClass(i.differentialPressure, i.lastDifferentialPressure)"
							></div>
						</div>
						<div class="vent_body_top_body_r2">
							<div class="l_title">[绝压(kPa)]</div>
							<div class="l_content">{{ i.absolutePressure }}</div>
							<div :class="setValueStatusClass(i.absolutePressure, i.lastAbsolutePressure)"></div>
						</div>
					</div>
				</border-box>
			</template>
		</div>
		<div class="vent_body_icon_2" v-show="showNext" @click="toNext"></div>
		<div class="vent_body_bottom">
			<border-box name="border2" title="通风阻力监测分析"></border-box>
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
					<div class="normal_btn" @click="initChart">查询</div>
				</el-form-item>
			</el-form>
			<BaseEchart :option="chartOption" class="fullDom vent_body_bottom_chart" />
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/accPerOfRomance/ventResistanceMonitoring';
</style>
