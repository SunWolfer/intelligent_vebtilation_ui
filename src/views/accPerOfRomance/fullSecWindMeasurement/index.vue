<!--全断面测风-->
<script setup>
	import { fullSecWindMeasurement } from '@/api/request/accPerOfRomance/fullSecWindMeasurement'
	import ParameterSetting from '@/views/accPerOfRomance/fullSecWindMeasurement/parameterSetting.vue'
	import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
	import FullHisRecord from '@/views/accPerOfRomance/fullSecWindMeasurement/fullHisRecord.vue'
	import WarnTableRecord from '@/views/components/warnTableRecord'
	import LoadWindMeaStation from '@/views/components/loadModel/loadWindMeaStation.vue'
	import MeasuringWind from '@/views/accPerOfRomance/fullSecWindMeasurement/measuringWind.vue'
	import { parseTime } from '@/utils/ruoyi'

	const {
		choose,
		chooseItem,
		fullSecWindList,
		dateRange,
		queryForm,
		showCharts,
		resetCharts,
		paramSettingVisible,
		chooseParamSetting,
		aneTableData,
		realWindDataList,
		chooseData,
		hisRecordVisible,
		hisRecordHandle,
		warnRecordVisible,
		warnRecordHandle,
		startMeasuringTheWind,
		oButtToMeasureTheWind,
		fullDataForm,
		measuringWindVisible,
		playMod,
		videoPath,
		videoVisible,
	} = fullSecWindMeasurement()

	const dateTime = ref('')
	const timeInterval = ref(-1)
	timeInterval.value = setInterval(() => {
		dateTime.value = parseTime(new Date())
	}, 1000)

	onBeforeUnmount(() => {
		clearInterval(timeInterval.value)
	})
</script>

<template>
	<div class="full_body">
		<div class="full_body_l1">
			<border-box name="border3">
				<div class="full_body_l1_top">
					<div class="full_body_l1_top_text pointer" @click="chooseItem(-1)">全矿井</div>
					<div class="full_body_l1_top_btn" @click="oButtToMeasureTheWind">
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
								<div class="ull_body_l1_bottom_item_top">
									<div
										class="full_body_l1_bottom_item_top_icon"
										:class="i.warnStatus === '0' ? 'full_normal_icon' : 'full_warn_icon'"
									></div>
									<div :class="i.warnStatus === '0' ? 'full_text_normal' : 'full_text_warn'">
										{{ i.warnStatus === '0' ? '正常' : i.warnName }}
									</div>
									<div class="full_body_l1_bottom_item_top_text">
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
								<div class="full_body_l1_bottom_item_left">
									<div
										class="full_body_l1_bottom_item_left_center pointer"
										@click="chooseItem(index)"
									>
										{{ i.name }}
									</div>
									<div class="full_body_l1_bottom_item_left_text">
										<span class="text_label">[ 风量(m³/min) ] </span>
										<span class="text_value">{{ i.airVolume }}</span>
									</div>
									<div class="full_body_l1_bottom_item_left_text">
										<span class="text_label">[ 风速(m/s) ] </span>
										<span class="text_value">{{ i.windSpeed }}</span>
									</div>
									<div class="full_body_l1_bottom_item_left_text">
										<span class="text_label">[ 断面(㎡)] </span>
										<span class="text_value">{{ i.surface }}</span>
									</div>
								</div>
								<div class="full_body_l1_bottom_item_right">
									<div class="normal_btn" @click="chooseParamSetting(i)">参数设置</div>
									<div class="full_body_l1_bottom_item_btn">
										<div class="normal_4_btn" @click="startMeasuringTheWind(i)">开始测风</div>
									</div>
								</div>
							</div>
						</div>
					</border-box>
				</template>
			</div>
		</div>
		<div class="full_body_l2">
			<LoadWindMeaStation :play-mod="playMod" />
			<div class="full_body_l2_item">
				<div v-show="playMod" class="full_body_l2_item_bg full_body_l2_item_text_left">
					<span>实时测风数据</span>
					<span>{{ fullSecWindList[choose]?.name }}</span>
					<div class="full_body_l2_item_text_body">
						<vue3-seamless-scroll :list="realWindDataList" :step="0.5" :count="1">
							<div v-for="i in realWindDataList">
								<div>风速：{{ i.value }} m/s</div>
								<div>时间：{{ i.time }}</div>
							</div>
						</vue3-seamless-scroll>
					</div>
				</div>
				<div v-show="choose !== -1" class="full_body_l2_item_bg full_body_l2_item_text_right">
					<span>自动测风站记录</span>
					<span>{{ dateTime }}</span>
					<div class="full_body_l2_item_text_table">
						<template v-for="item in aneTableData">
							<div class="full_body_l2_item_text_table_item">
								<span>{{ item.label + '  ' + item.value }}</span>
								<span>{{ item.unit }}</span>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
		<div class="full_body_l3">
			<border-box name="border1">
				<div class="full_body_l3_top" v-show="choose !== -1">
					<div class="full_body_l3_top_title">
						<span>{{ fullDataForm.name }}</span>
					</div>
					<div class="full_body_l3_top_btn">自动测风策略</div>
					<div class="full_body_l3_top_text">
						{{ fullDataForm.label }}
						<span>{{ fullDataForm.value }}</span>
						自动测风
					</div>
				</div>
			</border-box>
			<border-box name="border1">
				<template v-if="videoVisible">
					<m-video :video-path="videoPath" type="cfz"></m-video>
				</template>
			</border-box>
		</div>
		<div class="full_body_l4">
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
			<div v-if="showCharts" id="acc_chart_line" class="fullDom full_body_l4_chart"></div>
		</div>
		<!--    参数设置弹窗-->
		<parameter-setting
			v-if="paramSettingVisible"
			v-model="paramSettingVisible"
			:data-form="chooseData"
		/>
		<!--    历史记录-->
		<full-his-record v-if="hisRecordVisible" v-model="hisRecordVisible" :data-form="chooseData" />
		<!--    预警记录-->
		<WarnTableRecord
			v-if="warnRecordVisible"
			v-model="warnRecordVisible"
			:data-form="chooseData"
			dev-type="fullwind"
		/>
		<!--    一键测风-->
		<MeasuringWind
			v-if="measuringWindVisible"
			v-model="measuringWindVisible"
			:data-list="fullSecWindList"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/accPerOfRomance/fullSecWindMeasurement';
</style>
