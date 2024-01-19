<script setup>
	import { mainFan } from '@/api/request/venEqMonitoring/mainFan'
	import CustomizedDiaLog from '@/views/venEqMonitoring/mainFan/customizedDiaLog.vue'
	import LoadMainFan from '@/views/components/loadModel/loadMainFan.vue'
	import FanCharCurve from '@/views/venEqMonitoring/mainFan/fanCharCurve.vue'
	import MonAndAnalysis from '@/views/venEqMonitoring/mainFan/monAndAnalysis.vue'
	import TheSpectrum from '@/views/venEqMonitoring/mainFan/theSpectrum.vue'
	import { useDict } from '@/hooks/useDict'
	import { selectDictLabel } from '@/utils/ruoyi'
	import WarnTableRecord from '@/views/components/warnTableRecord'
	import FanHisRecord from '@/views/venEqMonitoring/mainFan/fanHisRecord.vue'
	import { usePermission } from '@/hooks/usePermission'
	import { useVideo } from '@/hooks/useVideo'

	const {
		dataList,
		mainFanId,
		changeItem,
		dataForm,
		mainFanMes,
		fanCharCurveVisible,
		showFanCharCurveVisible,
		monAndAnalysisVisible,
		showMonAndAnalysisVisible,
		theSpectrumVisible,
		showTheSpectrumVisible,
		backWindHandle,
		switchHandle,
		activeForwardStartMainHandle,
		activeStopMainHandle,
		activeReverseStartMainHandle,
		standbyForwardStartMainHandle,
		standbyStopMainHandle,
		standbyReverseStartMainHandle,
		videoVisible,
		videoHandle,
		openIntelWindControl,
		closeIntelWindControl,
		oneCustomizedParameters1,
		oneCustomizedParameters2,
		twoCustomizedParameters1,
		twoCustomizedParameters2,
		customizedVisible,
		customizedHandle,
		customFanType,
		getMainFanInfo,
		fanThreeInfo,
		recordVisible,
		recordHandle,
		warnVisible,
		warnHandle,
		quControlAirVolumeForm,
		volumeControlHandle1,
		volumeControlHandle2,
	} = mainFan()
	const { fan_work_status } = useDict('fan_work_status')

	const { validateFun } = usePermission()

	const { videoUrlList, videoListLength, resetUrl } = useVideo()
	resetUrl?.(dataForm)
</script>

