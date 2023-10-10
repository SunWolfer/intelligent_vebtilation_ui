<!--常规风窗-->
<script setup>
	import { dynamicHeight, selectDictLabel } from '@/utils/ruoyi'
	import LoadWindowModel from '@/views/components/loadModel/loadWindowModel.vue'
	import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
	import useResetCharts from '@/hooks/useResetCharts'
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
	import useCharts from '@/hooks/useCharts'
	import { useSocket } from '@/hooks/useSocket'

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

	watch(
		() => props.formA.id,
		() => {
			initForm()
			resetCharts1?.()
			resetCharts2?.()
			resetCharts3?.()
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
			defaultLineChart({
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
	const { showCharts: showChart1, resetCharts: resetCharts1 } = useResetCharts(initChart1, false)

	// 监测曲线
	const lineChartsData = reactive({
		names: [],
		lineX: [],
		value: [],
	})
	const oneSocketData = ref()
	const initChart2 = async () => {
		const res = await curveList({
			devId: dataForm.value.id,
		})
		if (res.code === 200) {
			const { option } = useCharts('window_chart_2')
			lineChartsData.names = res.data.names
			lineChartsData.lineX = res.data.lineX
			lineChartsData.value = res.data.value
			option.value = getLineChartOption(res.data.names, res.data.lineX, res.data.value)
			oneSocketData.value?.close()
			// 监测曲线socket
			const { socketData, clientSocket } = useSocket('|adjustCurveList', (data) => {
				lineChartsData.lineX = data.lineX
				lineChartsData.value = data.value
				option.value = getLineChartOption(
					lineChartsData.names,
					lineChartsData.lineX,
					lineChartsData.value,
				)
			})
			clientSocket?.()
			oneSocketData.value = socketData.value
		}
	}
	const { showCharts: showChart2, resetCharts: resetCharts2 } = useResetCharts(initChart2, false)

	// 巷道饼图
	const initChart3 = () => {
		getChart1('window_chart_3', dataForm.value?.openDegreeNow ?? 0)
		getChart2('window_chart_4', dataForm.value?.areaPercent ?? 0)
		getChart3(
			'window_chart_5',
			['1', '2'].includes(domType.value)
				? dataForm.value.volume ?? 0
				: dataForm.value.pressure ?? 0,
			chartTitleMap.get(domType.value)[0],
			chartTitleMap.get(domType.value)[1],
		)
		getChart4(
			'window_chart_6',
			['1', '2'].includes(domType.value)
				? dataForm.value.speed ?? 0
				: dataForm.value.absolutePressure ?? 0,
			chartTitleMap.get(domType.value)[2],
		)
		if (!['1', '2'].includes(domType.value)) {
			getChart5(
				'window_chart_7',
				'1',
				dataForm.value.humidity ?? 0,
				chartTitleMap.get(domType.value)[3],
			)
			getChart5(
				'window_chart_8',
				'2',
				dataForm.value.temperature ?? 0,
				chartTitleMap.get(domType.value)[4],
			)
		}
	}
	const { showCharts: showChart3, resetCharts: resetCharts3 } = useResetCharts(initChart3, false)

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
		['1', ['当前风量(未接入)', '风量范围', '当前风速(未接入)']],
		['2', ['当前风量', '风量范围', '当前风速']],
		['3', ['当前风压', '风压范围', '当前绝压', '当前湿度', '当前温度']],
		['4', ['当前风压', '风压范围', '当前绝压', '当前湿度(未接入)', '当前温度(未接入)']],
	])

	//   操作记录
	const hisRecordHandle = () => {
		emits('hisRecordHandle')
	}
	//   设置参数
	const setParams = async (key, type) => {
		await useCommitForm(controlWindow, {
			queryParams: {
				devId: dataForm.value.id,
				controlType: type,
				controlValue: dataForm.value[key],
			},
		})
	}
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
				<div v-if="showChart3" class="fullDom" id="window_chart_3" />
				<div v-if="showChart3" class="fullDom" id="window_chart_4" />
				<div class="home_air_window_body_l2_item_3_chart_title">
					<span>通风面积</span>
					<span>{{ dataForm.areaOpen ?? 0 }} m²</span>
					<span>巷道面积</span>
					<span>{{ dataForm.roadArea ?? 0 }} m²</span>
				</div>
			</div>
			<div class="home_air_window_body_l2_item_4"></div>
			<div class="home_air_window_body_l2_item_5">
				<div v-if="showChart3" class="fullDom" id="window_chart_5" />
				<div v-if="showChart3" class="fullDom" id="window_chart_6" />
				<template v-if="!['1', '2'].includes(domType)">
					<div v-if="showChart3" class="fullDom" id="window_chart_7" />
					<div v-if="showChart3" class="fullDom" id="window_chart_8" />
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
					<div :class="dataForm.airStatus === '1' ? 'large_light_1' : 'large_light_2'"></div>
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
					<div v-if="showChart1" class="fullDom" id="window_chart_1"></div>
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
					<div v-if="showChart2" class="fullDom" id="window_chart_2"></div>
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
					<div class="window_param_body">
						<div class="window_param_item">
							开度
							<el-input v-model="dataForm.openDegreeNow" />
							%
						</div>
						<div class="normal_btn" @click="setParams('openDegreeNow', WindowParamType.TEN)">
							设定
						</div>
						<template v-if="['1', '2'].includes(domType)">
							<div class="window_param_item">
								风量
								<el-input v-model="dataForm.volume" />
								m³/min
							</div>
							<div class="normal_btn" @click="setParams('volume', WindowParamType.ONE)">设定</div>
						</template>
						<template v-else>
							<div class="window_param_item">
								风压
								<el-input v-model="dataForm.pressure" />
								m³/min
							</div>
							<div class="normal_btn" @click="setParams('pressure', WindowParamType.TWO)">设定</div>
						</template>
						<div class="window_param_item">
							面积
							<el-input v-model="dataForm.areaPercent" />
							m2
						</div>
						<div class="normal_btn" @click="setParams('areaPercent', WindowParamType.ELEVEN)">
							设定
						</div>
					</div>
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
