<!--AB窗折线-->
<script setup>
	import { curveList, getVentrLine } from '@/api/api/airWindow'
	import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
	import useResetCharts from '@/hooks/useResetCharts'
	import { getLineChartOption } from '@/api/request/home/remoterControlCharts'

	const props = defineProps({
		devId: {
			type: Number,
		},
	})

	watch(
		() => props.devId,
		(val) => {
			if (val) {
				resetCharts1?.()
				resetCharts2?.()
			}
		},
	)

	// 风阻特性曲线
	const initChart1 = async () => {
		const res = await getVentrLine({
			devId: props.devId,
		})
		if (res.code === 200) {
			const value = res.data.res.map((i) => {
				return i?.fengzu
			})
			const xData = res.data.res.map((i) => {
				return i?.kaidu
			})
			defaultLineChart({
				domId: 'a_b_window_chart_1',
				xData: xData,
				yDataList: value,
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
	const initChart2 = async () => {
		const res = await curveList({
			devId: props.devId,
		})
		if (res.code === 200) {
			getLineChartOption('a_b_window_chart_2', res.data.names, res.data.lineX, res.data.value)
		}
	}
	const { showCharts: showChart2, resetCharts: resetCharts2 } = useResetCharts(initChart2, false)
</script>

<template>
	<div class="a_b_window_line fullDom">
		<div class="a_b_window_line_title_1">
			<border-box name="border5">
				<div class="set_btn_cus_icon">
					<span>风阻特性曲线</span>
				</div>
			</border-box>
		</div>

		<div v-if="showChart1" class="fullDom" id="a_b_window_chart_1"></div>
		<div class="a_b_window_line_title_2">
			<border-box name="border5">
				<div class="set_btn_cus_icon">
					<span>监测曲线</span>
				</div>
			</border-box>
		</div>

		<div v-if="showChart2" class="fullDom" id="a_b_window_chart_2"></div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_air_window';
	.a_b_window_line {
		padding: 0 vw(21) 0 vw(17);
		display: grid;
		grid-template-rows: repeat(2, vh(38) 1fr);
		grid-template-columns: 1fr;
		justify-content: center;
		align-items: center;
	}
	.a_b_window_line_title_1 {
		grid-area: 1/1/2/2;
		width: vw(190);
		justify-self: center;
	}
	.a_b_window_line_title_2 {
		grid-area: 3/1/4/2;
		width: vw(190);
		justify-self: center;
	}
</style>
