<script setup>
	import { mainFan } from '@/api/request/venEqMonitoring/mainFan'
	import CustomizedDiaLog from '@/views/venEqMonitoring/mainFan/customizedDiaLog.vue'
	import LoadMainFan from '@/views/components/loadModel/loadMainFan.vue'
	import FanCharCurve from '@/views/venEqMonitoring/mainFan/fanCharCurve.vue'
	import MonAndAnalysis from '@/views/venEqMonitoring/mainFan/monAndAnalysis.vue'
	import TheSpectrum from '@/views/venEqMonitoring/mainFan/theSpectrum.vue'

	const {
		customizedParametersList,
		mainFanMes,
		customizedVisible,
		showCustomizedVisible,
		fanCharCurveVisible,
		showFanCharCurveVisible,
		monAndAnalysisVisible,
		showMonAndAnalysisVisible,
		theSpectrumVisible,
		showTheSpectrumVisible,
	} = mainFan()
</script>

<template>
	<div class="main_fan_body">
		<div class="main_fan_body_l1">
			<div class="main_fan_body_l1_top">
				<el-select>
					<!--					<el-option></el-option>-->
				</el-select>
				<div class="top_icon"></div>
				<div class="top_btn_border">查看监控</div>
				<div class="top_text">
					1#风机<span class="top_open_text">开启</span>2#风机<span class="top_close_text"
						>关闭</span
					>
				</div>
			</div>
			<div class="main_fan_body_l1_btn">
				<div class="main_fan_body_l1_btn_item" @click="showFanCharCurveVisible">风机特性曲线</div>
				<div class="main_fan_body_l1_btn_item" @click="showMonAndAnalysisVisible">温振监测分析</div>
				<div class="main_fan_body_l1_btn_item" @click="showTheSpectrumVisible">温振图谱分析</div>
				<div class="main_fan_body_l1_btn_item">操作记录</div>
				<div class="main_fan_body_l1_btn_item">预警记录</div>
			</div>
			<div class="main_fan_body_l1_model">
				<load-main-fan />
			</div>
		</div>
		<div class="main_fan_body_l2">
			<border-box name="border2" title="南井主风机"></border-box>
			<div class="main_fan_body_l2_l2">
				<template v-for="item in mainFanMes">
					<div class="main_fan_body_l2_l2_item">
						<div :class="item.icon"></div>
						<div class="main_fan_body_l2_l2_item_value">{{ item.value }}</div>
						<div class="main_fan_body_l2_l2_item_label">{{ item.label }}</div>
					</div>
				</template>
			</div>
			<border-box name="border2" title="远程控制"></border-box>
			<div class="main_fan_body_l2_l4">
				<div class="main_fan_body_l2_btn_1">
					<span class="btn_text_1">一键反风</span>
				</div>
				<div class="main_fan_body_l2_btn_2">
					<span class="btn_text_2">一键倒机</span>
				</div>
			</div>
			<div class="main_fan_body_l2_l5">
				<div class="main_fan_body_l2_l5_title_1">一号风机</div>
				<div class="main_fan_body_l2_btn_3">
					<span class="btn_text_3">一键正向启动</span>
				</div>
				<div class="main_fan_body_l2_btn_4">
					<span class="btn_text_4">一键停止</span>
				</div>
				<div class="main_fan_body_l2_btn_5">
					<span class="btn_text_5">一键反向启动</span>
				</div>
				<div class="main_fan_body_l2_l5_title_2">二号风机</div>
				<div class="main_fan_body_l2_btn_3">
					<span class="btn_text_3">一键正向启动</span>
				</div>
				<div class="main_fan_body_l2_btn_4">
					<span class="btn_text_4">一键停止</span>
				</div>
				<div class="main_fan_body_l2_btn_5">
					<span class="btn_text_5">一键反向启动</span>
				</div>
			</div>
			<border-box name="border2" title="风量定量调控"></border-box>
			<div class="main_fan_body_l2_l7">
				<div class="main_fan_body_l2_l7_body">
					<div class="main_fan_body_l2_l7_body_title set_btn_default">
						<span>一号风机</span>
					</div>
					<div class="main_fan_body_l2_l7_label">动叶角度(°)</div>
					<el-input />
					<div class="main_fan_body_l2_l7_label">频率(hz)</div>
					<el-input />
					<div class="normal_btn">设置</div>
				</div>
				<div class="main_fan_body_l2_l7_body">
					<div class="main_fan_body_l2_l7_body_title set_btn_default">
						<span>二号风机</span>
					</div>
					<div class="main_fan_body_l2_l7_label">动叶角度(°)</div>
					<el-input />
					<div class="main_fan_body_l2_l7_label">频率(hz)</div>
					<el-input />
					<div class="normal_btn">设置</div>
				</div>
			</div>
		</div>
		<div class="main_fan_body_l3">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="main_fan_customized">
					<div class="main_fan_customized_l1">
						<div class="main_fan_customized_title">
							<border-box name="border5">
								<div class="set_btn_default">
									<span>一号风机运行参数</span>
								</div>
							</border-box>
						</div>
						<div class="main_fan_customized_btn">
							<border-box name="border7">
								<div class="set_btn_cus_icon" @click="showCustomizedVisible">
									<span>定制化</span>
								</div>
							</border-box>
						</div>
					</div>
					<div class="main_fan_customized_l2">
						<div class="main_fan_customized_title">
							<span>一级电机</span>
						</div>
						<div class="main_fan_customized_body">
							<template v-for="(item, index) in customizedParametersList">
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.label }}</div>
									<div class="customized_value">{{ item.value + item.unit }}</div>
								</div>
							</template>
						</div>
					</div>
					<div class="main_fan_customized_l3">
						<div class="main_fan_customized_title">
							<span>二级电机</span>
						</div>
						<div class="main_fan_customized_body">
							<template v-for="(item, index) in customizedParametersList">
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.label }}</div>
									<div class="customized_value">{{ item.value + item.unit }}</div>
								</div>
							</template>
						</div>
					</div>
				</div>
			</border-box>
		</div>
		<div class="main_fan_body_l4">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="main_fan_customized">
					<div class="main_fan_customized_l1">
						<div class="main_fan_customized_title">
							<border-box name="border5">
								<div class="set_btn_default">
									<span>二号风机运行参数</span>
								</div>
							</border-box>
						</div>
						<div class="main_fan_customized_btn">
							<border-box name="border7">
								<div class="set_btn_cus_icon" @click="showCustomizedVisible">
									<span>定制化</span>
								</div>
							</border-box>
						</div>
					</div>
					<div class="main_fan_customized_l2">
						<div class="main_fan_customized_title">
							<span>一级电机</span>
						</div>
						<div class="main_fan_customized_body">
							<template v-for="(item, index) in customizedParametersList">
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.label }}</div>
									<div class="customized_value">{{ item.value + item.unit }}</div>
								</div>
							</template>
						</div>
					</div>
					<div class="main_fan_customized_l3">
						<div class="main_fan_customized_title">
							<span>二级电机</span>
						</div>
						<div class="main_fan_customized_body">
							<template v-for="(item, index) in customizedParametersList">
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.label }}</div>
									<div class="customized_value">{{ item.value + item.unit }}</div>
								</div>
							</template>
						</div>
					</div>
				</div>
			</border-box>
		</div>
		<div class="main_fan_body_l5">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="main_fan_body_l5_body">
					<div class="main_fan_body_l5_body_l1">智能最优调风</div>
					<div class="main_fan_body_l5_body_l2"></div>
					<div class="normal_2_btn"><span>开启</span></div>
					<div class="normal_btn"><span>关闭</span></div>
				</div>
			</border-box>
		</div>
		<customized-dia-log v-if="customizedVisible" v-model="customizedVisible" />
		<!--    风机特性曲线-->
		<fan-char-curve v-if="fanCharCurveVisible" v-model="fanCharCurveVisible" />
		<!--    温振图谱分析-->
		<mon-and-analysis v-if="monAndAnalysisVisible" v-model="monAndAnalysisVisible" />
		<!--    温振图谱分析-->
		<the-spectrum v-if="theSpectrumVisible" v-model="theSpectrumVisible" />
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venEqMonitoring/mainFan';
</style>
