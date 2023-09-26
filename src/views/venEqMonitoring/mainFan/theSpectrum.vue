<!--温振图谱分析-->
<script setup>
	import useResetCharts from '@/hooks/useResetCharts'
	import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'

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

	const queryParams = ref({
		sensor: '',
		waveForm: '',
	})
	const dateRange = ref([])

	const chooseItem = ref('1')
	const btnList = ref([
		{
			label: '时域分析',
			value: '1',
		},
		{
			label: '频域分析',
			value: '2',
		},
		{
			label: '包络分析',
			value: '3',
		},
		{
			label: '倒谱分析 ',
			value: '4',
		},
		{
			label: '功率谱密度',
			value: '5',
		},
	])

	const changeItem = (data) => {
		if (chooseItem.value === data) return
		chooseItem.value = data
	}

	const initChart = () => {
		let xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		let yData = [[], []]

		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 10; j++) {
				yData[i].push(Math.random() * 100)
			}
		}

		defaultLineChart({
			domId: 'the_spe_chart_1',
			xData: xData,
			yDataList: yData,
			legends: ['预警波形', '故障库波形'],
			legendPosition: 'center',
			units: 'm/s2',
			colors: [
				['rgba(0, 96, 255, 1)', 'rgba(0, 96, 255, 1)'],
				['rgba(228, 0, 127, 1)', 'rgba(228, 0, 127, 1)'],
			],
			smooth: false,
			isArea: false,
		})
	}
	useResetCharts(initChart)
</script>

<template>
	<dia-log v-model="showDiaLog" title="温振图谱分析" :width="1350" :height="700">
		<div class="fullDom the_spec">
			<el-form :model="queryParams" inline>
				<el-form-item label="传感器">
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
				<el-form-item label="振动波形">
					<el-select v-model="queryParams.waveForm" clearable></el-select>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn">查询</div>
				</el-form-item>
			</el-form>
			<div class="the_spec_btns">
				<template v-for="i in btnList">
					<div
						:class="i.value === chooseItem ? 'the_spec_btns_item_choose' : 'the_spec_btns_item'"
						@click="changeItem(i.value)"
					>
						<div class="the_spec_btns_item_icon"></div>
						<span>{{ i.label }}</span>
					</div>
				</template>
			</div>
			<div id="the_spe_chart_1" class="fullDom"></div>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	.the_spec {
		display: grid;
		grid-template-rows: vh(40) vh(40) 1fr;
		grid-row-gap: vh(15);
		:deep(.el-form) {
			.el-form-item {
				margin-right: vw(32);
			}
			.el-select {
				width: vw(150);
			}
			.el-date-editor {
				width: vw(400);
			}
		}
	}
	.the_spec_btns {
		display: grid;
		grid-template-columns: repeat(5, vw(180));
		grid-column-gap: vw(8);
	}
	@mixin btnItem {
		width: 100%;
		height: vh(40);
		padding: 0 vw(15);
		cursor: pointer;
		display: grid;
		grid-template-columns: vw(24) 1fr;
		grid-column-gap: vw(10);
		align-items: center;
		justify-content: center;

		font-size: vw(17);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
	}
	.the_spec_btns_item {
		@include btnItem;
		border: 2px solid #276a9f;
		background: transparent;
		color: #3c97ff;
		.the_spec_btns_item_icon {
			background-image: url('@/assets/images/venEqMonitoring/fans/dia_icon_1.png');
			background-size: 100% 100%;
		}
	}
	.the_spec_btns_item_choose {
		@include btnItem;
		background: linear-gradient(180deg, #004af3, #0098d8);
		color: #ffffff;
		.the_spec_btns_item_icon {
			background-image: url('@/assets/images/venEqMonitoring/fans/dia_icon_2.png');
			background-size: 100% 100%;
		}
	}
	.the_spec_btns_item_icon {
		width: vw(24);
		height: vw(24);
	}
</style>
