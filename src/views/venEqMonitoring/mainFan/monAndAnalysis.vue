<!--监测分析-->
<script setup>
	import { fanChart2 } from '@/api/request/venEqMonitoring/fansCharts'
	import { useGainList } from '@/hooks/useGainList'
	import { getWzSensorDict, sensorWaveData } from '@/api/api/mainFan'
	import { addDateRange } from '@/utils/ruoyi'

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
		dataForm: {
			type: Object,
			default: () => {
				return {
					id: 0,
				}
			},
		},
	})
	const emits = defineEmits(['update:modelValue'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})

	const { dataList } = useGainList({
		apiFun: getWzSensorDict,
		queryArgs: {
			id: props.dataForm.id,
		},
	})

	//   温振监测分析
	const queryParams = ref({
		sensorId: '',
	})
	const dateRange = ref([])
	const option1 = ref({})
	const option2 = ref({})
	const option3 = ref({})
	const option4 = ref({})

	// 加速度
	const initChart1 = (xData, yData) => {
		option1.value = fanChart2({
			xData: xData,
			yDataList: yData,
			legends: ['加速度-x', '加速度-y', '加速度-z'],
			legendPosition: 'center',
			units: 'm/s2',
			colors: [
				['rgba(255, 255, 0, 1)', 'rgba(255, 255, 0, 1)'],
				['rgba(255, 153, 0, 1)', 'rgba(255, 153, 0, 1)'],
				['rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 1)'],
			],
			smooth: false,
			isArea: false,
		})
	}
	// 速度
	const initChart2 = (xData, yData) => {
		option2.value = fanChart2({
			xData: xData,
			yDataList: yData,
			legends: ['速度-X', '速度-Y', '速度-Z'],
			legendPosition: 'center',
			units: 'mms',
			colors: [
				['rgba(255, 255, 0, 1)', 'rgba(255, 255, 0, 1)'],
				['rgba(255, 153, 0, 1)', 'rgba(255, 153, 0, 1)'],
				['rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 1)'],
			],
			smooth: false,
			isArea: false,
		})
	}
	// 位移
	const initChart3 = (xData, yData) => {
		option3.value = fanChart2({
			xData: xData,
			yDataList: yData,
			legends: ['位移-X', '位移-Y', '位移-Z'],
			legendPosition: 'center',
			units: '∪m',
			colors: [
				['rgba(0, 96, 255, 1)', 'rgba(0, 96, 255, 1)'],
				['rgba(228, 0, 127, 1)', 'rgba(228, 0, 127, 1)'],
				['rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 1)'],
			],
			smooth: false,
			isArea: false,
		})
	}
	// 温度
	const initChart4 = (xData, yData) => {
		option4.value = fanChart2({
			xData: xData,
			yDataList: yData,
			legends: ['温度'],
			legendPosition: 'center',
			units: 'm/s2',
			colors: [['rgba(230, 0, 18, 1)', 'rgba(230, 0, 18, 1)']],
			smooth: false,
			isArea: false,
		})
	}

	const queryCharts = async () => {
		if (!queryParams.value.sensorId) return
		const res = await sensorWaveData(addDateRange(queryParams.value, dateRange.value))
		if (res.code === 200 && res.data) {
			const {
				accelerateSpeedXList,
				accelerateSpeedYList,
				accelerateSpeedZList,
				distanceXList,
				distanceYList,
				distanceZList,
				speedXList,
				speedYList,
				speedZList,
				temperatureList,
				timeList,
			} = res.data.sensorData

			initChart1(timeList, [accelerateSpeedXList, accelerateSpeedYList, accelerateSpeedZList])
			initChart2(timeList, [speedXList, speedYList, speedZList])
			initChart3(timeList, [distanceXList, distanceYList, distanceZList])
			initChart4(timeList, [temperatureList])
		}
	}
</script>

<template>
	<dia-log v-model="showDiaLog" title="温振监测分析" :width="1200" :height="600">
		<div class="fullDom mon_sis">
			<div class="mon_sis_form">
				<el-form v-model="queryParams" inline>
					<el-form-item label="传感器：">
						<el-select v-model="queryParams.sensorId" clearable>
							<el-option v-for="i in dataList" :key="i.id" :value="i.id" :label="i.name" />
						</el-select>
					</el-form-item>
					<el-form-item label="时间">
						<el-date-picker
							v-model="dateRange"
							value-format="YYYY-MM-DD hh:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							prefix-icon="Calendar"
						/>
					</el-form-item>
					<el-form-item>
						<div class="normal_btn" @click="queryCharts">查询</div>
					</el-form-item>
				</el-form>
			</div>
			<border-box name="border5">
				<BaseEchart :option="option1" />
			</border-box>
			<border-box name="border5">
				<BaseEchart :option="option2" />
			</border-box>
			<border-box name="border5">
				<BaseEchart :option="option3" />
			</border-box>
			<border-box name="border5">
				<BaseEchart :option="option4" />
			</border-box>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	.mon_sis {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: vh(40) repeat(2, 1fr);
		grid-row-gap: vh(16);
		grid-column-gap: vw(16);
		:deep(.border-box-5-fill) {
			fill: rgba(22, 81, 142, 0.12);
		}
	}
	.mon_sis_form {
		grid-area: 1/1/2/3;
		:deep(.el-form) {
			.el-select {
				width: vw(150);
			}
			.el-date-editor {
				width: vw(400);
			}
		}
	}
</style>
