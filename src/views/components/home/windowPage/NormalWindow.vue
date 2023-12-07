<!--常规风窗-->
<script setup>
	import { dynamicHeight, dynamicWidth, selectDictLabel } from '@/utils/ruoyi'
	import LoadWindowModel from '@/views/components/loadModel/loadWindowModel.vue'
	import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
	import {
		getChart1,
		getChart2,
		getChart3,
		getChart4,
		getChart5,
		getLineChartOption,
	} from '@/api/request/home/remoterControlCharts'
	import useDict from '@/hooks/useDict'
	import { WindowParamType, WindowStatus } from '@/api/request/home/doorParams'
	import { controlWindow, curveList, getVentrLine } from '@/api/api/airWindow'
	import { useCommitForm } from '@/hooks/useForm'
	import useSocket from '@/hooks/useSocket'
	import { useCheckWindowForm } from '@/hooks/useCheckWindowForm'

	const { window_work_model, window_type } = useDict(
		'window_work_model',
		'window_type',
		'hisRecordHandle',
	)

	const props = defineProps({
		formA: {
			type: Object,
		},
		dataList: {
			type: Array,
		},
	})
	const emits = defineEmits(['moreVisibleHandle', 'changeDoor', 'changeWindow'])

	//   表单
	const dataForm = ref({})

	// 风窗视频链接
	const videoUrl1 = ref('')
	const videoUrl2 = ref('')

	const initForm = () => {
		dataForm.value = props.formA
		let urls = dataForm.value.videoUrl ? dataForm.value.videoUrl.split(',') : []
		videoUrl1.value = urls[0] ?? ''
		videoUrl2.value = urls[1] ?? ''
	}

	// 气源动力样式
	const airStatusClass = computed(() => {
		let dev_class = 'large_light_1'
		if (dataForm.value.airStatus === '0') {
			dev_class = 'large_light_2'
		} else if (dataForm.value.airStatus === '1') {
			dev_class = 'large_light_1'
		} else if (dataForm.value.airStatus === '2') {
			dev_class = 'large_light_3'
		}

		return dev_class
	})

	watch(
		() => props.formA.id,
		() => {
			initForm()
			initChart1?.()
			initChart2?.()
			initChart3?.()
		},
		{ deep: true },
	)

	// 下拉列表
	const changeWindow = (id) => {
		emits('changeWindow', id)
	}
	//   更多
	const moreVisibleHandle = () => {
		emits('moreVisibleHandle')
	}

	// 风阻特性曲线
	const optionWindow = ref({})
	const initChart1 = async () => {
		const res = await getVentrLine({
			devId: dataForm.value.id,
		})
		if (res.code === 200) {
			const value = res.data.res.map((i) => {
				return i?.fengzu
			})
			const xData = res.data.res.map((i) => {
				return i?.kaidu
			})
			optionWindow.value = defaultLineChart({
				domId: 'window_chart_1',
				xData: xData,
				yDataList: [value],
				legends: ['风阻'],
				legendPosition: 'center',
				units: '风阻(kN)',
				title: '开度(%)',
				colors: [['rgba(75, 200, 252, 1)', 'rgba(75, 200, 252, 0.6)']],
			})
		}
	}

	// 监测曲线
	const lineChartsData = reactive({
		names: [],
		lineX: [],
		value: [],
	})

	// 监测曲线socket
	const { socketData, clientSocket, dataRes } = useSocket('curveList')
	watch(dataRes.curveList, (val) => {
		lineChartsData.lineX.push(val.lineX)
		lineChartsData.value?.[0] && lineChartsData.value?.[0].push(val.value[0][0])
		lineChartsData.value?.[1] && lineChartsData.value?.[1].push(val.value[1][0])
		lineChartsData.value?.[2] && lineChartsData.value?.[2].push(val.value[2][0])
		lineChartsData.value?.[3] && lineChartsData.value?.[3].push(val.value[3][0])
		lineChartsData.value?.[4] && lineChartsData.value?.[4].push(val.value[4][0])
		option.value = getLineChartOption(
			lineChartsData.names,
			lineChartsData.lineX,
			lineChartsData.value,
		)
	})

	const option = ref({})
	const initChart2 = async () => {
		option.value = {}
		const res = await curveList({
			devId: dataForm.value.id,
		})
		if (res.code === 200) {
			lineChartsData.names = res.data.names
			lineChartsData.lineX = res.data.lineX
			lineChartsData.value = res.data.value
			option.value = getLineChartOption(res.data.names, res.data.lineX, res.data.value)
			socketData.value?.close()
			clientSocket?.('|adjustCurveList')
		}
	}

	const optionChart1 = ref({})
	const optionChart2 = ref({})
	const optionChart3 = ref({})
	const optionChart4 = ref({})
	const optionChart5 = ref({})
	const optionChart6 = ref({})
	let timer

	// 巷道饼图
	const initChart3 = () => {
		optionChart1.value = getChart1(dataForm.value?.openDegreeNow ?? 0)
		optionChart2.value = getChart2(dataForm.value?.areaPercent ?? 0)
		const dataType = ['1', '2'].includes(domType.value)
		optionChart3.value = getChart3(
			dataType ? dataForm.value.volume ?? 0 : dataForm.value.pressure ?? 0,
			chartTitleMap.get(domType.value)[0],
			chartTitleMap.get(domType.value)[1],
			dataType ? 'm³/min' : 'Pa',
		)
		optionChart4.value = getChart4(
			dataType ? dataForm.value.speed ?? 0 : dataForm.value.absolutePressure ?? 0,
			chartTitleMap.get(domType.value)[2],
			dataType ? 'm/s' : 'Pa',
		)
		if (!['1', '2'].includes(domType.value)) {
			optionChart5.value = getChart5(
				'1',
				dataForm.value.humidity ?? 0,
				chartTitleMap.get(domType.value)[3],
			)
			optionChart6.value = getChart5(
				'2',
				dataForm.value.temperature ?? 0,
				chartTitleMap.get(domType.value)[4],
			)
			timer && clearInterval(timer)
			function doing() {
				optionChart5.value.series[1].startAngle = optionChart5.value.series[1].startAngle - 1
				optionChart6.value.series[1].startAngle = optionChart6.value.series[1].startAngle - 1
			}
			function startTimer() {
				timer = setInterval(doing, 100)
			}
			setTimeout(startTimer, 1000)
		}
	}

	//   风窗状态
	const windowStatusLight = (data) => {
		return dataForm.value.status === data ? 'small_light_1' : 'small_light_2'
	}
	// 控制显示图表
	const domType = computed(() => {
		let type = '-1'
		const rsType = dataForm.value.rsSensorType
		if (rsType === '-1') {
			type = '1'
		} else if (rsType === '0') {
			type = '2'
		} else if (rsType === '2') {
			type = '3'
		} else if (rsType === '3') {
			type = '4'
		}
		return type
	})
	const chartTitleMap = new Map([
		['1', ['当前风量(未接入)', '风量', '当前风速(未接入)']],
		['2', ['当前风量', '风量', '当前风速']],
		['3', ['当前风压', '风压', '当前绝压', '当前湿度', '当前温度']],
		['4', ['当前风压', '风压范', '当前绝压', '当前湿度(未接入)', '当前温度(未接入)']],
	])

	//   操作记录
	const hisRecordHandle = () => {
		emits('hisRecordHandle')
	}

	//   设置参数
	const { ruleFormRef, rules, submitForm, ruleForm } = useCheckWindowForm()

	const setParams = (key, type) => {
		submitForm?.(key, async () => {
			await useCommitForm(controlWindow, {
				queryParams: {
					devId: dataForm.value.id,
					controlType: type,
					controlValue: ruleForm.value[key],
				},
			})
		})
	}

	onBeforeUnmount(() => {
		clearInterval(timer)
	})
