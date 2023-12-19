<script setup>
	import { localFan } from '@/api/request/venEqMonitoring/localFan'
	import CustomizedDiaLog from '@/views/venEqMonitoring/mainFan/customizedDiaLog.vue'
	import LoadLocalFan from '@/views/components/loadModel/loadLocalFan.vue'
	import { selectDictLabel } from '@/utils/ruoyi'
	import FanHisRecord from '@/views/venEqMonitoring/mainFan/fanHisRecord.vue'
	import MonAndAnalysis from '@/views/venEqMonitoring/mainFan/monAndAnalysis.vue'
	import TheSpectrum from '@/views/venEqMonitoring/mainFan/theSpectrum.vue'
	import WarnTableRecord from '@/views/components/warnTableRecord/index.vue'
	import FanCharCurve from '@/views/venEqMonitoring/mainFan/fanCharCurve.vue'
	import useDict from '@/hooks/useDict'
	import { usePermission } from '@/hooks/usePermission'

	const {
		inShowList,
		toLast,
		showLast,
		toNext,
		showNext,
		mainFanId,
		changeItem,
		dataForm,
		oneCustomizedParameters1,
		oneCustomizedParameters2,
		twoCustomizedParameters1,
		twoCustomizedParameters2,
		getMainFanInfo,
		fanThreeInfo,
		recordVisible,
		recordHandle,
		warnVisible,
		warnHandle,
		fanCharCurveVisible,
		showFanCharCurveVisible,
		monAndAnalysisVisible,
		showMonAndAnalysisVisible,
		theSpectrumVisible,
		showTheSpectrumVisible,
		videoVisible,
		videoHandle,
		customizedVisible,
		customizedHandle,
		customFanType,
		itemPower,
		itemAirQuantity,
		itemWindSpeed,
		environmentList,
		freReControlForm,
		volumeControlHandle1,
		volumeControlHandle2,
		switchAsLocalHandle,
		activeStartLocalHandle,
		activeStopLocalHandle,
		standbyStartLocalHandle,
		standbyStopLocalHandle,
		gasOutLocalHandle,
		gasElectricBlockLocalHandle,
		windElectricBlockLocalHandle,
		gasStartLocalHandle,
	} = localFan()
	const { fan_work_status } = useDict('fan_work_status')

	const { validateFun } = usePermission()
</script>

