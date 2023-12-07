<!--AB窗折线-->
<script setup>
	import { curveList, getVentrLine } from '@/api/api/airWindow'
	import { defaultLineChart } from '@/utils/echarts/defaultLineCharts'
	import { getLineChartOption } from '@/api/request/home/remoterControlCharts'
	import useSocket from '@/hooks/useSocket'

	const props = defineProps({
		devId: {
			type: Number,
		},
	})

	watch(
		() => props.devId,
		(val) => {
			if (val) {
				initChart1?.()
				initChart2?.()
			}
		},
	)
	const option1 = ref({})
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
			option1.value = defaultLineChart({
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
	const { clientSocket, socketData, dataRes } = useSocket('curveList')
	const option2 = ref({})

	watch(dataRes.curveList, (value) => {
		lineChartsData.lineX.push(value.lineX)
		lineChartsData.value.push(value.value)
		option2.value = getLineChartOption(
			lineChartsData.names,
			lineChartsData.lineX,
			lineChartsData.value,
		)
	})

	const initChart2 = async () => {
		const res = await curveList({
			devId: props.devId,
		})
		if (res.code === 200) {
			lineChartsData.names = res.data.names
			lineChartsData.lineX = res.data.lineX
			lineChartsData.value = res.data.value
			option2.value = getLineChartOption(res.data.names, res.data.lineX, res.data.value)
			socketData.value?.close()
			clientSocket?.('|adjustCurveList')
		}
	}
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

		<BaseEchart :option="option1" />
		<div class="a_b_window_line_title_2">
			<border-box name="border5">
				<div class="set_btn_cus_icon">
					<span>监测曲线</span>
				</div>
			</border-box>
		</div>

		<BaseEchart :option="option2" />
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