</script>

<template>
	<div class="home_air_window_body">
		<div class="home_air_window_body_l1">
			<load-window-model :percentage="parseFloat(dataForm.openDegreeNow)" />
			<div class="home_air_window_body_l1_v1">
				<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
					<m-video :video-path="videoUrl1" domid="windowPlayer1" type="fc" />
				</border-box>
			</div>
			<div class="home_air_window_body_l1_v2" v-if="videoUrl2">
				<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
					<m-video :video-path="videoUrl2" domid="windowPlayer2" type="fc" />
				</border-box>
			</div>
		</div>
		<div class="home_air_window_body_l2">
			<div class="home_air_window_body_l2_item_1">
				<border2 :title="dataForm.name" :hidden-glimmer="true" />
				<!--        选择按钮-->
				<div
					class="window_choose_icon"
					:style="{ left: dynamicHeight(dataForm.name?.length * 24) + 'px' }"
				>
					<el-dropdown trigger="click" @command="changeWindow">
						<el-icon><CaretBottom /></el-icon>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item v-for="item in dataList" :command="item.id">{{
									item.name
								}}</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
				<!--        更多-->
				<div class="window_more_btn" @click="moreVisibleHandle">更多</div>
			</div>
			<div class="home_air_window_body_l2_item_2">
				<span>位置：{{ dataForm.location }}</span>
				<span>IP地址：{{ dataForm.ip }}</span>
				<span>当前模式：{{ selectDictLabel(window_work_model, dataForm.workModel) }}</span>
				<span>类型：{{ selectDictLabel(window_type, dataForm.type) }}</span>
			</div>
			<div class="home_air_window_body_l2_item_3">
				<BaseEchart :option="optionChart1" />
				<BaseEchart :option="optionChart2" />
				<div class="home_air_window_body_l2_item_3_chart_title">
					<span>通风面积</span>
					<span>{{ dataForm.areaOpen ?? 0 }} m²</span>
					<span>巷道面积</span>
					<span>{{ dataForm.roadArea ?? 0 }} m²</span>
				</div>
			</div>
			<div class="home_air_window_body_l2_item_4"></div>
			<div class="home_air_window_body_l2_item_5">
				<BaseEchart :option="optionChart3" />
				<BaseEchart :option="optionChart4" />
				<template v-if="!['1', '2'].includes(domType)">
					<BaseEchart :option="optionChart5" />
					<BaseEchart :option="optionChart6" />
				</template>
			</div>
			<div class="home_air_window_body_l2_item_6">
				<div class="home_air_window_body_l2_item_6_item">
					<div class="door_icon_1"></div>
					<span>通信状态</span>
					<div :class="dataForm.onlineStatus === '1' ? 'large_light_1' : 'large_light_2'"></div>
				</div>
				<div class="home_air_window_body_l2_item_6_item">
					<div class="door_icon_2"></div>
					<span>气源动力</span>
					<div :class="airStatusClass"></div>
				</div>
				<div class="home_air_window_body_l2_item_6_item">
					<div class="door_icon_4"></div>
					<span>编码器故障</span>
					<div :class="dataForm.encoderStatus === '1' ? 'large_light_1' : 'large_light_2'"></div>
				</div>
			</div>
			<div class="home_air_window_body_l2_item_7">
				<div class="home_air_window_body_l2_item_7_item">
					<span>调风超时</span>
					<div :class="windowStatusLight(WindowStatus.THREE)"></div>
				</div>
				<div class="home_air_window_body_l2_item_7_item">
					<span>正在调风</span>
					<div :class="windowStatusLight(WindowStatus.ZERO)"></div>
				</div>
				<div class="home_air_window_body_l2_item_7_item">
					<span>开到位</span>
					<div :class="windowStatusLight(WindowStatus.ONE)"></div>
				</div>
				<div class="home_air_window_body_l2_item_7_item">
					<span>关到位</span>
					<div :class="windowStatusLight(WindowStatus.TWO)"></div>
				</div>
			</div>
		</div>
		<div class="home_air_window_body_l3">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="window_param">
					<div class="door_param_title">
						<border-box name="border5">
							<div class="set_btn_cus_icon">
								<span>风阻特性曲线</span>
							</div>
						</border-box>
					</div>
					<BaseEchart :option="optionWindow" />
				</div>
			</border-box>
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="window_param">
					<div class="door_param_title">
						<border-box name="border5">
							<div class="set_btn_cus_icon">
								<span>监测曲线</span>
							</div>
						</border-box>
					</div>
					<BaseEchart :option="option" />
				</div>
			</border-box>
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.71)">
				<div class="window_param">
					<div class="door_param_title">
						<border-box name="border5">
							<div class="set_btn_default">
								<span>参数设定</span>
							</div>
						</border-box>
					</div>
					<el-form
						ref="ruleFormRef"
						:rules="rules"
						:model="ruleForm"
						class="window_param_body"
						:label-width="dynamicWidth(100)"
					>
						<el-form-item prop="openDegreeAdjust" label="开度">
							<div class="window_param_item">
								<el-input v-model="ruleForm.openDegreeAdjust" />
								%
							</div>
						</el-form-item>
						<div class="normal_btn" @click="setParams('openDegreeAdjust', WindowParamType.TEN)">
							设定
						</div>
						<template v-if="['1', '2'].includes(domType)">
							<el-form-item prop="volumeAdjust" label="风量">
								<div class="window_param_item">
									<el-input v-model="ruleForm.volumeAdjust" />
									m³/min
								</div>
							</el-form-item>

							<div class="normal_btn" @click="setParams('volumeAdjust', WindowParamType.ONE)">
								设定
							</div>
						</template>
						<template v-else>
							<el-form-item prop="pressureAdjust" label="风压">
								<div class="window_param_item">
									<el-input v-model="ruleForm.pressureAdjust" />
									m³/min
								</div>
							</el-form-item>

							<div class="normal_btn" @click="setParams('pressureAdjust', WindowParamType.TWO)">
								设定
							</div>
						</template>
						<el-form-item prop="areaAdjust" label="面积">
							<div class="window_param_item">
								<el-input v-model="ruleForm.areaAdjust" />
								m2
							</div>
						</el-form-item>

						<div class="normal_btn" @click="setParams('areaAdjust', WindowParamType.ELEVEN)">
							设定
						</div>
					</el-form>
				</div>
				<div class="window_operation">
					<div class="operation_btn" @click="hisRecordHandle">
						<border-box name="border7">
							<div class="operation_btn_body">
								<div class="door_icon_3"></div>
								操作记录
							</div>
						</border-box>
					</div>
				</div>
			</border-box>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_air_window';
</style>