<template>
	<div class="local_fan_body">
		<div class="local_fan_body_l1">
			<div class="local_fan_body_l1_t1" v-show="showLast" @click="toLast"></div>
			<div class="local_fan_body_l1_t2">
				<template v-for="item in inShowList" :key="item.id">
					<div class="local_fan_body_l1_line"></div>
					<div
						class="local_fan_body_l1_item"
						:class="item.id === mainFanId ? 'local_fan_body_l1_item_active' : ''"
					>
						<div
							class="local_fan_body_l1_item_c1"
							:class="
								item.warnStatus !== '0'
									? 'local_fan_body_l1_item_c1_warn'
									: 'local_fan_body_l1_item_c1_normal'
							"
						></div>
						<div class="local_fan_body_l1_item_l1 pointer" @click="changeItem(item.id)">
							{{ item.name }}
						</div>
						<div class="local_fan_body_l1_item_l2">
							1#风机：<span :class="item.workStatus1 === '1' ? 'open_text' : 'close_text'">{{
								item.workStatus1 === '1' ? '开启' : '关闭'
							}}</span>
						</div>
						<div class="local_fan_body_l1_item_l2">
							2#风机：<span :class="item.workStatus2 === '1' ? 'open_text' : 'close_text'">{{
								item.workStatus2 === '1' ? '开启' : '关闭'
							}}</span>
						</div>
						<div class="local_fan_body_l1_item_l3">
							总功率(KW)：<span>{{ itemPower(item) }}</span>
						</div>
						<div class="local_fan_body_l1_item_l3">
							风量(m³/min)：<span>{{ itemAirQuantity(item) }}</span>
						</div>
						<div class="local_fan_body_l1_item_l3">
							风速(m/s)：<span>{{ itemWindSpeed(item) }}</span>
						</div>
					</div>
				</template>
			</div>
			<div class="local_fan_body_l1_t3" v-show="showNext" @click="toNext"></div>
		</div>
		<div class="local_fan_body_l2">
			<div class="main_fan_body_l1_top">
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
			<div class="main_fan_body_l1_model">
				<load-local-fan :fan-three-info="fanThreeInfo" />
			</div>
			<div class="main_fan_body_l1_btn">
				<div class="main_fan_body_l1_btn_item" @click="showFanCharCurveVisible">风机特性曲线</div>
				<div class="main_fan_body_l1_btn_item" @click="showMonAndAnalysisVisible">温振监测分析</div>
				<div class="main_fan_body_l1_btn_item" @click="showTheSpectrumVisible">温振图谱分析</div>
				<div class="main_fan_body_l1_btn_item" @click="recordHandle">操作记录</div>
				<div class="main_fan_body_l1_btn_item" @click="warnHandle">预警记录</div>
			</div>
		</div>
		<div class="local_fan_body_l3">
			<border-box name="border2" :title="dataForm.name + `环境感知`" />
			<div class="local_fan_body_l3_l2">
				<template v-for="(i, envIndex) in environmentList" :key="'env' + envIndex">
					<div :class="i.iconClass"></div>
					<div class="local_fan_body_l3_l2_item">
						<div class="local_fan_body_l3_l2_item_value">{{ i.propertyValue }}</div>
						<div class="local_fan_body_l3_l2_item_label">
							{{ i.propertyName + '(' + i.propertyUnit + ')' }}
						</div>
					</div>
				</template>
			</div>
			<border-box name="border2" title="远程控制" />
			<div class="local_fan_body_l3_l4"></div>
			<div class="local_fan_body_l3_l5">
				<div class="local_fan_body_l3_l5_item">
					<div class="local_fan_body_l3_l5_item_title set_btn_default">
						<span>一号风机</span>
					</div>
					<div class="local_fan_body_l3_l5_item_body">
						频率(HZ)
						<el-input v-model="freReControlForm.frequency1" />
						<div class="normal_btn" @click="validateFun(volumeControlHandle1)">设置</div>
					</div>
				</div>
				<div class="local_fan_body_l3_l5_item">
					<div class="local_fan_body_l3_l5_item_title set_btn_default">
						<span>二号风机</span>
					</div>
					<div class="local_fan_body_l3_l5_item_body">
						频率(HZ)
						<el-input v-model="freReControlForm.frequency2" />
						<div class="normal_btn" @click="validateFun(volumeControlHandle2)">设置</div>
					</div>
				</div>
			</div>
			<div class="local_fan_body_l3_l6">
				<div class="local_fan_body_l3_l6_top">
					<div class="local_fan_body_l3_l6_btn_3" @click="validateFun(switchAsLocalHandle)">
						<span>一键倒机</span>
					</div>
					<div class="local_fan_body_l3_l6_btn_4" @click="validateFun(gasStartLocalHandle)">
						<span>一键排放瓦斯</span>
					</div>
				</div>
				<div class="local_fan_body_l3_l6_bottom">
					<div class="local_fan_body_l3_l6_title_1">一号风机</div>
					<div class="local_fan_body_l3_l6_btn_1" @click="validateFun(activeStartLocalHandle)">
						<span>一键启动</span>
					</div>
					<div class="local_fan_body_l3_l6_btn_2" @click="validateFun(activeStopLocalHandle)">
						<span>一键停止</span>
					</div>
					<div class="local_fan_body_l3_l6_title_1">二号风机</div>
					<div class="local_fan_body_l3_l6_btn_1" @click="validateFun(standbyStartLocalHandle)">
						<span>一键启动</span>
					</div>
					<div class="local_fan_body_l3_l6_btn_2" @click="validateFun(standbyStopLocalHandle)">
						<span>一键停止</span>
					</div>
				</div>
			</div>
		</div>
		<div class="local_fan_body_l4">
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
		<div class="local_fan_body_l5">
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
								:key="'twoCustom' + index"
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
							<template v-for="(item, index) in twoCustomizedParameters2" :key="'two' + index">
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
		<div class="local_fan_body_l6">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="local_fan_body_l6_body">
					<div class="local_fan_body_l6_label">自动瓦斯排放</div>
					<div
						@click="validateFun(gasOutLocalHandle)"
						class="local_fan_body_l6_icon"
						:class="
							dataForm.autoGasDischange === '1'
								? 'local_fan_body_l6_icon_open'
								: 'local_fan_body_l6_icon_close'
						"
					></div>
					<div class="local_fan_body_l6_label">瓦斯电闭锁</div>
					<div
						@click="validateFun(gasElectricBlockLocalHandle)"
						class="local_fan_body_l6_icon"
						:class="
							dataForm.gasElectricBlock === '1'
								? 'local_fan_body_l6_icon_open'
								: 'local_fan_body_l6_icon_close'
						"
					></div>
					<div class="local_fan_body_l6_label">风电闭锁</div>
					<div
						@click="validateFun(windElectricBlockLocalHandle)"
						class="local_fan_body_l6_icon"
						:class="
							dataForm.windElectricBlock === '1'
								? 'local_fan_body_l6_icon_open'
								: 'local_fan_body_l6_icon_close'
						"
					></div>
				</div>
			</border-box>
		</div>

		<!--    视频监控-->
		<dia-log v-model="videoVisible" title="视频监控" :width="1280" :height="720">
			<m-video type="js" :video-path="dataForm.videoUrl" />
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
			dev-type="localfan"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venEqMonitoring/mainFan';
	@import '@/assets/styles/venEqMonitoring/localFan';
</style>
