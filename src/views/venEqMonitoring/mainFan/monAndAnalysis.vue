<!--监测分析-->
<script setup>
	import useResetCharts from '@/hooks/useResetCharts'
	import { fanChart2 } from '@/api/request/venEqMonitoring/fansCharts'
	import useCharts from '@/hooks/useCharts'

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
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
	//   温振监测分析
	const queryParams = ref({
		sensor: '',
	})
	const dateRange = ref([])

	const initCharts = () => {
		const { option: option1 } = useCharts('mon_chart_1')
		const { option: option2 } = useCharts('mon_chart_2')
		const { option: option3 } = useCharts('mon_chart_3')
		const { option: option4 } = useCharts('mon_chart_4')

		let xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		let yData1 = [[], [], []]
		let yData2 = [[], [], []]
		let yData3 = [[], [], []]
		let yData4 = [[35, 35, 35, 35, 35, 35, 35, 35, 35, 35]]

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 10; j++) {
				yData1[i].push(Math.random() * 100)
				yData2[i].push(Math.random() * 100)
				yData3[i].push(Math.random() * 100)
			}
		}
		initChart1(xData, yData1, option1)
		initChart2(xData, yData2, option2)
		initChart3(xData, yData3, option3)
		initChart4(xData, yData4, option4)
	}
	// 加速度
	const initChart1 = (xData, yData, option) => {
		option.value = fanChart2({
			domId: 'mon_chart_1',
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
	const initChart2 = (xData, yData, option) => {
		option.value = fanChart2({
			domId: 'mon_chart_2',
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
	const initChart3 = (xData, yData, option) => {
		option.value = fanChart2({
			domId: 'mon_chart_3',
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
	const initChart4 = (xData, yData, option) => {
		option.value = fanChart2({
			domId: 'mon_chart_3',
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
	useResetCharts(initCharts)
</script>

<template>
	<dia-log v-model="showDiaLog" title="温振监测分析" :width="1200" :height="600">
		<div class="fullDom mon_sis">
			<div class="mon_sis_form">
				<el-form v-model="queryParams" inline>
					<el-form-item label="传感器：">
						<el-select v-model="queryParams.sensor" clearable></el-select>
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
						></el-date-picker>
					</el-form-item>
					<el-form-item>
						<div class="normal_btn">查询</div>
					</el-form-item>
				</el-form>
			</div>
			<border-box name="border5">
				<div id="mon_chart_1" class="fullDom"></div>
			</border-box>
			<border-box name="border5">
				<div id="mon_chart_2" class="fullDom"></div>
			</border-box>
			<border-box name="border5">
				<div id="mon_chart_3" class="fullDom"></div>
			</border-box>
			<border-box name="border5">
				<div id="mon_chart_4" class="fullDom"></div>
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