<template>
	<div class="main_fan_body" v-if="mainFanId">
		<div class="main_fan_body_l1">
			<div class="main_fan_body_l1_top">
				<el-select v-model="mainFanId" @change="changeItem" clearable>
					<el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
				<div class="top_icon"></div>
				<div class="top_btn_border" @click="videoHandle">查看监控</div>
				<div :class="dataForm.warnStatus !== '0' ? 'top_warn_icon' : ''"></div>
				<div class="top_text">
					1#风机<span :class="dataForm.workStatus1 === '1' ? 'top_open_text' : 'top_close_text'">{{
						selectDictLabel(fan_work_status, dataForm.workStatus1)
					}}</span
					>2#风机<span :class="dataForm.workStatus2 === '1' ? 'top_open_text' : 'top_close_text'">{{
						selectDictLabel(fan_work_status, dataForm.workStatus2)
					}}</span>
				</div>
			</div>
			<div class="main_fan_body_l1_btn">
				<div class="main_fan_body_l1_btn_item" @click="showFanCharCurveVisible">风机特性曲线</div>
				<div class="main_fan_body_l1_btn_item" @click="showMonAndAnalysisVisible">温振监测分析</div>
				<div class="main_fan_body_l1_btn_item" @click="showTheSpectrumVisible">温振图谱分析</div>
				<div class="main_fan_body_l1_btn_item" @click="recordHandle">操作记录</div>
				<div class="main_fan_body_l1_btn_item" @click="warnHandle">预警记录</div>
			</div>
			<div class="main_fan_body_l1_model">
				<load-main-fan :fan-three-info="fanThreeInfo" />
			</div>
		</div>
		<div class="main_fan_body_l2">
			<border-box name="border2" :title="dataForm?.name" />
			<div class="main_fan_body_l2_l2">
				<template v-for="(item, mainIndex) in mainFanMes" :key="'main' + mainIndex">
					<div class="main_fan_body_l2_l2_item">
						<div :class="item.icon"></div>
						<div class="main_fan_body_l2_l2_item_value">{{ item.value }}</div>
						<div class="main_fan_body_l2_l2_item_label">{{ item.label }}</div>
					</div>
				</template>
			</div>
			<border-box name="border2" title="远程控制" />
			<div class="main_fan_body_l2_l4">
				<div class="main_fan_body_l2_btn_1" @click="validateFun(backWindHandle)">
					<span class="btn_text_1">一键反风</span>
				</div>
				<div class="main_fan_body_l2_btn_2" @click="validateFun(switchHandle)">
					<span class="btn_text_2">一键倒机</span>
				</div>
			</div>
			<div class="main_fan_body_l2_l5">
				<div class="main_fan_body_l2_l5_title_1">一号风机</div>
				<div class="main_fan_body_l2_btn_3" @click="validateFun(activeForwardStartMainHandle)">
					<span class="btn_text_3">一键正向启动</span>
				</div>
				<div class="main_fan_body_l2_btn_4" @click="validateFun(activeStopMainHandle)">
					<span class="btn_text_4">一键停止</span>
				</div>
				<div class="main_fan_body_l2_btn_5" @click="validateFun(activeReverseStartMainHandle)">
					<span class="btn_text_5">一键反向启动</span>
				</div>
				<div class="main_fan_body_l2_l5_title_2">二号风机</div>
				<div class="main_fan_body_l2_btn_3" @click="validateFun(standbyForwardStartMainHandle)">
					<span class="btn_text_3">一键正向启动</span>
				</div>
				<div class="main_fan_body_l2_btn_4" @click="validateFun(standbyStopMainHandle)">
					<span class="btn_text_4">一键停止</span>
				</div>
				<div class="main_fan_body_l2_btn_5" @click="validateFun(standbyReverseStartMainHandle)">
					<span class="btn_text_5">一键反向启动</span>
				</div>
			</div>
			<border-box name="border2" title="风量定量调控" />
			<div class="main_fan_body_l2_l7">
				<div class="main_fan_body_l2_l7_body">
					<div class="main_fan_body_l2_l7_body_title set_btn_default">
						<span>一号风机</span>
					</div>
					<div class="main_fan_body_l2_l7_label">动叶角度(°)</div>
					<el-input v-model="quControlAirVolumeForm.movingBladeAngle1" />
					<div class="main_fan_body_l2_l7_label">频率(hz)</div>
					<el-input v-model="quControlAirVolumeForm.frequency1" />
					<div class="normal_btn" @click="validateFun(volumeControlHandle1)">设置</div>
				</div>
				<div class="main_fan_body_l2_l7_body">
					<div class="main_fan_body_l2_l7_body_title set_btn_default">
						<span>二号风机</span>
					</div>
					<div class="main_fan_body_l2_l7_label">动叶角度(°)</div>
					<el-input v-model="quControlAirVolumeForm.movingBladeAngle2" />
					<div class="main_fan_body_l2_l7_label">频率(hz)</div>
					<el-input v-model="quControlAirVolumeForm.frequency2" />
					<div class="normal_btn" @click="validateFun(volumeControlHandle2)">设置</div>
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
								<div class="set_btn_cus_icon" @click="customizedHandle('1')">
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
							<template v-for="(item, index) in oneCustomizedParameters1" :key="'one' + index">
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.propertyName }}</div>
									<div class="customized_value">{{ item.propertyValue + item.propertyUnit }}</div>
								</div>
							</template>
						</div>
					</div>
					<div class="main_fan_customized_l3">
						<div class="main_fan_customized_title">
							<span>二级电机</span>
						</div>
						<div class="main_fan_customized_body">
							<template
								v-for="(item, index) in oneCustomizedParameters2"
								:key="'oneCustom' + index"
							>
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.propertyName }}</div>
									<div class="customized_value">{{ item.propertyValue + item.propertyUnit }}</div>
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
								<div class="set_btn_cus_icon" @click="customizedHandle('2')">
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
							<template
								v-for="(item, index) in twoCustomizedParameters1"
								:key="'twoCustom1' + index"
							>
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.propertyName }}</div>
									<div class="customized_value">{{ item.propertyValue + item.propertyUnit }}</div>
								</div>
							</template>
						</div>
					</div>
					<div class="main_fan_customized_l3">
						<div class="main_fan_customized_title">
							<span>二级电机</span>
						</div>
						<div class="main_fan_customized_body">
							<template v-for="(item, index) in twoCustomizedParameters2" :key="'two2' + index">
								<div
									class="customized_item"
									:class="Math.ceil((index + 1) / 2) % 2 === 0 ? 'item_bg' : 'item_bg_none'"
								>
									<div class="customized_label">{{ item.propertyName }}</div>
									<div class="customized_value">{{ item.propertyValue + item.propertyUnit }}</div>
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
					<div
						:class="
							dataForm.intelControl === '1'
								? 'main_fan_body_l5_body_l2_open'
								: 'main_fan_body_l5_body_l2'
						"
					></div>
					<div class="normal_2_btn" @click="validateFun(openIntelWindControl)">开启</div>
					<div class="normal_btn" @click="validateFun(closeIntelWindControl)">关闭</div>
				</div>
			</border-box>
		</div>
		<!--    视频监控-->
		<dia-log
			v-if="videoVisible"
			v-model="videoVisible"
			title="视频监控"
			:width="1280"
			:height="720"
		>
			<div class="line_video_full_width">
				<template v-if="videoListLength > 0">
					<template v-for="i in videoUrlList" :key="i">
						<m-video type="fj" :video-path="i" />
					</template>
				</template>
				<template v-else>
					<m-video type="fj" video-path="" />
				</template>
			</div>
		</dia-log>
		<customized-dia-log
			v-if="customizedVisible"
			v-model="customizedVisible"
			:data-form="dataForm"
			:type="customFanType"
			@submit="getMainFanInfo"
		/>
		<!--    风机特性曲线-->
		<fan-char-curve v-if="fanCharCurveVisible" v-model="fanCharCurveVisible" :fan-info="dataForm" />
		<!--    温振监测分析-->
		<mon-and-analysis
			v-if="monAndAnalysisVisible"
			v-model="monAndAnalysisVisible"
			:data-form="dataForm"
		/>
		<!--    温振图谱分析-->
		<the-spectrum v-if="theSpectrumVisible" v-model="theSpectrumVisible" />
		<!--    操作记录-->
		<FanHisRecord v-if="recordVisible" v-model="recordVisible" :data-form="dataForm" />
		<!--    预警弹窗-->
		<WarnTableRecord
			v-if="warnVisible"
			v-model="warnVisible"
			:data-form="dataForm"
			dev-type="mainfan"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venEqMonitoring/mainFan';
</style>
