<!--风机特性曲线-->
<script setup>
	import useResetCharts from '@/hooks/useResetCharts'
	import { fanChart1 } from '@/api/request/venEqMonitoring/fansCharts'

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

	//   查询表单
	const queryParams = ref({
		rotationalSpeed: '',
		angle: '',
	})

	//  风机曲线
	const initFanChart = () => {
		const xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		const yData = [[], [], [], []]
		const legends = ['通风阻力', '全压', '效率', '功率']

		for (let i = 0; i < 10; i++) {
			yData[0].push(Math.random() * 10)
			yData[1].push(Math.random() * 100)
			yData[2].push(Math.random() * 10)
			yData[3].push(Math.random() * 100)
		}

		fanChart1({
			domId: 'fan_curve_chart_1',
			xData: xData,
			yData: yData,
			legends: legends,
		})
	}

	const { showCharts } = useResetCharts(initFanChart)
</script>

<template>
	<dia-log v-model="showDiaLog" title="风机特性曲线" :width="1240" :height="530">
		<div class="fullDom fan_curve">
			<el-form :model="queryParams" inline>
				<el-form-item label="转速(r/min)">
					<el-select v-model="queryParams.rotationalSpeed"></el-select>
				</el-form-item>
				<el-form-item label="叶片角度">
					<el-select v-model="queryParams.angle"></el-select>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn">查询</div>
				</el-form-item>
			</el-form>
			<div id="fan_curve_chart_1" v-if="showCharts" class="fullDom"></div>
		</div>
	</dia-log>
</template>

<style scoped lang="scss">
	.fan_curve {
		display: grid;
		grid-template-rows: vh(40) 1fr;
		grid-row-gap: vh(10);
	}
</style>
